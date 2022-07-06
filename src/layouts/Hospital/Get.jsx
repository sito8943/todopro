// prop types
import PropTypes from "prop-types";

// own components
import Container from "../../components/Container/Container";
import Empty from "../../components/Empty/Empty";

const Get = (props) => {
  const { table } = props;

  return (
    <Container sx={{ width: "800px" }}>
      {table === "empty" ? <Empty /> : table}
    </Container>
  );
};

Get.propTypes = {
  table: PropTypes.node,
};

export default Get;
