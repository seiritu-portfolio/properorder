import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { classNames, useStyles } from "../CreateProduct/classes";
import { InputBase, MenuItem, Select } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import APIManager from "../../../Network/APIManager";

export default function SiteType({ site, setSite }) {
  const classes = useStyles();
  const [siteTypeList, setSiteTypeList] = useState([]);

  useEffect(() => {
    APIManager.fetchSellerType().then((res) => {
      setSiteTypeList(res);
    });
  }, []);

  return (
    <div className={"flex flex-col"}>
      <p className={classNames.inputLabel}>Site type*</p>
      <div className={clsx(classNames.selectContainer)}>
        <Select
          displayEmpty
          classes={{ root: classes.select }}
          input={<InputBase classes={{ root: classes.inputRoot }} />}
          labelId="select"
          id="select"
          IconComponent={ExpandMoreIcon}
          value={site?.site_type_id ?? 0}
          onChange={(e) => setSite({ ...site, site_type_id: e.target.value })}
        >
          <MenuItem disabled value={0} classes={{ gutters: classes.menuList }}>
            <p className="text-po-graymain">Select site type</p>
          </MenuItem>
          {siteTypeList.map((siteType) => (
            <MenuItem
              key={siteType.id}
              value={siteType.id}
              classes={{ gutters: classes.menuList }}
            >
              {siteType.name}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
