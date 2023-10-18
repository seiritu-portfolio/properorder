import React from "react";
import { Radio } from "@material-ui/core";
import Call from "../../../assets/phone_small.svg";
import Location from "../../../assets/location_addresses.svg";
import { ReactSVG } from "react-svg";

export default function AddressItem(props) {
  const { onClickEdit, item, isSelected, handleSelectAddress } = props;

  return (
    <li
      className={
        "cursor-pointer flex flex-row bg-white rounded-lg check-out-item-shadow-sm px-4 py-3 transition duration-300  ease-out hover:bg-po-graylight hover:shadow-md ml-2 mt-4"
      }
      onClick={() => handleSelectAddress(item.id)}
    >
      <Radio
        color={"primary"}
        className={"flex self-start"}
        checked={isSelected}
      />
      <div className={"flex flex-col ml-2"}>
        <span className={"text-lg font-bold tracking-tightest leading-6"}>
          {item?.address_name}
        </span>
        <div className={"flex flex-row items-center mt-2"}>
          <span className={"text-sm font-bold tracking-tightest"}>
            {item?.name}
          </span>
          <div className={"flex flex-row items-center ml-8 space-x-2"}>
            <ReactSVG src={Call} />
            <span className={"text-xs tracking-tightest text-po-graymain"}>
              {item?.phone}
            </span>
          </div>
        </div>
        <div className={"flex flex-row items-center space-x-2 mt-2"}>
          <ReactSVG src={Location} />
          <span className={"text-xs tracking-tightest text-po-graymain"}>
            {item.formatted_address()}
          </span>
        </div>
      </div>
      {isSelected ? (
        <button
          className={"text-base font-bold text-po-yellowdark ml-auto mr-4"}
          onClick={(e) => {
            e.stopPropagation();
            onClickEdit();
          }}
        >
          Edit
        </button>
      ) : null}
    </li>
  );
}
