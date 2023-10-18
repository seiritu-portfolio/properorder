import React, { useEffect, useState } from "react";
import { Button, Divider } from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import OrderViewItem from "./OrderViewItem";
import POAddNew from "../../../components/POAddNew";
import history from "../../../routes/history";
import { HiOutlineLockClosed } from "react-icons/hi";
import POModal from "../../../components/POModal";
import AddDiscount from "./AddDiscount";
import * as rootActions from "../../../redux/RootSaga/actions";
import { connect } from "react-redux";
import PODrawerType from "../../../models/Enum/PODrawerType";
import { PODeliveryMode, POOrder } from "../../../models";
import POAlert from "../../../components/POAlert";
import * as userActions from "../../../redux/UserSaga/actions";
import PODecimalUtil from "../../../utils/PODecimalUtil";
import POOrderService from "../../../services/POOrderService";
import POSpinner from "../../../components/POSpinner";
import APIManager from "../../../Network/APIManager";
import { useStripe } from "@stripe/react-stripe-js";

function OrderSummary(props) {
  const stripe = useStripe();
  const {
    actions: { openDrawer },
    selectedAddressId,
    selectedPaymentId,
    userPayments,
    userAddresses,
    userActiveOrders,
    justShow = false,
    className = "",
    isGift,
    giftNotes,
    deliveryDetailNeeded,
  } = props;

  const [discountModalVisible, setDiscountModalVisible] = React.useState(false);
  const handleCloseDiscountModal = () => setDiscountModalVisible(false);

  const [alertInfo, setAlertInfo] = React.useState({ open: false });
  const [isLoading, setIsLoading] = useState(false);

  const [orders, setOrders] = useState(
    userActiveOrders.filter((order) => order.products.length > 0)
  );

  useEffect(() => {
    const selectedAddress = userAddresses.find(
      (a) => a.id === selectedAddressId
    );
    APIManager.fetchActiveOrders(selectedAddress?.postcode).then((res) => {
      setOrders(res.filter((order) => order.products.length > 0));
    });
  }, [selectedAddressId, userActiveOrders]);

  console.log(orders);

  const handleConfirm = () => {
    const selectedAddress = userAddresses.find(
      (a) => a.id === selectedAddressId
    );
    const selectedPayment = userPayments.find(
      (p) => p.id === selectedPaymentId
    );

    if (!selectedAddress && deliveryDetailNeeded) {
      setAlertInfo({
        open: true,
        message: "You need to select an address.",
        severity: "warning",
      });
      return;
    }

    if (!selectedPayment) {
      setAlertInfo({
        open: true,
        message: "You need to select a payment.",
        severity: "warning",
      });
      return;
    }

    if (orders.some((v) => v.isUnavailableOrder())) {
      setAlertInfo({
        open: true,
        message: "Please remove unavailable orders to proceed.",
        severity: "warning",
      });
      return;
    }

    // TODO: integrate API for gift note, when it's done
    console.log(giftNotes);

    setIsLoading(true);
    handleConfirmOrder(0);
  };

  const handleConfirmOrder = (orderIndex) => {
    if (orderIndex >= orders.length) {
      setIsLoading(false);
      history.push(
        `/checkout-confirm/${orders.map((order) => order.id).join("|")}`
      );
    } else {
      const order = orders[orderIndex];
      if (order.products.length === 0) {
        handleConfirmOrder(orderIndex + 1);
      } else {
        let request = {
          delivery_method: order.delivery_method,
          payment_processor_id: selectedPaymentId,
          is_a_gift: isGift,
        };
        if (deliveryDetailNeeded) {
          request = { ...request, user_address_id: selectedAddressId };
        }
        if (isGift) {
          request = { ...request, gift_note: giftNotes };
        }
        APIManager.updateOrder(order.id, request)
          .then((res) => {
            console.log(res);

            APIManager.confirmOrder(order.id)
              .then((res) => {
                console.log(`${orderIndex} order confirmed`, res);
                const clientSecret = res?.payment_intent?.client_secret;

                if (clientSecret) {
                  stripe
                    .confirmCardPayment(clientSecret)
                    .then((confirmedResult) => {
                      console.log(confirmedResult);
                      if (confirmedResult?.error != null) {
                        onConfirmCardFailure();
                      } else {
                        handleConfirmOrder(orderIndex + 1);
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                      onConfirmCardFailure();
                    });
                } else {
                  onConfirmCardFailure();
                }
              })
              .catch((error) => {
                console.log("confirmOrder error", error);
                setIsLoading(false);
                setAlertInfo({
                  open: true,
                  message: error,
                  severity: "warning",
                });
              });
          })
          .catch((error) => {
            console.log("updateOrder error", error);
            setIsLoading(false);
            setAlertInfo({
              open: true,
              message: error,
              severity: "warning",
            });
          });
      }
    }
  };

  const onConfirmCardFailure = () => {
    setIsLoading(false);
    setAlertInfo({
      open: true,
      message: "Confirm card payment failed, please contact us",
      severity: "warning",
    });
  };

  return (
    <div className={"flex flex-col"}>
      <div
        className={`flex flex-col shadow-lg rounded-xl px-6 py-4 ${
          !justShow ? "my-4" : ""
        } ${className}`}
      >
        <div className={"flex flex-row items-center justify-between mb-2"}>
          <p className={"check-out-sub-title"}>Order Summary</p>
          {!justShow && (
            <button
              className={"check-out-order-edit-button"}
              onClick={() => openDrawer(PODrawerType.edit_order)}
            >
              Edit order
            </button>
          )}
        </div>
        <Divider />
        <PerfectScrollbar className={"max-h-80"}>
          {orders.map((order, index) => (
            <OrderViewItem
              key={index}
              order={order}
              setAlertInfo={setAlertInfo}
              setIsLoading={setIsLoading}
            />
          ))}
        </PerfectScrollbar>
        <Divider />
        <div className={"flex flex-col py-2 px-3"}>
          <div className={"flex flex-row flex-1 justify-between my-2"}>
            <p className={"cart-info-des text-po-graymain"}>
              Subtotal ({POOrderService.getSubItems(orders)} items):
            </p>
            <p className={"cart-info-des text-black"}>
              {PODecimalUtil.getPriceDecimalString(POOrder.getSubTotal(orders))}
            </p>
          </div>
          {orders
            .filter((e) => e.delivery_method === PODeliveryMode.delivery)
            .map((order, index) => (
              <div key={index}>
                <div className={"flex flex-row flex-1 justify-between"}>
                  <p className={"cart-info-des text-po-graymain"}>
                    Delivery Fee ({order.site?.name ?? ""}):
                  </p>
                  <p className={"cart-info-des text-black"}>
                    {order.getDeliveryPrice() === "0.00"
                      ? "Free"
                      : `€${order.getDeliveryPrice()}`}
                  </p>
                </div>
                {/*
                {order.coupon_id != null && (
                  <div className={"flex flex-row flex-1 mb-2"}>
                    <p
                      className={
                        "cart-item-order-view-discount-info text-po-graymain"
                      }
                    >
                      DISC2021 discount code applied
                    </p>
                    <button
                      className={
                        "cart-item-order-view-discount-info font-bold text-po-red ml-2"
                      }
                    >
                      Remove
                    </button>
                  </div>
                )}*/}
              </div>
            ))}
          <POAddNew
            title={"Add a discount code"}
            onClick={() => setDiscountModalVisible(true)}
          />
        </div>
        <Divider />
        <div className={"flex flex-row flex-1 justify-between my-3 px-3"}>
          <p className={"cart-info-total text-black"}>Total:</p>
          <p className={"cart-info-total text-black"}>
            {PODecimalUtil.getPriceDecimalString(POOrder.getTotal(orders))}
          </p>
        </div>
        {/*
          <Divider />
          <div className="flex flex-col mt-3 mr-1">
          <FormControlLabel
              control={
              <Checkbox
                  color={"primary"}
                  classes={{ root: classes.checkBox }}
                  checked
              />
              }
              label={"Is it a gift?"}
          />
        </div>
      */}
      </div>
      {!justShow && (
        <p className={"text-center text-sm mt-1 justify-center mb-4"}>
          By clicking the button, you agree to the{" "}
          <a
            href="/terms-and-conditions"
            className={"cursor-pointer font-semibold text-po-blue inline-flex"}
          >
            Terms and conditions
          </a>
        </p>
      )}
      {!justShow && (
        <Button
          variant="contained"
          color="secondary"
          className={"font-bold h-12"}
          onClick={() => handleConfirm()}
        >
          Confirm payment{" "}
          {PODecimalUtil.getPriceDecimalString(POOrder.getTotal(orders))}
        </Button>
      )}
      {!justShow && (
        <div
          className={
            "flex flex-row text-sm leading-4 text-po-graydark items-center justify-center mt-1"
          }
        >
          <HiOutlineLockClosed />
          <p className={"ml-1 mt-0.5"}>Payments are secure and encrypted</p>
        </div>
      )}
      <POModal
        modalVisible={discountModalVisible}
        handleCloseModal={handleCloseDiscountModal}
        renderContent={() => (
          <AddDiscount handleCloseModal={handleCloseDiscountModal} />
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
  userPayments: state.User.userPayments,
  userAddresses: state.User.userAddresses,
  userActiveOrders: state.User.userActiveOrders,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    openDrawer: (drawerType) => {
      dispatch(rootActions.openDrawer(drawerType));
    },
    fetchActiveOrders: () => {
      dispatch(userActions.fetchActiveOrders());
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
