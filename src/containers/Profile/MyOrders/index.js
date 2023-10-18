import React, { useState } from "react";
import "./styles.scss";
import POHeader from "../../../components/POHeader";
import NavSidebar from "../NavSidebar";
import Footer from "../../../components/POFooter";
import * as userActions from "../../../redux/UserSaga/actions";
import { connect } from "react-redux";
import OrderList from "./OrderList";
import OrdersTabBar from "./OrdersTabBar";

function MyOrders(props) {
  const [tabBarIndex, setTabBarIndex] = useState(0);
  const [orderCounts, setOrderCounts] = useState({
    inProgress: 0,
    completed: 0,
  });
  const renderInProgressOrders = () => (
    <div className={"mt-2"}>
      <OrderList
        key={"1"}
        setOrderCounts={setOrderCounts}
        status={"inProgress"}
      />
    </div>
  );

  const renderCompletedOrders = () => (
    <div className={"mt-2"}>
      <OrderList
        key={"2"}
        setOrderCounts={setOrderCounts}
        status={"completed"}
      />
    </div>
  );

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
          <div className="py-8 px-3 md:px-6 lg:px-10  md:col-span-5 lg:col-span-3">
            <div className="w-full">
              <h3 className="text-bold text-3xl mb-3">My orders</h3>
              <OrdersTabBar
                tabBarIndex={tabBarIndex}
                setTabBarIndex={setTabBarIndex}
                orderCounts={orderCounts}
              />
              {tabBarIndex === 0
                ? renderInProgressOrders()
                : renderCompletedOrders()}
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

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchOrders: () => {
      dispatch(userActions.fetchOrders());
    },
  },
});

export default connect(null, mapDispatchToProps)(MyOrders);
