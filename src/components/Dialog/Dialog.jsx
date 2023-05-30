import React from "react";

// @mui/material
import { useTheme } from "@mui/material/styles";

// styles
import styles from "./styles.module.css";

function Dialog(props) {
  const theme = useTheme();

  const { className, transition, children } = props;
  return (
    <div className={`${styles.dialogContainer} ${transition}`}>
      <div
        className={`${styles.dialog} ${theme.palette.background.paper} ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export default Dialog;
