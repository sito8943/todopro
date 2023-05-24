import React, { forwardRef } from "react";

// @mui/material
import { IconButton as IconButtonMUI } from "@mui/material";

const IconButton = forwardRef((props, ref) => {
  return <IconButtonMUI {...props}>{props?.children}</IconButtonMUI>;
});

export default IconButton;
