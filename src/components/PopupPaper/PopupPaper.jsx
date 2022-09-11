import PropTypes from "prop-types";

// @mui components
import { Paper } from "@mui/material";

const PopupPaper = (props) => {
  const { visible, children, id } = props;

  return (
    <Paper
      id={id}
      sx={{
        width: { xs: "320px", md: "400px", lg: "500px" },
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -40%) ${`scale(${visible ? 1 : 0})`}`,
        transition: "transform 400ms ease",
        transitionDelay: visible ? "410ms" : "",
        padding: "20px",
      }}
    >
      {children}
    </Paper>
  );
};

PopupPaper.defaultProps = {
  id: "",
};

PopupPaper.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
};

export default PopupPaper;
