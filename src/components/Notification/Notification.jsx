import { useEffect, useState } from "react";

// prop types
import PropTypes from "prop-types";

// @mui components
import { Snackbar, Alert } from "@mui/material/";

const Notification = (props) => {
  const { visible, text, type, onClose } = props;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(visible);
  }, [visible]);

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert
        variant="filled"
        onClose={onClose}
        severity={type}
        sx={{ width: "100%" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};

Notification.defaultProps = {
  text: "",
  type: "error",
};

Notification.propTypes = {
  visible: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired, // error warning info success
  onClose: PropTypes.func.isRequired,
};

export default Notification;
