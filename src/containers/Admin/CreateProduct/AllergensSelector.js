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

export default function AllergensSelector({ allergens, setAllergens }) {
  const classes = useStyles();

  const [allergenList, setAllergenList] = useState([]);

  const handleChange = (event) => {
    const changedItems = event.target.value;
    const newItems = [];
    changedItems.forEach((v) => {
      if (changedItems.filter((c) => c.id === v.id).length === 1) {
        newItems.push(v);
      }
    });
    setAllergens(newItems);
  };

  useEffect(() => {
    APIManager.fetchAllergens().then((res) => setAllergenList(res));
  }, []);

  return (
    <div className="flex flex-col px-1 mt-3">
      <p className={classNames.inputLabel}>Allergens</p>
      <div className={classNames.selectContainer}>
        <Select
          displayEmpty
          classes={{ root: classes.select }}
          input={<InputBase classes={{ root: classes.inputRoot }} />}
          IconComponent={ExpandMoreIcon}
          multiple
          value={allergens}
          onChange={handleChange}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select all relevant allergens</em>;
            }
            return selected.map((s) => s.name).join(", ");
          }}
        >
          <MenuItem disabled value={""} classes={{ gutters: classes.menuList }}>
            <em>Select all relevant allergens</em>
          </MenuItem>
          {allergenList.map((allergen) => (
            <MenuItem
              key={allergen.id}
              value={allergen}
              classes={{ gutters: classes.menuList }}
            >
              <Checkbox
                checked={
                  allergens.filter((a) => a.id === allergen.id).length > 0
                }
              />
              <ListItemText primary={allergen.name} />
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
