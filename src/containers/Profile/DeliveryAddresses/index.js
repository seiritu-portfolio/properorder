import React, { useEffect } from "react";
import "./styles.scss";
import POHeader from "../../../components/POHeader";
import NavSidebar from "../NavSidebar";
import AddressCard from "../../../components/AddressCard";
import POAddressCard from "../../../models/Enum/POAddressCard";
import PlusIcon from "../../../assets/ic_plus.svg";
import { ReactSVG } from "react-svg";
import POModal from "../../../components/POModal";
import AddAddress from "../../CheckOut/Addresses/AddAddress";
import PODeleteModal from "../../../components/PODeleteModal";
import DeleteAddress from "../../CheckOut/Addresses/DeleteAddress";
import { connect } from "react-redux";
import POAlert from "../../../components/POAlert";
import Footer from "../../../components/POFooter";
import * as userActions from "../../../redux/UserSaga/actions";

function DeliveryAddresses(props) {
  const [state, setState] = React.useState({
    addressModalVisible: false,
    editAddressWith: null,
    addressDeleteModalVisible: false,
  });

  const [alertInfo, setAlertInfo] = React.useState({ open: false });

  useEffect(() => {
    props.actions.updateAddresses(props.user?.id);
  }, []);

  const handleOpenAddressModal = (item) => {
    setState({ ...state, addressModalVisible: true, editAddressWith: item });
  };

  const handleCloseAddressModal = (result) => {
    setState({ ...state, addressModalVisible: false });
    if (result?.alertInfo != null) setAlertInfo(result.alertInfo);
  };

  const handleOpenAddressDeleteModal = () => {
    setState({
      ...state,
      addressDeleteModalVisible: true,
      addressModalVisible: false,
    });
  };

  const handleCloseAddressDeleteModal = (result) => {
    setState({ ...state, addressDeleteModalVisible: false });
    if (result?.alertInfo != null) setAlertInfo(result.alertInfo);
  };

  const { addressModalVisible, addressDeleteModalVisible, editAddressWith } =
    state;
  const { userAddresses } = props;

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
          <NavSidebar navIndex={2} />
          <div className="py-8 px-3 md:px-6 lg:px-10  md:col-span-5 lg:col-span-3">
            <div className="w-full">
              <h3 className="text-bold text-3xl mb-5">Delivery addresses</h3>

              <div
                className={
                  "flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 my-4 gap-6 md:gap-10"
                }
              >
                <button
                  onClick={() => handleOpenAddressModal()}
                  className={
                    "col-span-1 h-16 md:h-full py-6 px-3 flex md:flex-col md:justify-center items-center add-address-card bg-po-graylight bg-opacity-60 border-2 border-po-graymedium border-dashed"
                  }
                >
                  <ReactSVG src={PlusIcon} className="py-5" />
                  <h4 className="font-bold text-xl text-po-graydark ml-6 md:ml-0">
                    Add new address
                  </h4>
                </button>
                {userAddresses.map((item, index) => (
                  <AddressCard
                    variant={POAddressCard.delivery_addresses}
                    item={item}
                    key={index}
                    onClickEdit={() => handleOpenAddressModal(item)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-8">
        <Footer />
      </div>
      <POModal
        modalVisible={addressModalVisible}
        handleCloseModal={handleCloseAddressModal}
        renderContent={() => (
          <AddAddress
            item={editAddressWith}
            handleCloseModal={handleCloseAddressModal}
            handleRemove={handleOpenAddressDeleteModal}
            handleUpdateAlert={(alertInfo) => setAlertInfo(alertInfo)}
          />
        )}
      />
      <PODeleteModal
        modalVisible={addressDeleteModalVisible}
        handleCloseModal={handleCloseAddressDeleteModal}
        renderContent={() => (
          <DeleteAddress
            item={editAddressWith}
            handleCloseModal={handleCloseAddressDeleteModal}
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
  user: state.User.user,
  userAddresses: state.User.userAddresses,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateAddresses: (userId) => {
      dispatch(userActions.updateAddresses(userId));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryAddresses);
