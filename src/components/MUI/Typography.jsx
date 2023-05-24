import React from "react";

// @mui/material
import { Typography as TypographyMUI } from "@mui/material";

function Typography(props) {
  return <TypographyMUI {...props}>{props?.children}</TypographyMUI>;
}

export default Typography;
