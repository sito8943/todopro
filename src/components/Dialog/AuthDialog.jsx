import React, { useMemo, useState } from "react";

// @emotion/css
import { css } from "@emotion/css";

// @mui/icons-material
import { Close } from "@mui/icons-material";
// @mui/material
import { useTheme } from "@mui/material/styles";
import IconButton from "../MUI/IconButton";
import TextField from "../MUI/TextField";

// contexts
import { useLanguage } from "../../context/LanguageProvider";

// components
import Dialog from "./Dialog";
import { useCallback } from "react";

function AuthDialog(props) {
  const theme = useTheme();

  const { visible, onClose } = props;

  const { languageState } = useLanguage();

  const authDialog = useMemo(() => {
    return languageState.texts.authDialog;
  }, [languageState]);

  const [user, setUser] = useState("");

  const handleUser = useCallback((e) => {
    setUser(e.target.value);
  }, []);

  return visible ? (
    <Dialog
      className={`appear ${css({
        background: theme.palette.background.paper,
        minWidth: "350px",
        borderRadius: "5px",
      })}`}
      transition="entrance"
    >
      <IconButton
        color="error"
        sx={{ position: "absolute", right: "20px" }}
        onClick={onClose}
      >
        <Close />
      </IconButton>
      <h2>{authDialog.signIn.title}</h2>
      <TextField
        required
        id="user"
        type="text"
        value={user}
        onChange={handleUser}
        label={authDialog.inputs.user.label}
        placeholder={authDialog.inputs.user.placeholder}
      />
      <TextField />
    </Dialog>
  ) : null;
}

export default AuthDialog;
