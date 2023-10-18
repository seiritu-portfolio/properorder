import React, { useEffect, useState } from "react";
import "./styles.scss";
import POHeader from "../../components/POHeader";
import Success from "../../assets/ic_success.png";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import clsx from "clsx";
import ConfirmOrderItem from "./ConfirmOrderItem";
import history from "../../routes/history";
import Footer from "../../components/POFooter";
import { connect } from "react-redux";
import { POOrder } from "../../models";
import * as userActions from "../../redux/UserSaga/actions";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import APIManager from "../../Network/APIManager";

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: 700,
    height: "3rem",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: theme.palette.common.graylight,
    "&:hover": {
      opacity: 1,
      backgroundColor: theme.palette.common.graylight,
    },
    display: "flex",
    marginBottom: "0.5rem",
    ["@media (min-width:640px)"]: {
      marginBottom: 0,
    },
  },
}));

function CheckOutConfirm(props) {
  const classes = useStyles();
  const { orderIds } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchConfirmedOrders();
    props.actions.fetchActiveOrders();
  }, []);

  const fetchConfirmedOrders = async () => {
    const orderArray = orderIds.split("|");

    let orders = [];
    for (const orderId of orderArray) {
      const sellerResult = await APIManager.fetchOrder(orderId);
      if (sellerResult?.id != null) {
        orders.push(POOrder.fromState(sellerResult[0]));
      }
    }
    setItems(orders);
  };

  console.log(items);

  return (
    <div className="flex-1 flex flex-col w-full min-h-screen">
      <POHeader classNames={"absolute w-full"} />
      <div className="check-out-confirm-header flex flex-col">
        <h1 className="text-center main-heading mb-5">
          Thank you for your order!
        </h1>
      </div>
      <img
        className={"check-out-confirm-success"}
        src={Success}
        alt={"avatar"}
      />
      <div className={"flex flex-col items-center pt-12 pb-16"}>
        <div className={"check-out-confirm-container"}>
          {items.length !== 1 ? (
            <p className={"check-out-confirm-title"}>
              {items.length} separate orders have been placed with the following
              sellers:
            </p>
          ) : (
            <p className={"check-out-confirm-title"}>
              Your order <p className={"inline font-bold"}>#{items[0].id}</p>{" "}
              has been placed successfully. You will receive the confirmation
              email shortly.
            </p>
          )}

          {items.map((item, i) => (
            <ConfirmOrderItem
              key={i}
              order={item}
              hasDivider={i < items.length - 1}
            />
          ))}
          <div
            className={
              "flex flex-col sm:flex-row justify-between sm:space-x-4 mt-4"
            }
          >
            <Button
              variant="contained"
              color="secondary"
              className={clsx(classes.root, classes.cancelButton)}
              onClick={() => history.push("/home")}
            >
              Continue shopping
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.root}
              onClick={() => history.push("/my-orders")}
            >
              View order
            </Button>
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
  userActiveOrders: state.User.userActiveOrders,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchActiveOrders: () => {
      dispatch(userActions.fetchActiveOrders());
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutConfirm);
