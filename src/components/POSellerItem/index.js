import React from "react";
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import FavoriteIcon from "@material-ui/icons/Favorite";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import PODecimalUtil from "../../utils/PODecimalUtil";
import { ReactSVG } from "react-svg";
import Location from "../../assets/Location.svg";
import history from "../../routes/history";
import { connect } from "react-redux";
import Constants from "../../config/Constants";
import { PODeliveryMode } from "../../models";

const useStyles = makeStyles({
  heart: {
    color: "#F36262",
  },
  star: {
    color: "#FF8F03",
  },
  favouritesIcon: {
    position: "absolute",
    right: "5px",
    top: "5px",
    padding: "8px",
    opacity: "0.8",
    backgroundColor: "#F0F0F5",
    "&:hover": {
      background: "#FFFFFF",
      opacity: "1",
    },
  },
});

function POSellerItem(props) {
  const {
    item,
    isFavorite,
    className,
    showFavoriteIcon,
    handleClickFavorites,
    currentLocation,
    deliveryMode = PODeliveryMode.both,
  } = props;
  const classes = useStyles();

  const handleClickItem = (item) => {
    window.sessionStorage.setItem(
      Constants.SS_LAST_DELIVERY_MODE,
      deliveryMode
    );
    history.push(`/seller/${item.id}`);
  };

  return (
    <li
      className={
        className ??
        "flex flex-col col-span-1 shadow-lg rounded-2xl py-2 cursor-pointer"
      }
      onClick={() => handleClickItem(item)}
    >
      <div className="relative w-full">
        {/* Tag - temporary hidden for V1
        <span className="seller-tag z-10 inline-flex items-center px-2.5 py-0.5 2xl:py-1.5 2xl:px-3 2xl:text-base rounded-md text-sm font-semibold text-po-white bg-po-blue">
          New
        </span>
        */}

        {item.delivery_method === "collection" ? (
          <span className="collect-delivery-tag z-10 inline-flex items-center px-2.5 py-0.5 font-medium shadow-lg text-sm text-po-black">
            Collection only
          </span>
        ) : null}
        {item.delivery_method === "delivery" ? (
          <span className="collect-delivery-tag z-10 inline-flex items-center px-2.5 py-0.5 font-medium shadow-lg text-sm text-po-black">
            Delivery only
          </span>
        ) : null}

        {item.full_product_list ? null : (
          <span className="limited-selection-tag z-10 inline-flex items-center px-2.5 py-0.5 font-semobold shadow-lg text-sm text-po-black">
            Selected products
          </span>
        )}

        <img
          src={item.image}
          alt={"seller image"}
          className="rounded-tl-2xl rounded-tr-2xl object-cover h-52  w-full"
        />

        {showFavoriteIcon && (
          <IconButton
            className={clsx("z-40 shadow-md", classes.favouritesIcon)}
            title="Add to favourites"
            aria-label="add to favorites"
            onClick={(e) => handleClickFavorites(e, item)}
          >
            <FavoriteIcon
              className={isFavorite ? "text-po-red" : "text-po-graydark"}
            />
          </IconButton>
        )}
      </div>

      {/* Rating badge */}
      {PODecimalUtil.getRatingDecimal(item.rating) > 0 ? (
        <div className="flex justify-end -mt-4 z-10 mr-2">
          <div className="inline-flex rounded-lg items-center px-3 py-1 home-product-price-tag">
            <StarRoundedIcon
              color="secondary"
              className={clsx(classes.star, "h-24")}
            />
            <span className="font-bold text-lg pl-1">
              {PODecimalUtil.getRatingDecimal(item.rating)}
            </span>
          </div>
        </div>
      ) : null}

      <div className={"mx-3 mb-1 space-y-1"}>
        {PODecimalUtil.getRatingDecimal(item.rating) < 1 ? (
          <h2 className="font-extrabold	mt-5 text-lg">{item.name}</h2>
        ) : (
          <h2 className="font-extrabold text-lg">{item.name}</h2>
        )}
        <div className={"flex flex-row justify-between"}>
          <span className={"text-xs text-po-graymain"}>
            {item.site_type_name ? item.site_type_name : item.site_type.name}
          </span>
          <div className={"flex flex-row items-center ml-1"}>
            <ReactSVG src={Location} />
            <span className={"text-sm text-po-graymain md:pl-1"}>
              {item.getDistance(currentLocation)} km
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}

const mapStateToProps = (state) => ({
  currentLocation: state.User.currentLocation,
});

export default connect(mapStateToProps, null)(POSellerItem);
