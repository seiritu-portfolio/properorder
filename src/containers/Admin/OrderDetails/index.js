import React, { useEffect, useState } from "react";
import "./styles.scss";
import history from "../../../routes/history";
import GoBack from "../Common/GoBack";
import "react-perfect-scrollbar/dist/css/styles.css";
import { POOrder } from "../../../models";
import Header from "./Header";
import CustomerDetails from "./CustomerDetails";
import OrderTimeline from "./OrderTimeline";
import UIService from "../../../services/UIService";
import PaymentInformation from "./PaymentInformation";
import ItemSummary from "./ItemSummary";
import { useParams } from "react-router-dom";
import APIManager from "../../../Network/APIManager";
import Spinner from "react-spinkit";
import * as adminActions from "../../../redux/AdminSaga/actions";
import { connect } from "react-redux";
import DateTimeUtil from "../../../utils/DateTimeUtil";
import ExportCSV from "./ExportCSV";

function OrderDetails(props) {
  const { orgId, sellerIndex, orderId } = useParams();

  if (sellerIndex == null || orderId == null) {
    return null;
  }

  const [order, setOrder] = useState();

  useEffect(() => {
    APIManager.fetchOrder(orderId).then((res) => {
      console.log(res);
      setOrder(POOrder.fromState(res[0]));
    });
  }, []);

  useEffect(() => {
    props.actions.updateSellerIndex({ id: sellerIndex, status: false });
  }, [sellerIndex]);

  useEffect(() => {
    if (props.sellerIndex.status) {
      history.push(
        `/admin/${orgId}/site/${props.sellerIndex.id}/orders/${orderId}`
      );
    }
  }, [props.sellerIndex]);

  if (order == null) {
    return (
      <div className={"flex flex-1 flex-col p-8 items-center justify-center"}>
        <Spinner name="ball-spin-fade-loader" fadeIn="none" color={"#E27F03"} />
      </div>
    );
  }

  const currentStatus =
    order.status?.charAt(0)?.toUpperCase() + order.status?.slice(1);
  const borderStatusColor = UIService.borderColorOfOrderStatus(order.status);
  const textStatusColor = UIService.textColorOfOrderStatus(order.status);

  console.log("orderDetails ", order);

  return (
    <div className={"flex flex-1 flex-col p-8 2xl:px-24"}>
      <div className={"flex flex-row justify-between"}>
        <GoBack title={"Back to all orders"} onClick={() => history.goBack()} />
        <ExportCSV order={order} />
      </div>

      <Header
        orderId={order.id}
        currentStatus={currentStatus}
        borderStatusColor={borderStatusColor}
        textStatusColor={textStatusColor}
      />

      <p className={"text-sm px-4 text-po-graydark font-medium"}>
        Last updated at{" "}
        <span className={"font-bold"}>
          {DateTimeUtil.getLocalTime(new Date(order.updated_at) ?? new Date())}
        </span>
      </p>

      <div className={"flex-1 grid flex-row grid-cols-2 xl:grid-cols-3 gap-6"}>
        <CustomerDetails
          customer={order.user}
          customerAddress={order.user_address}
        />
        {/* TODO: Implement Order History*/}
        {/*}   <OrderTimeline
          currentStatus={currentStatus}
          textStatusColor={textStatusColor}
        />*/}
        <PaymentInformation order={order} />
        <ItemSummary order={order} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  sellerIndex: state.Admin.sellerIndex,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateSellerIndex: (sellerId) => {
      dispatch(adminActions.updateSellerIndex(sellerId));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
