import { injectAuthHeader } from "../APIManager";
import ResponseCallback from "../ResponseCallback";
import { router } from "../URLProvider";
import { POPayment } from "../../models";

/**
 * createPayment
 *
 * @param {ApisauceInstance} api
 * @param {number} userId
 * @param {string} token_id
 * @returns {Promise<POPayment>}
 */
async function createPayment(api, userId, token_id) {
  await injectAuthHeader(api);
  const apiCall = api.post(
    `${router.users}/${userId}${router.payment_methods}`,
    { token_id }
  );

  return ResponseCallback.onResponse(apiCall).then((result) =>
    POPayment.fromState(result[0])
  );
}

/**
 * fetchPayments
 *
 * @param {ApisauceInstance} api
 * @param {number} userId
 * @returns {Promise<object>}
 */
async function fetchPayments(api, userId) {
  await injectAuthHeader(api);
  const apiCall = api.get(`${router.users}/${userId}${router.payment_methods}`);

  return ResponseCallback.onResponse(apiCall);
}

/**
 * updatePayment
 *
 * @param {ApisauceInstance} api
 * @param {number} userId
 * @param {number} paymentId
 * @param {string} token
 * @returns {Promise<boolean>}
 */
async function updatePayment(api, userId, paymentId, token) {
  await injectAuthHeader(api);
  const apiCall = api.post(
    `${router.users}/${userId}${router.payment_methods}/${paymentId}`,
    { token }
  );

  return ResponseCallback.onResponse(apiCall).then(
    (result) => result.message !== ""
  );
}

/**
 * deletePayment
 *
 * @param {ApisauceInstance} api
 * @param {number} userId
 * @param {number} paymentId
 * @returns {Promise<boolean>}
 */
async function deletePayment(api, userId, paymentId) {
  await injectAuthHeader(api);
  const apiCall = api.delete(
    `${router.users}/${userId}${router.payment_methods}/${paymentId}`
  );

  return ResponseCallback.onResponse(apiCall).then(
    (result) => result.message !== ""
  );
}

export default {
  createPayment,
  fetchPayments,
  updatePayment,
  deletePayment,
};
