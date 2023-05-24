import React from "react";

// @mui/material
import { Tabs as TabsMUI } from "@mui/material";

function Tabs(props) {
  return <TabsMUI {...props}>{props?.children}</TabsMUI>;
}

export default Tabs;
