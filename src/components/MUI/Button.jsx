import React from "react";

// @mui/material
import { Button as ButtonMUI } from "@mui/material";

function Button(props) {
  return <ButtonMUI {...props}>{props?.children}</ButtonMUI>;
}

export default Button;
