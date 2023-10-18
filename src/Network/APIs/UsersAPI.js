import {
  POProduct,
  POSeller,
  POUser,
  ValidateTokenResponse,
} from "../../models";
import { injectAuthHeader } from "../APIManager";
import ResponseCallback from "../ResponseCallback";
import { router } from "../URLProvider";
import { getTempUserToken, getUserToken } from "../../services/HelperService";

/**
 * getProfile
 *
 * @param {ApisauceInstance} api
 * @returns {Promise<POUser>}
 */
async function getProfile(api) {
  await injectAuthHeader(api);

  let isAdmin = false;
  let userToken = getTempUserToken();
  if (userToken != null) {
    userToken = ValidateTokenResponse.fromState(userToken);
    isAdmin = userToken.isAdmin();
  }

  const apiCall = api.get(`${isAdmin ? "/admin" : ""}${router.profile}`);

  return ResponseCallback.onResponse(apiCall).then((result) =>
    POUser.fromState(result)
  );
}

/**
 * updateUser
 *
 * @param {ApisauceInstance} api
 * @param {number} userId
 * @param {string} paymentId
 * @returns {Promise<POUser>}
 */
async function updateUser(api, userId, paymentId) {
  await injectAuthHeader(api);

  const apiCall = api.post(`${router.users}/${userId}`, {
    default_stripe_payment_id: paymentId,
  });

  return ResponseCallback.onResponse(apiCall).then((result) =>
    POUser.fromState(result)
  );
}

/**
 * updatePassword
 *
 * @param {ApisauceInstance} api
 * @param {number} userId
 * @param {object} body
 * @returns {Promise<boolean>}
 */
async function updatePassword(api, userId, body) {
  await injectAuthHeader(api);
  const apiCall = api.post(
    `${router.users}/${userId}${router.update_password}`,
    body
  );

  return ResponseCallback.onResponse(apiCall).then(
    (result) => result === "Password Updated Successfully!"
  );
}

/**
 * fetchFavSellers
 *
 * @param {ApisauceInstance} api
 * @param {number} userId
 * @returns {Promise<Array<POSeller>>}
 */
async function fetchFavSellers(api, userId) {
  await injectAuthHeader(api);
  const apiCall = api.get(
    `${router.users}/${userId}${router.favourites_sites}`
  );

  return ResponseCallback.onResponse(apiCall).then((result) =>
    POSeller.fromStateArray(result.sites)
  );
}

/**
 * createFavSite
 *
 * @param {ApisauceInstance} api
 * @param {number} userId
 * @param {number} siteId
 * @returns {Promise<boolean>}
 */
async function createFavSite(api, userId, siteId) {
  await injectAuthHeader(api);
  const apiCall = api.post(
    `${router.users}/${userId}${router.favourites_sites}`,
    { site_id: siteId }
  );

  return ResponseCallback.onResponse(apiCall).then(
    (result) => result.message !== ""
  );
}

/**
 * delFavSite
 *
 * @param {ApisauceInstance} api
 * @param {number} userId
 * @param {number} siteId
 * @returns {Promise<boolean>}
 */
async function delFavSite(api, userId, siteId) {
  await injectAuthHeader(api);
  const apiCall = api.delete(
    `${router.users}/${userId}${router.favourites_sites}/${siteId}`
  );

  return ResponseCallback.onResponse(apiCall).then(
    (result) => result.message !== ""
  );
}

/**
 * fetchFavProducts
 *
 * @param {ApisauceInstance} api
 * @param {number} userId
 * @returns {Promise<Array<number>>} IDs
 */
async function fetchFavProducts(api, userId) {
  await injectAuthHeader(api);
  const apiCall = api.get(
    `${router.users}/${userId}${router.favourites_products}`
  );

  return ResponseCallback.onResponse(apiCall).then((result) =>
    POProduct.fromStateArray(result.products)
  );
}

/**
 * createFavProduct
 *
 * @param {ApisauceInstance} api
 * @param {number} userId
 * @param {number} productsId
 * @returns {Promise<boolean>}
 */
async function createFavProduct(api, userId, productId) {
  await injectAuthHeader(api);
  const apiCall = api.post(
    `${router.users}/${userId}${router.favourites_products}`,
    { product_id: productId }
  );

  return ResponseCallback.onResponse(apiCall).then(
    (result) => result.message !== ""
  );
}

/**
 * delFavProduct
 *
 * @param {ApisauceInstance} api
 * @param {number} userId
 * @param {number} productId
 * @returns {Promise<boolean>}
 */
async function delFavProduct(api, userId, productId) {
  await injectAuthHeader(api);
  const apiCall = api.delete(
    `${router.users}/${userId}${router.favourites_products}/${productId}`
  );

  return ResponseCallback.onResponse(apiCall).then(
    (result) => result.message !== ""
  );
}

/**
 * logout
 *
 * @param {ApisauceInstance} api
 * @returns {Promise<object>}
 */
async function logout(api) {
  await injectAuthHeader(api);
  const apiCall = api.get(router.logout);

  return ResponseCallback.onResponse(apiCall);
}

export default {
  getProfile,
  updateUser,
  fetchFavSellers,
  fetchFavProducts,
  createFavSite,
  createFavProduct,
  delFavSite,
  delFavProduct,
  logout,
  updatePassword,
};
