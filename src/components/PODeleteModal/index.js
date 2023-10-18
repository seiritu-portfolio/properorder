import React from "react";
import "./styles.scss";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import deleteIcon from "../../utils/customSVG/deleteIcon";

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function PODeleteModal(props) {
  const classes = useStyles();
  const { modalVisible, handleCloseModal, renderContent } = props;

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
        <div className={"delete-modal-container"}>
          <div className={"delete-modal-header-bar"}>
            <div className={"delete-modal-header-mark"}>
              {deleteIcon("white", 2)}
            </div>
          </div>
          <>{renderContent()}</>
        </div>
      </Fade>
    </Modal>
  );
}
