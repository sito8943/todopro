import { useEffect, useState } from "react";

// @mui components
import { Paper } from "@mui/material";

// own components
import Container from "../../components/Container/Container";
import TabView from "../../components/TabView/TabView";
import DataTable from "../../components/DataTable/DataTable";
import Loading from "../../components/Loading/Loading";
import BackButton from "../../components/BackButton/BackButton";

// layouts
import Get from "../../layouts/Patience/Get";
import Update from "../../layouts/Patience/Update";
import Insert from "../../layouts/Patience/Insert";

// utils
import { toSentenceCase } from "../../utils/functions";

// services
import { ExecuteQuery, FetchFromServer } from "../../services/services";

// contexts
import { useNotification } from "../../context/NotificationProvider";

const Patience = () => {
  const { setNotificationState } = useNotification();
  const [elements, setElements] = useState([]);
  const [lastId, setLastId] = useState(-1);
  const [table, setTable] = useState("empty");

  const [update, setUpdate] = useState(true);
  const [loading, setLoading] = useState(true);

  const [municipalities, setMunicipalities] = useState([]);
  const [genders, setGenders] = useState([]);
  const [patienceTypes, setPatienceTypes] = useState([]);
  const [patienceIds, setPatienceIds] = useState([]);

  const init = async () => {
    // load extra
    // municipality
    let data = await FetchFromServer("municipality");
    const localMunicipalities = [];
    if (data.error)
      setNotificationState({
        type: "show",
        ntype: "error",
        text: localMunicipalities.error,
      });
    else {
      data.forEach((item, i) => {
        localMunicipalities.push({ label: item.name, value: i });
      });
      setMunicipalities(localMunicipalities);
    }
    // genders
    data = await FetchFromServer("gender");
    const localGenders = [];
    if (data.error)
      setNotificationState({
        type: "show",
        ntype: "error",
        text: data.error,
      });
    else {
      data.forEach((item, i) => {
        localGenders.push({ label: item.name, value: i });
      });
      setGenders(localGenders);
    }
    // patienceTypes
    data = await FetchFromServer("patienceType");
    const localPatienceTypes = [];
    if (data.error)
      setNotificationState({
        type: "show",
        ntype: "error",
        text: data.error,
      });
    else {
      data.forEach((item, i) => {
        localPatienceTypes.push({ label: item.name, value: i });
      });
      setPatienceTypes(localPatienceTypes);
    }

    data = await FetchFromServer("patience");
    if (data.error)
      setNotificationState({
        type: "show",
        ntype: "error",
        text: data.error,
      });
    else {
      if (data.length > 0) {
        const columns = Object.keys(data[0]);
        const rows = Object.values(data);

        // parsing
        const justRealIds = [];
        const parsedRows = [];
        rows.forEach((item, i) => {
          const parsedItem = { ...item };
          const date = new Date(item.date);
          parsedItem.date = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
          parsedItem.region = localMunicipalities[item.region].label;
          parsedItem.gender = localGenders[item.gender].label;
          parsedItem.type = localPatienceTypes[item.type].label;
          parsedRows.push(parsedItem);
          justRealIds.push(item.id);
        });
        setPatienceIds(justRealIds);
        const parsedColumns = [];
        columns.forEach((item, i) => {
          if (item === "id" || item === "age") {
            parsedColumns.push({
              field: item,
              width: 150,
            });
          } else if (item === "_id") {
            // do nothing
          } else
            parsedColumns.push({
              field: item,
              headerName: toSentenceCase(item),
              width: 200,
              editable: false,
            });
        });
        setLastId(rows[rows.length - 1].id);
        setTable(<DataTable rows={parsedRows} columns={parsedColumns} />);
        setElements(rows);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (update) {
      init();
      setTimeout(() => {
        setUpdate(false);
      }, 100);
    }
  }, [update]);

  const insertSubmit = async (d, municipality, gender, patienceType) => {
    if (patienceIds.indexOf(d.id) === -1) {
      const response = await ExecuteQuery("insert", {
        collection: "patience",
        options: {
          ...d,
          date: new Date().getTime(),
          region: municipality,
          gender: gender,
          type: patienceType,
        },
      });
      if (response.error)
        setNotificationState({
          type: "show",
          ntype: "error",
          text: response.error,
        });
      else
        setNotificationState({
          type: "show",
          ntype: "success",
          text: "Guardado correctamente",
        });
      setUpdate(true);
    } else
      setNotificationState({
        type: "show",
        ntype: "error",
        text: "Ya exite un usuario con ese CI",
      });
  };

  const updateSubmit = async (
    d,
    selected,
    municipality,
    gender,
    patienceType
  ) => {
    if (patienceIds[selected] !== d.id && patienceIds.indexOf(d.id) === -1) {
      const response = await ExecuteQuery("update", {
        collection: "patience",
        options: {
          ...d,
          oldId: patienceIds[selected],
          date: new Date().getTime(),
          region: municipality,
          gender: gender,
          type: patienceType,
        },
      });
      if (response.error)
        setNotificationState({
          type: "show",
          ntype: "error",
          text: response.error,
        });
      else
        setNotificationState({
          type: "show",
          ntype: "success",
          text: "Actualizado correctamente",
        });
      setUpdate(true);
    } else
      setNotificationState({
        type: "show",
        ntype: "error",
        text: "Ya exite un usuario con ese CI",
      });
  };

  const tabs = ["Tabla", "Insertar", "Actualizar"];

  const content = [
    <Get table={table} />,
    <Insert
      lastId={lastId}
      onSave={insertSubmit}
      extras={{ municipalities, genders, patienceTypes }}
    />,
    <Update
      elements={elements}
      onUpdate={updateSubmit}
      extras={{ municipalities, genders, patienceTypes, elements }}
    />,
  ];

  return (
    <Container sx={{ padding: "100px 0" }}>
      <BackButton />
      <Paper sx={{ marginTop: "100px" }}>
        <Container
          alignItems={loading ? "center" : "baseline"}
          justifyContent="center"
          sx={{ padding: "20px 40px", minHeight: "600px", minWidth: "600px" }}
        >
          {loading ? <Loading /> : <TabView tabs={tabs} content={content} />}
        </Container>
      </Paper>
    </Container>
  );
};

export default Patience;
