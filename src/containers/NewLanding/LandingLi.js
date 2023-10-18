import React from "react";

export default function LandingLi({ children }) {
  return (
    <div className={"mt-5 flex flex-row"}>
      <div
        className={"w-2 h-2 rounded-full bg-po-primary mr-2"}
        style={{ minWidth: "0.5rem", minHeight: "0.5rem", marginTop: "0.6rem" }}
      />
      <span className={"text-lg text-po-black font-normal"}>{children}</span>
    </div>
  );
}
