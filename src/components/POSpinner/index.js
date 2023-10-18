import React from "react";
import "./styles.scss";
import Spinner from "react-spinkit";
import Modal from "@material-ui/core/Modal";

export default function POSpinner(props) {
  const { isLoading, className } = props;
  return (
    <Modal
      aria-labelledby="spinner-modal-title"
      aria-describedby="spinner-modal-description"
      className={`flex items-center justify-center ${className}`}
      open={isLoading}
    >
      <div className={"po-spinner-container"}>
        <Spinner name="ball-spin-fade-loader" fadeIn="none" color={"#E27F03"} />
      </div>
    </Modal>
  );
}
