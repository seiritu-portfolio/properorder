import { Button, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import history from "../../routes/history";
import { ArrowBackIos } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  backButton: {
    borderWidth: 0,
    position: "absolute",
    color: theme.palette.common.black,
    marginLeft: "0",
    ["@media (min-width:640px)"]: {
      marginLeft: 18,
    },
  },
}));

export default function CheckOutHeader() {
  const classes = useStyles();
  return (
    <div className={"flex flex-col flex-1 relative"}>
      <Button
        variant="outlined"
        className={clsx("h-12", classes.backButton)}
        onClick={() => history.push("/home")}
      >
        <ArrowBackIos color={"secondary"} />
        <span>Continue shopping</span>
      </Button>
      <p className={"confirm-order-detail-text self-center"}>
        Confirm your order details
      </p>
    </div>
  );
}
