import React from "react";
import "./styles.scss";
import PropTypes from "prop-types";

export default function FooterItem(props) {
  const { title, items = [] } = props;
  return (
    <div className={"flex flex-col items-center md:items-start"}>
      <div
        className={
          "footer-item-title text-black uppercase text-center  mt-3 lg:mt-1"
        }
      >
        {title}
      </div>
      {items.map((item, index) => (
        <button
          key={index}
          className="text-po-graymain hover:text-black transform ease-out transition duration-300 hover:scale-105 background-transparent footer-item-text outline-none focus:outline-none mt-3 lg:mt-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => item.action()}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
}

FooterItem.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
};
