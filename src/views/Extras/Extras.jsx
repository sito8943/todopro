import { useEffect, useState } from "react";

// @mui components
import { Paper } from "@mui/material";

// own components
import Container from "../../components/Container/Container";
import TabView from "../../components/TabView/TabView";
import DataTable from "../../components/DataTable/DataTable";
import Empty from "../../components/Empty/Empty";
import Loading from "../../components/Loading/Loading";
import BackButton from "../../components/BackButton/BackButton";

// layouts
import Get from "../../layouts/Extras/Get";
import Update from "../../layouts/Extras/Update";
import Insert from "../../layouts/Extras/Insert";

// utils
import { toSentenceCase } from "../../utils/functions";

// services
import { ExecuteQuery, FetchFromServer } from "../../services/services";

// contexts
import { useNotification } from "../../context/NotificationProvider";

const Extras = () => {
  const { setNotificationState } = useNotification();

  const [rawKeys, setRawKeys] = useState([]);
  const [keys, setKeys] = useState([]);
  const [elements, setElements] = useState([]);
  const [lastId, setLastId] = useState([]);
  const [tables, setTables] = useState([]);

  const [loading, setLoading] = useState(true);

  const [update, setUpdate] = useState(true);

  const init = async () => {
    const data = await FetchFromServer("extra");
    const localRawKeys = [];
    const localTables = [];
    const localKeys = [];
    const localElements = [];
    const localLastId = [];
    if (data.error)
      setNotificationState({
        type: "show",
        ntype: "error",
        text: data.error,
      });
    else {
      // fetching extra data
      for (const element of data) {
        const lData = await FetchFromServer(element.collectionName);
        if (lData.error)
          setNotificationState({
            type: "show",
            ntype: "error",
            text: lData.error,
          });
        else {
          if (lData.length > 0) {
            const columns = Object.keys(lData[0]);
            const rows = Object.values(lData);

            // parsing
            const parsedRows = [];
            rows.forEach((item, i) => {
              parsedRows.push({ value: i, label: item.name });
            });
            const parsedColumns = [];
            columns.forEach((item, i) => {
              if (item === "id") {
                parsedColumns.push({
                  field: item,
                  headerName: item.toUpperCase(),
                  width: 90,
                });
              } else if (item === "_id") {
                // do nothing
              } else
                parsedColumns.push({
                  field: item,
                  headerName: toSentenceCase(item),
                  width: 150,
                  editable: false,
                });
            });
            localElements.push(parsedRows);
            localLastId.push(rows[rows.length - 1].id);
            localRawKeys.push(element);
            localKeys.push(element.name);
            localTables.push(<DataTable rows={rows} columns={parsedColumns} />);
          } else {
            localTables.push(<Empty />);
            localLastId.push(-1);
          }
        }
      }
    }
    setElements(localElements);
    setLastId(localLastId);
    setRawKeys(localRawKeys);
    setKeys(localKeys);
    setTables(localTables);
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

  const insertSubmit = async (d, type) => {
    const response = await ExecuteQuery("insert", {
      collection: rawKeys[type].collectionName,
      options: { ...d, id: lastId[type] + 1 },
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

  const updateSubmit = async (d, extraType, selected) => {
    const response = await ExecuteQuery("update", {
      collection: rawKeys[extraType].collectionName,
      options: { ...d, id: elements[extraType][selected].value },
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
    <Get keys={keys} tables={tables} />,
    <Insert lastId={lastId} keys={keys} onSave={insertSubmit} />,
    <Update keys={keys} elements={elements} onUpdate={updateSubmit} />,
  ];

  return (
    <Container sx={{ padding: "100px 0" }}>
      <BackButton />
      <Paper sx={{ marginTop: "100px" }}>
        <Container
          justifyContent="center"
          alignItems={loading ? "center" : "baseline"}
          sx={{ padding: "20px 40px", minHeight: "600px", minWidth: "600px" }}
        >
          {loading ? <Loading /> : <TabView tabs={tabs} content={content} />}
        </Container>
      </Paper>
    </Container>
  );
};

export default Extras;
