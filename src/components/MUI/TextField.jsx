import React, { forwardRef } from "react";

// @mui/material
import { TextField as TextFieldMUI } from "@mui/material";

const TextField = forwardRef((props, ref) => {
  return <TextFieldMUI {...props}>{props?.children}</TextFieldMUI>;
});

export default TextField;
