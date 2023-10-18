import React from "react";
import clsx from "clsx";
import { FaCheck } from "react-icons/fa";

export default function PORoundCB(props) {
  const { isChecked, onClick } = props;
  return (
    <div
      className={clsx(
        "flex w-6 h-6 rounded-full border-2 items-center justify-center",
        isChecked ? "border-po-black bg-po-black" : "border-po-graymedium"
      )}
      onClick={onClick}
    >
      {isChecked && <FaCheck className={"text-white w-3 h-3"} />}
    </div>
  );
}
