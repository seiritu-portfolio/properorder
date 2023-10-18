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
    handleAdded = (address) => {},
  } = props;
  const isEditMode = item != null;

  const [name, setName] = useState(item?.name ?? user.first_name ?? "");
  const [phone, setPhone] = useState(item?.phone ?? user.phone ?? "");
  // const [streetAddress, setStreetAddress] = useState("");
  const [address1, setAddress1] = useState(item?.address_l1 ?? "");
  const [address2, setAddress2] = useState(item?.address_l2 ?? "");
  const [city, setCity] = useState(item?.city ?? "");
  const [county, setCounty] = useState(item?.county ?? "");
  const [postcode, setPostcode] = useState(item?.postcode ?? "");
  const [notes, setNotes] = useState(item?.notes ?? "");
  const [addressName, setAddressName] = useState(item?.address_name ?? "");
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = React.useState({ open: false });

  useEffect(() => {
    if (!isEditMode) {
      LocationService.getAddress(
        Number(currentLocation.latitude),
        Number(currentLocation.longitude)
      ).then((location) => {
        console.log(location);
        if (location?.results?.length > 0) {
          let street1 = [];
          location?.results[0].address_components?.forEach((component) => {
            if (
              component.types.includes("locality") ||
              component.types.includes("postal_town")
            ) {
              setCity(component.long_name);
            }
            if (component.types.includes("postal_code")) {
              setPostcode(component.long_name);
            }
            if (component.types.includes("administrative_area_level_1")) {
              setCounty(component.long_name);
            }
            if (
              component.types.includes("street_number") ||
              component.types.includes("route")
            ) {
              street1.push(component.long_name);
            }
            if (component.types.includes("neighborhood")) {
              setAddress2(component.long_name);
            }
          });
          setAddress1(street1.join(", "));
        }
      });
    }
  }, []);

  const handleSubmit = () => {
    const body = {
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

  // const handleLookup = async () => {
  //   try {
  //     location = await LocationService.getAddress(
  //       Number(currentLocation.latitude),
  //       Number(currentLocation.longitude)
  //     );
  //     console.log("handleLookup", location);
  //     let street1 = [];
  //     location?.address_components?.forEach((component) => {
  //       if (
  //         component.types.includes("locality") ||
  //         component.types.includes("postal_town")
  //       ) {
  //         setCity(component.long_name);
  //       }
  //       if (component.types.includes("postal_code")) {
  //         setPostcode(component.long_name);
  //       }
  //       if (component.types.includes("administrative_area_level_1")) {
  //         setCounty(component.long_name);
  //       }
  //       if (
  //         component.types.includes("street_number") ||
  //         component.types.includes("route")
  //       ) {
  //         street1.push(component.long_name);
  //       }
  //       if (component.types.includes("neighborhood")) {
  //         setAddress2(component.long_name);
  //       }
  //     });
  //     setAddress1(street1.join(", "));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const classes = useStyles();

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
          <TextField
            required
            id="address-name"
            label="Address name"
            placeholder={"e.g. Home, Work or John's Place"}
            variant="outlined"
            className={"flex flex-1"}
            value={addressName}
            onChange={(e) => setAddressName(e.target.value)}
          />
          <div className={"grid grid-cols-8 gap-5 mt-6"}>
            <TextField
              required
              id="recipient-name"
              label="Recipient name"
              variant="outlined"
              className={"col-span-8 md:col-span-5"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              required
              id="phone"
              label="Phone"
              variant="outlined"
              className={"col-span-8 md:col-span-3"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {/*<p className={"text-base font-semibold mt-5 mb-2"}>*/}
          {/*  Find your address*/}
          {/*</p>*/}
          {/*<div className={"flex flex-row overflow-hidden md:space-x-4"}>*/}
          {/*  <TextField*/}
          {/*    id="find_your_address"*/}
          {/*    variant="outlined"*/}
          {/*    placeholder={"Enter your Postcode(Eircode) or street address"}*/}
          {/*    className={"flex flex-1"}*/}
          {/*    InputProps={{ classes: { root: classes.inputMobile } }}*/}
          {/*    value={streetAddress}*/}
          {/*    onChange={(e) => setStreetAddress(e.target.value)}*/}
          {/*  />*/}
          {/*  <div className="hidden md:block">*/}
          {/*    <Button*/}
          {/*      variant="contained"*/}
          {/*      color="secondary"*/}
          {/*      className={classes.root}*/}
          {/*      onClick={() => handleLookup()}*/}
          {/*    >*/}
          {/*      Lookup address*/}
          {/*    </Button>*/}
          {/*  </div>*/}
          {/*  <div className="block md:hidden">*/}
          {/*    <Button*/}
          {/*      variant="contained"*/}
          {/*      color="secondary"*/}
          {/*      className={classes.searchButton}*/}
          {/*      onClick={() => handleLookup()}*/}
          {/*    >*/}
          {/*      <ReactSVG src={SearchIcon} />*/}
          {/*    </Button>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className={"flex flex-row flex-1 items-center mt-6 mb-2"}>*/}
          {/*  <Divider className={"flex flex-1"} />*/}
          {/*  <p className={"text-base text-po-graydark mx-6"}>OR</p>*/}
          {/*  <Divider className={"flex flex-1"} />*/}
          {/*</div>*/}
          {/*<p className={"text-base font-semibold my-2"}>*/}
          {/*  Manually enter address*/}
          {/*</p>*/}
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
          <div className={"flex flex-1 mt-6"}>
            <TextField
              id="delivery-instructions"
              label="Delivery instructions"
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
        <div className={"h-12 mx-8 my-4 sm:my-8 flex flex-row justify-between"}>
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
          ) : (
            <Button
              onClick={() => handleCloseModal()}
              variant="contained"
              color="secondary"
              className={clsx(classes.root, classes.cancelButton, "h-full")}
            >
              Cancel
            </Button>
          )}
          <Button
            variant="contained"
            color="secondary"
            className={clsx(classes.root, "h-full")}
            onClick={handleSubmit}
          >
            {isEditMode ? "Save changes" : "Add address"}
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
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateAddresses: (userId) => {
      dispatch(userActions.updateAddresses(userId));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);
