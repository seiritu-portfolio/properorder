import React from "react";
import "./styles.scss";
import LocationIcon from "../../assets/ic_location.svg";
import { ReactSVG } from "react-svg";
import { NavigateNextRounded } from "@material-ui/icons";

export default function AddressSelectionItem(props) {
  const { item, onClick } = props;
  return (
    <div
      className={"flex flex-row items-center py-2 cursor-pointer"}
      onClick={onClick}
    >
      <ReactSVG src={LocationIcon} />
      <p className={"address-selection-item-text ml-2"}>
        {item?.formatted_address()}
      </p>
      <NavigateNextRounded
        fontSize={"large"}
        color={"secondary"}
        className={"ml-auto"}
      />
    </div>
  );
}
