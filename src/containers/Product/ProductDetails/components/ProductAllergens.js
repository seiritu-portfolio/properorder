import React from "react";

export default function ProductAllergens(props) {
  const { product } = props;
  return (
    <div className="my-1 flex">
      {product.allergens?.length > 0 ? (
        <h6 className="text-sm 2xl:text-base font-bold text-po-graymain">
          Allergens:
        </h6>
      ) : null}
      <p className="text-po-graymain  text-sm 2xl:text-base ml-2">
        {product.allergens?.length > 0 ? product.getAllergens() : null}
      </p>
    </div>
  );
}
