import React from "react";
import clsx from "clsx";
import { classNames } from "../Admin/CreateProduct/classes";

const giftNotesOptions = [
  { id: "yes", title: "No", value: false },
  { id: "no", title: "Yes", value: true },
];

export default function Gift({
  isGift,
  setIsGift,
  giftNotes,
  setGiftNotes,
  deliveryDetailNeeded,
}) {
  const containerClasses = {
    container: "shadow-lg rounded-xl px-3 sm:px-6 py-3 sm:py-4 my-2 sm:my-6",
    containerTitle: "flex flex-row space-x-3 items-center mb-4",
  };

  return (
    <div className={containerClasses.container}>
      <div className={containerClasses.containerTitle}>
        <p className={"step-text"}>{deliveryDetailNeeded ? "3" : "2"}</p>
        <p className={"check-out-sub-title"}>Is this a gift?</p>
        <fieldset className="pl-6">
          <legend className="sr-only">Gift</legend>
          <div className="flex tems-center space-y-0 space-x-8">
            {giftNotesOptions.map((giftNoteOption) => (
              <div key={giftNoteOption.id} className="flex items-center">
                <input
                  value={giftNoteOption.value}
                  onClick={(event) => setIsGift(giftNoteOption.value)}
                  id={giftNoteOption.id}
                  name="notification-method"
                  type="radio"
                  checked={giftNoteOption.value === isGift}
                  className="cursor-pointer focus:ring-transparent h-4 w-4 text-po-primarydark font-semibold border-gray-300"
                />
                <label
                  htmlFor={giftNoteOption.id}
                  className="cursor-pointer  ml-3 block text-base font-semibold text-po-black"
                >
                  {giftNoteOption.title}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>

      {isGift ? (
        <div>
          <p className={classNames.inputLabel}>Gift note</p>
          <textarea
            id="description"
            className={clsx(classNames.input, "m-h-32")}
            value={giftNotes}
            onChange={(e) => setGiftNotes(e.target.value)}
          />
          <p className={classNames.inputDescription}>
            The seller will attach the gift note to the order
          </p>
        </div>
      ) : null}
    </div>
  );
}
