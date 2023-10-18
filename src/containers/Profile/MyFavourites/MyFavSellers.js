import React, { useState } from "react";
import "./styles.scss";
import { connect } from "react-redux";
import * as userActions from "../../../redux/UserSaga/actions";
import POModal from "../../../components/POModal";
import RemoveFav from "./RemoveFav";
import APIManager from "../../../Network/APIManager";
import POSpinner from "../../../components/POSpinner";
import POSellerItem from "../../../components/POSellerItem";

function MyFavSellers(props) {
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [removeModalVisible, setRemoveModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { sellers } = props;

  const handleAddToFavorites = (event, item) => {
    event.stopPropagation();
    setSelectedItem(item);
    setRemoveModalVisible(true);
  };

  const handleRemoveFav = () => {
    setRemoveModalVisible(false);
    setIsLoading(true);
    APIManager.delFavSite(props.user.id, selectedItem.id)
      .then((_) => {
        setIsLoading(false);
        props.actions.fetchFavouriteSellers(props.user.id);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("delFavSite error -> ", error);
      });
  };

  if (sellers.length === 0) {
    return (
      <span
        className={"font-medium text-base"}
      >{`Looks like you haven't added any favourite sellers yet. Continue browsing`}</span>
    );
  }

  return (
    <ul className="flex-1 grid grid-cols-2 gap-1 gap-4 lg:gap-5 lg:grid-cols-3 2xl:grid-cols-4 mt-3 items-stretch">
      {sellers.map((item, index) => (
        <POSellerItem
          key={index}
          item={item}
          isFavorite={true}
          showFavoriteIcon={true}
          handleClickFavorites={handleAddToFavorites}
          className={
            "flex flex-col col-span-1 shadow-lg rounded-xl mt-4 cursor-pointer"
          }
        />
      ))}
      <POModal
        modalVisible={removeModalVisible}
        handleCloseModal={() => setRemoveModalVisible(false)}
        renderContent={() => (
          <RemoveFav
            selectedItem={selectedItem}
            handleRemoveFav={handleRemoveFav}
          />
        )}
      />
      <POSpinner isLoading={isLoading} />
    </ul>
  );
}

const mapStateToProps = (state) => ({
  user: state.User.user,
  sellers: state.User.favSellers,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchFavouriteSellers: (userId) => {
      dispatch(userActions.fetchFavouriteSellers(userId));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyFavSellers);
