import React from "react";
import "./styles.scss";
import { classNames, useStyles } from "../CreateProduct/classes";
import { makeStyles } from "@material-ui/core/styles";
import { InputBase, MenuItem, Select } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import { FormControlLabel } from "@material-ui/core";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import POSwitch from "../../../components/POSwitch";

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

const discount_types = [
  { value: "percent", label: "Percent" },
  { value: "sum", label: "Sum" },
  { value: "delivery_percent", label: "Delivery percent" },
  { value: "delivery_sum", label: "Delivery sum" },
];

export default function DiscountDetails({ discount, setDiscount }) {
  const classes = useStyles();
  const textInputClass = useStyle();

  return (
    <div>
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-12 mt-4 px-3"}>
        <div className={"flex flex-col"}>
          <p className={clsx(classNames.inputLabel, "mt-0.5")}>
            Discount name*
          </p>
          <input
            id="discount_name"
            type="text"
            className={classNames.input}
            required
            value={discount.name}
            onChange={(e) => setDiscount({ ...discount, name: e.target.value })}
          />
          <p className={classNames.inputDescription}>
            Please provide a descriptive name, e.g. Launch discount, Free
            delivery, 5% on all wines etc.
          </p>
        </div>
        <div className={"flex flex-col"}>
          <p className={clsx(classNames.inputLabel, "mt-0.5")}>
            Discount code*
          </p>
          <input
            id="discount_code"
            type="text"
            className={classNames.input}
            required
            value={discount.code}
            onChange={(e) => setDiscount({ ...discount, code: e.target.value })}
          />
          <p className={classNames.inputDescription}>
            The discount code should be unique. E.g. WELCOME10, BLACKFRIDAY,
            A8B4K923
          </p>
        </div>
      </div>
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-12 mt-4 px-3"}>
        <div className={"flex flex-col"}>
          <p className={clsx(classNames.inputLabel, "mt-0.5")}>
            Discount type*
          </p>
          <div className={clsx(classNames.selectContainer)}>
            <Select
              displayEmpty
              classes={{ root: classes.select }}
              input={<InputBase classes={{ root: classes.inputRoot }} />}
              labelId="select"
              id="select"
              IconComponent={ExpandMoreIcon}
              value={discount.type ?? ""}
              onChange={(e) =>
                setDiscount({ ...discount, type: e.target.value })
              }
            >
              <MenuItem
                disabled
                value={""}
                classes={{ gutters: classes.menuList }}
              >
                <p className="text-po-graymain">Select a discount type</p>
              </MenuItem>
              {discount_types.map((discount_type) => (
                <MenuItem
                  key={discount_type.value}
                  value={discount_type.value}
                  classes={{ gutters: classes.menuList }}
                >
                  {discount_type.label}
                </MenuItem>
              ))}
            </Select>
          </div>
          <p className={classNames.inputDescription}>
            If you would like to offer a{" "}
            <span className="font-bold">free delivery</span>, you can select{" "}
            <span className="font-semibold">Delivery percent</span> here and set
            the discount value to <span className="font-semibold">100</span>.
          </p>
        </div>
        <div className={"flex flex-col"}>
          <p className={clsx(classNames.inputLabel, "mt-0.5")}>
            Discount value*
          </p>
          <input
            id="discount_value"
            type="number"
            className={classNames.input}
            required
            value={discount.value}
            onChange={(e) =>
              setDiscount({ ...discount, value: e.target.value })
            }
          />
        </div>
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-4 gap-12 mt-4 px-3"}>
        <div className={"flex flex-col"}>
          <p className={classNames.inputLabel}>Max per customer*</p>
          <input
            id="max_per_customer"
            type="number"
            className={classNames.input}
            required
            value={discount.max_per_user}
            onChange={(e) =>
              setDiscount({ ...discount, max_per_user: e.target.value })
            }
          />
        </div>

        <div className={"flex flex-col"}>
          <p className={classNames.inputLabel}>Combine with other discounts*</p>
          <FormControlLabel
            label={""}
            control={
              <POSwitch
                checked={discount.can_combine === 1}
                onChange={(e) =>
                  setDiscount({
                    ...discount,
                    can_combine: e.target.checked ? 1 : 0,
                  })
                }
              />
            }
            className={"mt-2"}
          />
          <p className={classNames.inputDescription}>
            Possibility to apply this discount with others
          </p>
        </div>

        <div className={"flex flex-col"}>
          <p className={clsx(classNames.inputLabel, "mt-0.5")}>Max limit*</p>
          <input
            id="max_limit"
            type="number"
            className={classNames.input}
            required
            value={discount.max}
            onChange={(e) => setDiscount({ ...discount, max: e.target.value })}
          />
          <p className={classNames.inputDescription}>
            Number of discount codes that you would like to apply. <br />
            If the discount has no limit, you can leave it blank
          </p>
        </div>

        <div>
          <p className={clsx(classNames.inputLabel, "mt-0.5 mb-0.5")}>
            Expiry date and time*
          </p>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              inputFormat="MM/dd/yyyy hh:mm"
              type="date"
              value={discount.expires_at}
              onChange={(newValue) => {
                setDiscount({ ...discount, expires_at: newValue });
              }}
              renderInput={(params) => (
                <TextField {...params} className={textInputClass.textField} />
              )}
            />
          </LocalizationProvider>
        </div>
        <div className={"flex flex-col"}>
          <p className={classNames.inputLabel}>Activate the discount*</p>
          <FormControlLabel
            label={""}
            control={
              <POSwitch
                checked={discount.active === 1}
                onChange={(e) =>
                  setDiscount({ ...discount, active: e.target.checked ? 1 : 0 })
                }
              />
            }
            className={"mt-2"}
          />
        </div>
      </div>
    </div>
  );
}
