// @mui icons
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Typography } from "@mui/material";

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
      <ReceiptLongIcon color="primary" sx={{ fontSize: "4rem" }} />
      <Typography color="primary" variant="h4">
        No hay datos
      </Typography>
    </Container>
  );
};

export default Empty;
