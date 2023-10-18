import React from "react";

export default function LandingNi({ index, children }) {
  return (
    <div className={"mt-5 flex flex-row"}>
      <span
        className={"text-lg text-po-primary font-normal whitespace-nowrap mr-2"}
      >{`${index} //`}</span>
      <span className={"text-lg text-po-black font-normal"}>{children}</span>
    </div>
  );
}
