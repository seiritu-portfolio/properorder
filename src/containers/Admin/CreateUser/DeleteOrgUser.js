import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "3rem",
    paddingRight: "3rem",
    height: "48px",
    width: "100%",
    display: "flex",
  },
  cancelButton: {
    backgroundColor: theme.palette.common.graylight,
    "&:hover": {
      opacity: 1,
      backgroundColor: theme.palette.common.graylight,
    },
  },
  deleteButton: {
    fontWeight: "bold",
    color: "white",
    backgroundColor: theme.palette.common.reddark,
    "&:hover": {
      opacity: 1,
      backgroundColor: theme.palette.common.reddark,
    },
  },
}));

export default function DeleteOrgUser(props) {
  const { handleCloseModal, handleContinue } = props;
  const classes = useStyles();

  return (
    <div className={"flex flex-col sm:flex-col mt-16 px-12"}>
      <div className={"flex flex-col flex-1 items-center"}>
        <h2 className={"mt-2 text-center"}>
          Are you sure you want to delete it?
        </h2>
      </div>
      <div
        className={
          "my-4 sm:my-8 flex flex-1 flex-col sm:flex-row space-y-2 sm:space-x-8 sm:space-y-0"
        }
      >
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classes.root, classes.cancelButton)}
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classes.root, classes.deleteButton)}
          onClick={() => handleContinue()}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
