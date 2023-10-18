import React, { useEffect, useState } from "react";
import "./styles.scss";
import { POOrderStatus } from "../../../models";
import DateTimeUtil from "../../../utils/DateTimeUtil";
import MyTabs from "../../../components/MyTabs";
import UIService from "../../../services/UIService";
import Filters from "./Filters";
import POModal from "../../../components/POModal";
import UpdateOrderStatus from "./UpdateOrderStatus";
import history from "../../../routes/history";
import APIManager from "../../../Network/APIManager";
import { connect } from "react-redux";
import Spinner from "react-spinkit";
import csvIcon from "../../../assets/csv.svg";
import { useLocation, useParams } from "react-router-dom/cjs/react-router-dom";
import * as adminActions from "../../../redux/AdminSaga/actions";
import POOrderService from "../../../services/POOrderService";
import BackToTopButton from "../../../components/BackToTopBtn";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchQueries from "../../../utils/SearchQueries";
import POAlert from "../../../components/POAlert";
import POSpinner from "../../../components/POSpinner";
import { makeStyles } from "@material-ui/core/styles";
import { ReactSVG } from "react-svg";
import { Button, Tooltip } from "@material-ui/core";
import ReactPDF, { usePDF, PDFDownloadLink } from "@react-pdf/renderer";
import OrdersDocument from "./OrdersDocument";
import { Link } from "@mui/material";

const useStyles = makeStyles((_) => ({
  printBtn: {
    paddingLeft: "1.1rem",
    paddingRight: "1.1rem",
    minHeight: "2.4rem",
    fontWeight: "semibold",
    fontSize: "1.1rem",
    borderRadius: "0.4rem",
    marginLeft: "auto",
  },
}));

