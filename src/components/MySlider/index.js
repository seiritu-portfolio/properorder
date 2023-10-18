import React from "react";
import { Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

export default withStyles({
  valueLabel: {
    left: "calc(-50% - 2px)",
    top: 20,
    "& *": {
      background: "transparent",
      color: "black",
    },
  },
  markLabel: {
    color: "#b3b3b3",
  },
  markLabelActive: {
    color: "black",
  },
})(Slider);
