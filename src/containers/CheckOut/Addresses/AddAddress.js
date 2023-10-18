import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider, TextField } from "@material-ui/core";
import clsx from "clsx";
import deleteIcon from "../../../utils/customSVG/deleteIcon";
import SearchIcon from "../../../assets/search-icon.svg";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { ReactSVG } from "react-svg";
import * as userActions from "../../../redux/UserSaga/actions";
import { connect } from "react-redux";
import APIManager from "../../../Network/APIManager";
import POSpinner from "../../../components/POSpinner";
import POAlert from "../../../components/POAlert";
import LocationService from "../../../services/LocationService";
import { RadioGroup } from "@headlessui/react";
import { classNames } from "../../Admin/CreateProduct/classes";

const useStyles = makeStyles((theme) => ({
  searchButton: {
    borderRadius: "0 10px 10px 0",
    width: "3.16rem",
    height: "3.16rem",
    backgroundColor: theme.palette.common.yellowextralight,
  },
  inputMobile: {
    borderRadius: "10px 0 0 10px",
    ["@media (min-width:768px)"]: {
      borderRadius: "10px",
    },
  },
  close: {
    color: theme.palette.common.graydark,
  },
  root: {
    paddingLeft: "3rem",
    paddingRight: "3rem",
    minHeight: "3rem",
  },
  cancelButton: {
    backgroundColor: theme.palette.common.graylight,
    "&:hover": {
      opacity: 1,
      backgroundColor: theme.palette.common.graylight,
    },
    display: "none",
    ["@media (min-width:640px)"]: {
      display: "flex",
    },
  },
}));

const validations = [
  {
    value: "name",
    label: "Recipient Name",
  },
  {
    value: "phone",
    label: "Phone",
  },
  {
    value: "address_l1",
    label: "Street Address 1",
  },
  // {
  //   value: "address_l2",
  //   label: "Street Address 2",
  // },
  {
    value: "city",
    label: "City / Town",
  },
  {
    value: "county",
    label: "County",
  },
  {
    value: "postcode",
    label: "Postcode",
  },
  {
    value: "address_name",
    label: "Address Friendly Name",
  },
];

