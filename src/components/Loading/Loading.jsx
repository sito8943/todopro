// prop-types
import PropTypes from "prop-types";

// @mui components
import { Box } from "@mui/material";

// @mui icons
import LoopIcon from "@mui/icons-material/Loop";

const Loading = (props) => {
  const { sx } = props;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 400ms ease",
        ...sx,
      }}
    >
      <LoopIcon sx={{ fontSize: "3rem" }} className="loading" color="primary" />
    </Box>
  );
};

Loading.defaultProps = {
  sx: {},
};

Loading.propTypes = {
  sx: PropTypes.objectOf(PropTypes.any),
};

export default Loading;
