import React from "react";
import AddressItem from "./AddressItem";
import POAddNew from "../../../components/POAddNew";
import POModal from "../../../components/POModal";
import AddAddress from "./AddAddress";
import ChooseAddress from "./ChooseAddress";
import PODeleteModal from "../../../components/PODeleteModal";
import DeleteAddress from "./DeleteAddress";
import POAlert from "../../../components/POAlert";
import { connect } from "react-redux";

function DeliveryDetails(props) {
  const { classNames, userAddresses, selectedAddressId, setSelectedAddressId } =
    props;

  const [state, setState] = React.useState({
    addressModalVisible: false,
    chooseAddressModalVisible: false,
    editAddressWith: null,
    addressDeleteModalVisible: false,
  });

  const [alertInfo, setAlertInfo] = React.useState({ open: false });

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

  const handleOpenChooseAddressModal = () => {
    setState({ ...state, chooseAddressModalVisible: true });
  };

  const handleCloseChooseAddressModal = () => {
    setState({ ...state, chooseAddressModalVisible: false });
  };

  const {
    addressModalVisible,
    addressDeleteModalVisible,
    chooseAddressModalVisible,
    editAddressWith,
  } = state;

  return (
    <div className={classNames.container}>
      <div className={classNames.containerTitle}>
        <p className={"step-text"}>1</p>
        <p className={"check-out-sub-title"}>DELIVERY DETAILS</p>
      </div>
      {userAddresses.map((v, i) => (
        <AddressItem
          key={i}
          item={v}
          isSelected={selectedAddressId === v.id}
          handleSelectAddress={setSelectedAddressId}
          onClickEdit={() => handleOpenAddressModal(v)}
        />
      ))}
      <div className={"flex flex-row ml-3 mt-6 mb-4 justify-between mr-2"}>
        <POAddNew
          title={"Add new address"}
          onClick={() => handleOpenAddressModal()}
        />
        {userAddresses.length > 0 ? (
          <button
            className={
              "text-po-primarydark font-semibold text-sm leading-extra-tight tracking-extra-tighter"
            }
            onClick={handleOpenChooseAddressModal}
          >
            See all
          </button>
        ) : null}
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
            handleAdded={(address) => setSelectedAddressId(address.id)}
          />
        )}
      />
      <POModal
        modalVisible={chooseAddressModalVisible}
        handleCloseModal={handleCloseChooseAddressModal}
        renderContent={() => (
          <ChooseAddress
            userAddresses={[...userAddresses]}
            handleCloseModal={handleCloseChooseAddressModal}
            onSelectItem={(item) => {
              handleCloseChooseAddressModal();
              setSelectedAddressId(item.id);
            }}
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
  userAddresses: state.User.userAddresses,
});

export default connect(mapStateToProps, null)(DeliveryDetails);
