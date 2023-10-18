import React, { useEffect, useState } from "react";
import "./styles.scss";
import background from "../../assets/landing-bg.jpeg";
import smallBackground from "../../assets/landing-bg-small.webp";
import mediumBackground from "../../assets/landing-bg-medium.webp";
import Decoration from "../../components/Decoration";
import SearchBar from "../../components/SearchBar";
import Footer from "../../components/POFooter";
import POHeader from "../../components/POHeader";
import POHeaderVariant from "../../models/Enum/POHeaderVariant";
import CurrentLocation from "./CurrentLocation";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import * as userActions from "../../redux/UserSaga/actions";
import { connect } from "react-redux";
import history from "../../routes/history";
import POAlert from "../../components/POAlert";
import LocationService from "../../services/LocationService";
import { getAppLink } from "../../utils/DevDetect";

const useStyles = makeStyles({
  root: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "right",
    ["@media (max-width:768px)"]: {
      backgroundImage: `url(${smallBackground})`,
      backgroundPositionY: 200,
      backgroundPosition: "left",
      minHeight: "85vh",
    },
    ["@media (min-width:1024px)"]: {
      backgroundImage: `url(${mediumBackground})`,
      backgroundPositionY: 0,
    },
    ["@media (min-width:1280px)"]: {
      backgroundImage: `url(${background})`,
      backgroundPosition: "right",
    },
  },
});

function Landing(props) {
  const classes = useStyles();
  const { userToken, user } = props;

  const [postcodeError, setPostcodeError] = React.useState("");

  const onPlaceSelected = (location, address) => {
    LocationService.validatePostcode(
      location.postcode,
      () => {
        props.actions.updateLocation(location, address);
        setTimeout(() => history.push("/home"), 150);
      },
      setPostcodeError
    );
  };

  const [readyToWrite, setReadyToWrite] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex w-full flex-col h-screen">
      <div className={clsx("flex-1 back", classes.root)}>
        <POHeader variant={POHeaderVariant.landing} />
        <div
          className={`mt-20 mx-4 sm:ml-12 ${readyToWrite ? "block" : "hidden"}`}
        >
          <div className={"flex items-center 2xl:ml-14"}>
            <Decoration onLoaded={() => setReadyToWrite(true)} />
            <div className={"sub-title ml-2"}>Ireland’s finest food,</div>
          </div>
          <div
            className={
              "flex items-center justify-end sm:justify-start sm:ml-48 2xl:ml-60"
            }
          >
            <div className={"sub-title mr-2"}>all in one place</div>
            <Decoration onLoaded={() => {}} />
          </div>
          <div
            className={
              "flex flex-col inline-flex  max-w-lg mt-4 ml-0 2xl:w-3/12 2xl:ml-14"
            }
          >
            {userToken ? (
              <div className={"px-6 mt-4"}>
                <p className="item-title tracking-wide">
                  Hi, {user?.first_name}!
                </p>
              </div>
            ) : null}

            <SearchBar
              onPlaceSelected={onPlaceSelected}
              setPostcodeError={setPostcodeError}
            />
            {postcodeError !== "" && (
              <span
                className={
                  "text-po-red font-xs font-semibold ml-2 sm:ml-5 mb-2"
                }
              >
                {postcodeError}
              </span>
            )}
            <CurrentLocation onPlaceSelected={onPlaceSelected} />
            {/*<a*/}
            {/*  target="_blank"*/}
            {/*  rel="noopener noreferrer"*/}
            {/*  href={getAppLink()}*/}
            {/*  className={*/}
            {/*    "block sm:hidden mb-40 self-center font-semibold bg-po-primary rounded-xl py-3 font-white text-lg mx-4 text-center w-full"*/}
            {/*  }*/}
            {/*>*/}
            {/*  Download our app*/}
            {/*</a>*/}
          </div>
        </div>
      </div>
      <div className="-mt-1">
        <Footer />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userToken: state.User.userToken,
  userOrders: state.User.userOrders,
  user: state.User.user,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateLocation: (location, address) => {
      dispatch(userActions.updateLocation(location, address));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