function Orders(props) {
  const classes = useStyles();
  const { orgId, sellerIndex } = useParams();
  const [modalStatus, setModalStatus] = useState({ visible: false, item: {} });

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search);

  const [alertInfo, setAlertInfo] = React.useState({ open: false });
  const [isLoading, setIsLoading] = React.useState(false);

  const { orders, totalOrders, ordersCounts } = props.orderDetails;
  const [selectedOrders, setSelectedOrders] = useState([]);

  const handleCloseModal = () => {
    setModalStatus({ ...modalStatus, visible: false });
  };

  const handleSaveStatus = (item) => {
    props.actions.updateAdminOrders(
      orders.map((order) => (order.id === item.id ? item : order))
    );
  };

  const onClickOrder = (order) => {
    history.push(`/admin/${orgId}/site/${sellerIndex}/orders/${order.id}`);
  };

  useEffect(() => {
    props.actions.updateSellerIndex({ id: sellerIndex, status: false });
  }, [sellerIndex]);

  useEffect(() => {
    if (props.sellerIndex.status) {
      history.push(`/admin/${orgId}/site/${props.sellerIndex.id}/orders`);
      props.actions.fetchAdminOrders({
        sellerIndex: props.sellerIndex.id,
      });
    }
  }, [props.sellerIndex]);

  const loadOrders = (reset = false) => {
    if (sellerIndex !== -1) {
      props.actions.fetchAdminOrders({
        reset,
        sellerIndex,
      });
    }
  };

  const handleUpdateOrderStatus = (order, status) => {
    setIsLoading(true);
    APIManager.updateOrderStatus(order.site_id, order.id, `?status=${status}`)
      .then((res) => {
        console.log("updateOrderStatus", res);
        setIsLoading(false);
        handleSaveStatus({ ...order, status });
      })
      .catch((err) => {
        setIsLoading(false);
        setAlertInfo({
          open: true,
          message: err,
          severity: "warning",
        });
      });
  };

  const [instance, updateInstance] = usePDF({
    document: <OrdersDocument orders={selectedOrders} />,
  });

  useEffect(updateInstance, [selectedOrders]);

  const renderPrintOrders = () => (
    <Link
      href={selectedOrders.length > 0 ? instance.url : null}
      download="orders.pdf"
      variant="contained"
      color="secondary"
      startIcon={<ReactSVG src={csvIcon} className={"w-6 h-6"} />}
      className={classes.printBtn}
    >
      Print orders
    </Link>
  );

  return (
    <div className={"flex flex-1 flex-col p-8 2xl:px-24 bg-gray-100"}>
      <header className={"flex flex-row justify-between"}>
        <h2 className="text-2xl font-bold px-3">Orders</h2>
        {selectedOrders.length > 0 ? (
          renderPrintOrders()
        ) : (
          <Tooltip
            title={"Please select orders you want to print"}
            arrow
            placement="top"
          >
            {renderPrintOrders()}
          </Tooltip>
        )}
      </header>

      <div className="relative flex flex-col px-4 mt-4">
        <MyTabs
          tabIndex={
            searchQuery.get(SearchQueries.classification) === "live"
              ? 1
              : searchQuery.get(SearchQueries.classification) === "completed"
              ? 2
              : 0
          }
          setTabIndex={(tabIndex) => {
            searchQuery.set(
              SearchQueries.classification,
              tabIndex === 0 ? "all" : tabIndex === 1 ? "live" : "completed"
            );
            history.replace({
              pathname: location.pathname,
              search: searchQuery.toString(),
            });
            loadOrders(true);
          }}
          styles={{ tabFontSize: "1.1rem" }}
          borderBottom={""}
          tabs={[
            {
              label: `All (${ordersCounts?.total ?? 0})`,
              renderContent: () => null,
            },
            {
              label: `Live (${ordersCounts?.live_count ?? 0})`,
              renderContent: () => null,
            },
            {
              label: `Completed (${ordersCounts?.completed_count ?? 0})`,
              renderContent: () => null,
            },
          ]}
        />
      </div>

      <Filters loadOrders={loadOrders} />

      <div className="flex flex-col mt-6">
        <div className="overflow-x-auto sm:-mx-4 lg:-mx-6">
          <div className="py-2 align-middle inline-block min-w-full sm:px-4 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <InfiniteScroll
                dataLength={orders.length}
                next={() => loadOrders()}
                hasMore={orders.length < totalOrders}
              >
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="db-order-th">
                        Order ID
                      </th>
                      <th scope="col" className="db-order-th">
                        Customer
                      </th>
                      <th scope="col" className="db-order-th">
                        Ordered date
                      </th>
                      <th scope="col" className="db-order-th">
                        Last update
                      </th>
                      {/*<th scope="col" className="db-order-th">*/}
                      {/*  Total Items*/}
                      {/*</th>*/}
                      <th scope="col" className="db-order-th">
                        Status
                      </th>
                      <th scope="col" className="db-order-th">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order, index) => {
                      const completed =
                        order.status === POOrderStatus.delivered ||
                        order.status === POOrderStatus.collected;
                      const status = POOrderStatus[order.status];
                      const actionBtnStatus = POOrderService.getNextStatus(
                        order.delivery_method,
                        order.status
                      );
                      const statusClassName = `capitalize ${UIService.bgColorOfOrderStatus(
                        order.status
                      )} inline-flex items-center px-3 py-1 border border-transparent text-base leading-6 font-semibold rounded-md shadow-sm text-po-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:${UIService.ringColorOfOrderStatus(
                        order.status
                      )}-500 transform transition duration-200 ease-out`;
                      const actionBtnClassName = `capitalize ${UIService.bgColorOfOrderStatus(
                        actionBtnStatus
                      )} inline-flex items-center px-3 py-1 border border-transparent text-base leading-6 font-semibold rounded-md shadow-sm hover:shadow-lg text-po-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:${UIService.ringColorOfOrderStatus(
                        actionBtnStatus
                      )}-500 transform transition duration-200 ease-out`;
                      return (
                        <tr
                          key={`${index}`}
                          className={`cursor-pointer ${
                            selectedOrders.some((o) => o.id === order.id)
                              ? "bg-po-graylight"
                              : "bg-white"
                          }`}
                          onClick={() => {
                            if (selectedOrders.some((o) => o.id === order.id)) {
                              setSelectedOrders(
                                selectedOrders.filter((o) => o.id !== order.id)
                              );
                            } else {
                              setSelectedOrders([...selectedOrders, order]);
                            }
                          }}
                        >
                          <td className="px-4 py-4 whitespace-nowrap text-base text-po-blue truncate">
                            <span
                              className={"underline cursor-pointer"}
                              onClick={() => onClickOrder(order)}
                            >
                              {order.id}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className={"flex flex-col"}>
                              <div
                                className={`flex flex-row text-po-${
                                  !completed
                                    ? "black  font-semibold"
                                    : "graydark"
                                }`}
                              >
                                <p
                                  className={`text-sm font-bold ml-2 text-po-${
                                    !completed ? "black" : "graydark"
                                  }`}
                                >
                                  {order.user.first_name} {order.user.last_name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td
                            className={`px-4 py-4 whitespace-nowrap text-sm text-po-${
                              !completed ? "black font-bold" : "graydark"
                            }`}
                          >
                            {DateTimeUtil.getLocalTime(
                              new Date(order.created_at)
                            )}
                          </td>
                          <td
                            className={`px-4 py-4 whitespace-nowrap text-sm text-po-${
                              !completed ? "black  font-bold" : "graydark"
                            }`}
                          >
                            {DateTimeUtil.getLocalTime(
                              new Date(order.updated_at)
                            )}
                          </td>
                          {/*<td className="px-4 py-4 whitespace-nowrap">*/}
                          {/*  <div className={"flex flex-col"}>*/}
                          {/*    <p*/}
                          {/*      className={`text-sm font-semibold text-po-${*/}
                          {/*        !completed ? "black font-bold" : "graydark"*/}
                          {/*      }`}*/}
                          {/*    >*/}
                          {/*      {order.products.length}{" "}*/}
                          {/*      {order.products.length > 1 ? "items" : "item"}*/}
                          {/*    </p>*/}
                          {/*    <div*/}
                          {/*      className={*/}
                          {/*        "flex flex-row text-po-graymedium mt-0.5"*/}
                          {/*      }*/}
                          {/*    >*/}
                          {/*      <p*/}
                          {/*        className={`text-sm font-semibold ml-2 text-po-${*/}
                          {/*          !completed ? "black" : "graydark"*/}
                          {/*        }`}*/}
                          {/*      >*/}
                          {/*        items*/}
                          {/*      </p>*/}
                          {/*    </div>*/}
                          {/*  </div>*/}
                          {/*</td>*/}
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className={statusClassName}>{status}</span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {actionBtnStatus !== "" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUpdateOrderStatus(
                                    order,
                                    actionBtnStatus
                                  );
                                }}
                                title="Update status"
                                type="button"
                                className={actionBtnClassName}
                              >
                                {POOrderStatus[actionBtnStatus]}
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>

      {props.loadingOrders && (
        <div className={"db-order-loader-container"}>
          <Spinner
            name="ball-spin-fade-loader"
            fadeIn="none"
            color={"#E27F03"}
          />
        </div>
      )}

      <POModal
        modalVisible={modalStatus.visible}
        handleCloseModal={handleCloseModal}
        renderContent={() => (
          <UpdateOrderStatus
            orderItem={modalStatus.item}
            handleCloseModal={handleCloseModal}
            handleSaveStatus={handleSaveStatus}
          />
        )}
      />
      <BackToTopButton />
      <POAlert
        alertInfo={alertInfo}
        handleClose={() => setAlertInfo({ open: false })}
      />
      <POSpinner isLoading={isLoading} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.User.user,
  sellerIndex: state.Admin.sellerIndex,
  orderDetails: state.Admin.orderDetails,
  loadingOrders: state.Admin.updateProcessing,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateSellerIndex: (sellerId) => {
      dispatch(adminActions.updateSellerIndex(sellerId));
    },
    fetchAdminOrders: (request) => {
      dispatch(adminActions.fetchAdminOrders(request));
    },
    updateAdminOrders: (orders) => {
      dispatch(adminActions.updateAdminOrders(orders));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
