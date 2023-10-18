import React, { useState } from "react";
import "./styles.scss";
import SearchIcon from "../../assets/search-icon-yellow.svg";
import { ReactSVG } from "react-svg";
import clsx from "clsx";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import usePlacesAutocomplete from "@atomap/use-places-autocomplete";

const POAutoComplete = React.forwardRef((props, ref) => {
  const {
    className,
    variant = "primary",
    onPlaceSelected,
    onClickIndicator,
    onFocus,
    onBlur,
    currentAddress,
    setPostcodeError,
  } = props;
  const isPrimary = () => variant === "primary";

  // const {
  //   ready,
  //   value,
  //   suggestions: { status, data },
  //   setValue,
  // } = usePlacesAutocomplete({
  //   requestOptions: {
  //     componentRestrictions: { country: ["ie"] },
  //   },
  // });

  const [searchValue, setSearchValue] = useState(currentAddress ?? "");
  const { predictions, error } = usePlacesAutocomplete(searchValue, {
    componentRestrictions: { country: ["ie"] },
  });

  const [popupHidden, setPopupHidden] = useState(true);

  const handleInput = (e) => {
    setPopupHidden(false);
    const v = e.target.value;
    setSearchValue(v);
    setPostcodeError("");
  };

  const handleSelect = (val) => {
    setSearchValue(val);
    setPopupHidden(true);
    setTimeout(() => onPlaceSelected(), 150);
  };

  const renderSuggestions = () => {
    const suggestions = predictions?.map(({ place_id, description }) => (
      <ComboboxOption key={place_id} value={description} />
    ));

    return (
      <div className={"flex flex-col bg-white p-2 rounded-lg"}>
        {suggestions}
        <li className="flex justify-end">
          <img
            src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
            alt="Powered by Google"
            style={{ height: "0.8rem", objectFit: "contain" }}
          />
        </li>
      </div>
    );
  };

  return (
    <div className={clsx("auto-complete-container p-1 pr-4", className)}>
      <Combobox onSelect={handleSelect} aria-labelledby="auto-complete">
        <ComboboxInput
          ref={ref}
          style={{ width: "100%" }}
          value={searchValue}
          onChange={handleInput}
          // disabled={!ready}
          onFocus={onFocus}
          // onBlur={onBlur}
          placeholder={isPrimary() ? "" : "Enter address to find local sellers"}
        />
        {searchValue !== "" && predictions?.length > 0 && !popupHidden && (
          <div className={"data-reach-combobox-popover"}>
            <ComboboxList>{renderSuggestions()}</ComboboxList>
          </div>
        )}
      </Combobox>
      {isPrimary() && (
        <ReactSVG
          src={SearchIcon}
          className={"text-2xl text-po-yellowlight ml-4 cursor-pointer"}
          onClick={() => {
            onClickIndicator();
          }}
        />
      )}
    </div>
  );
});

export default POAutoComplete;
