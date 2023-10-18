import React from "react";
import { Add, Remove } from "@material-ui/icons";
import { ReactSVG } from "react-svg";
import DeleteIcon from "../../assets/delete.svg";
import { makeStyles } from "@material-ui/core/styles";
import SelectWeight from "./SelectWeight";
import { POProduct } from "../../models";
import Spinner from "react-spinkit";
import PODecimalUtil from "../../utils/PODecimalUtil";

const useStyles = makeStyles((theme) => ({
  icon: {
    backgroundColor: theme.palette.common.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  disableIcon: {
    backgroundColor: theme.palette.common.graylight,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  plusMinus: {
    fontSize: 12,
    fontWeight: 700,
  },
}));

export default function CartItemProduct(props) {
  const {
    isWeight,
    product,
    handleUpdatedProduct,
    processing,
    handleDeleteItem,
  } = props;
  const classes = useStyles();

  const onQuantityChanged = (quantity) => {
    if (quantity < 1) {
      return;
    }

    handleUpdatedProduct(POProduct.fromState({ ...product, quantity }), {
      quantity,
    });
  };

  return (
    <div className={"flex flex-row cart-item-sub-container mt-1 p-3"}>
      {/* Temporary commented out the condition, 
        should be back when the product_umits logic is implemented in later versions:
        
      {isWeight ? (
        <div className={"flex flex-row items-center space-x-4 mb-auto"}>
          <SelectWeight />
        </div>
      ) : (
        <div className={"flex flex-row items-center space-x-2 mb-auto"}>
          <button
            className={
              product.quantity === 1 ? classes.disableIcon : classes.icon
            }
            onClick={() => onQuantityChanged(product.quantity - 1)}
          >
            <Remove className={classes.plusMinus} />
          </button>
          <div className={"flex w-4 h-8 items-center justify-center"}>
            {processing === product.id ? (
              <Spinner name="circle" fadeIn="none" />
            ) : (
              <span className={"text-base font-bold mx-2"}>
                {product.quantity}
              </span>
            )}
          </div>
          <button
            className={classes.icon}
            onClick={() => onQuantityChanged(product.quantity + 1)}
          >
            <Add className={classes.plusMinus} />
          </button>
        </div>
      )}
      */}

      <div className={"flex flex-row items-center space-x-2 mb-auto"}>
        <button
          className={
            product.quantity === 1 ? classes.disableIcon : classes.icon
          }
          onClick={() => onQuantityChanged(product.quantity - 1)}
        >
          <Remove className={classes.plusMinus} />
        </button>
        <div className={"flex w-4 h-8 items-center justify-center"}>
          {processing === product.id ? (
            <Spinner name="circle" fadeIn="none" />
          ) : (
            <span className={"text-base font-bold mx-2"}>
              {product.quantity}
            </span>
          )}
        </div>
        <button
          className={classes.icon}
          onClick={() => onQuantityChanged(product.quantity + 1)}
        >
          <Add className={classes.plusMinus} />
        </button>
      </div>
      <div className={"flex flex-col flex-1 ml-2"}>
        <div className={"flex flex-row flex-1 justify-between mt-2"}>
          <h5 className={"font-bold"}>{product.name}</h5>
          <button className={"px-1"} onClick={() => handleDeleteItem(product)}>
            <ReactSVG src={DeleteIcon} />
          </button>
        </div>
        <div className={"flex flex-row mt-1"}>
          <p className={"cart-item-price-text"}>Price:</p>
          <p className={"cart-item-price-text ml-4"}>
            {PODecimalUtil.getPriceDecimalString(product.price)}
          </p>
        </div>

        {product.options.map((option, index) => {
          return (
            <div className={"flex flex-row mt-1"} key={index}>
              <p className={"cart-item-price-text"}>{option.name}</p>
              <p className={"cart-item-price-text ml-4"}>
                {option.selected_option}
              </p>
            </div>
          );
        })}

        <div className={"flex flex-row mt-1"}>
          <p className={"cart-item-subtotal"}>Subtotal:</p>
          <p className={"cart-item-subtotal ml-auto"}>
            {PODecimalUtil.getPriceDecimalString(
              product.getCalculatedTotalForOrder()
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
