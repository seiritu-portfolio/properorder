import React, { useEffect } from "react";
import "./styles.scss";
import POHeader from "../../../components/POHeader";
import NavSidebar from "../NavSidebar";
import PaymentItem from "../../../components/PaymentCard";
import { ReactSVG } from "react-svg";
import PlusIcon from "../../../assets/ic_plus.svg";
import POModal from "../../../components/POModal";
import AddPayment from "../../CheckOut/payments/AddPayment";
import PODeleteModal from "../../../components/PODeleteModal";
import DeletePayment from "../../CheckOut/payments/DeletePayment";
import POPayment from "../../../models/Enum/POPaymentType";
import POAlert from "../../../components/POAlert";
import { connect } from "react-redux";
import Footer from "../../../components/POFooter";
import * as userActions from "../../../redux/UserSaga/actions";

function PaymentMethods(props) {
  const { userPayments } = props;

  useEffect(() => {
    props.actions.updatePayments(props.user?.id);
  }, []);

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
    <div className="flex flex-col w-full min-h-screen">
      <POHeader classNames={"absolute w-full"} />
      <div className="profile-header flex flex-col">
        <h1 className="profile-main-heading pl-2 pt-2 uppercase ml-5 mt-3 lg:mt-0 lg:ml-20 xl:ml-28 2xl:ml-48">
          Account settings
        </h1>
      </div>

      <div className="rectangle-container bg-white profile-container lg:mx-20 xl:mx-28 2xl:ml-48 z-10">
        <div className="divide-y divide-light md:grid md:grid-cols-7 lg:grid-cols-4 md:divide-y-0 md:divide-x">
          <NavSidebar navIndex={3} />
          <div className="py-8 px-3 md:px-6 lg:px-10  md:col-span-5 lg:col-span-3">
            <div className="w-full">
              <h3 className="text-bold text-3xl mb-5">Payment methods</h3>

              <button
                onClick={() => handleOpenPaymentModal()}
                className={
                  "w-full flex mb-4 flex-row py-6 px-3 md:px-6 h-16 flex-1 bg-po-graylight bg-opacity-60 border-2 border-po-graymedium border-dashed rounded-lg text-po-graydark hover:bg-po-graylight transition duration-300  ease-out items-center items-center"
                }
              >
                <ReactSVG src={PlusIcon} />
                <h4 className="ml-6 font-bold text-xl text-po-graydark">
                  Add new card
                </h4>
              </button>

              {userPayments.map((item, index) => (
                <PaymentItem
                  variant={POPayment.payment_methods}
                  key={index}
                  item={item}
                  onClickDelete={() => handleOpenPaymentDeleteModal(item)}
                  isDefault={props?.user?.default_stripe_payment_id === item.id}
                />
              ))}

              <POModal
                modalVisible={paymentModalVisible}
                handleCloseModal={handleClosePaymentModal}
                renderContent={() => (
                  <AddPayment
                    item={editPaymentWith}
                    handleCloseModal={handleClosePaymentModal}
                    handleRemove={() => {}}
                    handleUpdateAlert={(alertInfo) => setAlertInfo(alertInfo)}
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
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-8">
        <Footer />
      </div>
      <POAlert
        alertInfo={alertInfo}
        handleClose={() => setAlertInfo({ open: false })}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.User.user,
  userPayments: state.User.userPayments,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updatePayments: (userId) => {
      dispatch(userActions.updatePayments(userId));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethods);
