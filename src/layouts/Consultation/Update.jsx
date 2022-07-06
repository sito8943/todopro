import { useEffect, useState } from "react";

// prop types
import PropTypes from "prop-types";

// own components
import Container from "../../components/Container/Container";

// utils
import { ComplexIndexOf } from "../../utils/functions";

// @mui components
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  Button,
  Autocomplete,
} from "@mui/material";

// react-hook-form
import { useForm, Controller } from "react-hook-form";

const Update = (props) => {
  const { onUpdate, extras } = props;

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      duration: 0,
      diagnosis: "",
    },
  });

  const [consultationType, setConsultationType] = useState(0);
  const [specialization, setSpecialization] = useState(0);
  const [hospital, setHospital] = useState(0);

  const [selected, setSelected] = useState("");

  // patience data
  const [municipalityPatience, setMunicipalityPatience] = useState(0);
  const [gender, setGender] = useState(0);
  const [patienceType, setPatienceType] = useState(0);

  const [patienceSelected, setPatienceSelected] = useState("");

  useEffect(() => {
    const index = selected.value;
    const consultation = extras.elements[index];
    if (consultation) {
      reset({
        duration: consultation.duration,
        diagnosis: consultation.diagnosis,
      });
      setConsultationType(consultation.type);
      setSpecialization(consultation.specialization);
      setPatienceSelected(
        extras.patience[
          ComplexIndexOf(extras.patienceIds, { id: consultation.patience }, [
            "id",
          ])
        ]
      );
    }
  }, [selected]);

  const [parsedElements, setParsedElements] = useState([]);

  const send = (d) => {
    onUpdate(
      { ...d },
      selected.value,
      consultationType,
      specialization,
      hospital,
      // municipality,
      municipalityPatience,
      gender,
      patienceType,
      patienceSelected.value
    );
    setHospital(0);
    setConsultationType(0);
    setSpecialization(0);
    // setMunicipality(0);
    setMunicipalityPatience(0);
    setGender(0);
    setPatienceType(0);
    setPatienceSelected("");
    setSelected("");
    reset({
      name: "",
      id: "",
      age: 0,
    });
  };

  /*
  const handleMunicipality = (e) => {
    setMunicipality(e.target.value);
  };
  */

  const handleMunicipalityPatience = (e) => {
    setMunicipalityPatience(e.target.value);
  };

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const handlePatienceType = (e) => {
    setPatienceType(e.target.value);
  };

  const handleConsultationType = (e) => {
    setConsultationType(e.target.value);
  };

  const handleSpecialization = (e) => {
    setSpecialization(e.target.value);
  };

  const handleHospital = (e) => {
    setHospital(e.target.value);
  };

  useEffect(() => {
    const localParsedElements = [];
    extras.elements.forEach((item, i) => {
      localParsedElements.push({ label: `Consulta ${item.id}`, value: i });
    });
    setParsedElements(localParsedElements);
  }, [extras]);

  const [newPatience, setNewPatience] = useState(false);

  const handleNewPatience = (e) => {
    setPatienceSelected("");
    setNewPatience(e.target.checked);
  };

  useEffect(() => {
    if (extras.patience.length === 0) setNewPatience(true);
  }, []);

  const validateCI = (e) => {
    const { value } = e.target;
    let justNumber = "";
    const numbers = "0123456789";
    for (let i = 0; i < 11; i += 1)
      if (numbers.indexOf(value[i]) > -1) justNumber += value[i];
    setValue("id", justNumber);
  };

  return (
    <Container
      component="form"
      flexDirection="column"
      extraProps={{ onSubmit: handleSubmit(send) }}
    >
      <Typography>Modificando consulta</Typography>
      <Autocomplete
        sx={{ margin: "20px 0" }}
        fullWidth
        value={selected}
        onChange={(event, newValue) => {
          setSelected(newValue);
        }}
        disablePortal
        options={parsedElements}
        renderInput={(params) => <TextField {...params} label="Selecciona" />}
      />
      {/*Consultation type*/}
      <FormControl sx={{ margin: "20px 0" }} fullWidth>
        <InputLabel>Tipo de consulta</InputLabel>
        <Select
          required
          disabled={selected === ""}
          id="consultationType"
          value={consultationType}
          label="Tipo de consulta"
          onChange={handleConsultationType}
        >
          {extras.extraData.consultationType.map((item, i) => (
            <MenuItem key={i} value={i}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/*Specialization*/}
      <FormControl sx={{ margin: "20px 0" }} fullWidth>
        <InputLabel>Especialización</InputLabel>
        <Select
          required
          disabled={selected === ""}
          id="specialization"
          value={specialization}
          label="Especialización"
          onChange={handleSpecialization}
        >
          {extras.extraData.specialization.map((item, i) => (
            <MenuItem key={i} value={i}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/*Hospital*/}
      <FormControl sx={{ margin: "20px 0" }} fullWidth>
        <InputLabel>Hospital</InputLabel>
        <Select
          required
          disabled={selected === ""}
          id="hospital"
          value={hospital}
          label="Hospital"
          onChange={handleHospital}
        >
          {extras.hospital.map((item, i) => (
            <MenuItem key={i} value={i}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Duration Minutes */}
      <FormControl sx={{ margin: "20px 0" }} fullWidth>
        <Controller
          name="duration"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              disabled={selected === ""}
              inputProps={{ autoComplete: "xzy12q3" }}
              color="text"
              id="xzy12q3"
              name="xzyq1231"
              label="Duración (minutos)"
              placeholder="Ej: 30"
            />
          )}
        />
      </FormControl>
      {/*Diagnosis*/}
      <FormControl sx={{ margin: "20px 0" }} fullWidth>
        <Controller
          name="diagnosis"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              disabled={selected === ""}
              color="text"
              id="diagnosis"
              name="diagnosis"
              autoComplete="nope"
              label="Diagnóstico"
              placeholder="Ej: Fiebre..."
              multiline
              rows={2}
            />
          )}
        />
      </FormControl>
      {/*Patience*/}
      <Autocomplete
        sx={{ margin: "20px 0" }}
        fullWidth
        disabled={
          selected === "" || newPatience || !Boolean(extras.patience.length)
        }
        value={patienceSelected}
        onChange={(event, newValue) => {
          setPatienceSelected(newValue);
        }}
        disablePortal
        options={extras.patience}
        renderInput={(params) => (
          <TextField {...params} label="Selecciona el paciente" />
        )}
      />
      <FormControlLabel
        control={
          <Checkbox
            disabled={selected === "" || !Boolean(extras.patience.length)}
            checked={newPatience}
            onChange={handleNewPatience}
          />
        }
        label="Nuevo paciente"
      />
      <FormControl sx={{ margin: "20px 0" }} fullWidth>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              disabled={!newPatience}
              inputProps={{ autoComplete: "xyz12asdsad3" }}
              color="text"
              id="xyz123"
              name="xyz123"
              autoComplete="nope"
              label="Nombre"
              placeholder="Ej: Calixto García"
            />
          )}
        />
      </FormControl>
      <FormControl sx={{ margin: "20px 0" }} fullWidth>
        <Controller
          name="id"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              disabled={!newPatience}
              required
              inputProps={{ autoComplete: "xyz12asdsad3" }}
              color="text"
              id="xyz123"
              name="xyz123"
              autoComplete="nope"
              label="C.Identidad"
              onChange={validateCI}
              placeholder="Ej: 90122934910"
            />
          )}
        />
      </FormControl>
      <FormControl sx={{ margin: "20px 0" }} fullWidth>
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              disabled={!newPatience}
              inputProps={{ autoComplete: "xyz12asdsad3" }}
              color="text"
              id="xyz123"
              name="xyz123"
              autoComplete="nope"
              label="Edad"
              type="number"
              placeholder="Ej: 24"
            />
          )}
        />
      </FormControl>
      {/*Municipality*/}
      <FormControl sx={{ margin: "20px 0" }} fullWidth>
        <InputLabel>Municipio</InputLabel>
        <Select
          required
          disabled={!newPatience}
          id="municipality"
          value={municipalityPatience}
          label="Municipio"
          onChange={handleMunicipalityPatience}
        >
          {extras.extraData["municipality"].map((item, i) => (
            <MenuItem key={i} value={i}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/*Gender*/}
      <FormControl sx={{ margin: "20px 0" }} fullWidth>
        <InputLabel>Género</InputLabel>
        <Select
          id="gender"
          disabled={!newPatience}
          required
          value={gender}
          label="Género"
          onChange={handleGender}
        >
          {extras.extraData["gender"].map((item, i) => (
            <MenuItem key={i} value={i}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/*PatienceType*/}
      <FormControl sx={{ margin: "20px 0" }} fullWidth>
        <InputLabel>Tipo de paciente</InputLabel>
        <Select
          required
          disabled={!newPatience}
          id="patienceType"
          value={patienceType}
          label="Tipo de paciente"
          onChange={handlePatienceType}
        >
          {extras.extraData["patienceType"].map((item, i) => (
            <MenuItem key={i} value={i}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Container sx={{ margin: "20px 0" }}>
        <Button variant="contained" type="submit" disabled={selected === ""}>
          Guardar
        </Button>
      </Container>
    </Container>
  );
};

Update.propTypes = {
  onUpdate: PropTypes.func,
  keys: PropTypes.arrayOf(PropTypes.string),
  elements: PropTypes.array,
};

export default Update;
