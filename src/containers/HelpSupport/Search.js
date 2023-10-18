import React from "react";
import SearchIcon from "../../assets/search-icon-yellow.svg";
import { ReactSVG } from "react-svg";
import "./styles.scss";
import PropTypes from "prop-types";
import clsx from "clsx";

export default function Search(props) {
  const { className } = props;
  const [focused, setFocused] = React.useState(false);
  return (
    <div
      className={clsx(
        "flex items-center self-center px-2 search-container-help-support",
        focused && "search-container-help-support-focus",
        className
      )}
    >
      <ReactSVG src={SearchIcon} className="ml-3 mr-2" />
      <input
        id="search"
        name="search"
        className="flex-1 py-2 px-2 text-lg font-semibold focus:outline-hidden border-0 focus:shadow-transparent focus:ring-transparent focus:ring-offset-transparent"
        placeholder="What's your question?"
        type="search"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

Search.propTypes = {
  className: PropTypes.string,
};
