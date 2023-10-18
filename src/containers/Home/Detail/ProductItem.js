import React from "react";
import "../styles.scss";
import ProductImagePlaceholder from "../../../assets/image_placeholder.png";
import { ReactSVG } from "react-svg";
import PlasticIcon from "../../../assets/plastic.svg";
import { Divider, makeStyles } from "@material-ui/core";
import HomeTags from "../../../assets/HomeTags.svg";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import FavoriteIcon from "@material-ui/icons/Favorite";
import POHTML from "../../../components/POHTML";
import history from "../../../routes/history";
import Constants from "../../../config/Constants";
import { PODeliveryMode } from "../../../models";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const useStyles = makeStyles({
  plasticIcon: {
    position: "absolute",
    right: "0px",
    top: "4px",
    padding: "0px",
  },
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

export default function ProductItem(props) {
  const {
    item,
    isFavorite,
    showFavoriteIcon,
    handleClickFavorites,
    variant = "primary",
    onClickItem,
    deliveryMode = PODeliveryMode.both,
    limitTitle = false,
  } = props;

  const exclusive = item.exclusive === 1;
  const discount = item.discount;

  // Best seller  is a feature that we would need on the later stages, in version 1.2 probably, so we can hide it for now
  const bestSeller = item.best_seller === 1;

  const classes = useStyles();

  return (
    <li
      className="product-item-container"
      onClick={() => {
        if (item?.id !== undefined) {
          // history.push(`/product-details/${item.id}`);
          window.sessionStorage.setItem(
            Constants.SS_PRODUCT_COMING_FROM,
            window.location.pathname
          );
          if (onClickItem) {
            onClickItem(item);
          } else {
            window.sessionStorage.setItem(
              Constants.SS_LAST_DELIVERY_MODE,
              deliveryMode
            );
            window.sessionStorage.setItem(
              Constants.SS_PRODUCT_MODAL_ID,
              item.id
            );
            history.push(`/seller/${item.getSellerId()}`);
          }
        }
      }}
    >
      <div className="relative w-full">
        <div className={"home-product-tags-container"}>
          {exclusive && (
            <span className="product-badge-gold z-10 inline-flex items-center px-2.5 py-0.5 text-xs xl:text-sm font-bold text-po-white ml-2">
              Exclusive
            </span>
          )}
          {bestSeller && (
            <span className="product-badge-blue z-10 inline-flex items-center px-2.5 py-0.5 text-xs xl:text-sm  font-bold text-po-white ml-2">
              Best seller
            </span>
          )}
          {discount > 0 && (
            <span className="product-badge-red z-10 inline-flex items-center px-2.5 py-0.5 text-xs xl:text-sm  font-bold text-po-white ml-2">
              {discount}% Off
            </span>
          )}
        </div>
        {/* TODO: remove the testing image after API done (featured products)*/}
        {/*<img*/}
        {/*  src={item.image ?? ProductImagePlaceholder}*/}
        {/*  alt={"product image"}*/}
        {/*  className="rounded-tl-2xl rounded-tr-2xl object-cover w-full h-48"*/}
        {/*/>*/}
        <div className="rounded-tl-2xl rounded-tr-2xl w-full h-48 overflow-hidden relative">
          <LazyLoadImage
            alt={"product image"}
            effect="blur"
            src={item.image ?? ProductImagePlaceholder}
            width={"100%"}
            height={"100%"}
            className={"object-cover"}
          />
        </div>

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

        {/* Temporary hidden for V1:
          {item.plastic_free && !showFavoriteIcon ? (
            <ReactSVG src={PlasticIcon} className={classes.plasticIcon} />
          ) : null}
        */}
      </div>

      <Divider />

      <div className="flex justify-end -mt-4 z-10 mr-2">
        <div className="inline-flex rounded-lg items-center px-3 py-1 home-product-price-tag">
          <span className="font-bold text-lg pl-1">
            €
            {(item.price / 100).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>

      <div className={"mx-3 mb-2 flex flex-col h-full justify-between"}>
        <div>
          <p className={`product-title ${limitTitle ? "one-line" : ""}`}>
            {item.name}
          </p>
          {variant === "primary" ? (
            <p className={"ml-1 text-xs text-po-graydark"}>
              by <span className={"font-bold "}> {item.site?.name} </span>
            </p>
          ) : (
            // <p className={"product-description"}>{item.description}</p>
            <POHTML
              htmlString={item?.description}
              className={"product-description"}
            />
          )}
        </div>
        {/* TODO: remove for v1 maybe perement
          <div className={"w-full flex flex-row justify-between pt-1 mb-1 mt-2"}>
          <div
            className={"flex flex-row items-center space-x-1 overflow-hidden"}
          >
            <ReactSVG src={HomeTags} />
            <p className={"text-xs text-po-graymain truncate"}>
              {item.getTagLabel()}
            </p>
          </div>*/}
        {/*
          <div className={"flex flex-row items-center space-x-1"}>
            <ReactSVG src={HomeDelivery} />
            <p className={"text-xs text-po-graymain"}>2&nbsp;days</p>
          </div>

        </div> */}
      </div>
    </li>
  );
}
