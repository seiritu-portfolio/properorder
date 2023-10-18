import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider } from "@material-ui/core";
import clsx from "clsx";
import history from "../../../../routes/history";
import APIManager from "../../../../Network/APIManager";
import PODecimalUtil from "../../../../utils/PODecimalUtil";
import POOrderService from "../../../../services/POOrderService";
import { POOrder } from "../../../../models";

const useStyles = makeStyles({
  root: {
    paddingLeft: "10px",
    paddingRight: "10px",
    minHeight: "3rem",
    fontWeight: "bold",
    fontSize: "14px",
    ["@media (min-width:640px)"]: {
      fontSize: "16px",
      paddingLeft: "2.5rem",
      paddingRight: "2.5rem",
    },
  },
  divider: {
    backgroundColor: "#EEDDD7",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
});

export default function OrderSummary(props) {
  const classes = useStyles();
  const { order } = props;

  const [seller, setSeller] = React.useState(null);

  useEffect(() => {
    APIManager.fetchSeller(order.site.id).then((res) => {
      setSeller(res);
    });
  }, []);

  const handleContactSeller = () => {
    if (seller == null) {
      return;
    }
    history.push({
      pathname: `/seller/${seller.id}`,
      state: {
        tabIndex: 1,
      },
    });
  };

  return (
    <div className="flex flex-col mt-6 lg:px-4">
      <h5 className="mt-4 font-bold text-po-black text-lg md:text-2xl">
        Order Summary
      </h5>
      <div className="rectangle-container mt-2 px-4 md:px-6 py-5">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <img
              className={"h-12 w-12 mr-3 object-contain"}
              src={order.site.organisation.logo}
              alt={"logo"}
            />
            <h4 className=" font-bold text-base md:text-xl lg:text-2xl mr-1">
              {order.site.name}
            </h4>
          </div>
          <Button
            variant="contained"
            color="secondary"
            className={clsx(classes.root, "h-full md:w-auto")}
            onClick={() => handleContactSeller()}
          >
            Contact seller
          </Button>
        </div>
        {order.products.map((product, index) => (
          <div
            key={index}
            className={"flex flex-row flex-1 justify-between my-5 px-3"}
          >
            <div className={"flex"}>
              <h5 className={"font-bold  text-po-graymain text-lg mr-4"}>
                {product.quantity} x
              </h5>
              <div className={"flex flex-col"}>
                <h5 className={"font-bold text-po-graymain text-lg"}>
                  {product.name}
                </h5>
                <p className={"text-sm text-po-graymain font-light"}>
                  {PODecimalUtil.getPriceDecimalString(product.price)}
                </p>
              </div>
            </div>
            <h6 className={"font-semibold text-po-graymain text-lg"}>
              {PODecimalUtil.getPriceDecimalString(product.price)}
            </h6>
          </div>
        ))}
        <Divider className={clsx(classes.divider)} />

        <div className={"flex flex-col bg-white my-4"}>
          <div className={"flex flex-row flex-1 justify-between"}>
            <p className={"text-po-graymain text-lg"}>
              Subtotal ({POOrderService.getSubItems([order])} items):
            </p>
            {/* TODO: replace with function calculated order subtotal*/}
            <p className={"font-semibold text-po-graymain text-lg"}>
              {PODecimalUtil.getPriceDecimalString(
                POOrder.getSubTotal([order])
              )}
            </p>
          </div>
          {order.user_address != null && (
            <div className={"flex flex-row flex-1 justify-between"}>
              <p className={"text-po-graymain text-lg"}>Delivery Fee:</p>
              <p className={"font-semibold text-po-graymain text-lg"}>
                {" "}
                {PODecimalUtil.getPriceDecimalString(order.delivery_price)}
              </p>
            </div>
          )}
        </div>
        <Divider className={clsx(classes.divider)} />
        <div className={"flex flex-row flex-1 justify-between mt-4 mb-1"}>
          <p className={"text-xl font-bold text-po-black"}>Total:</p>
          {/* TODO: replace with function calculated order total*/}
          <p className={"text-xl font-bold  text-po-black"}>
            {PODecimalUtil.getPriceDecimalString(
              Number(POOrder.getSubTotal([order])) +
                Number(order.delivery_price)
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
