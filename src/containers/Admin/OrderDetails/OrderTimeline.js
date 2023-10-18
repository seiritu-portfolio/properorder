import React from "react";
import { classNames } from "./classes";
import clsx from "clsx";
import { BiCheckCircle } from "react-icons/bi";

export default function OrderTimeline({ currentStatus, textStatusColor }) {
  const renderItem = ({ title, date, isLast = false }) => (
    <div className={"flex flex-row relative mb-2"}>
      {!isLast && (
        <div
          className={
            "border-dotted border-l-4 h-7 absolute left-2.5 top-7 border-po-graymedium"
          }
        />
      )}
      <BiCheckCircle className={"mt-1 w-6 h-6 text-po-green"} />
      <div className={"flex flex-col ml-2"}>
        <span className={"font-bold text-base"}>{title}</span>
        <span className={"text-sm mt-0.5"}>{date}</span>
      </div>
    </div>
  );

  return (
    <div
      className={clsx(classNames.headerContainer, "col-span-2 xl:col-span-1")}
    >
      <header className={"flex flex-row justify-between items-center"}>
        <div className={classNames.headerTitle}>Order timeline</div>
        <p className={`mr-4 text-base ${textStatusColor} font-bold`}>
          {currentStatus}
        </p>
      </header>

      <div className={"p-4"}>
        {renderItem({ title: "Order placed", date: "Yesterday at 09:30" })}
        {renderItem({
          title: "Prepared for delivery",
          date: "Yesterday at 21:30",
        })}
        {renderItem({ title: "Out for delivery", date: "Today at 12:00" })}
        {renderItem({
          title: "Delivered",
          date: "Today at 12:00",
          isLast: true,
        })}
      </div>
    </div>
  );
}
