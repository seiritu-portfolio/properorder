import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function MyTabs(props) {
  const { tabs, styles = {}, borderBottom = "1px solid #EEDDD7" } = props;
  const [value, setValue] = React.useState(props.tabIndex ?? 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (props.setTabIndex != null) {
      props.setTabIndex(newValue);
    }
  };

  const UnderLineTabs = withStyles((theme) => ({
    root: {
      borderBottom,
      width: styles.tabBarWidth ?? "100%",
      ["@media (min-width:640px)"]: {
        width: styles.tabBarWidth ?? "fit-content",
      },
    },
    indicator: {
      backgroundColor: theme.palette.common.yellowlight,
    },
  }))(Tabs);

  const MyTab = withStyles((theme) => ({
    root: {
      textTransform: "none",
      fontWeight: theme.typography.fontWeightBold,
      fontSize: styles.tabFontSize ?? "1.5rem",
      minWidth: "1rem",
      padding: 0,
      marginRight: "1.5rem",
      marginLeft: "1.5rem",
      ["@media (min-width:640px)"]: {
        marginRight: "3rem",
        marginLeft: 0,
      },
    },
  }))((props) => <Tab disableRipple {...props} />);

  return (
    <div>
      <div>
        <UnderLineTabs value={value} onChange={handleChange} aria-label="tabs">
          {tabs.map((tab, index) => (
            <MyTab key={index} label={tab.label} {...a11yProps(index)} />
          ))}
        </UnderLineTabs>
      </div>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          <tab.renderContent />
        </TabPanel>
      ))}
    </div>
  );
}

MyTabs.propTypes = {
  tabs: PropTypes.array,
  styles: PropTypes.object,
};
