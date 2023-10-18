import React from "react";
import SearchIcon from "../../assets/search-icon-yellow.svg";
import { ReactSVG } from "react-svg";
import "./styles.scss";
import clsx from "clsx";

export default function SearchBy(props) {
  const { className, searchInputProps, placeholder } = props;
  const [focused, setFocused] = React.useState(false);
  return (
    <div
      className={clsx(
        "flex items-center px-2 search-container",
        focused && "search-container-focus",
        className
      )}
    >
      <ReactSVG src={SearchIcon} className="ml-3" />
      <input
        id="search"
        type="search"
        className="flex-1 py-2 px-2 text-base text-po-graymain focus:outline-hidden border-0 focus:shadow-transparent focus:ring-transparent focus:ring-offset-transparent"
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ borderRadius: "inherit" }}
        {...searchInputProps}
      />
    </div>
  );
}
