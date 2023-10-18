import React, { useState } from "react";
import "./styles.scss";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider } from "@material-ui/core";
import clsx from "clsx";
import { ReactSVG } from "react-svg";
import CheckIcon from "../../../assets/ic_check.svg";
import FailedIcon from "../../../assets/ic_failed.svg";
import { connect } from "react-redux";
import POAlert from "../../../components/POAlert";
import POSpinner from "../../../components/POSpinner";
import APIManager from "../../../Network/APIManager";

const useStyles = makeStyles((theme) => ({
  close: {
    color: theme.palette.common.graydark,
  },
  root: {
    width: "8rem",
    height: "3rem",
  },
  cancelButton: {
    backgroundColor: theme.palette.common.graylight,
    "&:hover": {
      opacity: 1,
      backgroundColor: theme.palette.common.graylight,
    },
  },
}));

function AddDiscount(props) {
  const { handleCloseModal, userActiveOrders } = props;
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ open: false });

  const activeOrders = userActiveOrders.filter(
    (order) => order.products.length > 0
  );

  const [couponCodes, setCouponCodes] = useState(
    activeOrders.map((order) => ({
      orderId: order.id,
      code: "",
      applied: null,
    }))
  );

  const handleApply = (item) => {
    const coupon = couponCodes.find((c) => c.orderId === item.id);
    if (coupon == null || coupon.code === "") {
      setAlertInfo({
        open: true,
        message: "The code field is required",
        severity: "warning",
      });
      return;
    }

    setIsLoading(true);
    APIManager.applyCoupon(item.id, coupon.code)
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        setCouponCodes(
          couponCodes.map((c) =>
            c.orderId === coupon.orderId ? { ...c, applied: true } : c
          )
        );
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        setCouponCodes(
          couponCodes.map((c) =>
            c.orderId === coupon.orderId ? { ...c, applied: false } : c
          )
        );
      });
  };

  const renderItem = (item, index) => {
    const coupon = couponCodes.find((c) => c.orderId === item.id);
    return (
      <div key={index} className={"flex flex-col mx-6 my-3"}>
        <p className={"text-xl leading-extra-tight text-black font-bold"}>
          {item.site?.name ?? ""}
        </p>
        <div className={"flex flex-row space-x-2 mt-2"}>
          <input
            id={`discount-code-${index}`}
            name={`discount-code-${index}`}
            className="flex flex-1 py-2 px-3 text-sm font-semibold focus:outline-none border border-po-graymedium rounded-xl"
            placeholder="e.g. GKH574H"
            value={coupon?.code ?? ""}
            onChange={(e) => {
              setCouponCodes(
                couponCodes.map((c) =>
                  c.orderId === item.id ? { ...c, code: e.target.value } : c
                )
              );
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            className={classes.root}
            onClick={() => handleApply(item)}
          >
            Apply
          </Button>
        </div>
        {coupon.applied != null &&
          (coupon.applied ? (
            <div className={"flex flex-row mt-2"}>
              <ReactSVG src={CheckIcon} />
              <div className={"flex flex-col"}>
                <p className={"add-discount-success-text text-po-green ml-1"}>
                  Discount code applied successfully!
                </p>
                <p className={"add-discount-you-save ml-1"}>
                  You save <p className={"font-bold inline-block"}>€10</p>
                </p>
              </div>
            </div>
          ) : (
            <div className={"flex flex-row mt-2"}>
              <ReactSVG src={FailedIcon} />
              <p className={"add-discount-failed-text text-po-red ml-1"}>
                The discount code is invalid. Please try again.
              </p>
            </div>
          ))}
      </div>
    );
  };
  return (
    <div className={"flex flex-col bg-white add-discount-modal-container"}>
      <div
        className={
          "px-4 sm:px-7 my-2 sm:my-3 flex flex-row justify-between items-center"
        }
      >
        <span className={"modal-title"}>Add discount code</span>
        <button onClick={handleCloseModal}>
          <Close className={classes.close} />
        </button>
      </div>
      <Divider />
      <div className={"my-4 overflow-auto max-h-96"}>
        {activeOrders.map((v, i) => renderItem(v, i))}
      </div>
      <Divider />
      <div className={"mx-6 my-3 sm:my-4 flex flex-row justify-end"}>
        <Button
          onClick={handleCloseModal}
          variant="contained"
          color="secondary"
          className={clsx(classes.root, classes.cancelButton)}
        >
          Cancel
        </Button>
      </div>
      <POAlert
        alertInfo={alertInfo}
        handleClose={() => setAlertInfo({ open: false })}
      />
      <POSpinner isLoading={isLoading} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  userActiveOrders: state.User.userActiveOrders,
});

export default connect(mapStateToProps, null)(AddDiscount);
