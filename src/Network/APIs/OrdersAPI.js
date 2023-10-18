import { POOrder, POOrderItem, POPagination, POSeller } from "../../models";
import { injectAuthHeader } from "../APIManager";
import ResponseCallback from "../ResponseCallback";
import { router } from "../URLProvider";
import FormGenerator from "./FormGenerator";
import Constants from "../../config/Constants";

/**
 * createOrder
 *
 * @param {ApisauceInstance} api
 * @param {object} body
 * @returns {Promise<boolean>}
 */
async function createOrder(api, body) {
  await injectAuthHeader(api);
  const apiCall = api.post(router.orders, body);

  return ResponseCallback.onResponse(apiCall).then(
    (result) => POSeller.fromStateArray(result)[0]
  );
}

/**
 * updateOrder
 *
 * @param {ApisauceInstance} api
 * @param {number} orderId
 * @param {object} body
 * @returns {Promise<object>}
 */
async function updateOrder(api, orderId, body) {
  await injectAuthHeader(api);
  const apiCall = api.post(`${router.orders}/${orderId}`, body);

  return ResponseCallback.onResponse(apiCall).then(
    (result) => POSeller.fromStateArray(result)[0]
  );
}

/**
 * deleteOrder
 *
 * @param {ApisauceInstance} api
 * @param {number} orderId
 * @returns {Promise<object>}
 */
async function deleteOrder(api, orderId) {
  await injectAuthHeader(api);
  const apiCall = api.delete(`${router.orders}/${orderId}`);

  return ResponseCallback.onResponse(apiCall);
}

/**
 * fetchOrders
 *
 * @param {ApisauceInstance} api
 * @param {string} pageNumber
 * @param {string} params
 * @returns {Promise<object>}
 */
async function fetchOrders(api, pageNumber = "1", params = "") {
  await injectAuthHeader(api);
  const apiCall = api.get(`${router.orders}?page=${pageNumber}${params}`);

  return ResponseCallback.onResponse(apiCall).then((result) => {
    return {
      orders: POOrder.fromStateArray(result.orders.data),
      pagination: POPagination.fromState(result.orders),
    };
  });
}

/**
 * fetchActiveOrders
 *
 * @param {*} api
 * @param {string} postcode
 * @returns {Promise<[POOrder]>}
 */
async function fetchActiveOrders(api, postcode) {
  const currentLocation = localStorage.getItem(Constants.SS_CURRENT_LOCATION);
  await injectAuthHeader(api);
  const apiCall = api.get(
    `${router.orders}/drafts${
      currentLocation
        ? `?postcode=${(
            postcode ?? JSON.parse(currentLocation).location.postcode
          ).substring(0, 3)}`
        : ""
    }`
  );

  return ResponseCallback.onResponse(apiCall).then((result) => {
    return POOrder.fromStateArray(result.orders);
  });
}

/**
 * addProductToOrder
 *
 * @param {ApisauceInstance} api
 * @param {number} orderId
 * @param {object} body
 * @returns {Promise<boolean>}
 */
async function addProductToOrder(api, orderId, body) {
  await injectAuthHeader(api);
  const apiCall = api.post(
    `${router.orders}/${orderId}${router.product}`,
    body
  );

  return ResponseCallback.onResponse(apiCall).then((result) => result !== null);
}

/**
 * updateProductToOrder
 *
 * @param {ApisauceInstance} api
 * @param {number} orderId
 * @param {number} productId
 * @param {object} body
 * @returns {Promise<object>}
 */
async function updateProductToOrder(api, orderId, productId, body) {
  await injectAuthHeader(api);
  const apiCall = api.post(
    `${router.orders}/${orderId}${router.product}/${productId}`,
    body
  );

  return ResponseCallback.onResponse(apiCall).then(
    (result) => POOrderItem.fromStateArray(result)[0]
  );
}

/**
 * deleteProductFromOrder
 *
 * @param {ApisauceInstance} api
 * @param {number} orderId
 * @param {number} productId
 * @returns {Promise<object>}
 */
async function deleteProductFromOrder(api, orderId, productId) {
  await injectAuthHeader(api);
  const apiCall = api.delete(
    `${router.orders}/${orderId}${router.product}/${productId}`
  );

  return ResponseCallback.onResponse(apiCall);
}

/**
 * fetchOrder
 *
 * @param {ApisauceInstance} api
 * @param {number} id
 * @returns {Promise<POOrder>}
 */
async function fetchOrder(api, id) {
  const apiCall = api.get(`${router.orders}/${id}`);

  return ResponseCallback.onResponse(apiCall).then((result) =>
    POOrder.fromState(result)
  );
}

/**
 * confirmOrder
 *
 * @param {ApisauceInstance} api
 * @param {number} id
 * @returns {Promise<object>}
 */
async function confirmOrder(api, id) {
  const apiCall = api.post(`${router.orders}/${id}/confirm-payment`);

  return ResponseCallback.onResponse(apiCall);
}

/**
 * applyCoupon
 *
 * @param {ApisauceInstance} api
 * @param {number} orderId
 * @param {string} code
 * @returns {Promise<object>}
 */
async function applyCoupon(api, orderId, code) {
  const apiCall = api.post(
    `${router.orders}/${orderId}${router.coupons}`,
    FormGenerator.generateBody({
      code,
    })
  );

  return ResponseCallback.onResponse(apiCall);
}

export default {
  applyCoupon,
  fetchOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  confirmOrder,
  fetchOrders,
  fetchActiveOrders,
  addProductToOrder,
  updateProductToOrder,
  deleteProductFromOrder,
};
