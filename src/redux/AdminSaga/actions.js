import * as actions from "./constants";

export const updateSellerIndex = (sellerIndex) => ({
  type: actions.UPDATE_SITE_INDEX,
  sellerIndex,
});

export const fetchAdminProducts = (request) => ({
  type: actions.UPDATE_ADMIN_PRODUCTS_REQUEST,
  request,
});

export const updateAdminProducts = (products) => ({
  type: actions.UPDATE_ONLY_ADMIN_PRODUCTS,
  products,
});

export const fetchAdminOrders = (request) => ({
  type: actions.UPDATE_ADMIN_ORDERS_REQUEST,
  request,
});

export const updateAdminOrders = (orders) => ({
  type: actions.UPDATE_ONLY_ADMIN_ORDERS,
  orders,
});
