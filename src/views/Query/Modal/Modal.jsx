import { useEffect, useState } from "react";

// prop types
import PropTypes from "prop-types";

// own component
import Container from "../../../components/Container/Container";

// @mui components
import { IconButton, Paper, Typography } from "@mui/material";

// @mui icons
import CloseIcon from "@mui/icons-material/Close";

// contexts
import useOnclickOutside from "react-cool-onclickoutside";

const Modal = (props) => {
  const { children, visible, title, onClose } = props;

  const [show, setShow] = useState(false);

  const ref = useOnclickOutside(() => {
    onClose();
  });

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  return (
    <Container
      justifyContent="center"
      alignItems="center"
      sx={{
        left: 0,
        top: 0,
        height: "100vh",
        width: "100vw",
        zIndex: show ? 99 : -1,
        transform: show ? "scale(1)" : "scale(0)",
        position: "absolute",
        transition: "all 500ms ease",
      }}
    >
      <Paper
        ref={ref}
        sx={{
          minWidth: "500px",
          height: "500px",
          padding: "20px",
        }}
      >
        <Container
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Typography>{title}</Typography>
          <IconButton color="primary" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Container>

        <Container>{children}</Container>
      </Paper>
    </Container>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
