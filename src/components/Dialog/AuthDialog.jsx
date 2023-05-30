import React, { useMemo } from "react";

// @mui/icons-material
import IconButton from "../MUI/IconButton";
// @mui/material
import { Close } from "@mui/icons-material";

// contexts
import { useLanguage } from "../../context/LanguageProvider";

// components
import Dialog from "./Dialog";

function AuthDialog(props) {
  const { visible, onClose } = props;

  const { languageState } = useLanguage();

  const authDialog = useMemo();

  return visible ? (
    <Dialog className="appear" transition="appear">
      <IconButton
        color="error"
        sx={{ position: "absolute", right: "20px" }}
        onClick={onClose}
      >
        <Close />
      </IconButton>
      <h2>{AuthDialog.signIn.title}</h2>
    </Dialog>
  ) : null;
}

export default AuthDialog;
