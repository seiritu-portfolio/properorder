import React from "react";
import LocationAbout from "../../../assets/location_about.svg";
import World from "../../../assets/world.svg";
import Call from "../../../assets/phone.svg";
import Email from "../../../assets/email.svg";
import { ReactSVG } from "react-svg";
import clsx from "clsx";
import LocationService from "../../../services/LocationService";

export default function ContactInfo(props) {
  const { seller } = props;
  const itemClass =
    "font-semibold text-xl ml-2 tracking-tightest leading-extra-tight";
  const renderItem = (icon, value) => (
    <div className={"flex flex-row mt-5 items-center"}>
      <ReactSVG src={icon} className={"h-full"} />
      {icon === World ? (
        <a
          rel="noreferrer"
          target="_blank"
          className={clsx(itemClass, "text-po-blue")}
          href={seller.website}
        >
          {value}
        </a>
      ) : (
        <span className={itemClass}>{value}</span>
      )}
    </div>
  );
  return (
    <div>
      <h2 className={"uppercase mt-4"}>Contact info</h2>
      {renderItem(LocationAbout, LocationService.getFormattedAddress(seller))}
      {seller.website ? <>{renderItem(World, seller.website)}</> : null}

      {renderItem(Call, seller.phone)}
      <div className={"flex flex-row mt-5 items-center"}>
        <ReactSVG src={Email} className={"h-full"} />
        <a
          href={`mailto:${seller.email}?subject=Customer Query`}
          className={itemClass}
        >
          {seller.email}
        </a>
      </div>
    </div>
  );
}
