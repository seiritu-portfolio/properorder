import React from "react";
import { Add } from "@material-ui/icons";
import clsx from "clsx";

export default function POAddNew(props) {
  const { title, className, onClick } = props;
  return (
    <button
      className={clsx("flex flex-row items-center", className)}
      onClick={onClick}
    >
      <div
        className={
          "bg-secondary w-5 h-5 flex items-center justify-center rounded-full"
        }
        title="Add"
      >
        <Add style={{ fontSize: "1rem" }} />
      </div>
      <p className={"font-semibold text-sm text-black ml-1 mt-0.5"}>{title}</p>
    </button>
  );
}
