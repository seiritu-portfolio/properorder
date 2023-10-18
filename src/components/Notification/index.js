import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import "./styles.scss";
import cart from "../../assets/cart.svg";
import PODrawerType from "../../models/Enum/PODrawerType";
import * as rootActions from "../../redux/RootSaga/actions";
import { connect } from "react-redux";
import POOrderService from "../../services/POOrderService";
import * as userActions from "../../redux/UserSaga/actions";

function Notification(props) {
  const {
    actions: { openDrawer, updateCartBadgeStatus },
    cartBadgeUpdated,
  } = props;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(props.orders ?? []);
  }, [props.orders]);

  useEffect(() => {
    if (props.cartBadgeUpdated) {
      setTimeout(() => {
        updateCartBadgeStatus(false);
      }, 500);
    }
  }, [cartBadgeUpdated]);

  return (
    <div
      className={"flex items-center justify-center div-cart relative"}
      onClick={() => openDrawer(PODrawerType.my_order)}
    >
      <div
        className={`div-cart-container ${
          cartBadgeUpdated ? "cart-anim" : "cart-anim-org"
        }`}
      >
        <ReactSVG src={cart} />
        <div className={`div-cart-badge flex justify-center items-center`}>
          <span className="text-xs">{POOrderService.getSubItems(orders)}</span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  orders: state.User.userActiveOrders,
  cartBadgeUpdated: state.User.cartBadgeUpdated,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    openDrawer: (drawerType) => {
      dispatch(rootActions.openDrawer(drawerType));
    },
    updateCartBadgeStatus: (updated) => {
      dispatch(userActions.updateCartBadgeStatus(updated));
    },
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Notification);
