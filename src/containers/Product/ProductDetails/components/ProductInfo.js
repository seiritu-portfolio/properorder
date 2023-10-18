import React from "react";
import history from "../../../../routes/history";
import PODecimalUtil from "../../../../utils/PODecimalUtil";
import POHTML from "../../../../components/POHTML";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  close: {
    color: theme.palette.common.graydark,
  },
}));

export default function ProductInfo(props) {
  const { product, handleCloseModal, seller, fromHomePage } = props;

  const exclusive = product.exclusive === 1;
  const bestSeller = product.best_seller === 1;
  const discount = product.discount;
  const classes = useStyles();

  return (
    <>
      <div>
        {exclusive && (
          <span className="product-badge-gold z-10 inline-flex items-center px-2.5 py-0.5 text-xs xl:text-sm font-bold text-po-white mr-2">
            Exclusive
          </span>
        )}
        {bestSeller && (
          <span className="product-badge-blue z-10 inline-flex items-center px-2.5 py-0.5 text-xs xl:text-sm  font-bold text-po-white mr-2">
            Best seller
          </span>
        )}
        {discount > 0 && (
          <span className="product-badge-red z-10 inline-flex items-center px-2.5 py-0.5 text-xs xl:text-sm  font-bold text-po-white">
            {discount}% Off
          </span>
        )}
      </div>

      <p className="text-sm text-po-graydark mt-5 lg:mt-1">
        by&nbsp;
        {fromHomePage ? (
          <button
            onClick={() => history.push(`/seller/${seller.id}`)}
            className="font-bold  text-sm text-po-yellowdark"
          >
            {seller?.name}
          </button>
        ) : (
          <span className="font-bold text-sm text-po-black">
            {seller?.name}
          </span>
        )}
      </p>

      <p className={"text-po-graymain mt-3 text-base"}>
        {/*{product?.description}*/}
        <POHTML htmlString={product?.description} />
      </p>
      <div className="my-2">
        {product.style ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
            <div className="col-span-1">
              <h6 className="text-sm 2xl:text-base font-bold text-po-black">
                Colour/Style:
              </h6>
            </div>
            <div className="col-span-1 lg:col-span-3">
              <p className="text-sm 2xl:text-base text-po-black">
                {product?.style}
              </p>
            </div>
          </div>
        ) : null}

        {product.origin ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
            <div className="col-span-1">
              <h6 className="text-sm 2xl:text-base font-bold text-po-black">
                Origin:
              </h6>
            </div>
            <div className="col-span-1 lg:col-span-3">
              <p className="text-sm 2xl:text-base text-po-black">
                {product?.origin}
              </p>
            </div>
          </div>
        ) : null}

        {product.pairing ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
            <div className="col-span-1">
              <h6 className="text-sm 2xl:text-base font-bold text-po-black">
                Food pairing:
              </h6>
            </div>
            <div className="col-span-1 lg:col-span-3">
              <p className="text-sm 2xl:text-base text-po-black">
                {product?.pairing}
              </p>
            </div>
          </div>
        ) : null}
        {product.abv ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
            <div className="col-span-1">
              <h6 className="text-sm 2xl:text-base font-bold text-po-black">
                ABV:
              </h6>
            </div>
            <div className="col-span-1 lg:col-span-3">
              <p className="text-sm 2xl:text-base text-po-black">
                {PODecimalUtil.getABVDecimal(product.abv)}%
              </p>
            </div>
          </div>
        ) : null}
        {/*
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
          <div className="col-span-1 md:hidden mt-2">
            <h6 className="text-sm 2xl:text-base font-bold text-po-black">
              Price:
            </h6>
          </div>
          <div className="col-span-1 lg:col-span-3 md:hidden mt-2">
            <p className="text-sm 2xl:text-base text-po-black font-bold">
              €
              {(product?.price / 100).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      */}
      </div>
    </>
  );
}
