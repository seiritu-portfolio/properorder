import React from "react";
import clsx from "clsx";

export default function HomeSearchResult(props) {
  const { headerVisible, visible, searchString, totalProducts, sellers } =
    props;

  // const resultCounts =
  //   totalProducts +
  //   sellers.filter((s) =>
  //     s.name.toLowerCase().includes(searchString.toLowerCase().trim())
  //   ).length;
  const resultCounts = totalProducts;

  return (
    <p
      className={clsx(
        "text-base font-semibold text-po-graymain text-center py-2 px-8",
        !visible && "hidden",
        !headerVisible && "home-search-result"
      )}
    >
      Your search for{" "}
      <span className={"text-po-yellowdark"}>“{searchString}”</span> produced{" "}
      <span className={"text-po-yellowdark"}>
        {resultCounts === 0 ? "0" : resultCounts}
      </span>{" "}
      {resultCounts === 1 ? <span>result</span> : <span>results</span>}
    </p>
  );
}
