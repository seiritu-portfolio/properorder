import * as actions from "./constants";

const initialState = {
  sellerIndex: { id: -1, status: false },
  updateProcessing: false,
  productDetails: {
    products: [],
    pageNumber: "1",
    totalProducts: 0,
  },
  orderDetails: {
    orders: [],
    pageNumber: "1",
    totalOrders: 0,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.START_FETCHING:
      return {
        ...state,
        updateProcessing: true,
      };
    case actions.UPDATE_ADMIN_ORDERS:
      return {
        ...state,
        orderDetails: action.orderDetails,
        updateProcessing: false,
      };
    case actions.UPDATE_ADMIN_PRODUCTS:
      return {
        ...state,
        productDetails: action.productDetails,
        updateProcessing: false,
      };
    case actions.UPDATE_SITE_INDEX:
      return {
        ...state,
        sellerIndex: action.sellerIndex,
      };
    case actions.UPDATE_ERROR:
      return { ...state, error: action.error, updateProcessing: false };
    default:
      return { ...state };
  }
};
