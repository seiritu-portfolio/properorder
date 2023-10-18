import React from "react";
import "./styles.scss";
import { Button, makeStyles } from "@material-ui/core";
import SearchIcon from "../../assets/search-icon.svg";
import { ReactSVG } from "react-svg";
import POAutoComplete from "../POAutoComplete";
import LocationService from "../../services/LocationService";
import clsx from "clsx";
import POAlert from "../POAlert";
import POSpinner from "../POSpinner";

const useStyles = makeStyles({
  button: {
    borderRadius: "0 0.5625rem 0.5625rem 0",
    padding: "1rem",
    backgroundColor: "#FFDAAB",
  },
});

export default function SearchBar(props) {
  const autoCompleteRef = React.useRef(null);
  const [focused, setFocused] = React.useState(false);
  const [empty, setEmpty] = React.useState(false);

  const [alertInfo, setAlertInfo] = React.useState({ open: false });
  const [isLoading, setIsLoading] = React.useState(false);

  const { onPlaceSelected, setPostcodeError, containerClassName = "" } = props;
  const classes = useStyles();

  // const handlePlaceSelected = (places) => {
  //   if (places.geometry == null) {
  //     handlePressSearch();
  //     return;
  //   }
  //
  //   const latitude = places.geometry.location.lat();
  //   const longitude = places.geometry.location.lng();
  //
  //   LocationService.getAddress(latitude, longitude)
  //     .then((addressComponent) => {
  //       onPlaceSelected(
  //         {
  //           latitude,
  //           longitude,
  //           postcode: LocationService.fetchPostCode(addressComponent),
  //         },
  //         LocationService.getFormattedAddressFromPlaces(places)
  //       );
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handlePressSearch = async () => {
    const address = autoCompleteRef.current.value;
    if (address === "") {
      setEmpty(true);
      setAlertInfo({
        open: true,
        message: "Please enter your location address",
        severity: "warning",
      });
      return;
    }

    setIsLoading(true);

    let location;

    try {
      location = await LocationService.getLatLng(address);
    } catch {
      setIsLoading(false);
      setEmpty(true);
      setAlertInfo({
        open: true,
        message: "We can't find that location",
        severity: "warning",
      });
      return;
    }

    const latitude = location.geometry.location.lat;
    const longitude = location.geometry.location.lng;

    LocationService.getAddress(latitude, longitude)
      .then((addressComponent) => {
        setIsLoading(false);
        onPlaceSelected(
          {
            latitude,
            longitude,
            postcode: LocationService.fetchPostCode({
              ...addressComponent,
              results: [...addressComponent.results, location],
            }),
          },
          location.formatted_address ?? ""
        );
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <div
      className={clsx(
        "flex flex-row sm:ml-4 mt-6 search-bar mb-4",
        empty && "search-bar-warning",
        focused && "search-bar-focus",
        containerClassName
      )}
    >
      <POAutoComplete
        ref={autoCompleteRef}
        className={"w-92 sm:w-96"}
        variant={"secondary"}
        onPlaceSelected={() => handlePressSearch()}
        onFocus={() => {
          setFocused(true);
          setEmpty(false);
        }}
        onBlur={() => setFocused(false)}
        setPostcodeError={setPostcodeError}
      />
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={() => handlePressSearch()}
      >
        <ReactSVG src={SearchIcon} />
      </Button>
      <POAlert
        alertInfo={alertInfo}
        handleClose={() => setAlertInfo({ open: false })}
      />
      <POSpinner isLoading={isLoading} />
    </div>
  );
}
