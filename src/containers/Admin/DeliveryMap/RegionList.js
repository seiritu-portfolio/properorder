import React from "react";
import clsx from "clsx";
import { HiPencilAlt } from "react-icons/hi";
import { useDeliveryMap } from "../Provider/DeliveryMapProvider";

export default function RegionList({
  townList,
  onClickPrice,
  defaultPrice = 0,
}) {
  const { getRegionPrices, onToggleSel, isROI } = useDeliveryMap();

  const regionPrices = getRegionPrices();

  const onClick = (code) => {
    onToggleSel(true, code, true);
  };

  return (
    <div className="flex-1">
      {townList.map((item, index) => (
        <div
          key={`${index}`}
          className={clsx(
            item.code,
            item.region,
            "townCell",
            regionPrices[item.region].price && "region-price",
            item.price &&
              Number(item.price) !== Number(defaultPrice) &&
              "price",
            item.filtered && "filtered",
            item.sel && "sel",
            "flex"
          )}
          onClick={() => onClick(item.code)}
        >
          {isROI() ? item.code : item.code.replace("BT", "")}{" "}
          {item.town.replace("(W)", "").replace("(E)", "")}
          <span
            className={"town-price text-po-graydark"}
            onClick={(e) => onClickPrice(e, item, defaultPrice)}
          >
            {Number(item.price ?? defaultPrice).toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  );
}
