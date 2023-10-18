import React from "react";
import {
  FaCcAmex,
  FaCcDinersClub,
  FaCcDiscover,
  FaCcJcb,
  FaCcMastercard,
  FaCcVisa,
} from "react-icons/fa";

function renderCardTypeFromBrand(brand) {
  if (brand === "Visa") {
    return <FaCcVisa className={"w-7 h-7"} />;
  }
  if (brand === "Amex" || brand === "American Express") {
    return <FaCcAmex className={"w-7 h-7"} />;
  }
  if (brand === "MasterCard") {
    return <FaCcMastercard className={"w-7 h-7"} />;
  }
  if (brand === "Discover") {
    return <FaCcDiscover className={"w-7 h-7"} />;
  }
  if (brand === "DinersClub") {
    return <FaCcDinersClub className={"w-7 h-7"} />;
  }
  if (brand === "Jcb") {
    return <FaCcJcb className={"w-7 h-7"} />;
  }

  return null;
}

export default {
  renderCardTypeFromBrand,
};
