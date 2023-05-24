import React from "react";

// @mui
import Typography from "../MUI/Typography";

// @mui icons
import { ReceiptLong } from "@mui/icons-material/";

// own components
import Container from "../Container/Container";

const Empty = () => {
  return (
    <Container
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%", height: "100%", marginTop: "150px" }}
      flexDirection="column"
    >
      <ReceiptLong color="primary" sx={{ fontSize: "4rem" }} />
      <Typography color="primary" variant="h4">
        No hay datos
      </Typography>
    </Container>
  );
};

export default Empty;
