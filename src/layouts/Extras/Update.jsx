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
  const { onUpdate, keys, elements } = props;

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const send = (d) => {
    onUpdate(d, extraType, selected.value);
    setExtraType(0);
    setSelected(0);
    setValue("name", "");
  };

  const [extraType, setExtraType] = useState("");
  const [extras, setExtras] = useState([]);
  const [selected, setSelected] = useState("");

  const handleChange = (event) => {
    setExtraType(event.target.value);
  };

  useEffect(() => {
    console.log(elements);
    if (extraType !== "") {
      setExtras(elements[extraType]);
      setSelected("");
    }
  }, [extraType]);

  return (
    <Container
      component="form"
      flexDirection="column"
      extraProps={{ onSubmit: handleSubmit(send) }}
    >
      <Typography>Modificando dato extra</Typography>
      <FormControl sx={{ margin: "20px 0" }} fullWidth>
        <InputLabel>Tipo</InputLabel>
        <Select required value={extraType} label="Tipo" onChange={handleChange}>
          {keys.map((item, i) => (
            <MenuItem key={i} value={i}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Autocomplete
        sx={{ margin: "20px 0" }}
        fullWidth
        value={selected}
        onChange={(event, newValue) => {
          setSelected(newValue);
        }}
        disablePortal
        options={extras}
        renderInput={(params) => <TextField {...params} label="Selecciona" />}
      />
      <FormControl>
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
              label="Nuevo nombre"
              placeholder="Ej: Habana vieja"
            />
          )}
        />
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
