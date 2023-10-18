import React from "react";
import "./styles.scss";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
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

export default function AddWeight(props) {
  const { handleCloseModal } = props;
  const classes = useStyles();
  return (
    <div className={"flex flex-col bg-white add-weight-modal-container"}>
      <div className={"flex flex-col flex-1 mt-8 space-y-4 items-center px-4"}>
        <h2>Add weight</h2>
        <input
          id="weight"
          name="weight"
          className="block w-full py-3 px-4 text-sm font-semibold focus:outline-none border border-po-graymedium rounded-xl"
          placeholder="e.g. 20 kg"
        />
      </div>
      <div
        className={
          "mx-4 my-4 sm:my-8 flex flex-col sm:flex-row justify-between"
        }
      >
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classes.root, classes.cancelButton)}
          onClick={() => handleCloseModal()}
        >
          Cancel
        </Button>
        <Button variant="contained" color="secondary" className={classes.root}>
          Add
        </Button>
      </div>
    </div>
  );
}
