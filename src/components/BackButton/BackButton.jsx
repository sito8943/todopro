import React from "react";

import { Link } from "react-router-dom";

// @mui components
import Button from "../MUI/Button";

// @mui icons
import { Chevron } from "@mui/icons-material/";

// own components
import Container from "../Container/Container";

const BackButton = () => {
  return (
    <Container sx={{ position: "absolute", top: "10px", left: "10px" }}>
      <Link to="/">
        <Button
          variant="contained"
          color="primary"
          sx={{ minWidth: 0, borderRadius: "100%", padding: "5px" }}
        >
          <Chevron />
        </Button>
      </Link>
    </Container>
  );
};

export default BackButton;
