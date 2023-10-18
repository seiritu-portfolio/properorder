import React from "react";
import BgImage from "../../assets/new_landing_bg.png";
import POHeader from "../../components/POHeader";
import POHeaderVariant from "../../models/Enum/POHeaderVariant";
import ChicmacImage from "../../assets/Chicmac.png";
import LandingLi from "./LandingLi";
import LandingNi from "./LandingNi";

export default function LandingFindOutMore() {
  return (
    <>
      <div className="relative pb-56 xl:pb-64">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover bg-blend-overlay"
            src={BgImage}
            alt="background image"
          />
        </div>
        <POHeader variant={POHeaderVariant.newLanding} isWhite={true} />
      </div>

      <div className="mx-auto px-6 md:px-8 max-w-full md:max-w-screen-xl flex flex-col">
        <h1 className="text-4xl mt-8">What is proper order?</h1>
        <span className={"text-xs font-bold text-po-graydark"}>
          Discover and purchase the finest that Ireland has to offer!
        </span>
        <span className={"text-lg text-po-black font-normal mt-5"}>
          Proper order is an online marketplace for foodies. On our website you
          can search for and buy the best quality products that Ireland has to
          offer. <br />
          <br />
          We work with small and medium sized businesses ensuring their amazing
          products reach the market and become known. Our products range from
          fine wines and spirits to the best produce and products on offer in
          Ireland at the moment.
        </span>
        <img className="landing-chicmac" src={ChicmacImage} alt="chicmac" />
        <span className={"text-xs font-bold text-po-black mt-3"}>
          Chicmac Sauces: Inspired by Korea
        </span>
        <h2 className={"text-2xl text-po-black mt-10"}>For Sellers</h2>
        <span className={"text-lg text-po-black font-normal mt-5"}>
          We work with artisan, fine food producers and suppliers within
          Ireland. No matter how niche the product, we want to work with it and
          promote it. Our aim is to have the largest collection of artisan and
          fine food products available to the Irish consumer!
          <br />
          <br />
          If you would like to join Proper Order and become a Proper Seller,
          please email{" "}
          <a
            href="mailto:hello@properorder.ie?subject=Proper Order Query"
            className={"text-po-yellowdark"}
            type={"button"}
          >
            hello@properorder.ie
          </a>{" "}
          and we will get back to.
        </span>

        <h2 className={"text-2xl text-po-black mt-10"}>For Consumers:</h2>
        <span className={"text-lg text-po-black font-normal mt-5"}>
          We want to make food inspiration and home cooking exciting and easier
          for you! Proper Order is a place where foodies of all shapes and sizes
          can find what they are looking for. Whether it is that amazing cheese
          you ate over the weekend at that tiny little restaurant around the
          corner, or that funny looking jar you spotted in a shop window but
          cannot remember the name.
          <br />
          <br />
          We want you to have access to and identify a huge variety of the
          finest Irish artisan products and the finest wines that Ireland has on
          offer.
        </span>
        <span className={"text-lg text-po-yellowdark font-normal mt-5 mb-16"}>
          Order from Proper Order and support local, be a Proper Foodie!
        </span>
      </div>
    </>
  );
}
