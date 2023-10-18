import React from "react";
import { classNames } from "./classes";
import clsx from "clsx";
import PODecimalUtil from "../../../utils/PODecimalUtil";
import { PODeliveryMode } from "../../../models";

export default function PaymentInformation({ order }) {
  const renderItem = ({ title, value, color = "", fontSize = "text-base" }) => (
    <div className={`flex flex-row justify-between ${fontSize} ${color}`}>
      <b>{title}</b>
      <span>{value}</span>
    </div>
  );

  const deliveryFee =
    order.delivery_method === PODeliveryMode.delivery
      ? order?.site?.delivery_fee ?? 0
      : 0;

  return (
    <div
      className={clsx(classNames.headerContainer, "col-span-2 xl:col-span-1")}
    >
      <header className={classNames.headerTitle}>Payment information</header>
      <div className={"flex flex-col p-4 divide-y-2 space-y-2"}>
        <div>
          {renderItem({
            title: "Net cost",
            value: `€${PODecimalUtil.getPriceDecimalNumber(order?.price ?? 0)}`,
          })}
          {renderItem({
            title: "Delivery fee",
            value: `€${PODecimalUtil.getPriceDecimalNumber(deliveryFee)}`,
          })}
          {/*{renderItem({*/}
          {/*  title: "Discount",*/}
          {/*  value: "-€5.00",*/}
          {/*  color: "text-po-red",*/}
          {/*})}*/}
        </div>
        {renderItem({
          title: "Total",
          value: `€${PODecimalUtil.getPriceDecimalNumber(
            (order?.price ?? 0) + deliveryFee
          )}`,
          fontSize: "text-lg",
        })}
      </div>
    </div>
  );
}
