import React from "react";
import clsx from "clsx";

export default function PageItem(props) {
  const { item, isSelected, onClick } = props;
  return (
    <button
      className={clsx(
        "choose-address-page-item-container",
        isSelected && "bg-secondary"
      )}
      onClick={onClick}
    >
      <span className={"choose-address-page-item-text"}>{item}</span>
    </button>
  );
}
