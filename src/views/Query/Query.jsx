import { useEffect, useState } from "react";

// react-router-dom
import { useParams } from "react-router-dom";

// own components
import BackButton from "../../components/BackButton/BackButton";
import Container from "../../components/Container/Container";
import TabView from "../../components/TabView/TabView";
import List from "./Modal/List/List";
import Modal from "./Modal/Modal";

// @mui components
import {
  Paper,
  FormControl,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";

// server
import { FetchFromServer } from "../../services/services";

// react-hook-form
import { useForm, Controller } from "react-hook-form";

// contexts
import { useNotification } from "../../context/NotificationProvider";

const Query = () => {
  const { which } = useParams();

  const { setNotificationState } = useNotification();

  const [toModal, setToModal] = useState(<></>);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [hospital, setHospital] = useState([]);
  const [patience, setPatience] = useState([]);
  const [specialization, setSpecialization] = useState([]);
  const [municipality, setMunicipality] = useState([]);
  const [consultationType, setConsultationType] = useState([]);
  const [patienceType, setPatienceType] = useState([]);

  const [selectedHospital, setSelectedHospital] = useState(0);
  const [selectedSpecialization, setSelectedSpecialization] = useState(0);

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    },
  });

  const handleSpecialization = (e) => {
    setSelectedSpecialization(e.target.value);
  };

  const handleHospital = (e) => {
    setSelectedHospital(e.target.value);
  };

  const init = async () => {
    // patience
    let data = await FetchFromServer("patience");
    const localPatience = [];
    if (data.error)
      setNotificationState({
        type: "show",
        ntype: "error",
        text: localPatience.error,
      });
    else {
      data.forEach((item, i) => {
        localPatience.push(item);
      });
      setPatience(localPatience);
    }

    // patience type
    data = await FetchFromServer("patienceType");
    const localPatienceType = [];
    if (data.error)
      setNotificationState({
        type: "show",
        ntype: "error",
        text: localPatienceType.error,
      });
    else {
      data.forEach((item, i) => {
        localPatienceType.push(item);
      });
      setPatienceType(localPatienceType);
    }

    // consultation type
    data = await FetchFromServer("consultationType");
    const localConsultationType = [];
    if (data.error)
      setNotificationState({
        type: "show",
        ntype: "error",
        text: localConsultationType.error,
      });
    else {
      data.forEach((item, i) => {
        localConsultationType.push(item);
      });
      setConsultationType(localConsultationType);
    }

    // municipality
    data = await FetchFromServer("municipality");
    const localMunicipality = [];
    if (data.error)
      setNotificationState({
        type: "show",
        ntype: "error",
        text: localMunicipality.error,
      });
    else {
      data.forEach((item, i) => {
        localMunicipality.push(item);
      });
      setMunicipality(localMunicipality);
    }

    // specialization
    data = await FetchFromServer("specialization");
    const localSpecialization = [];
    if (data.error)
      setNotificationState({
        type: "show",
        ntype: "error",
        text: localSpecialization.error,
      });
    else {
      data.forEach((item, i) => {
        localSpecialization.push({ label: item.name, value: i, id: item.id });
      });
      setSpecialization(localSpecialization);
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
        localHospital.push({
          label: item.name,
          value: i,
          id: item.id,
          region: item.region,
        });
      });
      setHospital(localHospital);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const MostUsedHospitals = async () => {
    const data = await FetchFromServer("consultation");
    const mostUsedHospitals = data.filter((item) => {
      const date = new Date(item.date);
      if (
        date.getMonth() === getValues("month") - 1 &&
        date.getFullYear() === getValues("year")
      )
        return item;
      return null;
    });
    let parsed = {};
    mostUsedHospitals.forEach((item) => {
      if (parsed[item.hospital]) parsed[item.hospital] += 1;
      else parsed[item.hospital] = 1;
    });
    let arrayOfParsed = [];
    // counting hospitals
    Object.keys(parsed).forEach((item) => {
      arrayOfParsed.push({ id: item, count: parsed[item] });
    });
    arrayOfParsed = arrayOfParsed
      .sort((itemA, itemB) => {
        if (itemA.count < itemB.count) return -1;
        if (itemA.count > itemB.count) return 1;
        return 0;
      })
      .reverse();
    const municipalities = {};
    hospital.forEach((item) => {
      // getting count of the hospital
      const hospitalFiltered = arrayOfParsed.filter((jtem) => {
        if (Number(jtem.id) === item.id) return jtem;
        return null;
      });
      let count = 0;
      if (hospitalFiltered.length) count = hospitalFiltered[0].count;

      // getting name of the municipality
      const municipalityFiltered = municipality.filter((jtem) => {
        if (Number(jtem.id) === item.region) return jtem;
        return null;
      });
      let municipalityName = "";
      if (municipalityFiltered.length)
        municipalityName = municipalityFiltered[0].name;
      if (municipalities[municipalityName])
        municipalities[municipalityName].push({ ...item, count });
      else municipalities[municipalityName] = [{ ...item, count }];
    });
    const content = [];
    Object.keys(municipalities).forEach((item) => {
      const values = municipalities[item];
      content.push(<List list={values} />);
    });
    setToModal(
      <TabView tabs={Object.keys(municipalities)} content={content} />
    );
    setShowModal(true);
    setModalTitle(
      `${getTitle()} del mes: ${getValues("month")} año: ${getValues("year")}`
    );
  };

  const MostUsedDiagnosis = async () => {
    const data = await FetchFromServer("consultation");
    const mostUsedDiagnosis = data.filter((item) => {
      if (item.specialization === selectedSpecialization) return item;
      return null;
    });
    let parsed = {};
    mostUsedDiagnosis.forEach((item) => {
      if (parsed[item.diagnosis]) parsed[item.diagnosis] += 1;
      else parsed[item.diagnosis] = 1;
    });
    // sorting
    let arrayOfParsed = [];
    Object.keys(parsed).forEach((item) => {
      arrayOfParsed.push({ id: item, count: parsed[item] });
    });
    arrayOfParsed = arrayOfParsed
      .sort((itemA, itemB) => {
        if (itemA.count < itemB.count) return -1;
        if (itemA.count > itemB.count) return 1;
        return 0;
      })
      .reverse();
    let content = [];
    arrayOfParsed.forEach((item) => {
      content.push({ label: item.id, count: item.count });
    });
    content = [<List list={content} />];
    setToModal(
      <TabView
        tabs={[specialization[selectedSpecialization].label]}
        content={content}
      />
    );
    setShowModal(true);
    setModalTitle(
      `${getTitle()} de la especialidad ${
        specialization[selectedSpecialization].label
      }`
    );
  };

  const AverageTimeOfConsultation = async () => {
    const data = await FetchFromServer("consultation");
    const averageTimeOfConsultation = data.filter((item) => {
      if (
        item.specialization === selectedSpecialization &&
        item.hospital === selectedHospital
      )
        return item;
      return null;
    });
    let average = 0;
    averageTimeOfConsultation.forEach((item) => {
      average += Number(item.duration);
    });
    average /= averageTimeOfConsultation.length;
    const content = [<List list={[{ label: "Promedio", count: average }]} />];
    setToModal(
      <TabView
        tabs={[
          `${hospital[selectedHospital].label} - ${specialization[selectedSpecialization].label}`,
        ]}
        content={content}
      />
    );
    setShowModal(true);
    setModalTitle(
      `${getTitle()} de la especialidad ${
        specialization[selectedSpecialization].label
      } del hospital ${hospital[selectedHospital].label}`
    );
  };

  const MostUsedPatienceTypes = async () => {
    const data = await FetchFromServer("consultation");
    const mostUsedPatienceTypes = data.filter((item) => {
      const date = new Date(item.date);
      if (date.getFullYear() === getValues("year")) return item;
      return null;
    });
    const patienceIds = [];
    mostUsedPatienceTypes.forEach((item) => {
      patienceIds.push(item.patience);
    });

    // getting names of the types
    const patienceTypes = {};
    patience.forEach((item) => {
      const patienceConsultation = patienceIds.filter((jtem) => {
        if (jtem === item.id) return jtem;
        return null;
      });
      if (patienceConsultation.length > 0) {
        // getting patience type name
        const patienceTypeFiltered = patienceType.filter((jtem) => {
          if (Number(jtem.id) === item.type) return jtem;
          return null;
        });
        if (patienceTypeFiltered.length > 0) {
          let patienceTypeName = patienceTypeFiltered[0].name;
          if (patienceTypes[patienceTypeName])
            patienceTypes[patienceTypeName] += 1;
          else patienceTypes[patienceTypeName] = 1;
        }
      }
    });
    let array = [];
    Object.keys(patienceTypes).forEach((item) => {
      array.push({ label: item, count: patienceTypes[item] });
    });
    array = array
      .sort((itemA, itemB) => {
        if (itemA.count < itemB.count) return -1;
        if (itemA.count > itemB.count) return 1;
        return 0;
      })
      .reverse();

    const content = [<List list={array} />];

    setToModal(<TabView tabs={["Tipos de pacientes"]} content={content} />);
    setShowModal(true);
    setModalTitle(`${getTitle()} del año: ${getValues("year")}`);
  };

  const MostUsedConsultationTypes = async () => {
    const data = await FetchFromServer("consultation");
    const mostUsedConsultationTypes = data.filter((item) => {
      const date = new Date(item.date);
      if (
        date.getMonth() === getValues("month") - 1 &&
        date.getFullYear() === getValues("year")
      )
        return item;
      return null;
    });
    let parsed = {};
    mostUsedConsultationTypes.forEach((item) => {
      if (parsed[item.type]) parsed[item.type] += 1;
      else parsed[item.type] = 1;
    });
    let arrayOfParsed = [];
    Object.keys(parsed).forEach((item) => {
      arrayOfParsed.push({ id: item, count: parsed[item] });
    });
    // getting names of the types
    const consultationTypes = [];
    consultationType.forEach((item) => {
      // getting count of the consultation
      const consultationFiltered = arrayOfParsed.filter((jtem) => {
        if (Number(jtem.id) === item.id) return jtem;
        return null;
      });

      let count = 0;
      if (consultationFiltered.length) count = consultationFiltered[0].count;

      consultationTypes.push({ label: item.name, count });
    });
    const content = [
      <List
        list={consultationTypes
          .sort((itemA, itemB) => {
            if (itemA.count < itemB.count) return -1;
            if (itemA.count > itemB.count) return 1;
            return 0;
          })
          .reverse()}
      />,
    ];
    setToModal(<TabView tabs={["Tipos de consultas"]} content={content} />);
    setShowModal(true);
    setModalTitle(
      `${getTitle()} del mes: ${getValues("month")} año: ${getValues("year")}`
    );
  };

  const send = async (d) => {
    switch (which.substring(1)) {
      case "1":
        MostUsedHospitals();
        break;
      case "2":
        MostUsedDiagnosis();
        break;
      case "3":
        AverageTimeOfConsultation();
        break;
      case "4":
        MostUsedPatienceTypes();
        break;
      default:
        MostUsedConsultationTypes();
        break;
    }
  };

  const getTitle = () => {
    switch (which.substring(1)) {
      case "1":
        return "Hospitales con mayor cantidad de consultas";
      case "2":
        return "Diagnósticos más emitidos";
      case "3":
        return "Tiempo promedio de las consultas";
      case "4":
        return "Tipo de paciente más atendido";
      default:
        return "Tipos de consultas más recurrentes";
    }
  };

  const isYear = () => {
    if (
      which.substring(1) === "1" ||
      which.substring(1) === "4" ||
      which.substring(1) === "5"
    )
      return true;
    return false;
  };

  const isMonth = () => {
    if (which.substring(1) === "1" || which.substring(1) === "5") return true;
    return false;
  };

  const isSpecialization = () => {
    return which.substring(1) === "2" || which.substring(1) === "3";
  };

  const isHospital = () => {
    return which.substring(1) === "3";
  };

  const modalClose = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <BackButton />
      <Modal onClose={modalClose} title={modalTitle} visible={showModal}>
        {toModal}
      </Modal>
      <Paper>
        <Container
          flexDirection="column"
          component="form"
          alignItems="flex-end"
          sx={{ padding: "20px 40px", minHeight: "400px" }}
          extraProps={{ onSubmit: handleSubmit(send) }}
        >
          <Container sx={{ width: "100%" }} justifyContent="flex-start">
            <Typography>{getTitle()}</Typography>
          </Container>

          {isYear() && (
            <FormControl sx={{ margin: "20px 0", minWidth: "400px" }} fullWidth>
              <Controller
                name="year"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    inputProps={{ autoComplete: "xyz12asdsad3" }}
                    color="text"
                    id="xyz123"
                    name="xyz123"
                    autoComplete="nope"
                    label="Año"
                    placeholder="Ej: 2022"
                  />
                )}
              />
            </FormControl>
          )}
          {isMonth() && (
            <FormControl sx={{ margin: "20px 0", minWidth: "400px" }} fullWidth>
              <Controller
                name="month"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    inputProps={{ autoComplete: "xyz12asdsad3" }}
                    color="text"
                    id="xyz123"
                    name="xyz123"
                    type="number"
                    max="12"
                    min="1"
                    autoComplete="nope"
                    label="Mes"
                    placeholder="Ej: 12"
                  />
                )}
              />
            </FormControl>
          )}
          {isSpecialization() && (
            <FormControl sx={{ margin: "20px 0", minWidth: "400px" }} fullWidth>
              <InputLabel>Especialización</InputLabel>
              <Select
                required
                id="specialization"
                value={selectedSpecialization}
                label="Especialización"
                onChange={handleSpecialization}
              >
                {specialization.map((item, i) => (
                  <MenuItem key={i} value={i}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {isHospital() && (
            <FormControl sx={{ margin: "20px 0", minWidth: "400px" }} fullWidth>
              <InputLabel>Hospital</InputLabel>
              <Select
                required
                id="hospital"
                value={selectedHospital}
                label="Hospital"
                onChange={handleHospital}
              >
                {hospital.map((item, i) => (
                  <MenuItem key={i} value={i}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button type="submit" variant="contained">
            Ejecutar
          </Button>
        </Container>
      </Paper>
    </Container>
  );
};

export default Query;
