import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Button, Divider, Tooltip } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import * as rootActions from "../../redux/RootSaga/actions";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import history from "../../routes/history";
import { PODeliveryMode, POOrder } from "../../models";
import PODeleteModal from "../PODeleteModal";
import POAlert from "../POAlert";
import DeleteCartProduct from "./DeleteCartProduct";
import * as userActions from "../../redux/UserSaga/actions";
import PODecimalUtil from "../../utils/PODecimalUtil";
import POOrderService from "../../services/POOrderService";
import { getLocalCart, storeLocalCart } from "../../services/HelperService";
import APIManager from "../../Network/APIManager";
import POSpinner from "../POSpinner";
import POProductService from "../../services/POProductService";
import Constants from "../../config/Constants";

const useStyles = makeStyles({
  checkout: {
    fontWeight: "bold",
    marginTop: "1rem",
    marginBottom: "0.5rem",
  },
  mainButton: {
    backgroundColor: "#F0F0F5",
    marginTop: "1rem",
    marginBottom: "0.5rem",
    fontWeight: "400",
    color: "#81818E",

    "&:hover": {
      opacity: 1,
      backgroundColor: "#F0F0F5",
      boxShadow: "none",
      cursor: "not-allowed",
    },
  },
});

function MyOrder(props) {
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const [deliveryMode, setDeliveryMode] = React.useState(PODeliveryMode.both);
  const [deleteModalState, setDeleteModalState] = React.useState(null);
  const [alertInfo, setAlertInfo] = React.useState({ open: false });
  const { userToken } = props;
  const [orders, setOrders] = useState([]);
  const [checkingSellerId, setCheckingSellerId] = useState();

  useEffect(() => {
    props.actions.fetchActiveOrders();
  }, []);

  useEffect(() => {
    console.log("activeOrders", props.orders);
    setOrders(props.orders.filter((o) => o.products.length > 0));
  }, [props.orders]);

  const onUpdatedOrder = (order) => {
    props.actions.updateActiveOrders(
      orders.map((o) => (o.id === order.id ? order : o))
    );
  };

  const handleDeleteProductItem = (order, product) => {
    // setDeleteModalState({ order, product });
    if (props.userToken == null) {
      let localCart = getLocalCart();
      localCart = localCart.map((c) =>
        c.id === order.id
          ? {
              ...c,
              products: c.products.filter(
                (p) =>
                  p.product.id !== product.id ||
                  !POProductService.isSameProduct(p, product)
              ),
            }
          : c
      );
      storeLocalCart(localCart);
      onDeletedProductItem(order, product);
      return;
    }
    setIsLoading(true);
    APIManager.deleteProductFromOrder(order.id, product.id)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        onDeletedProductItem(order, product);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setAlertInfo({
          open: true,
          message: error,
          severity: "error",
        });
      });
  };

  const onDeletedProductItem = (order, product) => {
    setAlertInfo({ open: true, message: "Deleted successfully!" });
    if (props.userToken == null) {
      props.actions.fetchActiveOrders();
    } else {
      props.actions.updateActiveOrders(
        orders.map((o) =>
          o.id === order.id
            ? POOrder.fromState({
                ...order,
                products: order.products.filter((p) => p.id !== product.id),
              })
            : o
        )
      );
    }
    // setDeleteModalState(null);
  };

  const {
    isEditMode,
    actions: { closeDrawer },
  } = props;

  const orderEmpty = orders.length === 0;

  const canNext = () =>
    !orders.some(
      (o) =>
        o.delivery_method === PODeliveryMode.delivery &&
        o.site.minimum_order / 100 > Number(o.getOrderPrice()) / 100
    );

  const anyUnavailableOrder = () => {
    return orders.some((o) => o.isUnavailableOrder());
  };

  return (
    <div className={"my-order-bar"}>
      <PerfectScrollbar>
        <div className={"flex flex-row justify-between items-center my-2"}>
          <div className={"my-order-bar-title ml-4"}>
            {orderEmpty
              ? "Your order is empty"
              : `${isEditMode ? "Edit" : "Your"} order`}
          </div>
          <Close
            className={"mr-3 cursor-pointer"}
            color={"secondary"}
            onClick={() => closeDrawer()}
          />
        </div>
        <Divider />
        {!orderEmpty && (
          <div className={"flex flex-1 flex-col px-2"}>
            {/*
            <POSegment
              deliveryMode={deliveryMode}
              setDeliveryMode={setDeliveryMode}
            />
            */}
            {orders.map((order, index) => (
              <CartItem
                key={index}
                order={order}
                onUpdatedOrder={onUpdatedOrder}
                handleDeleteProductItem={handleDeleteProductItem}
                checkingSellerId={checkingSellerId}
                setCheckingSellerId={setCheckingSellerId}
                setAlertInfo={setAlertInfo}
              />
            ))}
          </div>
        )}
      </PerfectScrollbar>
      <div className={"flex flex-col"}>
        <Divider />
        {!orderEmpty && (
          <div className={"flex flex-col bg-white py-4 px-3"}>
            <div className={"flex flex-row flex-1 justify-between"}>
              <p className={"cart-info-des text-po-graymain"}>
                Subtotal ({POOrderService.getSubItems(orders)} items):
              </p>
              <p className={"cart-info-des text-black"}>
                {PODecimalUtil.getPriceDecimalString(
                  POOrder.getSubTotal(orders)
                )}
              </p>
            </div>
            {orders
              .filter((e) => e.delivery_method === PODeliveryMode.delivery)
              .map((order, index) => (
                <div key={index} className={"flex flex-col"}>
                  <div className={"flex flex-row flex-1 justify-between mt-1"}>
                    <p className={"cart-info-des text-po-graymain"}>
                      Delivery Fee ({order.site?.name ?? ""}):
                    </p>
                    <p className={"cart-info-des text-black"}>
                      {order.getDeliveryPrice() === "0.00"
                        ? "Free"
                        : `€${order.getDeliveryPrice()}`}
                    </p>
                  </div>
                  {/*{Number(order.delivery_price) === 0 && (*/}
                  {/*  <p className={"cart-info-des text-po-green"}>*/}
                  {/*    You have qualified for free delivery!*/}
                  {/*  </p>*/}
                  {/*)}*/}
                </div>
              ))}
          </div>
        )}
        <div className={"flex flex-col mx-3"}>
          <Divider />
          {!orderEmpty && (
            <div className={"flex flex-row flex-1 justify-between mt-2"}>
              <p className={"cart-info-total text-black"}>Total:</p>
              <p className={"cart-info-total text-black"}>
                {PODecimalUtil.getPriceDecimalString(POOrder.getTotal(orders))}
              </p>
            </div>
          )}

          {canNext() && !anyUnavailableOrder() ? (
            <Button
              variant="contained"
              color="secondary"
              className={clsx(classes.checkout, "h-12")}
              onClick={() => {
                if (orderEmpty) {
                  closeDrawer();
                  history.push("/home");
                } else {
                  const nOrder = orders.find(
                    (o) =>
                      !(
                        o.delivery_method === "delivery" ||
                        o.delivery_method === "collection"
                      )
                  );
                  if (nOrder != null) {
                    setAlertInfo({
                      open: true,
                      message: `You need to select delivery method for ${nOrder.site?.name}`,
                      severity: "warning",
                    });
                    return;
                  }
                  closeDrawer();
                  if (userToken) {
                    history.push("/checkout");
                  } else {
                    // window.sessionStorage.setItem(
                    //   Constants.SS_REDIRECT_AFTER_LOGIN,
                    //   "/checkout"
                    // );
                    history.push({
                      pathname: "/login-with-password",
                      state: { shouldGoCheckOut: true },
                    });
                  }
                }
              }}
            >
              {orderEmpty
                ? "Continue shopping"
                : isEditMode
                ? "Save changes"
                : "Go to checkout"}
            </Button>
          ) : (
            <Tooltip
              title={
                anyUnavailableOrder()
                  ? "Please remove unavailable orders"
                  : "The minimum order value has not been reached"
              }
              arrow
              placement="top"
            >
              <div className={"w-full"}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={clsx(
                    classes.checkout,
                    classes.mainButton,
                    "h-12 w-full"
                  )}
                >
                  {orderEmpty
                    ? "Continue shopping"
                    : isEditMode
                    ? "Save changes"
                    : "Go to checkout"}
                </Button>
              </div>
            </Tooltip>
          )}

          {isEditMode && (
            <p className={"my-order-bottom-text"}>
              You will have a chance to review your order
            </p>
          )}
        </div>
      </div>
      <PODeleteModal
        modalVisible={deleteModalState != null}
        handleCloseModal={() => setDeleteModalState(null)}
        renderContent={() => (
          <DeleteCartProduct
            deleteModalState={deleteModalState}
            handleCloseModal={() => setDeleteModalState(null)}
            handleUpdateAlert={(alertInfo) => setAlertInfo(alertInfo)}
            onDeletedProductItem={onDeletedProductItem}
          />
        )}
      />
      <POAlert
        alertInfo={alertInfo}
        handleClose={() => setAlertInfo({ open: false })}
      />
      <POSpinner isLoading={isLoading} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  userToken: state.User.userToken,
  orders: state.User.userActiveOrders,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    closeDrawer: () => {
      dispatch(rootActions.closeDrawer());
    },
    fetchActiveOrders: () => {
      dispatch(userActions.fetchActiveOrders());
    },
    updateActiveOrders: (userActiveOrders) => {
      dispatch(userActions.updateActiveOrders(userActiveOrders));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyOrder);
