import React from "react";
import { InputBase, MenuItem, Select } from "@material-ui/core";
import { classNames, useStyles } from "./classes";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const EstimatedDeliveryList = [
  "Same day",
  "Next day",
  "2 days",
  "3 days",
  "4 days",
  "5 days",
  "6 days",
  "7 days",
  "Other",
];

export default function ProductDMSelector({
  deliveryOptions,
  setDeliveryOptions,
  deliveryInfo,
  setDeliveryInfo,
}) {
  const classes = useStyles();

  const modes =
    deliveryOptions == null
      ? []
      : deliveryOptions === "Both"
      ? ["Delivery only", "Collection only"]
      : [deliveryOptions];

  return (
    <div className={"grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 px-1"}>
      <div className="flex flex-col">
        <p className={classNames.inputLabel}>Delivery/Collection options*</p>
        <div className={classNames.selectContainer}>
          <Select
            classes={{ root: classes.select }}
            input={<InputBase classes={{ root: classes.inputRoot }} />}
            labelId="select"
            id="select"
            value={deliveryOptions}
            IconComponent={ExpandMoreIcon}
            onChange={(event) => setDeliveryOptions(event.target.value)}
          >
            {["Both", "Delivery only", "Collection only"].map((item, index) => (
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
      <div className="flex flex-col col-span-1 sm:col-span-2">
        {modes.map((mode, index) => {
          const isDelivery = mode === "Delivery Only";
          return (
            <div
              key={mode}
              className={`grid grid-cols-2 gap-6 mt-${index * 8}`}
            >
              <div className="flex flex-col">
                <p className={classNames.inputLabel}>
                  {isDelivery ? "Estimated delivery" : "Ready to Collect"}*
                </p>
                <div className={classNames.selectContainer}>
                  <Select
                    classes={{ root: classes.select }}
                    input={<InputBase classes={{ root: classes.inputRoot }} />}
                    labelId={`${
                      isDelivery ? "select_delivery" : "select_collect"
                    }`}
                    id={`${isDelivery ? "select_delivery" : "select_collect"}`}
                    value={
                      isDelivery
                        ? deliveryInfo?.estimatedDelivery
                        : deliveryInfo?.readyCollect
                    }
                    IconComponent={ExpandMoreIcon}
                    onChange={(event) =>
                      setDeliveryInfo({
                        ...deliveryInfo,
                        [isDelivery ? "estimatedDelivery" : "readyCollect"]:
                          event.target.value,
                      })
                    }
                  >
                    {EstimatedDeliveryList.map((item, index) => (
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
              <div className="flex flex-col">
                <p className={classNames.inputLabel}>If order received by:</p>
                <div className={classNames.selectContainer}>
                  <Select
                    displayEmpty
                    classes={{ root: classes.select }}
                    input={<InputBase classes={{ root: classes.inputRoot }} />}
                    labelId={`${
                      isDelivery
                        ? "select_delivery_date"
                        : "select_collect_date"
                    }`}
                    id={`${
                      isDelivery
                        ? "select_delivery_date"
                        : "select_collect_date"
                    }`}
                    value={
                      isDelivery
                        ? deliveryInfo?.delivery_date
                        : deliveryInfo?.collect_date
                    }
                    IconComponent={ExpandMoreIcon}
                    onChange={(event) =>
                      setDeliveryInfo({
                        ...deliveryInfo,
                        [isDelivery ? "delivery_date" : "collect_date"]:
                          event.target.value,
                      })
                    }
                  >
                    <MenuItem
                      disabled
                      value={undefined}
                      classes={{ gutters: classes.menuList }}
                    >
                      <em>Select time</em>
                    </MenuItem>
                    {Array.from({ length: 14 }).map((_, index) => {
                      const item = `${String(index + 8).padStart(2, "0")}:00`;
                      return (
                        <MenuItem
                          key={index + 8}
                          value={item}
                          classes={{ gutters: classes.menuList }}
                        >
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
