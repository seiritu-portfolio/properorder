import React from "react";
import "../styles.scss";
import POHeader from "../../../../components/POHeader";
import NavSidebar from "../../NavSidebar";
import OrderHeader from "./OrderHeader";
import Timeline from "./Timeline";
import OrderSummary from "./OrderSummary";
import { ArrowBackIos } from "@material-ui/icons";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import history from "../../../../routes/history";
import Footer from "../../../../components/POFooter";
import { POAddress, POOrder, POPayment } from "../../../../models";
import AddressCard from "../../../../components/AddressCard";
import POAddressCard from "../../../../models/Enum/POAddressCard";
import { connect } from "react-redux";
import PaymentItem from "../../../../components/PaymentCard";
import POPaymentType from "../../../../models/Enum/POPaymentType";

const useStyles = makeStyles((theme) => ({
  backButton: {
    borderWidth: 0,
    color: "#4F4F4F",
    fontWeight: "600",
  },
  root: {
    color: "#23232D",
    "&$checked": {
      color: theme.palette.common.primary,
    },
  },
  button: {
    fontWeight: 600,
  },
}));

function OrderDetails(props) {
  const order = POOrder.fromState(props?.location?.state?.order ?? {});
  const classes = useStyles();

  console.log(order);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <POHeader classNames={"absolute w-full"} />
      <div className="profile-header flex flex-col">
        <h1 className="profile-main-heading pl-2 pt-2 uppercase ml-5 mt-3 lg:mt-0 lg:ml-20 xl:ml-28 2xl:ml-48">
          Account settings
        </h1>
      </div>

      <div className="rectangle-container bg-white profile-container lg:mx-20 xl:mx-28 2xl:ml-48 z-10">
        <div className="divide-y divide-light md:grid md:grid-cols-7 lg:grid-cols-4 md:divide-y-0 md:divide-x">
          <NavSidebar navIndex={4} />
          <div className="pt-4 pb-8 px-6 lg:px-10 2xl:px-20  md:col-span-5 lg:col-span-3">
            <div className="w-full">
              <button
                className={clsx("h-6 -ml-4", classes.backButton)}
                onClick={() => history.goBack()}
              >
                <ArrowBackIos color={"secondary"} />
                <span className="text-sm text-po-graymain">
                  Back to my orders
                </span>
              </button>
              <OrderHeader order={order} />
              {/*TODO: uncomment here after api done*/}
              {/*  <Timeline order={order} />*/}
              <OrderSummary order={order} />
              <div className="mt-5 md:grid xl:grid-cols-2 lg:px-4 lg:gap-8 xl:gap-20">
                <div className="xl:col-span-1">
                  {order.user_address != null && (
                    <h5 className="my-4 font-bold text-po-black text-lg md:text-2xl">
                      Delivery address:
                    </h5>
                  )}
                  {order.user_address != null && (
                    <AddressCard
                      variant={POAddressCard.default}
                      item={POAddress.fromState(order.user_address)}
                    />
                  )}
                </div>
                {/*TODO: FIX ME */}
                {order.payment === 123 && (
                  <div>
                    <h5 className="my-4 font-bold text-po-black text-lg md:text-2xl">
                      Paid by:
                    </h5>
                    <PaymentItem
                      variant={POPaymentType.default}
                      item={POPayment.fromState(order.payment)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-8">
        <Footer />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.User.user,
  userAddresses: state.User.userAddresses,
});

export default connect(mapStateToProps, null)(OrderDetails);
