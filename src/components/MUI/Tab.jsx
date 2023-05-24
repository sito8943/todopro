import React from "react";

// @mui/material
import { Tab as TabMUI } from "@mui/material";

function Tab(props) {
  return <TabMUI {...props}>{props?.children}</TabMUI>;
}

export default Tab;
