import React, { useEffect, useState } from "react";
import { classNames, useStyles } from "./classes";
import { InputBase, MenuItem, Select } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import APIManager from "../../../Network/APIManager";

export default function ProductHeaderSelector({
  sellerIndex,
  productHeaderId,
  setProductHeaderId,
}) {
  const classes = useStyles();
  const [productHeaderList, setProductHeaderList] = useState([]);

  useEffect(() => {
    APIManager.fetchProductHeaders(sellerIndex).then((res) => {
      setProductHeaderList(res);
    });
  }, []);

  return (
    <div className="flex flex-col px-1 mt-3">
      <p className={classNames.inputLabel}>Product header*</p>
      <div className={classNames.selectContainer}>
        <Select
          displayEmpty
          classes={{ root: classes.select }}
          input={<InputBase classes={{ root: classes.inputRoot }} />}
          IconComponent={ExpandMoreIcon}
          value={productHeaderId}
          onChange={(e) => setProductHeaderId(e.target.value)}
        >
          <MenuItem disabled value={""} classes={{ gutters: classes.menuList }}>
            <em>Select product header</em>
          </MenuItem>
          {productHeaderList.map((ph) => (
            <MenuItem
              key={ph.id}
              value={ph.id}
              classes={{ gutters: classes.menuList }}
            >
              {ph.name}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
