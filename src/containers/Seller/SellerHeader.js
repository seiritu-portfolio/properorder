import React from "react";
import ClockIcon from "../../assets/clock.svg";
import StarIcon from "../../assets/star.svg";
import DistanceIcon from "../../assets/distance.svg";
import { ReactSVG } from "react-svg";
import PODecimalUtil from "../../utils/PODecimalUtil";
import { connect } from "react-redux";

function SellerHeader(props) {
  const { seller, currentLocation } = props;

  if (seller == null) {
    return null;
  }

  const renderItem = (icon, text) => (
    <div className={"flex flex-row items-center space-x-1"}>
      <ReactSVG src={icon} />
      <span className={"text-sm md:text-base text-white font-semibold"}>
        {text}
      </span>
    </div>
  );

  const rating = PODecimalUtil.getRatingDecimal(seller.rating);

  const tags = seller.tags ?? ["Bread", "Pastry", "Cakes"];

  return (
    <div className={"relative ml-4 mr-4 sm:ml-8 2xl:ml-40"}>
      <h1 className={"text-white seller-heading mt-20"}>{seller.name}</h1>

      {seller.delivery_method === "collection" ? (
        <div className={"inline-flex items-center px-1 py-2 "}>
          <div className={"rounded-full bg-white w-1 h-1 mr-2"} />
          <p className={"text-lg font-bold text-white"}> Collection only </p>
          <div className={"rounded-full bg-white w-1 h-1 ml-2"} />
        </div>
      ) : null}

      {seller.delivery_method === "delivery" ? (
        <div className={"inline-flex items-center px-1 py-2 "}>
          <div className={"rounded-full bg-white w-1 h-1 mr-2"} />
          <p className={"text-lg font-bold text-white"}> Delivery only </p>
          <div className={"rounded-full bg-white w-1 h-1 ml-2"} />
        </div>
      ) : null}

      <div
        className={
          "flex items-center flex-row mt-1 space-x-2 md:space-x-4 ml-1"
        }
      >
        {seller.site_type_name ? (
          <p className={"text-sm md:text-base text-white"}>
            {" "}
            {seller.site_type_name}{" "}
          </p>
        ) : (
          <p className={"text-sm md:text-base text-white"}>
            {" "}
            {seller.site_type.name}{" "}
          </p>
        )}
        {/* {renderItem(ClockIcon, "Next Day")} */}
        {rating > 0 ? (
          <div className={"rounded-full font-semibold bg-white w-1 h-1 mr-1"} />
        ) : null}
        {rating > 0 ? <span>{renderItem(StarIcon, rating)}</span> : null}

        <div className={"rounded-full bg-white w-1 h-1 ml-1"} />
        {renderItem(DistanceIcon, `${seller.getDistance(currentLocation)} km`)}

        {seller.full_product_list ? null : (
          <div className={"rounded-full bg-white w-1 h-1 ml-1"} />
        )}
        {seller.full_product_list ? null : (
          <p className={"text-sm md:text-base text-white font-semibold"}>
            {" "}
            Selected products{" "}
          </p>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentLocation: state.User.currentLocation,
});

export default connect(mapStateToProps, null)(SellerHeader);