function AddAddress(props) {
  const {
    item,
    handleCloseModal,
    handleUpdateAlert,
    handleRemove,
    user,
    currentLocation,
    currentAddress,
    handleAdded = (address) => {},
  } = props;
  const isEditMode = item != null;

  const username = `${user.first_name} ${user.last_name}`;
  const userPhone = user.phone;
  const [useCurrentAddress, setUseCurrentAddress] = useState(!isEditMode);

  const classes = useStyles();

  const [name, setName] = useState(item?.name ?? username ?? "");
  const [phone, setPhone] = useState(item?.phone ?? userPhone ?? "");
  const [streetAddress, setStreetAddress] = useState("");

  const [address1, setAddress1] = useState(item?.address_l1 ?? "");
  const [address2, setAddress2] = useState(item?.address_l2 ?? "");
  const [city, setCity] = useState(item?.city ?? "");
  const [county, setCounty] = useState(item?.county ?? "");
  const [postcode, setPostcode] = useState(item?.postcode ?? "");
  const [notes, setNotes] = useState(item?.notes ?? "");
  const [addressName, setAddressName] = useState(item?.address_name ?? "");
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = React.useState({ open: false });

  // useEffect(() => {
  //   if (!isEditMode) {
  //     LocationService.getAddress(
  //       Number(currentLocation.latitude),
  //       Number(currentLocation.longitude)
  //     ).then((location) => {
  //       console.log(location);
  //       if (location?.results?.length > 0) {
  //         let street1 = [];
  //         location?.results[0].address_components?.forEach((component) => {
  //           if (
  //             component.types.includes("locality") ||
  //             component.types.includes("postal_town")
  //           ) {
  //             setCity(component.long_name);
  //           }
  //           if (component.types.includes("postal_code")) {
  //             setPostcode(component.long_name);
  //           }
  //           if (component.types.includes("administrative_area_level_1")) {
  //             setCounty(component.long_name);
  //           }
  //           if (
  //             component.types.includes("street_number") ||
  //             component.types.includes("route")
  //           ) {
  //             street1.push(component.long_name);
  //           }
  //           if (component.types.includes("neighborhood")) {
  //             setAddress2(component.long_name);
  //           }
  //         });
  //         setAddress1(street1.join(", "));
  //       }
  //     });
  //   }
  // }, []);

  const handleSubmit = async () => {
    let body = {
      address_name: addressName,
      address_l1: address1,
      address_l2: address2,
      city,
      county,
      postcode,
      notes,
      name,
      phone,
    };

    if (useCurrentAddress) {
      const addresses = await getAddresses(currentAddress);
      body = {
        ...body,
        address_l1: addresses.address1,
        address_l2: addresses.address_l2,
        city: addresses.city,
        county: addresses.county,
        postcode: addresses.postcode,
      };
    }

    for (let validation of validations) {
      console.log(validation);
      if (body[validation.value] === "") {
        setAlertInfo({
          open: true,
          message: `The ${validation.label} field is required`,
          severity: "warning",
        });
        return;
      }
    }
    if (isEditMode) {
      setIsLoading(true);
      APIManager.updateAddress(user.id, item.id, body)
        .then((res) => {
          console.log("updateAddress: ", res);
          onSuccess("Address updated successfully!");
        })
        .catch((error) => onFailure(error));
    } else {
      setIsLoading(true);
      APIManager.createAddress(user.id, body)
        .then((res) => {
          onSuccess("Address created successfully!");
          handleAdded(res);
        })
        .catch((error) => onFailure(error));
    }
  };

  const onSuccess = (message) => {
    setIsLoading(false);
    props.actions.updateAddresses(user.id);
    handleCloseModal({ alertInfo: { open: true, message } });
  };

  const onFailure = (error) => {
    setIsLoading(false);
    handleUpdateAlert({
      open: true,
      message: error,
      severity: "error",
    });
  };

  const handleLookup = async () => {
    const addresses = await getAddresses(streetAddress);
    setCity(addresses.city ?? "");
    setPostcode(addresses.postcode ?? "");
    setCounty(addresses.county ?? "");
    setAddress1(addresses.address1 ?? "");
    setAddress2(addresses.address2 ?? "");
  };

  const getAddresses = async (stAddress) => {
    if (stAddress === "") {
      return {};
    }
    let addresses = {};
    try {
      let location = await LocationService.getLatLng(stAddress);
      // const address = await LocationService.getAddress(
      //   location.geometry.location.lat,
      //   location.geometry.location.lng
      // );
      // console.log(address);
      // location = await LocationService.getAddress(
      //   Number(currentLocation.latitude),
      //   Number(currentLocation.longitude)
      // );
      let street1 = [];
      location?.address_components?.forEach((component) => {
        if (
          component.types.includes("locality") ||
          component.types.includes("postal_town")
        ) {
          addresses = { ...addresses, city: component.long_name };
        }
        if (component.types.includes("postal_code")) {
          addresses = { ...addresses, postcode: component.long_name };
        }
        if (component.types.includes("administrative_area_level_1")) {
          addresses = { ...addresses, county: component.long_name };
        }
        if (
          component.types.includes("street_number") ||
          component.types.includes("route")
        ) {
          street1.push(component.long_name);
        }
        if (component.types.includes("neighborhood")) {
          addresses = { ...addresses, address2: component.long_name };
        }
      });
      addresses = { ...addresses, address1: street1.join(", ") };
    } catch (e) {
      console.log(e);
    }
    return addresses;
  };

  return (
    <div className={"flex flex-col bg-white add-address-modal-container"}>
      <PerfectScrollbar className={"flex flex-1 flex-col"}>
        <div
          className={
            "px-4 sm:px-7 my-2 sm:my-3 flex flex-row justify-between items-center"
          }
        >
          <span className={"modal-title"}>
            {isEditMode ? "Edit" : "Add new"} address
          </span>
          <button onClick={() => handleCloseModal()}>
            <Close className={classes.close} />
          </button>
        </div>
        <Divider />

        <div className={"flex flex-col mx-8 my-6"}>
          <form className="grid grid-cols-6">
            <p className="text-base text-po-graydark mr-6 col-span-1 text-right">
              Recipient:
            </p>
            <fieldset className="col-span-5">
              <div className="space-y-2">
                <div className="relative flex items-center">
                  <div className="flex items-center h-5">
                    <input
                      id="recipient"
                      name="plan"
                      type="radio"
                      checked={name === username}
                      onClick={() => {
                        setName(username);
                      }}
                      className="cursor-pointer focus:ring-po-graymain h-4 w-4 text-po-graymain border-gray-300"
                    />
                  </div>
                  <div className="ml-3 text-base">
                    <label
                      htmlFor="recipient"
                      className="font-medium text-po-black mr-1"
                    >
                      Me
                      <span>{` (${username})`}</span>
                    </label>
                  </div>
                </div>
                <div className="relative flex items-center w-full">
                  <div className="flex items-center h-5">
                    <input
                      id="someone-else"
                      name="plan"
                      type="radio"
                      checked={name !== username}
                      onClick={(event) => setName("")}
                      className="cursor-pointer focus:ring-po-graymain h-4 w-4 text-po-graymain border-gray-300"
                    />
                  </div>
                  <div className="ml-3 flex items-center text-base">
                    <label
                      htmlFor="someone-else"
                      className=" whitespace-nowrap font-medium text-po-black mr-1"
                    >
                      Someone else
                    </label>
                    {name !== username ? (
                      <div className="ml-4 w-full h-5 flex items-center">
                        <input
                          id="recipent_name"
                          type="text"
                          className={classNames.input}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
          <form className="grid grid-cols-6 mt-6">
            <p className="col-span-1 text-base text-po-graydark mr-6 col-span-1 text-right">
              Phone:
            </p>
            <RadioGroup className="col-span-5">
              <div className="space-y-2">
                <div className="relative flex items-center">
                  <div className="flex items-center h-5">
                    <input
                      id="phone"
                      name="plan"
                      type="radio"
                      checked={phone === userPhone}
                      onClick={(e) => setPhone(userPhone)}
                      className="cursor-pointer focus:ring-po-graymain h-4 w-4 text-po-graymain border-gray-300"
                    />
                  </div>
                  <div className="ml-3 text-base">
                    <label
                      htmlFor="phone"
                      className="font-medium text-po-black mr-1"
                    >
                      {userPhone}
                    </label>
                  </div>
                </div>
                <div className="relative flex items-center w-full">
                  <div className="flex items-center h-5">
                    <input
                      id="another-number"
                      name="plan"
                      type="radio"
                      checked={phone !== userPhone}
                      value={true}
                      onClick={(event) => setPhone("")}
                      className="cursor-pointer focus:ring-po-graymain h-4 w-4 text-po-graymain border-gray-300"
                    />
                  </div>
                  <div className="ml-3 flex items-center text-base">
                    <label
                      htmlFor="another-number"
                      className="whitespace-nowrap font-medium text-po-black mr-1"
                    >
                      Another number
                    </label>
                    {phone !== userPhone ? (
                      <div className="ml-4 w-full h-5 flex items-center">
                        <input
                          id="recipent_name"
                          type="text"
                          className={classNames.input}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </RadioGroup>
          </form>

          {/* TODO: Get the value of the whole address together here and save it if selected*/}
          <form className="grid grid-cols-6 mt-6">
            <p className="col-span-1 text-base text-po-graydark mr-6 col-span-1 text-right">
              Address:
            </p>
            <RadioGroup className="col-span-5">
              <div className="space-y-2">
                <div className="relative flex items-center">
                  <div className="flex items-center h-5">
                    <input
                      id="address"
                      name="plan"
                      type="radio"
                      checked={useCurrentAddress}
                      onClick={() => setUseCurrentAddress(true)}
                      className="cursor-pointer focus:ring-po-graymain h-4 w-4 text-po-graymain border-gray-300"
                    />
                  </div>
                  <div className="ml-3 text-base">
                    <label
                      htmlFor="address"
                      className="font-medium text-po-black mr-1"
                    >
                      {currentAddress}
                    </label>
                  </div>
                </div>
                <div className="relative flex items-center">
                  <div className="flex items-center h-5">
                    <input
                      id="another-address"
                      name="plan"
                      type="radio"
                      checked={!useCurrentAddress}
                      onClick={(event) => setUseCurrentAddress(false)}
                      className="cursor-pointer focus:ring-po-graymain h-4 w-4 text-po-graymain border-gray-300"
                    />
                  </div>
                  <div className="ml-3 text-base">
                    <label
                      htmlFor="another-address"
                      className="font-medium text-po-black mr-1"
                    >
                      Another address
                    </label>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </form>

          {!useCurrentAddress ? (
            <div className="flex flex-col ms-8 my-6">
              <div className={"flex flex-row overflow-hidden md:space-x-4"}>
                <TextField
                  id="find_your_address"
                  variant="outlined"
                  placeholder={"Enter address or Eircode"}
                  className={"flex flex-1"}
                  InputProps={{ classes: { root: classes.inputMobile } }}
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                />
                <div className="hidden md:block">
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.root}
                    onClick={() => handleLookup()}
                  >
                    Lookup address
                  </Button>
                </div>
                <div className="block md:hidden">
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.searchButton}
                    onClick={() => handleLookup()}
                  >
                    <ReactSVG src={SearchIcon} />
                  </Button>
                </div>
              </div>
              <div className={"flex flex-row flex-1 items-center mt-6 mb-2"}>
                <Divider className={"flex flex-1"} />
                <p className={"text-base text-po-graydark mx-6"}>OR</p>
                <Divider className={"flex flex-1"} />
              </div>
              <p className={"text-base text-center font-semibold my-2"}>
                Manually enter address
              </p>

              {/* TODO: all the fields here in the section below SHOULD NOT be pre-filled*/}
              <div className="border border-gray-200 shadow-sm border-solid rounded-lg py-4 px-4 mt-4">
                <div
                  className={
                    "flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-3 mt-4"
                  }
                >
                  <TextField
                    required
                    id="street-address1"
                    label="Street address 1"
                    variant="outlined"
                    className={"flex flex-1"}
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                  <TextField
                    id="street-address2"
                    label="Street address 2"
                    variant="outlined"
                    className={"flex flex-1"}
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
                <div
                  className={
                    "flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-3 mt-4"
                  }
                >
                  <TextField
                    required
                    id="city-town"
                    label="City / Town"
                    variant="outlined"
                    className={"flex flex-1"}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <TextField
                    required
                    id="county"
                    label="County"
                    variant="outlined"
                    className={"flex flex-1"}
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                  />
                  <TextField
                    required
                    id="postcode"
                    label="Postcode(Eircode)"
                    variant="outlined"
                    className={"flex flex-1"}
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                  />
                </div>
              </div>
            </div>
          ) : null}

          <div className={"flex flex-col mt-6"}>
            <TextField
              required
              id="address-name"
              label="Address friendly name"
              placeholder={"e.g. Home, Work or John's Place"}
              variant="outlined"
              className={"flex flex-1"}
              value={addressName}
              onChange={(e) => setAddressName(e.target.value)}
            />
          </div>
          <div className={"flex flex-1 mt-6"}>
            <TextField
              id="delivery-instructions"
              label="Delivery instructions (optional)"
              multiline
              rows={4}
              placeholder={"e.g. Press the buzzer for John Smith"}
              variant="outlined"
              className={"flex flex-1"}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div
          className={
            "h-12 mx-8 my-4 sm:mt-1 sm:mb-4 flex flex-row justify-between"
          }
        >
          {isEditMode ? (
            <button
              id={"remove"}
              className={"flex flex-row items-center space-x-1"}
              onClick={handleRemove}
            >
              {deleteIcon()}
              <p className={"text-sm font-bold text-po-reddark mt-0.5"}>
                Delete <span className="hidden md:inline">this address</span>
              </p>
            </button>
          ) : null}
          {/*
            <Button
              onClick={() => handleCloseModal()}
              variant="contained"
              color="secondary"
              className={clsx(classes.root, classes.cancelButton, "h-full")}
            >
              Cancel
            </Button>
            */}

          <Button
            variant="contained"
            color="secondary"
            className={clsx(classes.root, "h-full w-full")}
            onClick={handleSubmit}
          >
            {isEditMode ? "Save changes" : "Save address"}
          </Button>
        </div>
      </PerfectScrollbar>
      <POSpinner isLoading={isLoading} />
      <POAlert
        alertInfo={alertInfo}
        handleClose={() => setAlertInfo({ open: false })}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  userToken: state.User.userToken,
  user: state.User.user,
  currentLocation: state.User.currentLocation,
  currentAddress: state.User.currentAddress,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateAddresses: (userId) => {
      dispatch(userActions.updateAddresses(userId));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);
