import React from "react";
import { classNames, useStyles } from "./classes";
import {
  Checkbox,
  InputBase,
  ListItemText,
  MenuItem,
  Select,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function TagsSelector({ tags, setTags }) {
  const classes = useStyles();

  const handleChange = (event) => {
    setTags(event.target.value);
  };

  return (
    <div className="flex flex-col px-1 mt-4">
      <p className={classNames.inputLabel}>Tags</p>
      <div className={classNames.selectContainer}>
        <Select
          displayEmpty
          classes={{ root: classes.select }}
          input={<InputBase classes={{ root: classes.inputRoot }} />}
          IconComponent={ExpandMoreIcon}
          multiple
          value={tags}
          onChange={handleChange}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select all possible tags</em>;
            }
            return selected.join(", ");
          }}
        >
          <MenuItem
            disabled
            value={undefined}
            classes={{ gutters: classes.menuList }}
          >
            <em>Select all possible tags</em>
          </MenuItem>
          {Array.from({ length: 20 }).map((_, index) => {
            const tag = `tag ${index + 1}`;
            return (
              <MenuItem
                key={tag}
                value={tag}
                classes={{ gutters: classes.menuList }}
              >
                <Checkbox checked={tags.indexOf(tag) > -1} />
                <ListItemText primary={tag} />
              </MenuItem>
            );
          })}
        </Select>
      </div>
    </div>
  );
}
