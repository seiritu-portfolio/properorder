import React from "react";
import { Divider } from "@material-ui/core";
import PODecimalUtil from "../../utils/PODecimalUtil";

export default function ConfirmOrderItem(props) {
  const { hasDivider, order } = props;
  return (
    <div className={"flex flex-col pt-4 px-6"}>
      <div className={"flex flex-row mb-6"}>
        <img
          className={"h-8 mt-3 w-7 object-scale-down"}
          src={order.site?.organisation?.logo}
          alt={"avatar"}
        />
        <div className={"flex flex-col flex-1 ml-3"}>
          <p className={"text-xs"}>Order #5657567</p>
          <h3>{order.site.name}</h3>
          {/* Hided for V1, needs to be implemented in later version:
          <div className={"confirm-order-item-subcontainer"}>
            <span>Delivery date:</span>
            <span>Mon June 7th</span>
          </div>
          */}
          <div className={"confirm-order-item-subcontainer"}>
            <span>{`Total (${order.products
              .map((p) => Number(p.quantity))
              .reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
              )} items):`}</span>
            <span>
              {PODecimalUtil.getPriceDecimalString(
                order.products
                  .map((p) => Number(p.getCalculatedTotalForOrder()))
                  .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                  )
              )}
            </span>
          </div>
        </div>
      </div>
      {hasDivider && <Divider />}
    </div>
  );
}
