import React from "react";

// @emotion/css
import { css } from "@emotion/css";

// @mui/material
import { useTheme } from "@mui/material/styles";

// styles
import styles from "./styles.module.css";

function Dialog(props) {
  const theme = useTheme();

  const { className, transition, children } = props;
  return (
    <div
      className={`${styles.dialogContainer} ${css({
        background: `${theme.palette.primary.main}22`,
      })} ${transition}`}
    >
      <div className={`${styles.dialog} ${className}`}>{children}</div>
    </div>
  );
}

export default Dialog;
