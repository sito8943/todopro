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
  const { onSave, keys } = props;

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const send = (d) => {
    onSave({ ...d }, extraType);
    setExtraType(0);
    setValue("name", "");
  };

  const [extraType, setExtraType] = useState("");

  const handleChange = (event) => {
    setExtraType(event.target.value);
  };

  return (
    <Container
      component="form"
      flexDirection="column"
      extraProps={{ onSubmit: handleSubmit(send) }}
    >
      <Typography>Insertando dato extra</Typography>
      <FormControl sx={{ margin: "20px 0" }} fullWidth>
        <InputLabel>Tipo</InputLabel>
        <Select required value={extraType} label="Tipo" onChange={handleChange}>
          {keys.map((item, i) => (
            <MenuItem key={i} value={i}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
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
              placeholder="Ej: Habana vieja"
            />
          )}
        />
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
  keys: PropTypes.arrayOf(PropTypes.string),
};

export default Insert;
