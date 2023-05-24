import React from "react";

// @mui/material
import { Paper as PaperMUI } from "@mui/material";

function Paper(props) {
  return <PaperMUI {...props}>{props?.children}</PaperMUI>;
}

export default Paper;
