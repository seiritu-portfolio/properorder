import React from "react";
import { Button, Tooltip } from "@material-ui/core";
import clsx from "clsx";
import history from "../../../routes/history";
import { makeStyles } from "@material-ui/core/styles";
import PODecimalUtil from "../../../utils/PODecimalUtil";
import Constants from "../../../config/Constants";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    height: "4rem",
    fontSize: "1.25rem",
    width: "100%",

    ["@media (min-width:768px)"]: {
      paddingLeft: "0.5rem",
      paddingRight: "0.5rem",
      fontSize: "1rem",
    },
    ["@media (min-width:1280px)"]: {
      paddingLeft: "1rem",
      paddingRight: "1rem",
      fontSize: "1.25rem",
    },
  },
  cancelButton: {
    backgroundColor: "#ffffff",
    order: 2,
    marginTop: "1rem",
    border: "1px solid #F0F0F5",
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",

    ["@media (min-width:768px)"]: {
      marginTop: "0",
      marginRight: "1rem",
      order: -1,
    },
    "&:hover": {
      opacity: 1,
      backgroundColor: "#fefdfa",
    },
  },
  mainButton: {
    backgroundColor: "#F0F0F5",
    order: 2,
    marginTop: "1rem",
    fontWeight: "400",
    color: "#81818E",

    ["@media (min-width:768px)"]: {
      marginTop: "0",
      marginRight: "1rem",
      order: -1,
    },
    "&:hover": {
      opacity: 1,
      backgroundColor: "#F0F0F5",
      boxShadow: "none",
      cursor: "not-allowed",
    },
  },
}));

export default function (props) {
  const { handleAdd, product, quantity, selectedOptions, cancelOption } = props;
  const classes = useStyles();
  const canNext = () => !selectedOptions.some((o) => o.selected_id == null);
  return (
    <div className={"md:mt-5 flex flex-col md:flex-row space-y-2 md:space-y-0"}>
      <Button
        variant="contained"
        color="secondary"
        className={clsx(classes.root, classes.cancelButton, "h-full")}
        onClick={() => {
          cancelOption.action();
          if (cancelOption?.label !== "Cancel") {
            history.push(
              window.sessionStorage.getItem(Constants.SS_PRODUCT_COMING_FROM)
            );
          }
        }}
      >
        {cancelOption?.label ?? "Back to products"}
      </Button>
      {canNext() ? (
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classes.root, "h-full")}
          onClick={() => handleAdd()}
        >
          Add to order{" "}
          {PODecimalUtil.getPriceDecimalString(
            product?.getCalculatedTotal(quantity, selectedOptions)
          )}
        </Button>
      ) : (
        <Tooltip title="Please select product option(s)" arrow placement="top">
          <div className={"w-full"}>
            <Button
              variant="contained"
              color="secondary"
              className={clsx(classes.root, classes.mainButton, "h-full")}
              onClick={() => handleAdd()}
            >
              Add to order{" "}
              {PODecimalUtil.getPriceDecimalString(
                product?.getCalculatedTotal(quantity, selectedOptions)
              )}
            </Button>
          </div>
        </Tooltip>
      )}
    </div>
  );
}
