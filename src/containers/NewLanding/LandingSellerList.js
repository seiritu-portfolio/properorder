import React from "react";
import TempImage from "../../assets/bang_res.png";

export default function LandingSellerList() {
  return (
    <div
      className={
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-10 mt-8 mb-10"
      }
    >
      {[0, 1, 2, 3].map((item, index) => (
        <li
          key={`${index}`}
          className={"flex flex-col w-full rounded-2xl overflow-hidden"}
        >
          <div className="landing-seller-item-img-container">
            <div className="absolute inset-0">
              <img
                className="w-full h-full object-cover bg-blend-overlay"
                src={TempImage}
                alt="image"
              />
            </div>
          </div>

          <span className={"text-base text-po-black font-bold mt-6"}>
            BANG restaurant & wine bar
          </span>
          <span className={"text-lg text-po-black font-normal mt-3"}>
            Irish ingredients, carefully sourced and innovatively prepared, at a
            small and stylish venue.
          </span>
          <button
            className={
              "text-po-primarydark text-lg font-semibold mt-6 self-start"
            }
          >
            Order now
          </button>
        </li>
      ))}
    </div>
  );
}
