import React, { useEffect, useState } from "react";
import "./styles.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import OrderItem from "./OrderItem";
import APIManager from "../../../Network/APIManager";
import * as userActions from "../../../redux/UserSaga/actions";
import { connect } from "react-redux";
import Spinner from "react-spinkit";
import { POOrderStatus } from "../../../models";

function OrderList(props) {
  const { setOrderCounts, status } = props;
  const [orders, setOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState("1");
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    props.actions.fetchOrders();
    loadOrders(true);
  }, []);

  const loadOrders = (reset = false) => {
    if (pageNumber == null) {
      return;
    }

    if (reset) {
      setLoadingOrders(true);
    }

    const queries =
      status === "inProgress"
        ? [
            POOrderStatus.placed,
            // TODO: uncomment here after api fixed
            // POOrderStatus.out_for_delivery,
            // POOrderStatus.preparing,
            // POOrderStatus.ready_for_collection,
            // POOrderStatus.ready_for_delivery,
          ]
        : [POOrderStatus.collected, POOrderStatus.delivered];

    APIManager.fetchOrders(
      pageNumber,
      `&${queries.map((s) => `order_status[]=${s}`).join("&")}`
    )
      .then((res) => {
        console.log(res);
        if (reset) {
          setLoadingOrders(false);
        }
        setOrders([...orders, ...res.orders]);
        setPageNumber(res.pagination.getNextPagePath());
        setOrderCounts((prevCounts) => ({
          ...prevCounts,
          [status]: res.pagination.total,
        }));
      })
      .catch((error) => {
        console.log(error);
        if (reset) {
          setLoadingOrders(false);
        }
      });
  };

  if (loadingOrders) {
    return (
      <div className={"flex flex-row items-center justify-center pb-12 pt-16"}>
        <Spinner name="ball-spin-fade-loader" fadeIn="none" color={"#E27F03"} />
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={orders.length}
      next={loadOrders}
      hasMore={pageNumber != null}
    >
      <div className={"mt-2"}>
        {orders.map((item, index) => (
          <OrderItem key={index} order={item} />
        ))}
      </div>
    </InfiniteScroll>
  );
}

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchOrders: () => {
      dispatch(userActions.fetchOrders());
    },
  },
});

export default connect(null, mapDispatchToProps)(OrderList);
