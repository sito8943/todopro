import React from "react";

// @mui/material
import { IconButton as IconButtonMUI } from "@mui/material";

function IconButton(props) {
  return <IconButtonMUI {...props}>{props?.children}</IconButtonMUI>;
}

export default IconButton;
