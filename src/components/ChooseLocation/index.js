import React, { useState } from "react";
import "./styles.scss";
import { Close, NavigateNextRounded } from "@material-ui/icons";
import { Divider } from "@material-ui/core";
import POAutoComplete from "../POAutoComplete";
import AddressSelectionItem from "../AddressSelectionItem";
import * as userActions from "../../redux/UserSaga/actions";
import { connect } from "react-redux";
import LocationService from "../../services/LocationService";
import clsx from "clsx";
import POAlert from "../POAlert";
import POSpinner from "../../components/POSpinner";

function ChooseLocation(props) {
  const autoCompleteRef = React.useRef(null);
  const {
    handleCloseModal,
    userAddresses,
    handleSelectLocation,
    alertInfo,
    setAlertInfo,
  } = props;

  const [focused, setFocused] = React.useState(false);
  const [empty, setEmpty] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [postcodeError, setPostcodeError] = React.useState("");

  const onPlaceSelected = (location, address) => {
    LocationService.validatePostcode(
      location.postcode,
      () => {
        props.actions.updateLocation(location, address);
        handleSelectLocation();
      },
      setPostcodeError
    );
  };

  const handlePressCurrentLocation = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      function (position) {
        LocationService.getAddress(
          position.coords.latitude,
          position.coords.longitude
        )
          .then((addressComponent) => {
            props.actions.updateLocation(
              {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                postcode: LocationService.fetchPostCode(addressComponent),
              },
              addressComponent.results[0].formatted_address ?? ""
            );
            setIsLoading(false);
            handleSelectLocation();
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
          });
      },
      function error(err) {
        setIsLoading(false);
        console.log(err);
        let message = err.message;
        if (message === "User denied Geolocation") {
          message = "Please enable your current location";
        }
        setAlertInfo({
          open: true,
          message,
          severity: "warning",
        });
      }
    );
  };

  // const handlePlaceSelected = (places) => {
  //   if (places.geometry == null) {
  //     handlePlaceInput();
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

  const handlePlaceInput = async () => {
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

    try {
      const location = await LocationService.getLatLng(address);
      const latitude = location.geometry.location.lat;
      const longitude = location.geometry.location.lng;

      LocationService.getAddress(latitude, longitude)
        .then((addressComponent) => {
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
        });
    } catch {
      setEmpty(true);
      setAlertInfo({
        open: true,
        message: "We can't find that location",
        severity: "warning",
      });
    }
  };

  const handleUserAddressSelected = (item) => {
    onPlaceSelected(
      {
        latitude: item.lat ?? 53.2799235,
        longitude: item.long ?? -6.1860365,
        postcode: item.postcode ?? "",
      },
      item?.formatted_address() ?? ""
    );
  };

  return (
    <div className={"flex flex-col bg-white choose-location-modal-container"}>
      <div
        className={
          "px-4 sm:px-7 my-2 sm:my-3 flex flex-row justify-between items-center"
        }
      >
        <span className={"modal-title"}>Choose your location</span>
        <button onClick={handleCloseModal}>
          <Close className={"text-po-graydark"} />
        </button>
      </div>
      <Divider />
      <div className={"mt-6 mb-12 mx-7"}>
        <p className={"text-lg leading-extra-tight mb-2"}>Enter your address</p>
        <POAutoComplete
          className={clsx(
            "border rounded-xl",
            focused ? "border-po-yellowlight" : "border-po-graymedium",
            empty && "border-po-red"
          )}
          ref={autoCompleteRef}
          currentAddress={props.currentAddress}
          onClickIndicator={handlePlaceInput}
          onPlaceSelected={() => handlePlaceInput()}
          onFocus={() => {
            setFocused(true);
            setEmpty(false);
          }}
          onBlur={() => setFocused(false)}
          setPostcodeError={setPostcodeError}
        />
        {postcodeError !== "" && (
          <span
            className={"text-po-red font-xs font-semibold ml-2 inline-block"}
          >
            {postcodeError}
          </span>
        )}
        {userAddresses.length > 0 && (
          <>
            <p className={clsx("text-base text-po-graydark my-3")}>or use</p>
            <div
              className={
                "flex flex-col shadow rounded-xl divide-y divide-light px-4 py-2"
              }
            >
              {/*<button*/}
              {/*  className={"flex flex-row flex-1 py-2 items-center justify-between"}*/}
              {/*  onClick={handlePressCurrentLocation}*/}
              {/*>*/}
              {/*  <div className={"flex flex-row items-center"}>*/}
              {/*    <ReactSVG src={nearIcon} />*/}
              {/*    <span className={"text-base ml-2"}>Current location</span>*/}
              {/*  </div>*/}
              {/*  <NavigateNextRounded fontSize={"large"} color={"secondary"} />*/}
              {/*</button>*/}
              <div>
                {userAddresses.map((item, index) => (
                  <AddressSelectionItem
                    key={index}
                    item={item}
                    onClick={() => handleUserAddressSelected(item)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <POAlert
        alertInfo={alertInfo}
        handleClose={() => setAlertInfo({ open: false })}
      />
      <POSpinner isLoading={isLoading} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  userToken: state.User.userToken,
  userAddresses: state.User.userAddresses,
  currentAddress: state.User.currentAddress,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateLocation: (location, address) => {
      dispatch(userActions.updateLocation(location, address));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseLocation);
