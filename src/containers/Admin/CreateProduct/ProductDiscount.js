import React from "react";
import { classNames, useStyles } from "./classes";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { InputBase, MenuItem, Select } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import DateAdapter from "@mui/lab/AdapterDateFns";

const useStyle = makeStyles((theme) => ({
  textField: {
    border: "1px solid #BFBFC6",
    background: "#fff",
    width: "100%",
    color: "#23232D",
    paddingRight: "0.75rem",
    paddingLeft: "0.75rem",
  },
}));

export default function ProductDiscount() {
  const [value, setValue] = React.useState(null);

  const classes = useStyles();
  const textInputClass = useStyle();

  return (
    <div className={"grid grid-cols-1 md:grid-cols-1 mt-8 px-1"}>
      <div className={"flex flex-col col-span-2 pr-20"}>
        <p className={"font-bold text-lg"}>Product discount (optional)</p>

        <div className={"grid grid-col-1 md:grid-cols-4 md:gap-8"}>
          <div>
            <p className={clsx(classNames.inputLabel)}>Discount type</p>
            <div className={clsx(classNames.selectContainer)}>
              <Select
                displayEmpty
                classes={{ root: classes.select }}
                input={<InputBase classes={{ root: classes.inputRoot }} />}
                labelId="select"
                id="select"
              >
                <MenuItem
                  disabled
                  value={undefined}
                  classes={{ gutters: classes.menuList }}
                >
                  <em>Select discount type</em>
                </MenuItem>
                {["Percent", "Exact sum"].map((item, index) => (
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
          <div>
            <p className={clsx(classNames.inputLabel)}>Discount value</p>
            <input
              id="discount_value"
              type="text"
              required
              className={classNames.input}
            />
          </div>
          <div>
            <div className="mb-1">
              <p className={clsx(classNames.inputLabel)}>Expiry date</p>
            </div>
            <div
              className={clsx(
                classNames.selectContainer,
                "h-12 flex items-center"
              )}
            >
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                  inputFormat="MM/dd/yyyy"
                  type="date"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      className={textInputClass.textField}
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
