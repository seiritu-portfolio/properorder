import React, { useEffect, useState } from "react";
import "./styles.scss";
import POHeader from "../../components/POHeader";
import OrderSummary from "./OrderSummary/OrderSummary";
import CheckOutHeader from "./CheckOutHeader";
import DeliveryDetails from "./Addresses/DeliveryDetails";
import PaymentMethod from "./payments/PaymentMethod";
import Gift from "./Gift";
import { connect } from "react-redux";
import Footer from "../../components/POFooter";
import Constants from "../../config/Constants";

function CheckOut(props) {
  const { orders } = props;
  const classNames = {
    container: "shadow-lg rounded-xl px-3 sm:px-6 py-3 sm:py-4 my-2 sm:my-6",
    containerTitle: "flex flex-row space-x-3 items-center mb-4",
  };

  const [selectedAddressId, setSelectedAddressId] = React.useState(null);
  const [selectedPaymentId, setSelectedPaymentId] = React.useState(
    props.user?.default_stripe_payment_id
  );
  const [isGift, setIsGift] = React.useState(false);
  const [giftNotes, setGiftNotes] = React.useState("");
  const [deliveryDetailNeeded, setDeliveryDetailNeeded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.sessionStorage.removeItem(Constants.SS_REDIRECT_AFTER_LOGIN);
  }, []);

  useEffect(() => {
    setDeliveryDetailNeeded(
      orders.some(
        (order) =>
          order.delivery_method === "delivery" && order.products.length > 0
      )
    );
  }, [orders]);

  return (
    <div className="flex flex-col w-full  min-h-screen">
      <POHeader />
      <div className={"flex flex-col"}>
        <CheckOutHeader />
        <div
          className={
            "grid grid-cols-2 xl:grid-cols-3 gap-8 mx-4 sm:mx-8 mt-4 pb-6"
          }
        >
          <div className={"col-span-2"}>
            {deliveryDetailNeeded && (
              <DeliveryDetails
                classNames={classNames}
                selectedAddressId={selectedAddressId}
                setSelectedAddressId={setSelectedAddressId}
              />
            )}
            <PaymentMethod
              classNames={classNames}
              selectedPaymentId={selectedPaymentId}
              setSelectedPaymentId={setSelectedPaymentId}
              deliveryDetailNeeded={deliveryDetailNeeded}
            />
            {/* TODO: integrate API for gift note, when it's done*/}
            {/*}   <Gift
              giftNotes={giftNotes}
              setGiftNotes={setGiftNotes}
              isGift={isGift}
              setIsGift={setIsGift}
              deliveryDetailNeeded={deliveryDetailNeeded}
            />*/}
          </div>
          <div className={"col-span-2 xl:col-span-1"}>
            <OrderSummary
              selectedAddressId={selectedAddressId}
              selectedPaymentId={selectedPaymentId}
              giftNotes={giftNotes}
              isGift={isGift}
              deliveryDetailNeeded={deliveryDetailNeeded}
            />
          </div>
        </div>
      </div>
      <div className="mt-auto pt-6">
        <Footer />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userPayments: state.User.userPayments,
  orders: state.User.userActiveOrders,
  user: state.User.user,
});

export default connect(mapStateToProps, null)(CheckOut);
