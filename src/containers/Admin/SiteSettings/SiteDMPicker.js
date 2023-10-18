import React from "react";
import { classNames, useStyles } from "../CreateProduct/classes";
import { InputBase, MenuItem, Select } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { PODeliveryMode } from "../../../models";

const options = [
  { value: PODeliveryMode.both, label: "Both" },
  { value: PODeliveryMode.delivery, label: "Delivery only" },
  { value: PODeliveryMode.collection, label: "Collection only" },
];

export default function SiteDMPicker({ site, setSite }) {
  const classes = useStyles();

  return (
    <div className={"col-span-1 flex flex-col"}>
      <p className={classNames.inputLabel}>Delivery method*</p>
      <div className={classNames.selectContainer}>
        <Select
          classes={{ root: classes.select }}
          input={<InputBase classes={{ root: classes.inputRoot }} />}
          labelId="select"
          id="select"
          value={site.delivery_method}
          IconComponent={ExpandMoreIcon}
          onChange={(event) =>
            setSite({ ...site, delivery_method: event.target.value })
          }
        >
          {options.map((item, index) => (
            <MenuItem
              key={index}
              value={item.value}
              classes={{ gutters: classes.menuList }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
