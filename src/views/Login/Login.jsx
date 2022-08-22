import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

// @emotion
import { css } from "@emotion/css";

// sito components
import SitoContainer from "sito-container";

// @mui icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

// @mui components
import {
  Box,
  Paper,
  FormControl,
  FormControlLabel,
  Tooltip,
  Checkbox,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from "@mui/material";

// own components
import RadialButton from "../../components/RadialButton/RadialButton";

// contexts
import { useLanguage } from "../../context/LanguageProvider";

const Login = (props) => {
  const { toggleMode, mode } = props;
  const { register, handleSubmit } = useForm();
  const { languageState } = useLanguage();

  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (d) => {};

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: { md: "center", xs: "baseline" },
        width: "100vw",
        height: "100vh",
        paddingLeft: { md: "100px", xs: "20px" },
        paddingTop: { md: 0, xs: "20px" },
      }}
    >
      <Tooltip
        title={
          mode
            ? languageState.texts.Tooltips.Mode.ToDark
            : languageState.texts.Tooltips.Mode.ToLight
        }
      >
        <RadialButton
          sx={{
            marginTop: 0,
            zIndex: 20,
            transition: "top 500ms ease",
            position: "fixed",
            top: "20px",
            right: "20px",
          }}
          onClick={toggleMode}
          icon={mode ? <DarkModeIcon /> : <LightModeIcon />}
        />
      </Tooltip>
      <Paper sx={{ width: { xs: "320px", md: "400px" }, padding: "20px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" sx={{ marginBottom: "20px" }}>
            {languageState.texts.Login.Title}
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            label={languageState.texts.Login.Inputs.User.Label}
            id="user"
            placeholder={languageState.texts.Login.Inputs.User.Placeholder}
            required
            {...register("user")}
          />
          <FormControl
            sx={{ width: "100%", marginTop: "20px" }}
            variant="outlined"
          >
            <InputLabel htmlFor="password">
              {languageState.texts.Login.Inputs.Password.Label}
            </InputLabel>
            <OutlinedInput
              id="password"
              sx={{ width: "100%" }}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    color="primary"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              placeholder={
                languageState.texts.Login.Inputs.Password.Placeholder
              }
              label={languageState.texts.Login.Inputs.Password.Label}
              {...register("password")}
            />
          </FormControl>
          <FormControlLabel
            sx={{ marginTop: "20px" }}
            control={
              <Checkbox
                defaultChecked
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
            }
            label={languageState.texts.Login.Remember}
          />
          <SitoContainer
            justifyContent="flex-end"
            sx={{ width: "100%", marginTop: "20px" }}
          >
            <Link to="/register" className={css({ textDecoration: "none" })}>
              <Button
                type="button"
                variant="outlined"
                sx={{ marginRight: "20px" }}
              >
                {languageState.texts.Login.Submit.Register}
              </Button>
            </Link>
            <Button type="submit" variant="contained">
              {languageState.texts.Login.Submit.Login}
            </Button>
          </SitoContainer>
          <SitoContainer sx={{ marginTop: "20px" }} flexDirection="column">
            <Typography>
              <span className={css({ marginRight: "10px" })}>
                {languageState.texts.Login.Forgot.Label}
              </span>
              <Link
                to="/forgot?password"
                className={css({ marginRight: "10px", color: "inherit" })}
              >
                {languageState.texts.Login.Forgot.Password}
              </Link>
            </Typography>
            <Link to="/forgot?user" className={css({ color: "inherit" })}>
              {languageState.texts.Login.Forgot.User}
            </Link>
          </SitoContainer>
        </form>
      </Paper>
    </Box>
  );
};

Login.propTypes = {
  toggleMode: PropTypes.func.isRequired,
  mode: PropTypes.bool.isRequired,
};

export default Login;
