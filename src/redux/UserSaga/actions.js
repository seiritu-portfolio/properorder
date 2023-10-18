import * as actions from "./constants";
import Constants from "../../config/Constants";
import { UPDATE_CART_BADGE_STATUS } from "./constants";

export const fetchUserData = (userToken, onResult, shouldGoCheckOut) => ({
  type: actions.FETCH_USER_DATA,
  userToken,
  onResult,
  shouldGoCheckOut,
});

export const updateUserToken = (userToken) => ({
  type: actions.UPDATE_USER_TOKEN_REQUEST,
  userToken,
});

export const getProfile = () => ({
  type: actions.USER_PROFILE_REQUEST,
});

export const updateLocation = (location, currentAddress) => {
  localStorage.setItem(
    Constants.SS_CURRENT_LOCATION,
    JSON.stringify({
      location,
      currentAddress,
    })
  );
  return {
    type: actions.USER_UPDATE_LOCATION,
    location,
    currentAddress,
  };
};

export const updateAddresses = (userId) => ({
  type: actions.USER_ADDRESSES_REQUEST,
  userId,
});

export const updatePayments = (userId) => ({
  type: actions.USER_PAYMENT_REQUEST,
  userId,
});

export const fetchActiveOrders = () => ({
  type: actions.USER_ACTIVE_ORDERS_REQUEST,
});

export const updateCartBadgeStatus = (cartBadgeUpdated) => ({
  type: actions.UPDATE_CART_BADGE_STATUS,
  cartBadgeUpdated,
});

export const updateActiveOrders = (userActiveOrders) => ({
  type: actions.UPDATE_USER_ACTIVE_ORDERS,
  userActiveOrders,
});

export const fetchFavouriteSellers = (userId) => ({
  type: actions.FAVOURITE_SELLERS_REQUEST,
  userId,
});

export const fetchFavouriteProducts = (userId) => ({
  type: actions.FAVOURITE_PRODUCTS_REQUEST,
  userId,
});

export const fetchOrders = () => ({
  type: actions.USER_ORDERS_REQUEST,
});

export const logout = () => ({
  type: actions.USER_LOG_OUT,
});
