import { useState } from "react";

// prop types
import PropTypes from "prop-types";

// own components
import Container from "../../components/Container/Container";

// @mui components
import {
  FormControl,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";

// react-hook-form
import { useForm, Controller } from "react-hook-form";

const Insert = (props) => {
  const { onSave, extras } = props;

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      id: "",
      age: 0,
    },
  });

  const [municipality, setMunicipality] = useState("");
  const [gender, setGender] = useState("");
  const [patienceType, setPatienceType] = useState("");

  const send = (d) => {
    onSave({ ...d }, municipality, gender, patienceType);
    setMunicipality(0);
    setGender(0);
    setPatienceType(0);
    reset({
      name: "",
      id: "",
      age: 0,
    });
  };

  const handlePatienceType = (e) => {
    return setPatienceType(e.target.value);
  };

  const handleMunicipality = (e) => {
    setMunicipality(e.target.value);
  };

  const handleGender = (e) => {
    return setGender(e.target.value);
  };

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
      <Typography>Insertando paciente</Typography>
      <FormControl sx={{ margin: "20px 0" }} fullWidth>
        <Controller
          name="name"
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
              label="Nombre"
              placeholder="Ej: Jose Jose Perez Perez"
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
          id="municipality"
          value={municipality}
          label="Municipio"
          onChange={handleMunicipality}
        >
          {extras["municipalities"].map((item, i) => (
            <MenuItem key={i} value={i}>{item.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {/*Gender*/}
      <FormControl sx={{ margin: "20px 0" }} fullWidth>
        <InputLabel>Género</InputLabel>
        <Select
          id="gender"
          required
          value={gender}
          label="Género"
          onChange={handleGender}
        >
          {extras["genders"].map((item, i) => (
            <MenuItem key={i} value={i}>{item.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {/*PatienceType*/}
      <FormControl sx={{ margin: "20px 0" }} fullWidth>
        <InputLabel>Tipo de paciente</InputLabel>
        <Select
          required
          id="patienceType"
          value={patienceType}
          label="Tipo de paciente"
          onChange={handlePatienceType}
        >
          {extras["patienceTypes"].map((item, i) => (
            <MenuItem key={i} value={i}>{item.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Container sx={{ margin: "20px 0" }}>
        <Button variant="contained" type="submit">
          Guardar
        </Button>
      </Container>
    </Container>
  );
};

Insert.propTypes = {
  onSave: PropTypes.func,
  extras: PropTypes.array,
};

export default Insert;
