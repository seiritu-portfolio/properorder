import React, { useState } from "react";
import "../styles.scss";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { ReactSVG } from "react-svg";
import PlasticIcon from "../../../assets/plastic.svg";

import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import APIManager from "../../../Network/APIManager";
import { connect } from "react-redux";
import POSpinner from "../../../components/POSpinner";
import * as userActions from "../../../redux/UserSaga/actions";

//Image Stepper
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import ProductImagePlaceholder from "../../../assets/image_placeholder.png";

const useStyles = makeStyles((theme) => ({
  heart: {
    color: "#F36262",
  },
  favouritesIcon: {
    position: "absolute",
    right: "0.2rem",
    top: "0.2rem",
    backgroundColor: "#fff !important",
    zIndex: "1000",
    border: "1px solid #F0F0F5 !important",
    "&:hover": {
      backgroundColor: "#F0F0F5 !important",
    },
  },
  icon: {
    backgroundColor: theme.palette.common.primary,
    borderRadius: 14,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    maxWidth: 400,
    flexGrow: 1,
    padding: 0,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    display: "block",
    overflow: "hidden",
  },
  arrow: {
    "&:hover": {
      color: "#E27F03",
    },
  },
  button: {
    minWidth: 0,
    width: "36px",
    borderRadius: "10rem",
  },
  plasticIcon: {
    position: "absolute",
    left: "2px",
    top: "2px",
    padding: "0px",
    zIndex: 9999,
  },
}));

function ProductImage(props) {
  const { product, favProducts, footerNeeded } = props;
  const classes = useStyles();
  const theme = useTheme();

  //Carousel stepper
  const [activeStep, setActiveStep] = React.useState(0);
  const productImages =
    product.images?.length > 0 ? product.images : [ProductImagePlaceholder];
  const maxSteps = productImages.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  //Add-Remove from favourites
  const [isLoading, setIsLoading] = useState(false);
  const isFavorite = favProducts.some((e) => e.id === product.id);

  const handleClickFavorites = (event, selectedItem) => {
    event.stopPropagation();
    const found = favProducts.some((e) => e.id === selectedItem);

    setIsLoading(true);
    if (found) {
      APIManager.delFavProduct(props.user.id, selectedItem)
        .then((_) => {
          setIsLoading(false);
          props.actions.fetchFavouriteProducts(props.user.id);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log("delFavProduct error -> ", error);
        });
    } else {
      APIManager.createFavProduct(props.user.id, selectedItem)
        .then((_) => {
          setIsLoading(false);
          props.actions.fetchFavouriteProducts(props.user.id);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    }
  };

  if (maxSteps === 0) {
    return null;
  }

  return (
    <div
      className={
        (classes.root, "relative md:h-5/6 md:max-h-96 min-h-fit w-full")
      }
    >
      {/* Temporary hidden for V1:
      {product.plastic_free ? (
        <ReactSVG src={PlasticIcon} className={classes.plasticIcon} />
      ) : null}
    */}
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        style={{ height: "100%" }}
        containerStyle={{ height: "100%" }}
        slideStyle={{ height: "100%" }}
      >
        {productImages.map((step, index) => (
          <div
            key={index}
            className={"relative h-56 sm:h-full w-full rounded-md"}
          >
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                className={clsx(
                  classes.img,
                  "w-full h-full object-contain rounded-md"
                )}
                src={
                  step.prevImage
                    ? URL.createObjectURL(step.prevImage)
                    : step.image != null
                    ? step.image
                    : ProductImagePlaceholder
                }
                alt="Product image"
              />
            ) : null}
          </div>
        ))}
      </SwipeableViews>

      {props.userToken != null ? (
        <IconButton
          className={clsx(
            "z-40 shadow-md h-12 w-12",
            classes.favouritesIcon,
            footerNeeded ? "cursor-pointer" : "pointer-events-none"
          )}
          title="Add to favourites"
          aria-label="add to favourites"
          onClick={(e) => handleClickFavorites(e, product.id)}
        >
          <FavoriteIcon
            className={isFavorite ? "text-po-red" : "text-po-graydark"}
          />
        </IconButton>
      ) : null}

      {productImages.length > 1 ? (
        <div className="flex justify-center">
          <MobileStepper
            steps={maxSteps}
            position="static"
            variant="dots"
            activeStep={activeStep}
            className={classes.root}
            nextButton={
              <Button
                className={classes.button}
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft className={classes.arrow} />
                ) : (
                  <KeyboardArrowRight className={classes.arrow} />
                )}
              </Button>
            }
            backButton={
              <Button
                className={classes.button}
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight className={classes.arrow} />
                ) : (
                  <KeyboardArrowLeft className={classes.arrow} />
                )}
              </Button>
            }
          />
        </div>
      ) : null}
      <POSpinner isLoading={isLoading} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  userToken: state.User.userToken,
  user: state.User.user,
  favProducts: state.User.favProducts,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchFavouriteProducts: (userId) => {
      dispatch(userActions.fetchFavouriteProducts(userId));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductImage);
