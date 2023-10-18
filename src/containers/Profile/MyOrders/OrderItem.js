import React from "react";
import "./styles.scss";
import NextIcon from "../../../assets/ic_next.svg";
import { ReactSVG } from "react-svg";
import history from "../../../routes/history";
import DateTimeUtil from "../../../utils/DateTimeUtil";

export default function OrderItem(props) {
  const { order } = props;

  const fixedOrderPrice = (order.price / 100).toFixed(2);
  console.log(fixedOrderPrice);

  return (
    <div>
      <div className="h-20 bg-po-graylight mt-4 grid grid-cols-6 lg:grid-cols-12 py-2 px-4">
        <div className="flex items-center col-span-4 lg:col-span-4">
          <img
            className={"h-12 w-12 mr-3 object-contain"}
            src={order.site.organisation.logo}
            alt={"logo"}
          />
          <div>
            <p className={"text-xs"}>Order #{order.id}</p>
            <h4 className=" font-bold text-sm md:text-lg">{order.site.name}</h4>
            <div className="flex items-center lg:hidden">
              <p className={"text-xs"}>€{fixedOrderPrice}</p>
              <span className="mx-1">&middot;</span>
              <div className="text-xs">
                {" "}
                {DateTimeUtil.getOrderTime(order.created_at)}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center lg:col-span-3 font-semibold">
          <div className="mt-1 text-sm text-po-graymain sm:flex sm:items-center">
            <div>€{fixedOrderPrice}</div>
            <span className="sm:mx-2">&middot;</span>
            <div className="mt-1 sm:mt-0">
              {DateTimeUtil.getOrderTime(order.created_at)}
            </div>
          </div>
        </div>

        <div className="flex items-center col-start-5  lg:col-span-3 justify-end">
          <h4 className="font-bold text-sm lg:text-base text-po-black capitalize">
            {order.status}
          </h4>
        </div>
        <div className="flex items-center col-span-1 lg:col-span-2 justify-end mr-3">
          <button
            onClick={() =>
              history.push({
                pathname: "/order",
                state: { order: order },
              })
            }
          >
            <ReactSVG src={NextIcon} />
          </button>
        </div>
      </div>
    </div>
  );
}
