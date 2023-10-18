import React from "react";
import CartItemProduct from "./CartItemProduct";
import POModal from "../POModal";
import SelectDeliveryDate from "./SelectDeliveryDate";
import AlertIcon from "../../assets/alert.svg";
import { ReactSVG } from "react-svg";
import APIManager from "../../Network/APIManager";
import { PODeliveryMode, POOrder } from "../../models";
import { connect } from "react-redux";
import * as userActions from "../../redux/UserSaga/actions";
import { getLocalCart, storeLocalCart } from "../../services/HelperService";
import { InputBase, makeStyles, MenuItem, Select } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import POProductService from "../../services/POProductService";
import Spinner from "react-spinkit";
import { Remove } from "@material-ui/icons";
import DeleteIcon from "../../assets/delete.svg";
import PODecimalUtil from "../../utils/PODecimalUtil";

// To be replaced once API is done:
const methods = [
  {
    id: 1,
    value: "collection",
    name: "Collect",
  },
  {
    id: 2,
    value: "delivery",
    name: "Deliver",
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
    fontSize: "0.7rem",
    fontWeight: "600",
    paddingLeft: "0.1rem",
    cursor: "pointer !important",
  },
  inputRoot: {
    width: "100%",
    height: "1rem",
  },
  menuList: {
    paddingLeft: "0.5rem",
    fontSize: "0.8rem",
    color: "#23232D",
    fontWeight: "600",
  },
  dropdownDefault: {
    paddingRight: "0.3rem",
    paddingLeft: "0.5rem",
    fontSize: "0.8rem",
    color: "#81818E",
    fontWeight: "400",
  },
});

