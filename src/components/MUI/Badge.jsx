import React from "react";

// @mui/material
import { Badge as BadgeMUI } from "@mui/material";

function Badge(props) {
  return <BadgeMUI {...props}>{props?.children}</BadgeMUI>;
}

export default Badge;
