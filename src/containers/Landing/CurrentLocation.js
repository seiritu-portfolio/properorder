import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import nearIcon from "../../assets/near_me.svg";
import { Divider } from "@material-ui/core";
import { NavigateNextRounded } from "@material-ui/icons";
import history from "../../routes/history";
import { connect } from "react-redux";
import AddressSelectionItem from "../../components/AddressSelectionItem";
import LocationService from "../../services/LocationService";
import * as userActions from "../../redux/UserSaga/actions";
import POSpinner from "../../components/POSpinner";
import POAlert from "../../components/POAlert";

function CurrentLocation(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = React.useState({ open: false });

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
            history.push("/home");
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

  const handleUserAddressClick = (item) => {
    props.onPlaceSelected(
      {
        latitude: item.lat ?? 53.2799235,
        longitude: item.long ?? -6.1860365,
        postcode: item.postcode ?? "",
      },
      item?.formatted_address() ?? ""
    );
  };

  const { userToken, userAddresses } = props;

  if (userToken && userAddresses.length === 0) {
    return null;
  }

  return (
    <>
      <div className={"sub-title ml-4 text-use"}>or use</div>
      <div className="flex flex-1 flex-col px-2 bg-white shadow-lg rounded-xl mt-4 mb-4 sm:mb-60 sm:ml-4">
        {/*<button*/}
        {/*  className={*/}
        {/*    "flex flex-row flex-1 pl-2 py-4 items-center justify-between"*/}
        {/*  }*/}
        {/*  onClick={handlePressCurrentLocation}*/}
        {/*>*/}
        {/*  <div className={"flex flex-row"}>*/}
        {/*    <ReactSVG src={nearIcon} />*/}
        {/*    <span className={"current-location-text ml-2"}>Current location</span>*/}
        {/*  </div>*/}
        {/*  <NavigateNextRounded fontSize={"large"} color={"secondary"} />*/}
        {/*</button>*/}
        {/*<Divider />*/}
        {!userToken ? (
          <div className={"flex flex-row pl-2 py-4"}>
            <button
              className={
                "recent-addresses-text text-po-yellowmedium font-semibold mr-1"
              }
              onClick={() => history.push("/login-with-password")}
            >
              Log in
            </button>
            <span className={"recent-addresses-text"}>
              for your recent addresses
            </span>
          </div>
        ) : (
          <div className={"flex flex-col divide-y divide-light py-2"}>
            {userAddresses.map((item, index) => (
              <AddressSelectionItem
                key={index}
                item={item}
                onClick={() => handleUserAddressClick(item)}
              />
            ))}
          </div>
        )}
        <POSpinner isLoading={isLoading} />
        <POAlert
          alertInfo={alertInfo}
          handleClose={() => setAlertInfo({ open: false })}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  userToken: state.User.userToken,
  userAddresses: state.User.userAddresses,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateLocation: (location, address) => {
      dispatch(userActions.updateLocation(location, address));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentLocation);
