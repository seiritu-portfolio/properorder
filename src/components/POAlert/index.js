import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "0.8rem",
    fontWeight: "600",
    padding: "6px 8px",
    fontFamily: "Nunito !important",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={4} {...props} />;
}

export default function POAlert(props) {
  const { alertInfo, handleClose, className } = props;
  const classes = useStyles();
  return (
    <Snackbar
      key={alertInfo.message}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      className={className ?? ""}
      open={alertInfo.open}
      autoHideDuration={1500}
      onClose={handleClose}
    >
      <Alert
        severity={alertInfo.severity ?? "success"}
        className={classes.root}
        onClose={handleClose}
      >
        {alertInfo.message}
      </Alert>
    </Snackbar>
  );
}
