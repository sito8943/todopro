import { forwardRef } from "react";

import PropTypes from "prop-types";

// @mui components
import { Button } from "@mui/material";

// style
import { radialButton } from "./style";

const RadialButton = forwardRef((props, ref) => {
  const { onClick, icon, sx, color, variant } = props;

  return (
    <Button
      {...props}
      ref={ref}
      onClick={onClick}
      variant={variant}
      color={color}
      sx={{ ...radialButton, ...sx }}
    >
      {icon}
    </Button>
  );
});

RadialButton.defaultProps = {
  variant: "contained",
  color: "primary",
  sx: {},
};

RadialButton.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  sx: PropTypes.object,
};

export default RadialButton;
