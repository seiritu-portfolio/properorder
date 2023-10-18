import React from "react";
import CheckIcon from "../../../../assets/timeline_check.svg";
import GrayCircleIcon from "../../../../assets/check_circle_gray.svg";
import GreenCircleIcon from "../../../../assets/check_circle_green.svg";
import { ReactSVG } from "react-svg";
import DateTimeUtil from "../../../../utils/DateTimeUtil";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Timeline() {
  const eventTypes = {
    upcoming: { icon: GrayCircleIcon, color: "text-po-graymedium" },
    inProgress: { icon: GreenCircleIcon, color: "text-po-green" },
    completed: { icon: CheckIcon, color: "text-po-black" },
  };

  // All statuses: pending, new, preparing, ready, delivering, delivered, failed, cancelled, skipped, collected
  const timeline = [
    {
      id: 1,
      type: eventTypes.completed,
      status: "Received",
      date: "Jul 8",
      datetime: "2020-07-08",
    },
    {
      id: 2,
      type: eventTypes.inProgress,
      status: "Preparing",
      date: "Yesterday",
      datetime: "2020-09-22",
    },
    {
      id: 3,
      type: eventTypes.upcoming,
      status: "Ready",
      date: "Today",
      datetime: "2020-09-28",
    },
    {
      id: 4,
      type: eventTypes.upcoming,
      status: "Out on delivery",
      date: "Tomorrow",
      expected: "(expected)",
      datetime: "2020-09-30",
    },
    {
      id: 5,
      type: eventTypes.upcoming,
      status: "Delivered",
      date: "Tomorrow",
      expected: "(expected)",
      datetime: "2020-10-04",
    },
  ];

  return (
    <div className="flex lg:px-4 mt-6">
      <ul className="relative flex w-full justify-between lg:px-4">
        <div
          className="absolute justidy-center top-6 bottom-10 left-10 right-10 flex items-center"
          aria-hidden="true"
        >
          <div className="w-full border-t border-po-graymedium border-dashed" />
        </div>

        {timeline.map((item, itemIdx) => (
          <li
            key={item.id}
            className="relative flex flex-col items-center z-50"
          >
            <h6
              className={classNames(
                item.type.color,
                "text-sm lg:text-base text-gray-500 mb-2 font-semibold"
              )}
            >
              {" "}
              {item.status}
            </h6>
            <ReactSVG
              src={item.type.icon}
              className="bg-po-white"
              aria-hidden="true"
            />
            <div
              className={classNames(
                item.type.color,
                "text-center text-sm lg:text-base text-gray-500 mt-2 font-semibold"
              )}
            >
              <p>{DateTimeUtil.getOrderDate(item.datetime)}</p>
              <p className="font-light text-xs lg:text-sm">{item.expected}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
