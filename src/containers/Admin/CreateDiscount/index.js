import React, { useEffect, useState } from "react";
import "./styles.scss";
import GoBack from "../Common/GoBack";
import history from "../../../routes/history";
import "react-perfect-scrollbar/dist/css/styles.css";
import DiscountDetails from "./DiscountDetails";
import { Button, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import * as adminActions from "../../../redux/AdminSaga/actions";
import { connect } from "react-redux";
import APIManager from "../../../Network/APIManager";
import DateTimeUtil from "../../../utils/DateTimeUtil";
import POAlert from "../../../components/POAlert";
import POSpinner from "../../../components/POSpinner";
import moment from "moment";
import Spinner from "react-spinkit";

const useStyle = makeStyles((theme) => ({
  btn: {
    flex: "1 1 0",
    paddingLeft: "3rem",
    paddingRight: "3rem",
    margin: "0 0.5rem",
    height: "3.5rem",
    fontSize: "1.2rem",
    minHeight: "3rem",
  },
  mainButton: {
    marginLeft: "0.5rem",
    ["@media (min-width:640px)"]: {
      marginLeft: "2rem",
    },
  },
  cancelButton: {
    backgroundColor: "#BFBFC6",
    marginRight: "0.5rem",
    "&:hover": {
      opacity: 1,
      backgroundColor: "#BFBFC6",
    },
    display: "flex",
    marginBottom: "0.5rem",
    ["@media (min-width:640px)"]: {
      marginBottom: 0,
      marginRight: "2rem",
    },
  },
}));

function CreateDiscount(props) {
  const classesButtons = useStyle();

  const { discountId, orgId, sellerIndex } = useParams();

  const isEditMode = discountId !== "-1";

  const [discount, setDiscount] = React.useState({
    can_combine: 0,
    active: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ open: false });

  useEffect(() => {
    props.actions.updateSellerIndex({ id: sellerIndex, status: false });
  }, [sellerIndex]);

  useEffect(() => {
    if (isEditMode) {
      APIManager.fetchAdminDiscount(sellerIndex, discountId)
        .then((res) => {
          setDiscount({
            ...res,
            expires_at: moment(res.expires_at).toDate(),
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [sellerIndex, discountId]);

  useEffect(() => {
    if (props.sellerIndex.status) {
      history.push(
        `/admin/${orgId}/site/${props.sellerIndex.id}/discounts/${discountId}`
      );
    }
  }, [props.sellerIndex]);

  const gotoDiscounts = () => {
    history.push(`/admin/${orgId}/site/${sellerIndex}/discounts`);
  };

  const handleSave = () => {
    let message = "";

    const validations = [
      {
        value: "expires_at",
        label: "Expiry date and time",
      },
      {
        value: "max",
        label: "Max limit",
      },
      {
        value: "max_per_user",
        label: "Max per customer",
      },
      {
        value: "value",
        label: "Discount value",
      },
      {
        value: "type",
        label: "Discount type",
      },
      {
        value: "code",
        label: "Discount code",
      },
      {
        value: "name",
        label: "Discount name",
      },
    ];

    for (const validation of validations) {
      if (
        discount[validation.value] == null ||
        discount[validation.value] === ""
      ) {
        message = `${validation.label} field is required`;
      }
    }

    if (message !== "") {
      setAlertInfo({
        open: true,
        message,
        severity: "warning",
      });
      return;
    }

    setIsLoading(true);
    APIManager.createDiscount(sellerIndex, discountId, {
      ...discount,
      expires_at: DateTimeUtil.getServerDateTimeString(discount.expires_at),
    })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setAlertInfo({
          open: true,
          message: `${isEditMode ? "Updated" : "Created"} successfully!`,
        });
        setTimeout(() => {
          gotoDiscounts();
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setAlertInfo({
          open: true,
          message: error,
          severity: "warning",
        });
      });
  };

  if (isEditMode && discount.id == null) {
    return (
      <div className={"flex flex-1 flex-col p-8 items-center justify-center"}>
        <Spinner name="ball-spin-fade-loader" fadeIn="none" color={"#E27F03"} />
      </div>
    );
  }

  return (
    <div className={"flex flex-1 flex-col p-3 sm:p-8  2xl:px-24 bg-gray-100"}>
      <GoBack title={"Back to all discounts"} onClick={() => gotoDiscounts()} />
      <div
        className={
          "flex flex-col sm:flex-row sm:items-center justify-between mt-4"
        }
      >
        <div className={"flex flex-row items-center"}>
          <h2 className="text-2xl font-bold px-3">
            {isEditMode ? "Edit" : "Add new"} discount
          </h2>
        </div>
      </div>

      <DiscountDetails discount={discount} setDiscount={setDiscount} />

      <div
        className={"my-4 sm:my-10 flex flex-col sm:flex-row justify-between"}
      >
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classesButtons.btn, classesButtons.cancelButton)}
          onClick={() => gotoDiscounts()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classesButtons.btn, classesButtons.mainButton)}
          onClick={() => handleSave()}
        >
          Save
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
  sellerIndex: state.Admin.sellerIndex,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateSellerIndex: (sellerId) => {
      dispatch(adminActions.updateSellerIndex(sellerId));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateDiscount);
