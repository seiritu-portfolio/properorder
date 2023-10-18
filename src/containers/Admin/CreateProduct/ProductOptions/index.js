import React from "react";
import { classNames } from "../classes";
import POAddNew from "../../../../components/POAddNew";
import PORemove from "../../../../components/PORemove";
import clsx from "clsx";

export default function ProductOptions({
  options,
  setOptions,
  setOptionsVisible,
  productPrice,
}) {
  const onChangeOptionName = (name, index) => {
    const newOptions = [...options];
    newOptions[index].name = name;
    setOptions(newOptions);
  };

  const onChangeVariantName = (name, optionIndex, variantIndex) => {
    const newOptions = [...options];
    newOptions[optionIndex].variants[variantIndex].name = name;
    setOptions(newOptions);
  };

  const onChangePrice = (event, optionIndex, variantIndex) => {
    const newOptions = [...options];
    const t = event.target.value;
    let newPrice = 0;
    if (Number(t) > 0) {
      newPrice =
        t.indexOf(".") >= 0
          ? t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)
          : t;
    }

    newOptions[optionIndex].variants[variantIndex].price =
      t === "" ? t : newPrice;
    setOptions(newOptions);
  };

  const onAddOption = () => {
    setOptions([...options, { variants: [{ price: "" }] }]);
  };

  const onRemoveOption = (index) => {
    const newOptions = options.filter((s, i) => i !== index);
    if (newOptions.length === 0) {
      setOptionsVisible(false);
      setOptions([{ variants: [{ price: "" }] }]);
    } else {
      setOptions(newOptions);
    }
  };

  const onAddVariant = (index) => {
    const newOptions = [...options];
    newOptions[index].variants = [...options[index].variants, { price: "" }];
    setOptions(newOptions);
  };

  const onRemoveVariant = (optionIndex, variantIndex) => {
    const newOptions = [...options];
    newOptions[optionIndex].variants = options[optionIndex].variants.filter(
      (o, i) => i !== variantIndex
    );
    setOptions(newOptions);
  };

  return options.map((option, index) => (
    <div
      key={`${index}`}
      className={
        "grid grid-cols-1 md:grid-cols-3 gap-6 px-1 mt-2 border border-b-1 last:border-transparent border-l-0 border-t-0 border-r-0 border-po-graymedium border-dotted pb-3"
      }
    >
      <div className={"flex flex-col"}>
        <p className={classNames.inputLabel}>{`Product option ${index + 1}`}</p>
        <div className={"flex flex-row"}>
          <input
            id={`product_option_name_${index}`}
            type="text"
            className={
              "text-sm h-10 rounded border border-po-graymedium px-3 py-2 mt-0.5 w-64"
            }
            value={option.name}
            onChange={(event) => onChangeOptionName(event.target.value, index)}
            placeholder="e.g. Size, Weight, Grind, Age"
          />
          {
            <PORemove
              className={"ml-2"}
              title={""}
              onClick={() => onRemoveOption(index)}
            />
          }
          {index === options.length - 1 && (
            <POAddNew
              className={"ml-2"}
              title={""}
              onClick={() => onAddOption()}
            />
          )}
        </div>
      </div>
      <div className={"flex flex-col col-span-1 md:col-span-2"}>
        {option.variants.map((variant, i) => (
          <div
            key={`${i}`}
            className={"grid grid-cols-1 md:grid-cols-2 gap-3 px-1"}
          >
            <div className={"flex flex-col"}>
              <p className={classNames.inputLabel}>{`Variant ${i + 1}`}</p>
              <div className={"flex flex-row"}>
                <input
                  id={`product_option_variant_${i}`}
                  type="text"
                  className={
                    "text-sm h-10 rounded border border-po-graymedium px-3 py-2 mt-0.5 w-64"
                  }
                  value={variant.name}
                  onChange={(event) =>
                    onChangeVariantName(event.target.value, index, i)
                  }
                  placeholder="e.g. Large, 100g, French, 20days"
                />
                {i !== 0 && (
                  <PORemove
                    className={"ml-2"}
                    title={""}
                    onClick={() => onRemoveVariant(index, i)}
                  />
                )}
                {i === option.variants.length - 1 && (
                  <POAddNew
                    className={"ml-2"}
                    title={""}
                    onClick={() => onAddVariant(index)}
                  />
                )}
              </div>
            </div>
            <div className={"flex flex-row justify-between mr-2 md:mr-8"}>
              <div className="flex flex-col mr-4">
                <p className={classNames.inputLabel}>{`Surcharge ${i + 1}`}</p>
                <div className={"flex flex-row"}>
                  <p className={classNames.priceLabel}>€</p>
                  <input
                    id={`product_option_price_${i}`}
                    type="number"
                    className={
                      "text-sm h-10 rounded border border-po-graymedium px-3 py-2 mt-0.5 w-32"
                    }
                    value={variant.price}
                    onChange={(event) => onChangePrice(event, index, i)}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <p className={classNames.inputLabel}>Price</p>
                <div className={"flex flex-row"}>
                  <p className={"text-base font-semibold mt-2"}>
                    €{" "}
                    {(Number(variant.price) + Number(productPrice)).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ));
}
