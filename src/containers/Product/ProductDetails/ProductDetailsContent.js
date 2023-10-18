import history from "../../../routes/history";
import { ArrowBackIos } from "@material-ui/icons";
import ProductImage from "./ProductImage";
import {
  ProductAllergens,
  ProductInfo,
  ProductOptions,
  ProductTags,
} from "./components";
import ProductQuantity from "./ProductQuantity";
import DetailsFooter from "./DetailsFooter";
import React from "react";
import clsx from "clsx";

export default function ProductDetailsContent({
  backNeeded = true,
  footerNeeded = true,
  className,
  product,
  seller,
  selectedOptions,
  setSelectedOptions,
  quantity,
  setQuantity,
  handleAdd,
  cancelOption,
  triedSubmit = false,
}) {
  const fromHomePage = window.location.pathname.includes("/home");

  return (
    <div
      className={clsx(
        "flex flex-col flex-1 md:grid md:grid-cols-3 md:gap-3 bg-white px-2 pb-2 pt-4 md:p-6",
        className
      )}
    >
      <div className="product-name-container md:hidden flex mb-3 pl-2 max-w-sm">
        <h2 className={"text-po-black text-2xl 2xl:text-3xl font-bold"}>
          {product?.name}
        </h2>
        {/*
          <p className={"hidden md:block text-lg lg:text-xl font-bold"}>
            €{(product?.price / 100).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}
          </p>
        */}
      </div>
      <div className="block md:hidden">
        <hr className="text-po-divideColor w-full mb-3" />
      </div>
      <div className="md:col-span-1 hidden md:block">
        <ProductImage product={product} footerNeeded={footerNeeded} />
      </div>
      <div className={"flex flex-row flex-1 md:col-span-2"}>
        <div className="md:col-span-2 mx-3 lg:mx-6 flex flex-col flex-1">
          <div className="product-name-container hidden md:flex">
            <h2 className={"text-po-black text-2xl font-bold"}>
              {product?.name}
            </h2>
            {/*
                <p className={"hidden md:block text-lg lg:text-xl font-bold"}>
                  €{(product?.price / 100).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}
                </p>
              */}
          </div>

          <div className={"flex flex-row flex-1 relative md:max-h-96"}>
            <div className="description-scrollable-container py-3 flex flex-col flex-1 absolute md:relative">
              <div className="md:col-span-1 block md:hidden">
                <ProductImage product={product} footerNeeded={footerNeeded} />
              </div>
              <ProductInfo
                product={product}
                seller={seller}
                fromHomePage={fromHomePage}
              />
              <ProductTags product={product} />
              <ProductAllergens product={product} />
            </div>
          </div>

          <div
            className={`flex flex-col bg-white ${
              footerNeeded ? "" : "pointer-events-none"
            }`}
          >
            <ProductOptions
              product={product}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              triedSubmit={triedSubmit}
            />
            <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
            <hr className="text-po-divideColor" />
            {footerNeeded && (
              <DetailsFooter
                selectedOptions={selectedOptions}
                product={product}
                quantity={quantity}
                handleAdd={handleAdd}
                cancelOption={cancelOption}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /*
  {backNeeded && (
    <button
      className={"ml-2 flex items-center"}
      onClick={() => history.goBack()}
    >
      <ArrowBackIos color={"secondary"} fontSize={"small"} />
      <span className="text-sm md:text-base font-semibold text-po-graymain mt-0.5">
        Go back
      </span>
    </button>
  )}
*/
}
