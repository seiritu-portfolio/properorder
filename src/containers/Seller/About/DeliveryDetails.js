import React from "react";
import PODecimalUtil from "../../../utils/PODecimalUtil";

export default function DeliveryDetails(props) {
  const { seller } = props;
  const itemClasses = {
    label: "font-normal text-xl tracking-tightest leading-extra-tight",
    value: "font-bold text-xl tracking-tightest leading-extra-tight",
    des: "font-normal text-sm tracking-extra-tighter",
  };
  const renderItem = (label, value) => (
    <div className={"flex flex-row mt-4 justify-between"}>
      <span className={itemClasses.label}>{label}</span>
      <span className={itemClasses.value}>{value}</span>
    </div>
  );
  return (
    <div>
      <h2 className={"uppercase mt-8"}>Delivery Details</h2>
      {/*
      {renderItem("Delivery timeframe:", "2 days")}
      <div className={"flex-row ml-1"}>
        <span className={itemClasses.des}>
          It can vary depending on the product’s{" "}
        </span>
        <span className={clsx(itemClasses.des, "font-bold")}>
          Preparation time
        </span>
      </div>
      */}
      {renderItem(
        "Delivery fee:",
        PODecimalUtil.getPriceDecimalString(seller.delivery_fee)
      )}
      {/* 
        {renderItem("Free delivery:", "from €30")}
      */}
    </div>
  );
}
