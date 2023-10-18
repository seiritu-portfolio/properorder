import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

export default function POModal(props) {
  const { modalVisible, handleCloseModal, renderContent } = props;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={"flex items-center justify-center overflow-scroll"}
      open={modalVisible}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalVisible}>
        <>{renderContent()}</>
      </Fade>
    </Modal>
  );
}
