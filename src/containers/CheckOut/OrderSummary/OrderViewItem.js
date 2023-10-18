import React from "react";
import DateTimeUtil from "../../../utils/DateTimeUtil";
import PODecimalUtil from "../../../utils/PODecimalUtil";
import POOrderService from "../../../services/POOrderService";
import { ReactSVG } from "react-svg";
import AlertIcon from "../../../assets/alert.svg";
import DeleteIcon from "../../../assets/delete.svg";
import { getLocalCart, storeLocalCart } from "../../../services/HelperService";
import APIManager from "../../../Network/APIManager";
import { POOrder } from "../../../models";
import * as rootActions from "../../../redux/RootSaga/actions";
import * as userActions from "../../../redux/UserSaga/actions";
import { connect } from "react-redux";

function OrderViewItem(props) {
  const { order, setIsLoading, setAlertInfo } = props;

  if (order.products.length === 0) {
    return null;
  }

  const handleDeleteOrder = async () => {
    if (props.userToken == null) {
      return;
    }

    setIsLoading(true);
    APIManager.deleteOrder(order.id)
      .then((res) => {
        onUpdatedOrder(
          POOrder.fromState({
            ...order,
            products: [],
          })
        );
        setTimeout(() => {
          setIsLoading(false);
        }, 250);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        setAlertInfo({
          open: true,
          message: error,
          severity: "error",
        });
      });
  };

  const onUpdatedOrder = (order) => {
    props.actions.updateActiveOrders(
      props.orders.map((o) => (o.id === order.id ? order : o))
    );
  };

  const renderProductItem = (product, index) => (
    <div
      key={index}
      className={"flex flex-row flex-1 justify-between mt-2 px-3"}
    >
      <div className={"flex flex-row my-1"}>
        <h5 className={"font-semibold mr-4"}>{product.quantity}&nbsp;x</h5>
        <div className={"flex flex-col"}>
          <h5 className={"font-semibold"}>{product.name}</h5>
          <p className={"cart-item-price-text"}>
            {PODecimalUtil.getPriceDecimalString(product.price)}
          </p>
        </div>
      </div>
      <h6 className={"font-bold  pl-3 my-1"}>
        {PODecimalUtil.getPriceDecimalString(
          product.getCalculatedTotalForOrder()
        )}
      </h6>
    </div>
  );
  return (
    <div>
      <div className={"flex flex-col bg-po-graylight pt-2 px-3 pb-2 mt-3"}>
        <div className={"flex flex-row items-center justify-between"}>
          <h3 className="text-lg font-bold">{order.site?.name ?? ""}</h3>
          <p className={"font-semibold"}>
            {POOrderService.capitalize(order.delivery_method ?? "")}
          </p>
        </div>
        {order.isUnavailableOrder() && (
          <div className="flex flex-row items-center mt-1">
            <ReactSVG src={AlertIcon} className="h-4" />
            <p className="text-po-yellowdark font-semibold text-xs pl-1 py-0">
              {"This seller is not available in this area"}
            </p>
            <button className={"ml-auto"} onClick={() => handleDeleteOrder()}>
              <ReactSVG src={DeleteIcon} />
            </button>
          </div>
        )}
        {/* TODO in later version: estimated delivery time instead of created_at date
          <p className={"cart-item-order-view-date ml-2"}>
            {DateTimeUtil.getOrderTime(order.created_at)}
          </p>
        */}
      </div>
      {order.products.map((product, index) =>
        renderProductItem(product, index)
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  userToken: state.User.userToken,
  orders: state.User.userActiveOrders,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateActiveOrders: (userActiveOrders) => {
      dispatch(userActions.updateActiveOrders(userActiveOrders));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderViewItem);
