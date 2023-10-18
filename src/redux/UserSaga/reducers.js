import * as actions from "./constants";

const initialState = {
  readyToGo: false,
  user: null,
  userToken: null,
  currentLocation: {
    latitude: 55.676098,
    longitude: 12.568337,
    postcode: "",
  },
  currentAddress: "",
  userAddresses: [],
  userPayments: [],
  userActiveOrders: [],
  userOrders: [],
  favSellers: [],
  favProducts: [],
  allCategories: [],
  cartBadgeUpdated: false,
  updateProcessing: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        allCategories: action.allCategories,
      };
    case actions.UPDATE_USER_TOKEN:
      return {
        ...state,
        readyToGo: true,
        userToken: action.userToken,
      };
    case actions.USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case actions.USER_ADDRESSES_SUCCESS:
      return {
        ...state,
        userAddresses: action.userAddresses,
        updateProcessing: false,
      };
    case actions.USER_PAYMENT_SUCCESS:
      return {
        ...state,
        userPayments: action.userPayments,
        updateProcessing: false,
      };
    case actions.FAVOURITE_SELLERS_SUCCESS:
      return {
        ...state,
        favSellers: action.favSellers,
        updateProcessing: false,
      };
    case actions.FAVOURITE_PRODUCTS_SUCCESS:
      return {
        ...state,
        favProducts: action.favProducts,
        updateProcessing: false,
      };
    case actions.UPDATE_USER_ACTIVE_ORDERS:
      return {
        ...state,
        userActiveOrders: action.userActiveOrders,
        updateProcessing: false,
      };
    case actions.UPDATE_USER_ORDERS:
      return {
        ...state,
        userOrders: action.userOrders,
        updateProcessing: false,
      };
    case actions.USER_UPDATE_LOCATION:
      return {
        ...state,
        currentLocation: action.location,
        currentAddress: action.currentAddress,
      };
    case actions.UPDATE_CART_BADGE_STATUS:
      return {
        ...state,
        cartBadgeUpdated: action.cartBadgeUpdated,
      };
    case actions.UPDATE_ERROR:
      return { ...state, error: action.error, updateProcessing: false };
    default:
      return { ...state };
  }
};
