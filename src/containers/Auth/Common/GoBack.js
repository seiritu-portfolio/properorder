import React from "react";
import { ArrowBackIos } from "@material-ui/icons";

export default function GoBack(props) {
  const { title = "Go back", onClick } = props;
  return (
    <button className={"ml-2 mb-3 flex items-center"} onClick={onClick}>
      <ArrowBackIos color={"secondary"} fontSize={"small"} />
      <span className="text-sm text-po-graymain mt-0.5">{title}</span>
    </button>
  );
}
