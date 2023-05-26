import React from "react";

// prop-types
import PropTypes from "prop-types";

// components
import Container from "../Container/Container";

// styles
import "./styles.css";

const Loading = (props) => {
  const { sx, className } = props;
  return (
    <Container
      className={className}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 400ms ease",
        ...sx,
      }}
    >
      <div className="loader-container">
        <div className="loader">
          <svg className="circular" viewBox="25 25 50 50">
            <circle
              className={`path`}
              cx="50"
              cy="50"
              r="20"
              fill="none"
              strokeWidth="4"
              strokeMiterlimit="10"
            />
          </svg>
        </div>
      </div>
    </Container>
  );
};

Loading.defaultProps = {
  sx: {},
};

Loading.propTypes = {
  sx: PropTypes.objectOf(PropTypes.any),
};

export default Loading;
