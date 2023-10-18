import React from "react";
import "./styles.scss";
import { ReactSVG } from "react-svg";
import EditSquare from "../../assets/edit_square.svg";
import Call from "../../assets/phone_small.svg";
import Location from "../../assets/location_addresses.svg";
import { Button } from "@material-ui/core";
import POAddressCard from "../../models/Enum/POAddressCard";

export default function AddressCard(props) {
  const { variant = POAddressCard.default, onClickEdit, onSelectItem } = props;
  const { item = "" } = props;
  return (
    <div className={"grid col-span-1 space-y-2 px-5 py-4 rectangle-container"}>
      <div className={"flex flex-row justify-between"}>
        <span className={"text-lg font-bold tracking-tightest leading-6"}>
          {item?.address_name}
        </span>

        {variant !== POAddressCard.checkout &&
          variant !== POAddressCard.default && (
            <button onClick={onClickEdit}>
              <ReactSVG src={EditSquare} />
            </button>
          )}
      </div>
      <span className={"text-sm font-bold tracking-tightest"}>
        {item?.name}
      </span>
      <div className={"flex flex-row items-center space-x-2"}>
        <ReactSVG src={Call} />
        <span className={"text-sm tracking-tightest text-po-graymain"}>
          {item?.phone}
        </span>
      </div>
      <div className={"flex flex-row space-x-2"}>
        <ReactSVG src={Location} />
        <span className={"text-sm tracking-tightest text-po-graymain"}>
          {item?.formatted_address()}
        </span>
      </div>
      {variant === POAddressCard.checkout && (
        <Button
          variant="contained"
          color="secondary"
          className={"address-card-delivery-btn"}
          onClick={() => {
            if (onSelectItem) {
              onSelectItem();
            }
          }}
        >
          Deliver to this address
        </Button>
      )}
    </div>
  );
}
