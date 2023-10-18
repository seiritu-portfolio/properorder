import React from "react";
import {
  Divider,
  InputBase,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

export default function SortBy(props) {
  const { classNames } = props;
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "10rem",
    },
    menuList: {
      paddingLeft: "0.5rem",
    },
  }));

  const classes = useStyles();
  const [sortBy, setSortBy] = React.useState("best-match");

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className={clsx("flex-row items-center my-2 h-9", classNames)}>
      <h5 className={"mr-2 min-w-max"}>Sort by:</h5>
      <div className={"border rounded-lg border-po-graylight px-2 pt-1"}>
        <Select
          classes={{ root: classes.root }}
          input={<InputBase />}
          labelId="select"
          id="select"
          value={sortBy}
          IconComponent={ExpandMoreIcon}
          onChange={handleChange}
        >
          <MenuItem
            value={"best-match"}
            classes={{ gutters: classes.menuList }}
          >
            Best match
          </MenuItem>
          <MenuItem
            value={"price-low-to-high"}
            classes={{ gutters: classes.menuList }}
          >
            Price (low to high)
          </MenuItem>
          <MenuItem
            value={"price-high-to-low"}
            classes={{ gutters: classes.menuList }}
          >
            Price (high to low)
          </MenuItem>
          <MenuItem value={"time"} classes={{ gutters: classes.menuList }}>
            Delivery Time
          </MenuItem>

          <Divider />
          {/* Only valid for Collection:*/}
          <MenuItem value={"time"} classes={{ gutters: classes.menuList }}>
            Collection Time
          </MenuItem>
          <MenuItem value={"distance"} classes={{ gutters: classes.menuList }}>
            Distance
          </MenuItem>
        </Select>
      </div>
    </div>
  );
}
