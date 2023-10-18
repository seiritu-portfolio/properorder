import { POAddress } from "../../models";
import { injectAuthHeader } from "../APIManager";
import ResponseCallback from "../ResponseCallback";
import { router } from "../URLProvider";

/**
 * createAddress
 *
 * @param {ApisauceInstance} api
 * @param {number} userId
 * @param {object} address
 * @returns {Promise<object>}
 */
async function createAddress(api, userId, address) {
  await injectAuthHeader(api);
  const apiCall = api.post(
    `${router.users}/${userId}${router.addresses}`,
    address
  );

  return ResponseCallback.onResponse(apiCall).then(
    (result) => POAddress.fromStateArray(result)[0]
  );
}

/**
 * fetchAddresses
 *
 * @param {ApisauceInstance} api
 * @param {number} userId
 * @returns {Promise<object>}
 */
async function fetchAddresses(api, userId) {
  await injectAuthHeader(api);
  const apiCall = api.get(`${router.users}/${userId}${router.addresses}`);

  return ResponseCallback.onResponse(apiCall).then((result) =>
    POAddress.fromStateArray(result).reverse()
  );
}

/**
 * updateAddress
 *
 * @param {ApisauceInstance} api
 * @param {number} userId
 * @param {number} addressId
 * @param {object} address
 * @returns {Promise<boolean>}
 */
async function updateAddress(api, userId, addressId, address) {
  await injectAuthHeader(api);
  const apiCall = api.post(
    `${router.users}/${userId}${router.addresses}/${addressId}`,
    address
  );

  return ResponseCallback.onResponse(apiCall).then(
    (result) => result.message !== ""
  );
}

/**
 * deleteAddress
 *
 * @param {ApisauceInstance} api
 * @param {number} userId
 * @param {number} addressId
 * @returns {Promise<boolean>}
 */
async function deleteAddress(api, userId, addressId) {
  await injectAuthHeader(api);
  const apiCall = api.delete(
    `${router.users}/${userId}${router.addresses}/${addressId}`
  );

  return ResponseCallback.onResponse(apiCall).then(
    (result) => result.message !== ""
  );
}

export default {
  createAddress,
  fetchAddresses,
  updateAddress,
  deleteAddress,
};
