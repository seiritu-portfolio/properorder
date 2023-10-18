import React from "react";
import "./styles.scss";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
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
  confirmButton: {
    fontWeight: "bold",
    color: "white",
    backgroundColor: theme.palette.common.yellowmedium,
    "&:hover": {
      opacity: 1,
      backgroundColor: theme.palette.common.yellowmedium,
    },
  },
}));

export default function POConfirmModal(props) {
  const classes = useStyles();
  const { modalVisible, handleCloseModal, title, handleConfirm } = props;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={modalVisible}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalVisible}>
        <div className={"confirm-modal-container"}>
          <div className={"confirm-modal-header-bar"} />
          <div className={"flex flex-col sm:flex-col mt-12 px-12"}>
            <div className={"flex flex-col flex-1 items-center"}>
              <p className={"font-bold text-xl"}>{title}</p>
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
                className={clsx(classes.root, classes.confirmButton)}
                onClick={() => handleConfirm()}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
