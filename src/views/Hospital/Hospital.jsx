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
import Get from "../../layouts/Hospital/Get";
import Update from "../../layouts/Hospital/Update";
import Insert from "../../layouts/Hospital/Insert";

// utils
import { toSentenceCase } from "../../utils/functions";

// services
import { ExecuteQuery, FetchFromServer } from "../../services/services";

// contexts
import { useNotification } from "../../context/NotificationProvider";

const Hospital = () => {
  const { setNotificationState } = useNotification();
  const [elements, setElements] = useState([]);
  const [lastId, setLastId] = useState(-1);
  const [table, setTable] = useState("empty");

  const [update, setUpdate] = useState(true);
  const [loading, setLoading] = useState(true);

  const [municipalities, setMunicipalities] = useState([]);

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

    data = await FetchFromServer("hospital");
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
          const date = new Date();
          date.setTime(item.date);
          parsedItem.region = localMunicipalities[item.region].label;
          parsedItem.date = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
          parsedRows.push(parsedItem);
        });
        const parsedColumns = [];
        columns.forEach((item, i) => {
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

  const insertSubmit = async (d, municipality) => {
    const response = await ExecuteQuery("insert", {
      collection: "hospital",
      options: {
        ...d,
        id: lastId + 1,
        date: new Date().getTime(),
        region: municipality,
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
  };

  const updateSubmit = async (d, selected) => {
    const response = await ExecuteQuery("update", {
      collection: "hospital",
      options: { ...d, id: elements[selected].id, date: new Date().getTime() },
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
  };

  const tabs = ["Tabla", "Insertar", "Actualizar"];

  const content = [
    <Get table={table} />,
    <Insert
      lastId={lastId}
      onSave={insertSubmit}
      extras={{ municipalities }}
    />,
    <Update
      elements={elements}
      onUpdate={updateSubmit}
      extras={{ municipalities, elements }}
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

export default Hospital;
