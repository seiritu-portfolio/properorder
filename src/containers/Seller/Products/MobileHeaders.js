import React, { useEffect } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const StylesTabs = withStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "0.5rem",
  },
  indicator: {
    height: 0,
  },
}))(Tabs);

const MyTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontWeight: 400,
    fontSize: "1rem",
    minWidth: 0,
    minHeight: "2rem",
    padding: 0,
    textAlign: "center",
    color: theme.palette.common.graymain,
  },
  selected: {
    fontWeight: 600,
    backgroundColor: theme.palette.common.primary,
    borderRadius: "1rem",
  },
  wrapper: {
    display: "block",
    marginLeft: "1rem",
    marginRight: "1rem",
  },
}))((props) => <Tab disableRipple {...props} />);

export default function MobileProductHeaders(props) {
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

  const handleChange = (event, newValue) => {
    setVisibleIndex({ index: newValue, status: !visibleIndex.status });
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={clsx("mobile-product-headers block lg:hidden")}>
      <div className="mobile-product-headers-container">
        <StylesTabs
          variant="scrollable"
          value={productHeader}
          onChange={handleChange}
          scrollButtons={false}
        >
          {items.map((item, index) => (
            <MyTab
              key={`${item.header.id}`}
              label={item.header.name}
              value={index}
              id={`tab-${item.header.id}`}
            />
          ))}
        </StylesTabs>
      </div>
    </div>
  );
}
