/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */

// prop types
import PropTypes from "prop-types";

// @mui components
import { Tabs, Tab, Box } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ paddingTop: "20px" }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TabView = (props) => {
  const { content, tabs, value, onChange } = props;

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          textColor="primary"
          indicatorColor="primary"
          value={value}
          onChange={onChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((item, i) => (
            <Tab
              sx={{ p: { textTransform: "none" } }}
              key={i}
              label={item}
              {...a11yProps(i)}
            />
          ))}
        </Tabs>
      </Box>
      {content.map((item, i) => (
        <TabPanel key={`tc${i}`} value={value} index={i}>
          {item}
        </TabPanel>
      ))}
    </Box>
  );
};

TabView.defaultProps = {
  onChange: undefined,
  value: 0,
};

TabView.propTypes = {
  content: PropTypes.arrayOf(PropTypes.node).isRequired,
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export default TabView;
