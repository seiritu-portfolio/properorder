/**
 * colorOfOrderStatus
 */
import { POOrderStatus } from "../models";

const borderColorOfOrderStatus = (status) => {
  if (status === "out_for_delivery") {
    return "border-sky-600";
  }

  if (status === "ready_for_collection") {
    return "border-po-greenlight";
  }

  if (status === "ready_for_delivery") {
    return "border-po-greenlight";
  }

  if (status === "delivered" || status === "collected") {
    return "border-po-graydark";
  }
  if (status === "cancelled") {
    return "border-po-red";
  }
  if (status === "preparing") {
    return "border-po-yellowmedium";
  }

  return "border-po-primarydark";
};

const textColorOfOrderStatus = (status) => {
  if (status === "out_for_delivery") {
    return "text-sky-600";
  }

  if (status === "ready_for_collection") {
    return "text-po-greenlight";
  }

  if (status === "ready_for_delivery") {
    return "text-po-greenlight";
  }

  if (status === "delivered" || status === "collected") {
    return "text-po-graydark";
  }
  if (status === "cancelled") {
    return "text-po-red";
  }
  if (status === "preparing") {
    return "text-po-yellowmedium";
  }

  return "text-po-primarydark";
};

const ringColorOfOrderStatus = (status) => {
  if (status === "out_for_delivery") {
    return "ring-sky-600";
  }

  if (status === "ready_for_collection") {
    return "ring-po-greenlight";
  }

  if (status === "ready_for_delivery") {
    return "ring-po-greenlight";
  }

  if (status === "delivered" || status === "collected") {
    return "ring-po-graydark";
  }
  if (status === "cancelled") {
    return "ring-po-red";
  }
  if (status === "preparing") {
    return "ring-po-yellolight";
  }

  return "ring-po-primarydark";
};

const bgColorOfOrderStatus = (status) => {
  if (status === "out_for_delivery") {
    return "bg-sky-200";
  }

  if (status === "ready_for_collection") {
    return "bg-po-greenlight";
  }

  if (status === "ready_for_delivery") {
    return "bg-po-greenlight";
  }

  if (status === "delivered" || status === "collected") {
    return "bg-po-graymedium";
  }
  if (status === "cancelled") {
    return "bg-po-red";
  }
  if (status === "preparing") {
    return "bg-po-yellowlight";
  }

  return "bg-po-primary";
};

const isOverflown = ({
  clientWidth,
  clientHeight,
  scrollWidth,
  scrollHeight,
}) => scrollHeight > clientHeight || scrollWidth > clientWidth;

const getHorizontalScrollPercentage = (element) =>
  Math.floor(
    (element.scrollLeft / (element.scrollWidth - element.clientWidth)) * 100
  );

export default {
  bgColorOfOrderStatus,
  borderColorOfOrderStatus,
  textColorOfOrderStatus,
  ringColorOfOrderStatus,
  isOverflown,
  getHorizontalScrollPercentage,
};
