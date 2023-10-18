import React from "react";
import { classNames, useStyles } from "../CreateProduct/classes";
import clsx from "clsx";
import { InputBase, MenuItem, Select } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TempConstants from "../../../config/TempConstants";

export default function OrgAddressFields({ org, setOrg }) {
  const classes = useStyles();

  return (
    <div className="flex flex-col px-1 mt-2">
      <p className={"font-bold text-lg"}>Address</p>

      <div className={"grid grid-col-1 md:grid-cols-2 md:gap-12"}>
        <div>
          <p className={clsx(classNames.inputLabel)}>Street address 1*</p>
          <input
            id="street_address_1"
            type="text"
            required
            className={classNames.input}
            value={org.address?.address_l1}
            onChange={(e) =>
              setOrg({
                ...org,
                address: { ...org.address, address_l1: e.target.value },
              })
            }
          />
        </div>
        <div>
          <p className={clsx(classNames.inputLabel)}>Street address 2</p>
          <input
            id="street_address_2"
            type="text"
            className={classNames.input}
            value={org.address?.address_l2}
            onChange={(e) =>
              setOrg({
                ...org,
                address: { ...org.address, address_l2: e.target.value },
              })
            }
          />
        </div>
      </div>
      <div className={"grid grid-col-1 md:grid-cols-4 md:gap-12"}>
        <div>
          <p className={clsx(classNames.inputLabel)}>City*</p>
          <input
            id="city"
            type="text"
            required
            className={classNames.input}
            value={org.address?.city}
            onChange={(e) =>
              setOrg({
                ...org,
                address: { ...org.address, city: e.target.value },
              })
            }
          />
        </div>
        <div>
          <p className={clsx(classNames.inputLabel)}>County*</p>
          <input
            id="county"
            type="text"
            required
            className={classNames.input}
            value={org.address?.county}
            onChange={(e) =>
              setOrg({
                ...org,
                address: { ...org.address, county: e.target.value },
              })
            }
          />
        </div>
        <div>
          <p className={clsx(classNames.inputLabel)}>Country*</p>
          <div className={clsx(classNames.selectContainer)}>
            <Select
              displayEmpty
              classes={{ root: classes.select }}
              input={<InputBase classes={{ root: classes.inputRoot }} />}
              labelId="select"
              id="select"
              IconComponent={ExpandMoreIcon}
              value={org.address?.country ?? ""}
              onChange={(e) =>
                setOrg({
                  ...org,
                  address: { ...org.address, country: e.target.value },
                })
              }
            >
              <MenuItem
                disabled
                value={""}
                classes={{ gutters: classes.menuList }}
              >
                <p className="text-po-graymain">Select country</p>
              </MenuItem>
              {TempConstants.countries.map((country) => (
                <MenuItem
                  key={country.value}
                  value={country.value}
                  classes={{ gutters: classes.menuList }}
                >
                  {country.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <div>
          <p className={clsx(classNames.inputLabel)}>Eircode/Postcode*</p>
          <input
            id="postcode"
            type="text"
            required
            className={classNames.input}
            value={org.address?.postcode}
            onChange={(e) =>
              setOrg({
                ...org,
                address: { ...org.address, postcode: e.target.value },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
