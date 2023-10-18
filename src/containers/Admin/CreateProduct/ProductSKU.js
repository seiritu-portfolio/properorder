import React from "react";
import { classNames } from "./classes";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import POSwitch from "../../../components/POSwitch";

export default function ProductSKU({
  plasticFree,
  setPlasticFree,
  isBundle,
  setIsBundle,
  isActive,
  setActive,
}) {
  return (
    <div className={"flex items-center mt-2 px-1"}>
      {/*
          <div className={"flex flex-col"}>
            <p className={classNames.inputLabel}>Plastic free*</p>
            <FormControlLabel
              label={""}
              control={
                <POSwitch
                  checked={plasticFree}
                  onChange={(e) => setPlasticFree(e.target.checked)}
                />
              }
              className={"mt-2"}
            />
          </div>
          */}
      <div className={"flex flex-col mr-16"}>
        <p className={classNames.inputLabel}>Active product*</p>
        <FormControlLabel
          label={""}
          control={
            <POSwitch
              checked={isActive}
              onChange={(e) => setActive(e.target.checked)}
            />
          }
          className={"mt-2"}
        />
      </div>
      <div className={"flex overflow-visible"}>
        <FormControlLabel
          control={<Checkbox color={"secondary"} name={"Bundle"} />}
          label={"This product is a bundle (e.g. hamper)*"}
          checked={isBundle}
          onChange={(e) => setIsBundle(e.target.checked)}
        />
      </div>
    </div>
  );
}
