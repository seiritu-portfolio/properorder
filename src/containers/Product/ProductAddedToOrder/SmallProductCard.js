import React from "react";
import ProductImagePlaceholder from "../../../assets/image_placeholder.png";
import "./styles.scss";

export default function ProductAddedToOrder(props) {
  const { item } = props;

  return (
    <div className="added-to-order-product-item">
      <img
        className={"object-scale-down rounded-lg w-full max-h-48"}
        src={item.image ?? ProductImagePlaceholder}
        alt={"success"}
      />
      <div className="h-5 md:h-8 bg-po-primary flex justify-center items-center rounded-b-lg absolute bottom-0 w-full">
        <h6 className="px-1 font-semibold text-po-black small-product-card-title py-2 truncate">
          {item.name}
        </h6>
      </div>
    </div>
  );
}
