import React from "react";
import "./styles.scss";
import { classNames, useStyles } from "../CreateProduct/classes";
import { InputBase, MenuItem, Select } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

const roles = ["admin", "standard", "customer"];

export default function UserDetails({ newUser, setNewUser, role, setRole }) {
  const classes = useStyles();

  return (
    <div>
      <div className={"grid grid-cols-1 md:grid-cols-3 gap-12 mt-4 px-3"}>
        <div className={"flex flex-col"}>
          <p className={clsx(classNames.inputLabel, "mt-0.5")}>First name*</p>
          <input
            id="first_name"
            type="text"
            className={classNames.input}
            required
            value={newUser?.first_name ?? ""}
            onChange={(e) =>
              setNewUser({ ...newUser, first_name: e.target.value })
            }
          />
        </div>
        <div className={"flex flex-col"}>
          <p className={clsx(classNames.inputLabel, "mt-0.5")}>Last name*</p>
          <input
            id="last_name"
            type="text"
            className={classNames.input}
            required
            value={newUser?.last_name ?? ""}
            onChange={(e) =>
              setNewUser({ ...newUser, last_name: e.target.value })
            }
          />
        </div>
        <div className={"flex flex-col"}>
          <p className={clsx(classNames.inputLabel, "mt-0.5")}>Email*</p>
          <input
            id="email"
            type="email"
            className={classNames.input}
            required
            value={newUser?.email ?? ""}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </div>
      </div>
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-12 mt-4 px-3"}>
        <div className={"flex flex-col"}>
          <p className={clsx(classNames.inputLabel, "mt-0.5")}>Phone number*</p>
          <input
            id="phone_number"
            type="text"
            className={classNames.input}
            required
            value={newUser?.phone ?? ""}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          />
        </div>
        <div className={"flex flex-col"}>
          <p className={clsx(classNames.inputLabel, "mt-0.5")}>Role*</p>
          <div className={clsx(classNames.selectContainer)}>
            <Select
              displayEmpty
              classes={{ root: classes.select }}
              input={<InputBase classes={{ root: classes.inputRoot }} />}
              labelId="select"
              id="select"
              IconComponent={ExpandMoreIcon}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem
                disabled
                value={""}
                classes={{ gutters: classes.menuList }}
              >
                <p className="text-po-graymain">Select a role</p>
              </MenuItem>
              {roles.map((role) => (
                <MenuItem
                  key={role}
                  value={role}
                  classes={{ gutters: classes.menuList }}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
