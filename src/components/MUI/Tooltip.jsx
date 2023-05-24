import React from "react";

// @mui/material
import { Tooltip as TooltipMUI } from "@mui/material";

function Tooltip(props) {
  return <TooltipMUI {...props}>{props?.children}</TooltipMUI>;
}

export default Tooltip;
