// prop types
import PropTypes from "prop-types";

// own component
import Container from "../../../../components/Container/Container";

// @mui component
import { Typography } from "@mui/material";

const List = (props) => {
  const { list } = props;
  return (
    <Container flexDirection="column">
      {list.map((item, i) => (
        <Container
          sx={{ marginTop: i > 0 ? "20px" : "10px" }}
          key={i}
          justifyContent="space-between"
        >
          <Typography>{item.label}</Typography>
          <Typography>{item.count}</Typography>
        </Container>
      ))}
    </Container>
  );
};

List.propTypes = {
  list: PropTypes.array.isRequired,
};

export default List;
