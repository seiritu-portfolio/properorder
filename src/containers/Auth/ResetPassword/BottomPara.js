import React from "react";

export default function BottomPara() {
  return (
    <p
      className={"mt-2 mb-6 text-po-graydark w-full text-center"}
      style={{ fontSize: "0.8125rem" }}
    >
      Please
      <a
        href="mailto:support@properorder.ie?subject=Support: Problem Resetting Password"
        className={"font-bold text-po-yellowdark"}
      >
        &nbsp;contact us&nbsp;
      </a>
      if you have any troubles resetting your password
    </p>
  );
}
