import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import clsx from "clsx";
import "./styles.scss";
import { storeAgeStatus } from "../../services/HelperService";

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: 700,
    paddingLeft: "3.5rem",
    paddingRight: "3.5rem",
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

export default function AgeConfirm(props) {
  const { handleCloseModal, handleContinue } = props;
  const classes = useStyles();

  const onClickContinue = () => {
    storeAgeStatus("Yes");
    handleContinue();
  };

  return (
    <div className={"flex flex-col bg-white age-confirm-modal-container"}>
      <div className={"flex flex-col flex-1 mt-8 space-y-4 items-center px-4"}>
        <h2 className={"text-center"}>
          Are you old enough to buy age restricted items?
        </h2>
        <p>
          Age restricted items (including alcohol and tobacco) are not for sale
          to anyone under the age of 18. You may need to provide a valid ID upon
          receiving your order
        </p>
      </div>
      <div
        className={
          "mx-4 sm:mx-8 my-4 sm:my-8 flex flex-col sm:flex-row justify-between"
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
        <Button
          variant="contained"
          color="secondary"
          className={classes.root}
          onClick={() => onClickContinue()}
        >
          Yes, I am 18 or over
        </Button>
      </div>
    </div>
  );
}
