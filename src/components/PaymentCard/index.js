import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ReactSVG } from "react-svg";
import DeleteIcon from "../../assets/bin.svg";
import POPayment from "../../models/Enum/POPaymentType";
import POPaymentService from "../../services/POPaymentService";

const useStyles = makeStyles({
  defaultButton: {
    fontWeight: "bold",
    fontSize: "0.8rem",
    lineHeight: "1.364em",
    letterSpacing: "-0.0125em",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    paddingTop: "0.25rem",
    paddingBottom: "0.25rem",
    backgroundColor: "#FFE6BA",
    borderRadius: "6px",
  },
});

export default function PaymentMethods(props) {
  const classes = useStyles();
  const { isDefault = false, onClickDelete, item } = props;
  const { variant = POPayment.default } = props;

  const { brand, last4, exp_month, exp_year } = item;

  return (
    <div
      className={
        "flex flex-row mb-4 py-6 px-3 md:px-6 h-16 flex-1 bg-white rounded-lg check-out-item-shadow-sm  items-center justify-between"
      }
    >
      <div className={"flex flex-row items-center space-x-4 md:space-x-8"}>
        <div className="flex">
          {POPaymentService.renderCardTypeFromBrand(brand)}
          <span
            className={"text-lg font-bold tracking-tightest leading-6 ml-3"}
          >
            {brand}
          </span>
        </div>
        <div className="flex">
          <p className={"check-out-payment-item-info text-po-graymain"}>****</p>
          <p className={"check-out-payment-item-info ml-3 text-po-graymain"}>
            {last4}
          </p>
        </div>
        <p className={"check-out-payment-item-info ml-10 text-po-graymain"}>
          {`${exp_month}/${(exp_year ?? "").toString().slice(-2)}`}
        </p>
      </div>
      {isDefault && <div className={classes.defaultButton}>Default</div>}
      {variant === POPayment.payment_methods && (
        <button
          className="transform transition duration-300 ease-out hover:scale-110"
          onClick={() => onClickDelete()}
        >
          <ReactSVG src={DeleteIcon} />
        </button>
      )}
    </div>
  );
}
