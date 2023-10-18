import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Checkbox,
  FormControlLabel,
  InputBase,
  MenuItem,
  Select,
} from "@material-ui/core";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { POOrderStatus } from "../../../models";
import POAlert from "../../../components/POAlert";
import APIManager from "../../../Network/APIManager";
import POSpinner from "../../../components/POSpinner";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "100%",
    paddingRight: 0,
    fontSize: "1rem",
    fontWeight: "bold",
  },
  inputRoot: {
    width: "100%",
    height: "2.5rem",
  },
  menuList: {
    paddingLeft: "0.5rem",
    fontSize: "1rem",
  },
  root: {
    fontWeight: 700,
    paddingLeft: "4rem",
    paddingRight: "4rem",
    height: "2.5rem",
  },
  cancelButton: {
    backgroundColor: theme.palette.common.graylight,
    "&:hover": {
      opacity: 1,
      backgroundColor: theme.palette.common.graylight,
    },
    display: "flex",
    marginBottom: "0.5rem",
    ["@media (min-width:640px)"]: {
      marginBottom: 0,
    },
  },
}));

export default function UpdateOrderStatus(props) {
  const { orderItem, handleCloseModal, handleSaveStatus } = props;
  const classes = useStyles();

  const [status, setStatus] = useState(orderItem ? orderItem.status : "");
  const [notes, setNotes] = useState(orderItem ? orderItem.notes : "");

  const [shareNote, setShareNote] = useState(true);

  const [alertInfo, setAlertInfo] = React.useState({ open: false });
  const [isLoading, setIsLoading] = React.useState(false);
  const onSave = () => {
    setIsLoading(true);
    APIManager.updateOrderStatus(
      orderItem.site_id,
      orderItem.id,
      `?status=${status}&share_note=${shareNote}&note=${notes}`
    )
      .then((res) => {
        console.log("updateOrderStatus", res);
        setIsLoading(false);
        handleSaveStatus({ ...orderItem, status, notes });
      })
      .catch((err) => {
        setIsLoading(false);
        setAlertInfo({
          open: true,
          message: err,
          severity: "warning",
        });
      });
  };

  return (
    <div
      className={
        "flex flex-col bg-white update-order-status-modal-container px-4"
      }
    >
      <div className={"flex flex-col flex-1 mt-8 space-y-4"}>
        <p className={"self-center text-center text-lg"}>
          Would you like to update the status of order{" "}
          <span className={"font-bold"}>#{orderItem.id}?</span>
        </p>
      </div>
      <div
        className={
          "text-sm rounded border border-po-graymedium mt-1 bg-white px-2 mt-6"
        }
      >
        <Select
          displayEmpty
          classes={{ root: classes.select }}
          input={<InputBase classes={{ root: classes.inputRoot }} />}
          labelId="select-status"
          id="select-status"
          value={status}
          IconComponent={ExpandMoreIcon}
          onChange={(event) => setStatus(event.target.value)}
        >
          <MenuItem disabled value={""} classes={{ gutters: classes.menuList }}>
            <em>Select status</em>
          </MenuItem>
          {Object.keys(POOrderStatus).map((key) => {
            const value =
              POOrderStatus[key].charAt(0).toUpperCase() +
              POOrderStatus[key].slice(1);
            return (
              <MenuItem
                key={key}
                value={key}
                classes={{ gutters: classes.menuList }}
              >
                {value}
              </MenuItem>
            );
          })}
        </Select>
      </div>
      <p className={"text-sm font-semibold mt-4"}>Note (optional)</p>
      <textarea
        id="notes"
        className={clsx(
          "text-base w-full rounded border border-po-graymedium px-3 py-2 mt-1 m-h-32"
        )}
        onChange={(e) => setNotes(e.target.value)}
      />
      {/* 
      <FormControlLabel
        control={
          <Checkbox color={"secondary"} name={"Share note with customer"} />
        }
        label={"Share note with customer"}
        checked={shareNote}
        onChange={() => setShareNote(!shareNote)}
      />
      */}
      <div className={"my-4 flex flex-col sm:flex-row justify-between"}>
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classes.root, classes.cancelButton)}
          onClick={() => handleCloseModal()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.root}
          onClick={() => onSave()}
        >
          Save
        </Button>
      </div>
      <POAlert
        alertInfo={alertInfo}
        handleClose={() => setAlertInfo({ open: false })}
      />
      <POSpinner isLoading={isLoading} />
    </div>
  );
}
