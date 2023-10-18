import React from "react";
import clsx from "clsx";
import DateTimeUtil from "../../../utils/DateTimeUtil";
import { PODeliveryMode } from "../../../models";

const items = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const itemClasses = {
  label: "font-semibold text-lg tracking-tightest leading-extra-relaxed",
  value: "font-normal text-lg tracking-tightest leading-extra-relaxed",
};

export default function OpeningTimes(props) {
  const { seller } = props;

  if (
    seller.delivery_method === PODeliveryMode.delivery ||
    seller.opening_times == null
  ) {
    return null;
  }

  if (seller.opening_times == null || seller.opening_times.length === 0) {
    return null;
  }

  const renderItem = (key, label) => {
    const sel = label === DateTimeUtil.getDayOfWeek(new Date());
    const from = seller.opening_times[key]?.start_time;
    const to = seller.opening_times[key]?.end_time;
    return from && to ? (
      <div
        key={key}
        className={
          "flex flex-row mt-0.5 justify-between border-b border-yellow-border"
        }
      >
        <span
          className={clsx(
            itemClasses.label,
            sel && "text-yellow-dark font-bold"
          )}
        >
          {label.slice(0, 1).toUpperCase() + label.slice(1, label.length)}
        </span>
        <span
          className={clsx(
            itemClasses.value,
            sel && "text-yellow-dark font-bold"
          )}
        >
          {`${from} - ${to}`}
        </span>
      </div>
    ) : null;
  };

  return (
    <div>
      <h2 className={"uppercase mt-2"}>Opening times</h2>
      <div className={"mt-2"}>
        {items.map((item, index) => renderItem(index, item))}
      </div>
    </div>
  );
}
