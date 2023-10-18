import React, { useEffect, useState } from "react";
import { InputBase, MenuItem, Select } from "@material-ui/core";
import { classNames, useStyles } from "./classes";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import POAddNew from "../../../components/POAddNew";
import PORemove from "../../../components/PORemove";

export default function ProductCategorySelector({
  selectedCategories,
  setSelectedCategories,
  allCategories,
}) {
  const classes = useStyles();

  // useEffect(() => {
  //   setFirstSubCategory(null);
  //   setSecondSubCategory(null);
  // }, [category]);

  // useEffect(() => {
  //   setSecondSubCategory(null);
  // }, [firstSubCategory]);

  const onAddCategory = () => {
    setSelectedCategories([...selectedCategories, { category: null }]);
  };

  const onRemoveCategory = (index) => {
    setSelectedCategories(selectedCategories.filter((s, i) => i !== index));
  };

  return (
    <>
      {selectedCategories.map((selCategory, index) => {
        const { category, firstSubCategory, secondSubCategory } = selCategory;
        return (
          <div
            key={`${index}`}
            className={"grid grid-cols-1 md:grid-cols-3 gap-6 px-1 mb-1"}
          >
            <div className="flex flex-col">
              <p className={classNames.inputLabel}>Category*</p>
              <div className={"flex flex-row"}>
                <div className={clsx(classNames.selectContainer, "w-64")}>
                  <Select
                    displayEmpty
                    classes={{ root: "pr-0 text-base font-semobild w-64" }}
                    input={<InputBase classes={{ root: "h-10 w-full" }} />}
                    labelId="select"
                    id="select"
                    value={category ?? ""}
                    IconComponent={ExpandMoreIcon}
                    onChange={(event) => {
                      setSelectedCategories(
                        selectedCategories.map((sc, i) =>
                          index !== i
                            ? sc
                            : {
                                category: event.target.value,
                                firstSubCategory: null,
                                secondSubCategory: null,
                              }
                        )
                      );
                    }}
                  >
                    <MenuItem
                      disabled
                      value={""}
                      classes={{ gutters: classes.menuList }}
                    >
                      <em>Select category</em>
                    </MenuItem>
                    {allCategories.map((item, index) => (
                      <MenuItem
                        key={index}
                        value={item}
                        classes={{ gutters: classes.menuList }}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                {index !== 0 && (
                  <PORemove
                    className={"ml-2"}
                    title={""}
                    onClick={() => onRemoveCategory(index)}
                  />
                )}
                {index === selectedCategories.length - 1 && (
                  <POAddNew
                    className={"ml-2"}
                    title={""}
                    onClick={() => onAddCategory()}
                  />
                )}
              </div>
            </div>
            {category?.children != null && category?.children.length > 0 && (
              <div className="flex flex-col">
                <p className={classNames.inputLabel}>Subcategory 1*</p>
                <div className={clsx(classNames.selectContainer, "w-64")}>
                  <Select
                    classes={{ root: "pr-0 text-base font-semobild w-64" }}
                    input={<InputBase classes={{ root: "h-10 w-full" }} />}
                    labelId="sub-category-label1"
                    id="select1"
                    value={firstSubCategory}
                    IconComponent={ExpandMoreIcon}
                    onChange={(event) =>
                      setSelectedCategories(
                        selectedCategories.map((sc, i) =>
                          index !== i
                            ? sc
                            : {
                                category: sc.category,
                                firstSubCategory: event.target.value,
                                secondSubCategory: null,
                              }
                        )
                      )
                    }
                  >
                    {category.children.map((item, index) => (
                      <MenuItem
                        key={index}
                        value={item}
                        classes={{ gutters: classes.menuList }}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
            )}
            {firstSubCategory?.children != null &&
              firstSubCategory?.children.length > 0 && (
                <div className="flex flex-col">
                  <p className={classNames.inputLabel}>Subcategory 2*</p>
                  <div className={clsx(classNames.selectContainer, "w-64")}>
                    <Select
                      classes={{ root: "pr-0 text-base font-semobild w-64" }}
                      input={<InputBase classes={{ root: "h-10 w-full" }} />}
                      labelId="sub-category-label2"
                      id="select2"
                      value={secondSubCategory}
                      IconComponent={ExpandMoreIcon}
                      onChange={(event) =>
                        setSelectedCategories(
                          selectedCategories.map((sc, i) =>
                            index !== i
                              ? sc
                              : {
                                  category: sc.category,
                                  firstSubCategory: sc.firstSubCategory,
                                  secondSubCategory: event.target.value,
                                }
                          )
                        )
                      }
                    >
                      {firstSubCategory.children.map((item, index) => (
                        <MenuItem
                          key={index}
                          value={item}
                          classes={{ gutters: classes.menuList }}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
              )}
          </div>
        );
      })}
    </>
  );
}
