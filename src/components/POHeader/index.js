import React, { useEffect } from "react";
import { Button, makeStyles } from "@material-ui/core";
import Logo from "../Logo";
import clsx from "clsx";
import { ReactSVG } from "react-svg";
import LocationIcon from "../../assets/ic_location.svg";
import ExpandMoreIcon from "../../assets/expand_more.svg";
import WhiteExpandMoreIcon from "../../assets/expand_more_white.svg";
import Notification from "../Notification";
import SearchBy from "../SearchBy";
import POMenu from "./POMenu";
import PropTypes from "prop-types";
import POHeaderVariant from "../../models/Enum/POHeaderVariant";
import history from "../../routes/history";
import POModal from "../POModal";
import ChooseLocation from "../ChooseLocation";
import { connect } from "react-redux";
import POAlert from "../POAlert";

const useStyles = makeStyles({
  secondaryButton: {
    marginTop: "10px",
    borderWidth: 0,
    color: "white",
  },
  primaryButton: {
    marginTop: "13px",
    border: "1px solid #F0F0F5",
    backgroundColor: "#FFFFFF",
  },
});

function POHeader(props) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const { variant = POHeaderVariant.primary, searchInputProps } = props;
  const isSecondary = variant === POHeaderVariant.secondary;
  const classes = useStyles();

  const navigateTo = (path) => history.push(`/${path}`);

  const [alertInfo, setAlertInfo] = React.useState({ open: false });

  const {
    userToken,
    currentAddress,
    classNames,
    locationRequired = false,
    handleClearAll,
    isWhite = false,
  } = props;

  useEffect(() => {
    if (locationRequired) {
      setModalVisible(true);
    }
  }, [locationRequired]);

  const handleCloseModal = () => {
    if (!locationRequired) {
      setModalVisible(false);
    } else {
      setAlertInfo({
        open: true,
        message: "Please enter your location address",
        severity: "warning",
      });
    }
  };

  const handleSelectLocation = () => {
    setModalVisible(false);
  };

  if (
    variant === POHeaderVariant.auth ||
    variant === POHeaderVariant.landing ||
    variant === POHeaderVariant.newLanding
  ) {
    return (
      <div
        className={clsx(
          "flex justify-between pb-6",
          variant === POHeaderVariant.auth && "auth-nav",
          classNames
        )}
      >
        <Logo to={"/home"} isWhite={isWhite} />
        {variant === POHeaderVariant.landing ||
        variant === POHeaderVariant.newLanding ? (
          !userToken && (
            <div className="flex h-11 mr-6 mt-8 space-x-0.5 relative">
              <Button
                variant="contained"
                color="primary"
                className="w-24"
                onClick={() => navigateTo("login-with-password")}
              >
                Log in
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className="w-24"
                onClick={() => navigateTo("register-first")}
              >
                Sign up
              </Button>
              <div className="rounded-full h-7 w-7 flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 header-or">
                <p className="-mt-0.5 md:mt-0">or</p>
              </div>
            </div>
          )
        ) : (
          <POMenu className={"mr-8"} />
        )}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "flex flex-wrap justify-between md:grid md:grid-cols-7 lg:grid-cols-6 2xl:grid-cols-7 sm:gap-4 z-50",
        classNames
      )}
    >
      <div className="md:col-span-2 lg:col-span-1">
        <Logo isWhite={isSecondary} handleClearAll={handleClearAll} />
      </div>
      <div
        className={
          "w-1/2 md:w-auto flex ml-16 mr-4 md:mx-2 lg:mx-0 col-span-3 lg:col-span-1"
        }
      >
        <Button
          variant="outlined"
          className={clsx(
            "flex h-12 mt-1",
            variant === POHeaderVariant.secondary
              ? classes.secondaryButton
              : classes.primaryButton
          )}
          onClick={() => setModalVisible(true)}
        >
          <ReactSVG src={LocationIcon} className="mr-1" />
          <p
            className={
              "truncate text-sm font-normal header-current-address-label"
            }
          >
            {currentAddress}
          </p>
          <ReactSVG
            src={isSecondary ? WhiteExpandMoreIcon : ExpandMoreIcon}
            className={"ml-2 mt-1"}
          />
        </Button>
      </div>
      {variant === POHeaderVariant.home && (
        <SearchBy
          className={
            "flex-grow lg:flex-grow-0 order-last lg:order-none md:col-span-7 lg:col-span-3 2xl:col-span-4 mx-4 -mt-1 mb-3 lg:mt-3 lg:mr-12 lg:ml-3 hidden lg:flex"
          }
          searchInputProps={searchInputProps}
          placeholder="Search by product or seller"
        />
      )}
      <div
        className={
          "flex flex-row justify-end lg:justify-between mt-1 px-3 sm:px-8 lg:pl-0 lg:pr-4 mb-2 z-20 xl:px-8 md:col-end-8 lg:col-end-7 2xl:col-end-8"
        }
      >
        <div className="notification-container">
          <Notification />
        </div>
        <POMenu isWhite={isSecondary} />
      </div>
      <POModal
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        renderContent={() => (
          <ChooseLocation
            handleCloseModal={handleCloseModal}
            handleSelectLocation={handleSelectLocation}
            alertInfo={alertInfo}
            setAlertInfo={setAlertInfo}
          />
        )}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  userToken: state.User.userToken,
  currentLocation: state.User.currentLocation,
  currentAddress: state.User.currentAddress,
});

export default connect(mapStateToProps, null)(POHeader);

POHeader.propTypes = {
  variant: PropTypes.string,
};
