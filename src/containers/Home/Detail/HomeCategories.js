import clsx from "clsx";
import React from "react";
import "./styles.scss";
import Spinner from "react-spinkit";

export default function HomeCategories(props) {
  const { subCategories, handleClickCategory, chosenItem, isLoading } = props;
  return (
    <div className={"inline-flex"}>
      {subCategories.map((item, index) => (
        <button
          key={`${item.id}`}
          className={clsx(
            "z-50 flex flex-col items-center justify-center mx-1 lg:mx-1.5 h-24 w-24 py-1 shadow-sm lg:shadow-md hover:shadow-lg transition duration-150 ease-out rounded-3xl",
            item.id === chosenItem?.id ? "bg-po-primary" : "bg-po-graylight"
          )}
          onClick={() => handleClickCategory(item)}
        >
          {item.id !== isLoading ? (
            <>
              {item.image ? (
                <img
                  src={item.image}
                  alt={"category"}
                  className="w-2/3 h-2/3 object-contain p-0.5"
                />
              ) : (
                <div className={"flex w-2/3 h-2/3 items-center justify-center"}>
                  <span
                    className={"text-po-black card-heading-home font-semibold"}
                  >
                    No image
                  </span>
                </div>
              )}
              <div
                className={
                  "text-po-black md:my-1 card-heading-home font-semibold"
                }
              >
                {item.name}
              </div>
            </>
          ) : (
            <Spinner
              name="ball-spin-fade-loader"
              fadeIn="none"
              color={"#E27F03"}
            />
          )}
        </button>
      ))}
    </div>
  );
}