function CartItem(props) {
  const {
    order,
    onUpdatedOrder,
    handleDeleteProductItem,
    checkingSellerId,
    setCheckingSellerId,
    currentLocation,
    setAlertInfo,
  } = props;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [processing, setProcessing] = React.useState(-1);

  //TODO implement setEmpty once API is done:
  const [empty, setEmpty] = React.useState(false);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const handleUpdatedDeliveryMode = (order, dm) => {
    setCheckingSellerId(order.site.id);
    APIManager.fetchSeller(order.site.id, currentLocation.postcode)
      .then((res) => {
        console.log(res);
        if (
          res.delivery_method === PODeliveryMode.both ||
          res.delivery_method === dm
        ) {
          continueUpdateDM(order, dm);
        } else {
          setCheckingSellerId(null);
          setAlertInfo({
            open: true,
            message: "This seller does not service your area",
            severity: "warning",
          });
        }
      })
      .catch((error) => {
        setCheckingSellerId(null);
        setAlertInfo({
          open: true,
          message: "Please try again later",
          severity: "warning",
        });
        console.log(error);
      });
  };

  const continueUpdateDM = (order, dm) => {
    if (props.userToken == null) {
      const localCart = getLocalCart();
      storeLocalCart(
        localCart.map((c) =>
          c.id === order.id
            ? {
                ...c,
                delivery_method: dm,
              }
            : c
        )
      );
      props.actions.fetchActiveOrders();
      setCheckingSellerId(null);
      return;
    }

    APIManager.updateOrder(order.id, { delivery_method: dm })
      .then((res) => {
        console.log(res);
        onUpdatedOrder(
          POOrder.fromState({
            ...order,
            delivery_method: dm,
          })
        );
        setCheckingSellerId(null);
      })
      .catch((error) => {
        console.log(error);
        setCheckingSellerId(null);
      });
  };

  const handleDeleteOrder = async () => {
    if (props.userToken == null) {
      const localCart = await getLocalCart();
      await storeLocalCart(
        localCart.map((c) =>
          c.id === order.id
            ? {
                ...c,
                products: [],
              }
            : c
        )
      );
      props.actions.fetchActiveOrders();
      return;
    }
    APIManager.deleteOrder(order.id)
      .then((res) => {
        console.log(res);
        onUpdatedOrder(
          POOrder.fromState({
            ...order,
            products: [],
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdatedProduct = async (product, updatedObject) => {
    if (props.userToken == null) {
      const localCart = await getLocalCart();
      await storeLocalCart(
        localCart.map((c) =>
          c.id === order.id
            ? {
                ...c,
                products: c.products.map((p) =>
                  p.product.id === product.id &&
                  POProductService.isSameProduct(p, product)
                    ? { ...p, ...updatedObject }
                    : p
                ),
              }
            : c
        )
      );
      props.actions.fetchActiveOrders();
      return;
    }

    setProcessing(product.id);
    APIManager.updateProductToOrder(order.id, product.id, updatedObject)
      .then((res) => {
        setProcessing(-1);
        console.log(res);
        onUpdatedOrder(
          POOrder.fromState({
            ...order,
            products: order.products.map((p) =>
              p.id === product.id ? product : p
            ),
          })
        );
      })
      .catch((error) => {
        setProcessing(-1);
        console.log(error);
      });
  };

  const handleDeleteItem = (product) => {
    handleDeleteProductItem(order, product);
  };

  const OrderSubTotal = Number(order.getOrderPrice()) / 100;
  const minRequired =
    order.delivery_method === PODeliveryMode.delivery &&
    order.site.minimum_order > 0 &&
    order.site.minimum_order / 100 > OrderSubTotal;

  if (order.products.length === 0) {
    return null;
  }

  const classes = useStyles();

  return (
    <div className={"flex flex-col mt-2"}>
      <div className={"flex flex-col bg-po-graylight pt-1 pl-2 pb-1"}>
        <div className={"flex flex-row items-center"}>
          <img
            className={"h-7 w-7 object-scale-down"}
            src={order.site?.organisation?.logo}
            alt={"Org logo"}
          />
          <div className={"flex justify-between items-center flex-1 mx-1"}>
            <h4 className="text-base font-bold">{order.site.name}</h4>
            <div>
              {/* TODO: after API is done, should be either dropdown if seller supports both,
           or Collection/Delivery paragraph(which is temporary commented out) */}

              {/* <p className="font-bold text-po-graymain">Collect</p> */}

              {order.isUnavailableOrder() ? (
                <button
                  className={"flex flex-row justify-center"}
                  onClick={() => handleDeleteOrder()}
                >
                  <ReactSVG src={DeleteIcon} />
                  <span className={"font-semibold text-xs text-po-red ml-1"}>
                    Delete the order
                  </span>
                </button>
              ) : checkingSellerId === order?.site?.id ? (
                <Spinner name="circle" fadeIn="none" className={"mx-6"} />
              ) : order?.site?.delivery_method === "collection" ? (
                <p className="font-bold text-po-graymain pr-2">Collection</p>
              ) : order?.site?.delivery_method === "delivery" ? (
                <p className="font-bold text-po-graymain pr-2">Delivery</p>
              ) : (
                <div
                  className={clsx(
                    "select-container border-po-graylight",
                    empty && "border-po-red"
                  )}
                >
                  <Select
                    displayEmpty
                    classes={{ root: classes.root }}
                    input={<InputBase classes={{ root: classes.inputRoot }} />}
                    labelId="collect-deliver"
                    id="collect-deliver"
                    IconComponent={ExpandMoreIcon}
                    value={order?.delivery_method ?? ""}
                    onChange={(event) =>
                      handleUpdatedDeliveryMode(order, event.target.value)
                    }
                  >
                    <MenuItem
                      value={""}
                      disabled
                      classes={{ gutters: classes.dropdownDefault }}
                    >
                      <em>Collect / Deliver</em>
                    </MenuItem>
                    {methods.map((item, index) => (
                      <MenuItem
                        key={index}
                        value={item.value}
                        classes={{ gutters: classes.menuList }}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/*
            <div className={"flex flex-row justify-between items-center pr-2"}>
              <p className={"cart-item-delivery-date"}>Delivery date:</p>
              <button
                className={"cart-item-delivery-date-btn"}
                onClick={() => handleOpenModal()}
              >
                Mon June 7th
              </button>
            </div>
           */}

        {empty ? (
          <div className="flex flex-row items-center my-1">
            <p className="text-xs text-po-red font-semibold">
              Please select Collect or Deliver to proceed checkout
            </p>
          </div>
        ) : null}

        {minRequired || order.isUnavailableOrder() ? (
          <div className="flex flex-row items-center mt-1">
            <ReactSVG src={AlertIcon} className="h-4" />
            <p className="text-po-yellowdark font-semibold text-xs pl-1 py-0">
              {order.isUnavailableOrder()
                ? "This seller is not available in this postcode"
                : "Minimum order value:"}
              {!order.isUnavailableOrder() && (
                <span className="font-extrabold pl-1">
                  {PODecimalUtil.getPriceDecimalString(
                    order.site.minimum_order ?? 0
                  )}
                </span>
              )}
            </p>
          </div>
        ) : null}
      </div>
      {order.products.map((product, index) => (
        <CartItemProduct
          key={index}
          product={product}
          isWeight={product.unit != null}
          handleUpdatedProduct={handleUpdatedProduct}
          handleDeleteItem={handleDeleteItem}
          processing={processing}
        />
      ))}
      <POModal
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        renderContent={() => (
          <SelectDeliveryDate handleCloseModal={handleCloseModal} />
        )}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  userToken: state.User.userToken,
  currentLocation: state.User.currentLocation,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchActiveOrders: () => {
      dispatch(userActions.fetchActiveOrders());
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
