import React from "react";
import { classNames } from "./classes";
import { BsFillPersonFill } from "react-icons/bs";
import { RiPhoneFill } from "react-icons/ri";
import { MdMail } from "react-icons/md";
import clsx from "clsx";
import { ImLocation } from "react-icons/im";
import { POAddress } from "../../../models";

export default function CustomerDetails({ customer, customerAddress }) {
  const address = POAddress.fromState(customerAddress);
  return (
    <div className={clsx(classNames.headerContainer, "col-span-2")}>
      <header className={classNames.headerTitle}>
        Customer contact details
      </header>
      <div className={"flex flex-col sm:flex-row sm:space-x-8"}>
        <div className={classNames.itemContainer}>
          <span className={classNames.itemTitle}>Customer details:</span>
          <div className={classNames.item}>
            <BsFillPersonFill className={classNames.icon} />
            <span>
              {customer?.first_name ?? ""} {customer?.last_name ?? ""}
            </span>
          </div>
          <div className={classNames.item}>
            <RiPhoneFill className={classNames.icon} />
            <span>{customer?.phone ?? ""}</span>
          </div>
          {/*<div className={classNames.item}>*/}
          {/*  <MdMail className={classNames.icon} />*/}
          {/*  <span>{customer?.email ?? ""}</span>*/}
          {/*</div>*/}
        </div>

        {customerAddress && (
          <div className={classNames.itemContainer}>
            <span className={classNames.itemTitle}>Delivery address:</span>
            <span className={"text-base font-semibold text-po-black mt-1"}>
              {address?.address_name ?? ""}
            </span>
            <div className={clsx(classNames.item, "text-po-graydark")}>
              <RiPhoneFill className={classNames.icon} />
              <span>{address?.phone ?? ""}</span>
            </div>
            <div className={clsx(classNames.item, "text-po-graydark")}>
              <ImLocation className={classNames.icon} />
              <span>{address?.formatted_address()}</span>
            </div>
            <div
              className={
                "mt-2 block text-base text-po-black items-center px-2 py-1"
              }
            >
              <span className={"font-bold"}>Delivery notes:</span>
              <span className={"ml-2"}>{address?.notes ?? "No notes"}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
