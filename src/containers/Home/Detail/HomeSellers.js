import React, { useState } from "react";
import clsx from "clsx";
import APIManager from "../../../Network/APIManager";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import POSellerItem from "../../../components/POSellerItem";
import POSpinner from "../../../components/POSpinner";
import * as userActions from "../../../redux/UserSaga/actions";
import Constants from "../../../config/Constants";
import { PODeliveryMode } from "../../../models";

function HomeSellers(props) {
  const {
    isVisible,
    favSellers,
    sellers: sellerList,
    searchString,
    titleVisible,
    deliveryMode = PODeliveryMode.both,
  } = props;
  const [isLoading, setIsLoading] = useState(false);

  const sellers = sellerList.filter((s) =>
    s.name.toLowerCase().includes(searchString.toLowerCase().trim())
  );

  const handleClickFavorites = (event, selectedItem) => {
    event.stopPropagation();
    const found = favSellers.some((e) => e.id === selectedItem.id);

    setIsLoading(true);
    if (found) {
      APIManager.delFavSite(props.user.id, selectedItem.id)
        .then((_) => {
          setIsLoading(false);
          props.actions.fetchFavouriteSellers(props.user.id);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log("delFavSite error -> ", error);
        });
    } else {
      APIManager.createFavSite(props.user.id, selectedItem.id)
        .then((_) => {
          setIsLoading(false);
          props.actions.fetchFavouriteSellers(props.user.id);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    }
  };

  return (
    <div className={clsx("flex flex-col", !isVisible && "hidden")}>
      {titleVisible && (
        <div className={"flex flex-row items-center mr-4 ml-1"}>
          <h4 className="text-po-graymain text-sm">{"Sellers "}</h4>
          <h4
            className={"font-semibold text-sm text-po-graydark pl-1"}
          >{`(${sellers.length})`}</h4>
        </div>
      )}

      <InfiniteScroll
        dataLength={sellers.length}
        next={() => {}}
        hasMore={false}
      >
        <ul className="product-item-sub-container">
          {sellers.map((item, index) => (
            <POSellerItem
              key={index}
              item={item}
              isFavorite={favSellers.some((e) => e.id === item.id)}
              showFavoriteIcon={props.userToken != null}
              handleClickFavorites={handleClickFavorites}
              deliveryMode={deliveryMode}
            />
          ))}
        </ul>
      </InfiniteScroll>
      <POSpinner isLoading={isLoading} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  userToken: state.User.userToken,
  user: state.User.user,
  favSellers: state.User.favSellers,
  currentLocation: state.User.currentLocation,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchFavouriteSellers: (userId) => {
      dispatch(userActions.fetchFavouriteSellers(userId));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeSellers);
