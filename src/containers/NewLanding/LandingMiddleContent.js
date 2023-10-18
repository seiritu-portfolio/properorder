import React from "react";
import WhatImage from "../../assets/what_is_proper_order.png";
import PulseImage from "../../assets/keep_the_pulse.png";
import history from "../../routes/history";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import SearchQueries from "../../utils/SearchQueries";

export default function LandingMiddleContent() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search);

  const contentItems = [
    {
      title: "What is proper order?",
      img: WhatImage,
      btn: "Find out more",
      content: () => (
        <span className={"text-lg text-po-black font-normal mt-3"}>
          Proper order is an online marketplace for foodies. On our website you
          can search for and buy the best quality products that Ireland has to
          offer.
          <br />
          <br /> We work with small and medium sized businesses ensuring their
          amazing products reach the market and become known. Our products range
          from fine wines and spirits to the best produce and products on offer
          in Ireland at the moment.
        </span>
      ),
    },
    {
      title: "Keep your finger on The Pulse",
      img: PulseImage,
      content: () => (
        <span className={"text-lg text-po-black font-normal mt-3"}>
          The Pulse is a cooking and lifestyle blog.
          <br />
          <br /> We are lovers of everything food and wine with a particular
          interest in trying new produce and recipes. We are here to inspire
          you; help you find what you are looking for and help you improve on
          your own cooking repertoire.
          <br />
          <br /> Our articles range from hosting tips and amazing recipes to
          discovering new products and produce. Whatever the occasion, The Pulse
          wants to inspire and bring out the best in you!
        </span>
      ),
    },
  ];

  return (
    <div
      className={
        "grid grid-cols-1 md:grid-cols-2 gap-10 mt-8 mb-10 px-6 md:px-8"
      }
    >
      {contentItems.map((item, index) => (
        <li
          key={`${index}`}
          className={"flex flex-col w-full rounded-2xl overflow-hidden"}
        >
          <span className={"text-base text-po-black font-bold mt-6 mb-6"}>
            {item.title}
          </span>

          <div className="landing-new-user-middle-item">
            <div className="absolute inset-0">
              <img
                className="w-full h-full object-cover bg-blend-overlay"
                src={item.img}
                alt="image"
              />
            </div>
          </div>

          {item.content()}
          {item.btn && (
            <button
              className={
                "text-po-primarydark text-lg font-semibold mt-6 self-start"
              }
              onClick={() => {
                searchQuery.set(SearchQueries.findOutMore, "1");
                history.replace({
                  pathname: location.pathname,
                  search: searchQuery.toString(),
                });
              }}
            >
              {item.btn}
            </button>
          )}
        </li>
      ))}
    </div>
  );
}
