import React, { useEffect, useState } from "react";
import APIManager from "../../Network/APIManager";
import ProductItem from "../Home/Detail/ProductItem";
import { PODeliveryMode } from "../../models";
import LandingHorizontalSV from "./LandingHorizontalSV";

export default function LandingProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    APIManager.fetchProducts("D01", "1").then((res) => {
      setProducts(res.products);
    });
  }, []);

  return (
    <div className={"flex flex-col"}>
      <h2 className={"text-2xl text-po-black mt-10 px-6 md:px-8"}>
        New products
      </h2>
      <LandingHorizontalSV tabsInfo={products}>
        <div className={"inline-flex"}>
          {products.map((item, index) => (
            <div
              key={index}
              className={`landing-product-item-container ${
                index === 0 ? "ml-6 md:ml-8" : ""
              }`}
            >
              <ProductItem
                item={item}
                deliveryMode={PODeliveryMode.both}
                onClickItem={() => {}}
                limitTitle={true}
              />
            </div>
          ))}
        </div>
      </LandingHorizontalSV>
    </div>
  );
}
