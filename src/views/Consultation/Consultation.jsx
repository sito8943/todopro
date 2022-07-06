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
import Get from "../../layouts/Consultation/Get";
import Update from "../../layouts/Consultation/Update";
import Insert from "../../layouts/Consultation/Insert";

// utils
import { ComplexIndexOf, toSentenceCase } from "../../utils/functions";

// services
import { ExecuteQuery, FetchFromServer } from "../../services/services";

// contexts
import { useNotification } from "../../context/NotificationProvider";

const Consultation = () => {
  const { setNotificationState } = useNotification();
  const [elements, setElements] = useState([]);
  const [lastId, setLastId] = useState(-1);
  const [table, setTable] = useState("empty");

  const [update, setUpdate] = useState(true);
  const [loading, setLoading] = useState(true);

  const [extraData, setExtraData] = useState([]);

  const [hospital, setHospital] = useState([]);
  const [patience, setPatience] = useState([]);
  const [patienceIds, setPatienceIds] = useState([]);

  const init = async () => {
    // load extra
    const localExtraData = {};
    let data = await FetchFromServer("extra");
    if (data.error)
      setNotificationState({
        type: "show",
        ntype: "error",
        text: data.error,
      });
    else {
      for (const element of data) {
        const lData = await FetchFromServer(element.collectionName);
        if (lData.error)
          setNotificationState({
            type: "show",
            ntype: "error",
            text: lData.error,
          });
        else {
          const parsedRows = [];
          lData.forEach((item, i) => {
            parsedRows.push({ value: i, label: item.name });
          });
          localExtraData[element.collectionName] = parsedRows;
        }
      }
    }

    // hospital
    data = await FetchFromServer("hospital");
    const localHospital = [];
    if (data.error)
      setNotificationState({
        type: "show",
        ntype: "error",
        text: localHospital.error,
      });
    else {
      data.forEach((item, i) => {
        localHospital.push({ label: item.name, value: i });
      });
      setHospital(localHospital);
    }

    // patience
    data = await FetchFromServer("patience");
    const localPatience = [];
    const localPatienceIds = [];
    if (data.error)
      setNotificationState({
        type: "show",
        ntype: "error",
        text: localPatience.error,
      });
    else {
      data.forEach((item, i) => {
        localPatience.push({ label: item.name, value: i });
        localPatienceIds.push({ id: item.id });
      });
      setPatienceIds(localPatienceIds);
      setPatience(localPatience);
    }

    data = await FetchFromServer("consultation");
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
        const parsedRows = [];

        rows.forEach((item, i) => {
          const parsedItem = { ...item };
          // parsedItem.region = localExtraData["municipality"][item.region].label;
          const date = new Date(item.date);
          parsedItem.date = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
          parsedItem.type = localExtraData["consultationType"][item.type].label;
          parsedItem.specialization =
            localExtraData["specialization"][item.specialization].label;
          parsedItem.hospital = localHospital[item.hospital].label;
          parsedItem.patience =
            localPatience[
              ComplexIndexOf(localPatienceIds, { id: item.patience }, ["id"])
            ].label;
          parsedRows.push(parsedItem);
        });
        const parsedColumns = [];
        columns.forEach((item, i) => {
          console.log(item);
          if (item === "id") {
            parsedColumns.push({
              field: item,
              width: 90,
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
        setLastId(rows[rows.length - 1].id);
      }
    }

    setExtraData(localExtraData);
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

  const insertSubmit = async (
    d,
    date,
    consultationType,
    specialization,
    hospital,
    // municipality,
    municipalityPatience,
    gender,
    patienceType,
    patienceSelected
  ) => {
    let response;
    if (patienceSelected || patienceSelected === 0)
      response = await ExecuteQuery("insert", {
        collection: "consultation",
        options: {
          id: lastId + 1,
          date,
          type: consultationType,
          specialization,
          hospital,
          duration: d.duration,
          diagnosis: d.diagnosis,
          patience: patienceIds[patienceSelected].id,
        },
      });
    else {
      if (patienceIds.indexOf(d.id) === -1) {
        const { name, id, age } = d;
        response = await ExecuteQuery("insert", {
          collection: "patience",
          options: {
            name,
            id,
            age,
            date: new Date().getTime(),
            region: municipalityPatience,
            gender: gender,
            type: patienceType ? patienceType : 0,
          },
        });
        response = await ExecuteQuery("insert", {
          collection: "consultation",
          options: {
            id: lastId + 1,
            date,
            duration: d.duration,
            diagnosis: d.diagnosis,
            type: consultationType,
            specialization,
            hospital,
            patience: d.id,
          },
        });
      } else
        setNotificationState({
          type: "show",
          ntype: "error",
          text: "Ya exite un usuario con ese CI",
        });
    }
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
  };

  const updateSubmit = async (
    d,
    selected,
    consultationType,
    specialization,
    hospital,
    // municipality,
    municipalityPatience,
    gender,
    patienceType,
    patienceSelected
  ) => {
    let response;
    if (patienceSelected || patienceSelected === 0)
      response = await ExecuteQuery("update", {
        collection: "consultation",
        options: {
          id: elements[selected].id,
          type: consultationType,
          specialization,
          hospital,
          patience: patienceIds[patienceSelected].id,
        },
      });
    else {
      response = await ExecuteQuery("insert", {
        collection: "patience",
        options: {
          ...d,
          region: municipalityPatience,
          gender: gender,
          type: patienceType,
        },
      });
      response = await ExecuteQuery("update", {
        collection: "consultation",
        options: {
          id: elements[selected].id,
          type: consultationType,
          specialization,
          hospital,
          patience: d.id,
        },
      });
    }
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
  };

  const tabs = ["Tabla", "Insertar", "Actualizar"];

  const content = [
    <Get table={table} />,
    <Insert
      lastId={lastId}
      onSave={insertSubmit}
      extras={{
        extraData,
        hospital,
        patience,
      }}
    />,
    <Update
      elements={elements}
      onUpdate={updateSubmit}
      extras={{
        extraData,
        hospital,
        patience,
        patienceIds,
        elements,
      }}
    />,
  ];

  const [tabView, setTabView] = useState(0);

  const changeTab = (newValue) => {
    setTabView(newValue);
  };

  const tabMargin = () => {
    switch (tabView) {
      case 1:
        return "800px";
      case 2:
        return "800px";
      default:
        return "100px";
    }
  };

  return (
    <Container sx={{ padding: "100px 0" }}>
      <BackButton />
      <Paper sx={{ marginTop: tabMargin() }}>
        <Container
          alignItems={loading ? "center" : "baseline"}
          justifyContent="center"
          sx={{ padding: "20px 40px", minHeight: "600px", minWidth: "600px" }}
        >
          {loading ? (
            <Loading />
          ) : (
            <TabView onChange={changeTab} tabs={tabs} content={content} />
          )}
        </Container>
      </Paper>
    </Container>
  );
};

export default Consultation;
