import React, { useState } from "react";
import "./styles.scss";
import POModal from "../../../components/POModal";
import RemoveFav from "./RemoveFav";
import { connect } from "react-redux";
import * as userActions from "../../../redux/UserSaga/actions";
import ProductItem from "../../../containers/Home/Detail/ProductItem";
import POSpinner from "../../../components/POSpinner";
import APIManager from "../../../Network/APIManager";

function MyFavProducts(props) {
  const { products } = props;

  const [selectedItem, setSelectedItem] = React.useState(null);
  const [removeModalVisible, setRemoveModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToFavoritesProducts = (event, item) => {
    event.stopPropagation();
    setSelectedItem(item);
    setRemoveModalVisible(true);
  };

  const handleRemoveFavProduct = () => {
    setRemoveModalVisible(false);
    setIsLoading(true);
    APIManager.delFavProduct(props.user.id, selectedItem.id)
      .then((_) => {
        setIsLoading(false);
        props.actions.fetchFavouriteProducts(props.user.id);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("delFavProduct error -> ", error);
      });
  };

  return (
    <div>
      {products.length === 0 ? (
        <span
          className={"font-medium text-base"}
        >{`Looks like you haven't added any favourite products yet. Continue browsing`}</span>
      ) : (
        <ul className="flex-1 grid-cols-2 grid  gap-4 lg:gap-5 xl:grid-cols-3 2xl:grid-cols-4 mt-1 items-stretch">
          {products.map((item, index) => (
            <ProductItem
              key={index}
              item={item}
              isFavorite={true}
              showFavoriteIcon={true}
              handleClickFavorites={handleAddToFavoritesProducts}
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
                handleRemoveFav={handleRemoveFavProduct}
              />
            )}
          />
          <POSpinner isLoading={isLoading} />
        </ul>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.User.user,
  products: state.User.favProducts,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchFavouriteProducts: (userId) => {
      dispatch(userActions.fetchFavouriteProducts(userId));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyFavProducts);
