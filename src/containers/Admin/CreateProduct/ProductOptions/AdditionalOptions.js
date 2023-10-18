import React from "react";
import { classNames } from "../classes";

export default function AdditionalOptions({
  selectedCategories,
  categoryDetails,
  setCategoryDetails,
}) {
  const abvVisible = selectedCategories.some(
    ({ category }) => category?.name === "Alcohol"
  );
  const originVisible = selectedCategories.some(
    ({ category }) =>
      category?.name === "Alcohol" || category?.name === "Cheese"
  );
  const regionVisible = selectedCategories.some(
    ({ firstSubCategory }) => firstSubCategory?.name === "Wine"
  );
  return (
    <>
      <div
        className={
          "grid grid-cols-1 sm: grid-cols-2 md:grid-cols-4 gap-12 mt-2 px-1"
        }
      >
        {abvVisible && (
          <div className={"flex flex-col"}>
            <p className={classNames.inputLabel}>ABV %</p>
            <div className={"flex flex-row"}>
              <input
                type="number"
                max={100}
                min={0}
                className={classNames.input}
                value={categoryDetails.abv}
                onChange={(e) => {
                  const t = e.target.value;
                  let newValue = "";
                  if (t !== "") {
                    if (Number(t) < 0) {
                      newValue = 0;
                    } else if (Number(t) > 100) {
                      newValue = 100;
                    } else {
                      newValue =
                        t.indexOf(".") >= 0
                          ? t.substr(0, t.indexOf(".")) +
                            t.substr(t.indexOf("."), 3)
                          : t;
                    }
                  }
                  setCategoryDetails({
                    ...categoryDetails,
                    abv: newValue,
                  });
                }}
              />
            </div>
          </div>
        )}
        {/*
        {originVisible && ( 
          <div className={"flex flex-col"}>
            <p className={classNames.inputLabel}>Country of Origin*</p>
            <div className={"flex flex-row"}>
              <input
                type="text"
                className={classNames.input}
                value={categoryDetails.countryOfOrigin}
                onChange={(e) =>
                  setCategoryDetails({
                    ...categoryDetails,
                    countryOfOrigin: e.target.value,
                  })
                }
              />
            </div>
          </div>
        )}
        */}

        {/* 
        {regionVisible && (
          <div className={"flex flex-col"}>
            <p className={classNames.inputLabel}>Region</p>
            <div className={"flex flex-row"}>
              <input
                type="text"
                className={classNames.input}
                value={categoryDetails.region}
                onChange={(e) =>
                  setCategoryDetails({
                    ...categoryDetails,
                    region: e.target.value,
                  })
                }
              />
            </div>
          </div>
          
        )} */}

        {/*  {regionVisible && ( 
          <div className={"flex flex-col"}>
            <p className={classNames.inputLabel}>Grape</p>
            <div className={"flex flex-row"}>
              <input
                type="text"
                className={classNames.input}
                value={categoryDetails.grape}
                onChange={(e) =>
                  setCategoryDetails({
                    ...categoryDetails,
                    grape: e.target.value,
                  })
                }
              />
            </div>
          </div>
        )} */}
      </div>
      {/* 
        {regionVisible && (
        <div className={"flex flex-col"}>
          <p className={classNames.inputLabel}>Food paring</p>
          <div className={"flex flex-row"}>
            <input
              type="text"
              className={classNames.input}
              value={categoryDetails.foodParing}
              onChange={(e) =>
                setCategoryDetails({
                  ...categoryDetails,
                  foodParing: e.target.value,
                })
              }
            />
          </div>
        </div>
        
      )}  */}
    </>
  );
}
