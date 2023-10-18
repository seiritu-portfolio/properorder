import React from "react";
import { InputBase, makeStyles, MenuItem, Select } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "../../styles.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "10rem",
  },
  placeholder: {
    width: "10rem",
    color: theme.palette.common.graydark,
  },
  menuList: {
    paddingLeft: "0.5rem",
  },
}));

export default function ProductOptions(props) {
  const { product, selectedOptions, setSelectedOptions, triedSubmit } = props;

  if (
    product.options == null ||
    product.options.length === 0 ||
    selectedOptions.length === 0
  ) {
    return null;
  }

  const classes = useStyles();

  const handleChange = (event, option) => {
    setSelectedOptions(
      selectedOptions.map((o) =>
        o.id === option.id ? { ...o, selected_id: event.target.value } : o
      )
    );
  };

  return (
    <div>
      {product.options.map((option, index) => {
        const value =
          selectedOptions.filter((v) => v.id === option.id)[0].selected_id ??
          "";
        return (
          <div
            key={index}
            className="flex justify-between md:grid md:grid-cols-2 lg:grid-cols-3 gap-1 mt-2 mb-3"
          >
            <div className="col-span-1 mr-8 mt-2">
              <h6 className="text-lg font-bold text-po-black">
                {option.name}:
              </h6>
            </div>
            <div className="col-span-1 lg:col-span-2">
              <div
                className={`border rounded-lg px-2 pt-1 inline-flex ${
                  value === ""
                    ? triedSubmit
                      ? "failure-border"
                      : "highlighted-border"
                    : "border-po-graylight"
                }`}
              >
                <Select
                  classes={{
                    root: value === "" ? classes.placeholder : classes.root,
                  }}
                  input={<InputBase />}
                  labelId="select"
                  id="select"
                  displayEmpty
                  value={value}
                  IconComponent={ExpandMoreIcon}
                  onChange={(event) => handleChange(event, option)}
                >
                  <MenuItem
                    value=""
                    disabled
                    classes={{ gutters: classes.menuList }}
                  >
                    Choose an option
                  </MenuItem>
                  {option.variants.map((variant, index) => (
                    <MenuItem
                      key={index}
                      value={variant.id}
                      classes={{ gutters: classes.menuList }}
                    >
                      {variant.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
