import React from "react";
import { ReactSVG } from "react-svg";
import Tag from "../../../../assets/golden_tag.svg";
import DeliveryIcon from "../../../../assets/golden_delivery.svg";

export default function ProductTags(props) {
  const { product } = props;
  return (
    <div className="flex justify-between mt-3">
      {product.tags != null && (
        <div className="flex items-center">
          <ReactSVG src={Tag} fill="text-po-yellowdark" />
          <p className="text-po-graymain  text-sm 2xl:text-base ml-2">
            {product.getTagLabel()}
          </p>
        </div>
      )}

      {/*
      <div className="flex items-center">
        <ReactSVG src={DeliveryIcon} />
        <p className="text-po-graymain font-semibold text-base ml-2">6 days</p>
      </div>
      */}
    </div>
  );
}
