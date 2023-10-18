import React from "react";
import "./styles.scss";
import Spinner from "react-spinkit";
import POSpinner from "../POSpinner";

export default function POLoader(props) {
  const { className } = props;
  return (
    <div>
      {/*<div className={"po-loader"}>*/}
      {/*  <Spinner name="ball-spin-fade-loader" fadeIn="none" color={"#E27F03"} />*/}
      {/*</div>*/}
      <POSpinner isLoading={true} className={"bg-gray-200"} />
    </div>
  );
}
