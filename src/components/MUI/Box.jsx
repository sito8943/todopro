import React from "react";

// @mui/material
import { Box as BoxMUI } from "@mui/material";

function Box(props) {
  return <BoxMUI {...props}>{props?.children}</BoxMUI>;
}

export default Box;
