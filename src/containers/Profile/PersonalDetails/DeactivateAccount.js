import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

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

export default function DeactivateAccount(props) {
  const { handleCloseModal } = props;
  const classes = useStyles();

  return (
    <div className={"flex flex-col sm:flex-col mt-16 px-12"}>
      <div className={"flex flex-col flex-1"}>
        <h2 className={"w-full text-center"}>
          Are you sure you want to delete your account?
        </h2>
        <p className={"text-xl w-full text-center mt-4"}>
          Please note that once this has been completed no reactivation of your
          account will be possible.
        </p>
        <p className={"text-lg font-semibold mt-8 mb-3"}>
          Enter your password to deactivate your account:
        </p>
        <TextField
          required
          id="password"
          label="Password"
          type={"password"}
          variant="outlined"
          className={"w-full"}
          autocomplete="off"
        />
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
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
}
