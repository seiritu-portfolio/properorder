import React from "react";
import "./styles.scss";
import busIcon from "../../utils/customSVG/busIcon";
import collectionIcon from "../../utils/customSVG/collectionIcon";
import clsx from "clsx";
import { PODeliveryMode } from "../../models";

export default function POSegment(props) {
  const { deliveryMode, setDeliveryMode } = props;
  return (
    <div className={"flex flex-row bg-po-graylight rounded-xl"}>
      <button
        className={clsx(
          "flex flex-1 pr-4 py-3 rounded-xl items-center justify-center",
          deliveryMode === PODeliveryMode.delivery && "bg-black"
        )}
        onClick={() => setDeliveryMode(PODeliveryMode.delivery)}
      >
        {busIcon(
          deliveryMode === PODeliveryMode.delivery ? "white" : "#81818E"
        )}
        <span
          className={clsx(
            "segment-title",
            deliveryMode === PODeliveryMode.delivery
              ? "text-white"
              : "text-po-graydark"
          )}
        >
          Delivery
        </span>
      </button>
      <button
        className={clsx(
          "flex flex-1 pr-4 py-3 rounded-xl items-center justify-center",
          deliveryMode === PODeliveryMode.collection && "bg-black"
        )}
        onClick={() => setDeliveryMode(PODeliveryMode.collection)}
      >
        {collectionIcon(
          deliveryMode === PODeliveryMode.collection ? "white" : "#81818E"
        )}
        <span
          className={clsx(
            "segment-title",
            deliveryMode === PODeliveryMode.collection
              ? "text-white"
              : "text-po-graydark"
          )}
        >
          Collection
        </span>
      </button>
    </div>
  );
}
