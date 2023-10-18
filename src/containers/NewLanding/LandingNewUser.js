import React from "react";
import BgImage from "../../assets/landing-bg-new-user.png";
import POHeader from "../../components/POHeader";
import POHeaderVariant from "../../models/Enum/POHeaderVariant";
import SearchBar from "../../components/SearchBar";
import { ReactSVG } from "react-svg";
import Person from "../../assets/person.svg";
import UniqueSVG from "../../assets/unique_wines.svg";
import ArtisanSVG from "../../assets/artisan_products.svg";
import VespaSVG from "../../assets/vespa-scooter.svg";
import LandingMiddleContent from "./LandingMiddleContent";
import LandingProducts from "./LandingProducts";

export default function LandingNewUser() {
  const renderDiscoverItem = (icon, title) => (
    <button
      className={
        "flex flex-row px-8 py-6 items-center justify-center space-x-4 hover:opacity-70 w-full sm:w-1/3"
      }
    >
      <ReactSVG src={icon} />
      <span className={"text-lg font-bold text-po-black"}>{title}</span>
    </button>
  );

  return (
    <>
      <div className="relative landing-new-user-header-container">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover bg-blend-overlay"
            src={BgImage}
            alt="background image"
          />
          <div
            className={
              "absolute inset-0 flex flex-col items-center justify-center px-4"
            }
          >
            <div className={"landing-new-user-discover-container"}>
              <div className={"sub-title self-center mt-6"}>
                Discover Ireland’s finest food
              </div>
              <div className={"mx-2"}>
                <SearchBar
                  onPlaceSelected={() => {}}
                  setPostcodeError={() => {}}
                  containerClassName={"sm:mr-4"}
                />
              </div>
              <span className={"text-xs text-po-black font-normal self-center"}>
                Type in your address to get started
              </span>
              <div className={"w-full h-px bg-po-yellowlight mt-4"} />
              <div className={"flex flex-row items-center my-4 justify-center"}>
                <ReactSVG src={Person} />
                <a
                  href={"/login-with-password"}
                  className={"font-bold text-lg text-po-yellowlight ml-1"}
                >
                  Log in
                </a>
                <span className={"text-lg text-po-black font-normal ml-1"}>
                  for recent addresses
                </span>
              </div>
              <div className={"w-full h-px bg-po-graymedium"} />
              <div className={"flex flex-col sm:flex-row"}>
                {renderDiscoverItem(UniqueSVG, "Unique wines")}
                <div
                  className={"sm:w-px sm:h-full w-full h-px bg-po-graymedium"}
                />
                {renderDiscoverItem(ArtisanSVG, "Artisan products")}
                <div
                  className={"sm:w-px sm:h-full w-full h-px bg-po-graymedium"}
                />
                {renderDiscoverItem(
                  VespaSVG,
                  "Delivering across all of Ireland"
                )}
              </div>
            </div>
          </div>
        </div>
        <POHeader variant={POHeaderVariant.newLanding} isWhite={false} />
      </div>

      <div className="w-full flex flex-col">
        <LandingMiddleContent />
        <LandingProducts />
      </div>
    </>
  );
}
