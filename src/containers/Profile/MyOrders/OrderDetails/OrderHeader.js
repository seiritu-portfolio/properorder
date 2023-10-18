import React from "react";
import DateTimeUtil from "../../../../utils/DateTimeUtil";
import SuccessIcon from "../../../../assets/success.svg";
import { ReactSVG } from "react-svg";

export default function OrderHeader(props) {
  const { order } = props;
  // All statuses: pending, new, preparing, ready, delivering, delivered, failed, cancelled, skipped, collected

  return (
    <div className="flex justify-between lg:px-4">
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-bold text-2xl lg:text-3xl mt-2 mb-1">
            Order #{order.id}
          </h3>
          <p className="text-sm font-semibold text-po-graydark ml-1">
            Placed on {DateTimeUtil.getLocalTime(new Date(order.created_at))}
          </p>
        </div>
        {/* {order.status !== "delivered" && order.status !== "collected" ? (
          <h5 className="mt-4 font-semibold text-po-black text-sm md:text-lg">
            Estimated delivery date and time:
          </h5>
        ) : null} *
        {order.status === "delivered" ? (
          <div className="flex flex-row items-center mt-4">
            <ReactSVG src={SuccessIcon} aria-hidden="true" />
            <h5 className="ml-2 font-semibold text-po-black text-sm md:text-lg">
              Successfully <span className="font-bold">delivered</span> on:
            </h5>
          </div>
        ) : null}
        {order.status === "collected" ? (
          <div className="flex flex-row items-center mt-4">
            <ReactSVG src={SuccessIcon} aria-hidden="true" />
            <h5 className="ml-2 font-semibold text-po-black text-sm md:text-lg">
              Successfully <span className="font-bold">collected</span> on:
            </h5>
          </div>
        ) : null} */}
      </div>
      <div className="flex flex-col justify-between">
        <div className="self-end h-12 w-max rounded-3xl border border-po-green flex justify-center items-center">
          <h4 className="text-po-green capitalize py-5 lg:py-8 px-3 lg:px-6 font-bold text-xl lg:text-2xl">
            {order.status}
          </h4>
        </div>
        {/* TODO: update estimated delivery date and time after API done*/}
        {/*} <p className="mt-4 font-bold text-po-black text-lg xl:text-2xl">
          June 13, 14:00-16:00
        </p> */}
      </div>
    </div>
  );
}
