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

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const [municipality, setMunicipality] = useState("");

  const send = (d) => {
    onSave({ ...d }, municipality);
    setMunicipality(0);
    reset({
      name: "",
      address: "",
    });
  };

  const handleMunicipality = (e) => {
    setMunicipality(e.target.value);
  };

  return (
    <Container
      component="form"
      flexDirection="column"
      extraProps={{ onSubmit: handleSubmit(send) }}
    >
      <Typography>Insertando hospital</Typography>
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
              placeholder="Ej: Calixto García"
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
