import React from "react";
import PORoundCB from "../../../components/PORoundCB";
import { makeStyles } from "@material-ui/core/styles";
import POPaymentService from "../../../services/POPaymentService";

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

export default function PaymentItem(props) {
  const {
    isDefault = false,
    isChecked,
    onClickDelete,
    item,
    handleCheck,
  } = props;
  const classes = useStyles();

  const { brand, last4, exp_month, exp_year } = item;

  return (
    <li className={"flex flex-row items-center mt-6"}>
      <div
        className={
          "cursor-pointer w-10/12 flex flex-row bg-white rounded-lg check-out-item-shadow-sm px-4 py-3 hover:bg-po-graylight transition duration-300  ease-out hover:shadow-md items-center justify-between"
        }
        onClick={() => handleCheck(item.id)}
      >
        <div className={"flex flex-col"}>
          <div className={"flex flex-row items-center space-x-2"}>
            {POPaymentService.renderCardTypeFromBrand(brand)}
            <span className={"text-lg font-bold tracking-tightest leading-6"}>
              {brand}
            </span>
          </div>
          <div className={"mt-1 ml-10 flex flex-row items-center"}>
            <p className={"check-out-payment-item-info text-po-graymain"}>
              ****
            </p>
            <p className={"check-out-payment-item-info ml-3 text-po-graymain"}>
              {last4}
            </p>
            <p className={"check-out-payment-item-info ml-10 text-po-graymain"}>
              {`${exp_month}/${exp_year.toString().slice(-2)}`}
            </p>
          </div>
        </div>
        {isDefault && <div className={classes.defaultButton}>Default</div>}
        <PORoundCB isChecked={isChecked} />
      </div>
      {isChecked ? (
        <button
          className={"text-base font-bold text-po-yellowdark mx-2 md:ml-10"}
          onClick={() => onClickDelete()}
        >
          Delete
        </button>
      ) : null}
    </li>
  );
}
