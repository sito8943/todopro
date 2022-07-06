import { useEffect, useState } from "react";

// prop types
import PropTypes from "prop-types";

// own components
import Container from "../../components/Container/Container";

// @mui components
import {
  FormControl,
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

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const [municipality, setMunicipality] = useState(0);

  const [selected, setSelected] = useState("");

  useEffect(() => {
    const index = selected.value;
    const hospital = extras.elements[index];
    if (hospital) {
      reset({
        name: hospital.name,
        address: hospital.address,
      });
      setMunicipality(hospital.region);
    }
  }, [selected]);

  const [parsedElements, setParsedElements] = useState([]);

  const send = (d) => {
    onUpdate({ ...d }, selected.value, municipality);
    setMunicipality(0);
    setSelected("");
    reset({
      name: "",
      id: "",
      age: 0,
    });
  };

  const handleMunicipality = (e) => {
    setMunicipality(e.target.value);
  };

  useEffect(() => {
    const localParsedElements = [];
    extras.elements.forEach((item, i) => {
      localParsedElements.push({ label: item.name, value: i });
    });
    setParsedElements(localParsedElements);
  }, [extras]);

  return (
    <Container
      component="form"
      flexDirection="column"
      extraProps={{ onSubmit: handleSubmit(send) }}
    >
      <Typography>Modificando paciente</Typography>
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
      <FormControl sx={{ margin: "20px 0" }} fullWidth>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              disabled={selected === ""}
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
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              disabled={selected === ""}
              required
              inputProps={{ autoComplete: "xyz12asdsad3" }}
              color="text"
              id="xyz123"
              name="xyz123"
              autoComplete="nope"
              label="Dirección"
              placeholder="Ej: Calle 4 // Calle 3 y Calle 5"
            />
          )}
        />
      </FormControl>

      {/*Municipality*/}
      <FormControl sx={{ margin: "20px 0" }} fullWidth>
        <InputLabel>Municipio</InputLabel>
        <Select
          required
          disabled={selected === ""}
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
