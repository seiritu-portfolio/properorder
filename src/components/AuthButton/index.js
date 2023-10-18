import React from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

export default withStyles((theme) => ({
  root: {
    color: theme.palette.common.black,
    fontSize: "1.5rem",
    lineHeight: "1em",
    width: "100%",
    height: "100%",
    fontWeight: 700,
    backgroundColor: theme.palette.common.primary,
    boxShadow: "0px 20px 40px rgba(7, 41, 72, 0.06)",
    "&:hover": {
      backgroundColor: "rgba(245,169,74,0.82)",
    },
  },
}))(Button);
