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
  FormControl,
  FormControlLabel,
  Tooltip,
  Checkbox,
  TextField,
  IconButton,
  Button,
  Typography,
} from "@mui/material";

// own components
import RadialButton from "../../components/RadialButton/RadialButton";
import PopupPaper from "../../components/PopupPaper/PopupPaper";
import Loading from "../../components/Loading/Loading";

// contexts
import { useLanguage } from "../../context/LanguageProvider";
import { useNotification } from "../../context/NotificationProvider";

// utils
import { parseEmail } from "../../utils/functions";

const Login = (props) => {
  const { toggleMode, mode } = props;
  const { register, handleSubmit } = useForm();

  const [ok, setOk] = useState(false);
  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);

  const [whichForm, setWhichForm] = useState(0);

  const { languageState } = useLanguage();
  const { setNotificationState } = useNotification();

  const showNotification = (ntype, message) =>
    setNotificationState({
      type: "show",
      ntype,
      message,
    });

  const [showPassword, setShowPassword] = useState(false);
  const [showRPassword, setShowRPassword] = useState(false);

  const onSubmit = async (data) => {
    /* setLoading(true);
    const { user, password } = data;
    const realUser = parseEmail(user);
    try {
      const response = await signIn({ user, password });
      if (reponse.status === 200) {
        logUser(remember, realUser);
        createUserCookie(realUser, response.data.token);
        showNotification(
          "success",
          languageState.texts.Messages.LoginSuccessful
        );
      }
    } catch (err) {
      if (err.code === "ERR_NETWORK")
        showNotification("error", languageState.texts.Errors.NotConnected);
      if (err.response.status === 422)
        showNotification("error", languageState.texts.Errors.Wrong);
    }
    setLoading(false); */
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleClickShowRPassword = () => setShowRPassword(!showRPassword);

  const handleMouseDownRPassword = (event) => event.preventDefault();

  const validate = () => setOk(true);

  const invalidate = (e) => {
    e.preventDefault();
    if (ok) {
      const { id } = e.target;
      e.target.focus();
      switch (id) {
        case "user":
          return showNotification(
            "error",
            languageState.texts.Errors.NameRequired
          );
        case "email":
          return showNotification(
            "error",
            languageState.texts.Errors.EmailRequired
          );
        default: // password
          return showNotification(
            "error",
            languageState.texts.Errors.PasswordRequired
          );
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        paddingTop: "20px",
      }}
    >
      <Loading visible={loading} />
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
      <Typography variant="h2" sx={{ marginBottom: "20px" }}>
        {languageState.texts.Title}
      </Typography>
      <PopupPaper id="login" visible={whichForm === 0}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography
            variant="h4"
            sx={{ marginBottom: "20px", fontSize: "24px" }}
          >
            {languageState.texts.Login.Title}
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            label={languageState.texts.Login.Inputs.User.Label}
            id="user"
            placeholder={languageState.texts.Login.Inputs.User.Placeholder}
            required
            onInput={validate}
            onInvalid={invalidate}
            {...register("user")}
          />

          <FormControl
            sx={{
              width: "100%",
              marginTop: "40px",
              position: "relative",
            }}
            x
            variant="outlined"
          >
            <TextField
              id="password"
              sx={{ width: "100%" }}
              type={showPassword ? "text" : "password"}
              placeholder={
                languageState.texts.Login.Inputs.Password.Placeholder
              }
              label={languageState.texts.Login.Inputs.Password.Label}
              onInput={validate}
              onInvalid={invalidate}
              {...register("password")}
            />
            <IconButton
              color="primary"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              sx={{
                position: "absolute",
                right: "5%",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </FormControl>
          <FormControlLabel
            sx={{ marginTop: "20px" }}
            control={
              <Checkbox
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
            <Button
              type="button"
              variant="outlined"
              sx={{
                marginRight: "20px",
                textTransform: "capitalize",
                fontWeight: 600,
                width: "110px",
              }}
              onClick={() => setWhichForm(1)}
            >
              {languageState.texts.Login.Submit.Register}
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                textTransform: "capitalize",
                fontWeight: 600,
                width: "110px",
              }}
            >
              {languageState.texts.Login.Submit.Submit}
            </Button>
          </SitoContainer>
          <SitoContainer
            sx={{ marginTop: "20px" }}
            flexDirection="column"
            alignItems="center"
          >
            <Button
              variant="text"
              onClick={() => setWhichForm(2)}
              sx={{
                marginRight: "10px",
                color: "inherit",
                fontSize: "12px",
                textTransform: "capitalize",
              }}
            >
              {languageState.texts.Login.Forgot}
            </Button>
          </SitoContainer>
        </form>
      </PopupPaper>
      <PopupPaper id="register" visible={whichForm === 1}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography
            variant="h4"
            sx={{ marginBottom: "20px", fontSize: "24px" }}
          >
            {languageState.texts.Register}
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            label={languageState.texts.Login.Inputs.Email.Label}
            id="user"
            placeholder={languageState.texts.Login.Inputs.Email.Placeholder}
            required
            onInput={validate}
            onInvalid={invalidate}
            {...register("email")}
          />
          <FormControl
            sx={{
              width: "100%",
              marginTop: "40px",
              position: "relative",
            }}
            x
            variant="outlined"
          >
            <TextField
              id="password"
              sx={{ width: "100%" }}
              type={showPassword ? "text" : "password"}
              placeholder={
                languageState.texts.Login.Inputs.Password.Placeholder
              }
              label={languageState.texts.Login.Inputs.Password.Label}
              onInput={validate}
              onInvalid={invalidate}
              {...register("password")}
            />
            <IconButton
              color="primary"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              sx={{
                position: "absolute",
                right: "5%",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </FormControl>
          <FormControl
            sx={{
              width: "100%",
              marginTop: "40px",
              position: "relative",
            }}
            x
            variant="outlined"
          >
            <TextField
              id="password"
              sx={{ width: "100%" }}
              type={showRPassword ? "text" : "password"}
              placeholder={
                languageState.texts.Login.Inputs.Password.Placeholder
              }
              label={languageState.texts.Login.Inputs.RPassword.Label}
              onInput={validate}
              onInvalid={invalidate}
              {...register("rpassword")}
            />
            <IconButton
              color="primary"
              onClick={handleClickShowRPassword}
              onMouseDown={handleMouseDownRPassword}
              sx={{
                position: "absolute",
                right: "5%",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </FormControl>
          <FormControlLabel
            sx={{ marginTop: "20px" }}
            control={
              <Checkbox
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
            <Button
              type="button"
              variant="outlined"
              sx={{
                marginRight: "20px",
                textTransform: "capitalize",
                fontWeight: 600,
                width: "110px",
              }}
              onClick={() => setWhichForm(0)}
            >
              {languageState.texts.Login.Submit.Login}
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                textTransform: "capitalize",
                fontWeight: 600,
                width: "110px",
              }}
            >
              {languageState.texts.Login.Submit.Submit}
            </Button>
          </SitoContainer>
        </form>
      </PopupPaper>
      <PopupPaper id="register" visible={whichForm === 2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography
            variant="h4"
            sx={{ marginBottom: "20px", fontSize: "24px" }}
          >
            {languageState.texts.Forgot.Title}
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            label={languageState.texts.Login.Inputs.Email.Label}
            id="user"
            placeholder={languageState.texts.Login.Inputs.Email.Placeholder}
            required
            onInput={validate}
            onInvalid={invalidate}
            {...register("email")}
          />
          <SitoContainer
            justifyContent="flex-end"
            sx={{ width: "100%", marginTop: "20px" }}
          >
            <Button
              type="button"
              variant="outlined"
              sx={{
                marginRight: "20px",
                textTransform: "capitalize",
                fontWeight: 600,
                width: "110px",
              }}
              onClick={() => setWhichForm(0)}
            >
              {languageState.texts.Forgot.Back}
            </Button>
          </SitoContainer>
        </form>
      </PopupPaper>
    </Box>
  );
};

Login.propTypes = {
  toggleMode: PropTypes.func.isRequired,
  mode: PropTypes.bool.isRequired,
};

export default Login;
