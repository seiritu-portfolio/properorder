import React from "react";
import { Add, Remove } from "@material-ui/icons";
import clsx from "clsx";

export default function PORemove(props) {
  const { title, className, onClick } = props;
  return (
    <button
      className={clsx("flex flex-row items-center", className)}
      onClick={onClick}
    >
      <div
        className={
          "bg-po-red w-5 h-5  flex items-center justify-center rounded-full"
        }
        title="Remove"
      >
        <Remove
          style={{ fontSize: "1rem", color: "#fff", fontWeight: "600" }}
        />
      </div>
      <p className={"font-semibold text-black ml-2 mt-0.5"}>{title}</p>
    </button>
  );
}
