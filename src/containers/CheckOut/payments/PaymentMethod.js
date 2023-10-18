import React, { useEffect } from "react";
import PaymentItem from "./PaymentItem";
import POAddNew from "../../../components/POAddNew";
import POModal from "../../../components/POModal";
import AddPayment from "./AddPayment";
import PODeleteModal from "../../../components/PODeleteModal";
import DeletePayment from "./DeletePayment";
import POAlert from "../../../components/POAlert";
import { connect } from "react-redux";
import POPayment from "../../../models/Enum/POPaymentType";
import { useStripe } from "@stripe/react-stripe-js";

function PaymentMethod(props) {
  const {
    classNames,
    userPayments,
    selectedPaymentId,
    setSelectedPaymentId,
    deliveryDetailNeeded,
  } = props;

  const stripe = useStripe();

  const [state, setState] = React.useState({
    paymentModalVisible: false,
    editPaymentWith: null,
    paymentDeleteModalVisible: false,
  });
  const [alertInfo, setAlertInfo] = React.useState({ open: false });

  const handleOpenPaymentModal = (item) => {
    setState({ ...state, paymentModalVisible: true, editPaymentWith: item });
  };

  const handleClosePaymentModal = () => {
    setState({ ...state, paymentModalVisible: false });
  };

  const handleOpenPaymentDeleteModal = (editPaymentWith) => {
    setState({
      ...state,
      editPaymentWith,
      paymentDeleteModalVisible: true,
      paymentModalVisible: false,
    });
  };

  const handleClosePaymentDeleteModal = () => {
    setState({ ...state, paymentDeleteModalVisible: false });
  };

  const { paymentModalVisible, paymentDeleteModalVisible, editPaymentWith } =
    state;

  return (
    <div className={classNames.container}>
      <div className={classNames.containerTitle}>
        <p className={"step-text"}>{deliveryDetailNeeded ? "2" : "1"}</p>
        <p className={"check-out-sub-title"}>Payment method</p>
      </div>
      {userPayments.map((item, index) => (
        <PaymentItem
          variant={POPayment.payment_methods}
          key={index}
          item={item}
          onClickDelete={() => handleOpenPaymentDeleteModal(item)}
          isDefault={item.id === props?.user?.default_stripe_payment_id}
          isChecked={item.id === selectedPaymentId}
          handleCheck={setSelectedPaymentId}
        />
      ))}
      <POAddNew
        title={"Add new card"}
        className={"ml-3 mt-6 mb-2"}
        onClick={() => handleOpenPaymentModal()}
      />
      <POModal
        modalVisible={paymentModalVisible}
        handleCloseModal={handleClosePaymentModal}
        renderContent={() => (
          <AddPayment
            item={editPaymentWith}
            handleCloseModal={handleClosePaymentModal}
            handleRemove={handleOpenPaymentDeleteModal}
            handleUpdateAlert={(alertInfo) => setAlertInfo(alertInfo)}
            handleAdded={(paymentId) => {
              setSelectedPaymentId(paymentId);
            }}
          />
        )}
      />
      <PODeleteModal
        modalVisible={paymentDeleteModalVisible}
        handleCloseModal={handleClosePaymentDeleteModal}
        renderContent={() => (
          <DeletePayment
            item={editPaymentWith}
            handleCloseModal={handleClosePaymentDeleteModal}
            handleUpdateAlert={(alertInfo) => setAlertInfo(alertInfo)}
          />
        )}
      />
      <POAlert
        alertInfo={alertInfo}
        handleClose={() => setAlertInfo({ open: false })}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  userPayments: state.User.userPayments,
  user: state.User.user,
});

export default connect(mapStateToProps, null)(PaymentMethod);
