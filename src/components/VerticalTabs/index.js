import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const StylesTabs = withStyles((theme) => ({
  root: {
    borderLeft: `1px solid ${theme.palette.common.graymedium}`,
    width: "100%",
  },
  indicator: {
    backgroundColor: "black",
    left: 0,
  },
}))(Tabs);

const MyTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontWeight: 400,
    fontSize: "1rem",
    minWidth: 0,
    minHeight: 30,
    height: "2.5rem",
    padding: 0,
    textAlign: "left",
    color: theme.palette.common.graymain,
  },
  selected: {
    fontWeight: 700,
  },
  wrapper: {
    display: "block",
    marginLeft: "1.125rem",
  },
}))((props) => <Tab disableRipple {...props} />);

export default function VerticalTabs(props) {
  const {
    items = [],
    productHeader,
    setProductHeader,
    visibleIndex,
    setVisibleIndex,
    productHeaderId,
  } = props;

  useEffect(() => {
    if (productHeaderId != null && items.length > 0) {
      setTimeout(() => {
        setVisibleIndex({
          index: items.findIndex((v) => v.header.id === productHeaderId),
          status: !visibleIndex.status,
        });
      }, 500);
    }
  }, [productHeaderId, items]);

  // useEffect(() => {
  //   if (items.length > 0) {
  //     setProductHeader(0);
  //   }
  // }, [items]);

  const handleChange = (event, newValue) => {
    // setProductHeader({value: newValue, clicked: true});
    setVisibleIndex({ index: newValue, status: !visibleIndex.status });
  };

  if (items.length === 0) {
    return <div className={"mt-0.5"} />;
  }

  return (
    <div className={"hidden md:flex mx-2 my-4"} style={{ maxHeight: "24rem" }}>
      <StylesTabs
        variant="scrollable"
        orientation="vertical"
        value={productHeader}
        onChange={handleChange}
      >
        {items.map((item, index) => (
          <MyTab
            key={`${item.header.id}`}
            label={item.header.name}
            value={index}
            id={`vertical-tab-${item.header.id}`}
          />
        ))}
      </StylesTabs>
    </div>
  );
}
