import {
  POPagination,
  POProductHeader,
  POSeller,
  POSellerType,
} from "../../models";
import ResponseCallback from "../ResponseCallback";
import { router } from "../URLProvider";

/**
 * fetch sites with Lat,Lng
 *
 * @param {ApisauceInstance} api
 * @param {object} eirKey
 * @param {string} pageNumber
 * @param {string} queries
 * @returns {Promise<object>}
 */
async function fetchSellers(api, eirKey, pageNumber, queries) {
  const apiCall = api.get(
    `${router.sites_by_postcode}/?postcode=${eirKey.substring(
      0,
      3
    )}&page=${pageNumber}${queries}`
  );
  // const apiCall = api.get(
  //   `${router.sites_by_location}/?lat=${Number(53.3379796).toFixed(
  //     6
  //   )}&long=${Number(-6.2466956).toFixed(6)}&page=${pageNumber}${queries}`
  // );

  return ResponseCallback.onResponse(apiCall).then((result) => {
    return {
      sellers: POSeller.fromStateArray(result.sites.data),
      // products: POProduct.fromStateArray(result.products.data),
      pagination: POPagination.fromState(result.sites),
    };
  });
}

/**
 * fetchTags
 *
 * @param {ApisauceInstance} api
 * @param {object} tag
 */
async function fetchTags(api, tag) {
  const apiCall = api.get(`tags/with-children${tag ? `?id=${tag.id}` : ""}`);
  return ResponseCallback.onResponse(apiCall).then((result) => result[0]);
}

/**
 * getTypes
 *
 * @param {ApisauceInstance} api
 */
async function getTypes(api) {
  const apiCall = api.get("dietarypreferences");
  return ResponseCallback.onResponse(apiCall);
}

/**
 * getCountries
 *
 * @param {ApisauceInstance} api
 */
async function getCountries(api) {
  const apiCall = api.get("countries");
  return ResponseCallback.onResponse(apiCall);
}

/**
 * fetchSeller
 *
 * @param {ApisauceInstance} api
 * @param {number} id
 * @param {string} postcode
 * @returns {Promise<Array<POMenu>>}
 */
async function fetchSeller(api, id, postcode) {
  const apiCall = api.get(
    `${router.sites}/${id}${
      postcode ? `?postcode=${postcode.substring(0, 3)}` : ""
    }`
  );
  return ResponseCallback.onResponse(apiCall).then((result) =>
    POSeller.fromState(result.site)
  );
}

/**
 * fetchSellerType
 *
 * @param {ApisauceInstance} api
 * @returns {Promise<[POSellerType]>}
 */
async function fetchSellerType(api) {
  const apiCall = api.get(router.siteTypes);
  return ResponseCallback.onResponse(apiCall).then((result) =>
    POSellerType.fromStateArray(result)
  );
}

/**
 * fetchProductHeaders
 *
 * @param {ApisauceInstance} api
 * @param {string} sellerIndex
 * @returns {Promise<[POProductHeader]>}
 */
async function fetchProductHeaders(api, sellerIndex) {
  const apiCall = api.get(`${router.admin.productHeaders(sellerIndex)}`);
  return ResponseCallback.onResponse(apiCall).then((result) =>
    POProductHeader.fromStateArray(result)
  );
}

/**
 * createProductHeader
 *
 * @param {ApisauceInstance} api
 * @param {string} sellerIndex
 * @param {object} body
 * @returns {Promise<[POProductHeader]>}
 */
async function createProductHeader(api, sellerIndex, body) {
  const apiCall = api.post(`${router.admin.productHeaders(sellerIndex)}`, body);
  return ResponseCallback.onResponse(apiCall).then((result) =>
    POProductHeader.fromStateArray(result)
  );
}

export default {
  fetchSellers,
  fetchSeller,
  fetchTags,
  getTypes,
  getCountries,
  fetchSellerType,
  fetchProductHeaders,
  createProductHeader,
};
