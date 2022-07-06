// prop types
import PropTypes from "prop-types";

// own components
import Container from "../../components/Container/Container";
import TabView from "../../components/TabView/TabView";

const Get = (props) => {
  const { keys, tables } = props;

  return (
    <Container sx={{ width: "800px" }}>
      <TabView tabs={keys} content={tables} />
    </Container>
  );
};

Get.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.string),
  tables: PropTypes.array,
};

export default Get;
