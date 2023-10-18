import React, { useState } from "react";
import { classNames, useStyles } from "./classes";
import clsx from "clsx";
import { InputBase, MenuItem, Select } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function ProductStatus(props) {
  if (!props.visible) {
    return null;
  }

  const classes = useStyles();

  const [status, setStatus] = useState("Active");

  return (
    <div className={"flex flex-col flex-1 sm:items-end"}>
      <div className="flex flex-row items-center mt-4 sm:mt-0">
        <p className={"text-sm font-semibold min-w-max sm:mr-4 mr-auto"}>
          Product is:{" "}
        </p>
        <div className={clsx(classNames.selectContainer)}>
          <Select
            displayEmpty
            classes={{ root: classes.select }}
            input={<InputBase classes={{ root: classes.inputRoot }} />}
            labelId="select-status"
            id="select-status"
            value={status}
            IconComponent={ExpandMoreIcon}
            onChange={(event) => setStatus(event.target.value)}
          >
            {["Active", "Ready to Publish", "Inactive"].map((item, index) => (
              <MenuItem
                key={index}
                value={item}
                classes={{ gutters: classes.menuList }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}
