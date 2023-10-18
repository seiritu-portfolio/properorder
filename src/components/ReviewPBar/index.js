import React from "react";
import "./styles.scss";
import PropTypes from "prop-types";

export default function ReviewPBar(props) {
  const { item } = props;
  return (
    <div className={"flex  items-center mt-3 "}>
      <span className={"label mr-2"}>{item.value}</span>
      <div className={"h-6 border border-black percent"}>
        <div
          className={"h-full flex-1 bg-gray"}
          style={{ width: `${item.percent}%` }}
        />
      </div>
      <span className={"label ml-2"}>{item.percent.toFixed(0)}%</span>
    </div>
  );
}

ReviewPBar.propTypes = {
  item: PropTypes.object,
};
