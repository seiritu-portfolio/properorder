import React, { useEffect, useState } from "react";
import { classNames, useStyles } from "./classes";
import {
  Checkbox,
  InputBase,
  ListItemText,
  MenuItem,
  Select,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import APIManager from "../../../Network/APIManager";

export default function DPSelector({
  dietaryPreferences,
  setDietaryPreferences,
}) {
  const classes = useStyles();

  const [dpList, setDpList] = useState([]);

  const handleChange = (event) => {
    const changedItems = event.target.value;
    const newItems = [];
    changedItems.forEach((v) => {
      if (changedItems.filter((c) => c.id === v.id).length === 1) {
        newItems.push(v);
      }
    });
    setDietaryPreferences(newItems);
  };

  useEffect(() => {
    APIManager.getTypes().then((res) => setDpList(res));
  }, []);

  return (
    <div className="flex flex-col px-1 mt-5">
      <p className={classNames.inputLabel}>Dietary preferences</p>
      <div className={classNames.selectContainer}>
        <Select
          displayEmpty
          classes={{ root: classes.select }}
          input={<InputBase classes={{ root: classes.inputRoot }} />}
          IconComponent={ExpandMoreIcon}
          multiple
          value={dietaryPreferences}
          onChange={handleChange}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select all relevant dietary preferences</em>;
            }
            return selected.map((s) => s.name).join(", ");
          }}
        >
          <MenuItem disabled value={""} classes={{ gutters: classes.menuList }}>
            <em>Select all relevant preferences</em>
          </MenuItem>
          {dpList.map((dp) => (
            <MenuItem
              key={dp.id}
              value={dp}
              classes={{ gutters: classes.menuList }}
            >
              <Checkbox
                checked={
                  dietaryPreferences.filter((a) => a.id === dp.id).length > 0
                }
              />
              <ListItemText primary={dp.name} />
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
