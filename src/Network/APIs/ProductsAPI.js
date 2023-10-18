import {
  POAllergens,
  POPagination,
  POProduct,
  POReview,
  POSeller,
} from "../../models";
import ResponseCallback from "../ResponseCallback";
import { router } from "../URLProvider";
import { injectAuthHeader } from "../APIManager";

/**
 * fetchProduct
 *
 * @param {ApisauceInstance} api
 * @param {number} productId
 * @returns {Promise<POProduct>}
 */
async function fetchProduct(api, productId) {
  const apiCall = api.get(`${router.products}/${productId}`);

  return ResponseCallback.onResponse(apiCall).then((result) =>
    POProduct.fromState(result)
  );
}

/**
 * fetchSellerProducts
 *
 * @param {ApisauceInstance} api
 * @param {number} siteId
 * @returns {Promise<object>}
 */
async function fetchSellerProducts(api, siteId) {
  const apiCall = api.get(`${router.sites}/${siteId}${router.products}/all`);

  return ResponseCallback.onResponse(apiCall).then((result) => ({
    products: POProduct.fromStateArray(result[0]),
    // pagination: POPagination.fromState(result[0]),
  }));
}

/**
 * fetchReviews
 *
 * @param {ApisauceInstance} api
 * @param {number} siteId
 * @param {string} pageNumber
 * @returns {Promise<object>}
 */
async function fetchReviews(api, siteId, pageNumber) {
  const apiCall = api.get(
    `${router.sites}/${siteId}${router.reviews}?page=${pageNumber}`
  );
  return ResponseCallback.onResponse(apiCall).then((result) => ({
    reviews: POReview.fromStateArray(result.reviews.data),
    pagination: POPagination.fromState(result.reviews),
    summary: result.summary,
  }));
}

/**
 * createReview
 *
 * @param {ApisauceInstance} api
 * @param {number} sellerId
 * @param {object} body
 * @returns {Promise<POReview>}
 */
async function createReview(api, sellerId, body) {
  await injectAuthHeader(api);
  const apiCall = api.post(
    `${router.sites}/${sellerId}${router.reviews}`,
    body
  );

  return ResponseCallback.onResponse(apiCall).then((result) =>
    POReview.fromState(result)
  );
}

/**
 * updateReview
 *
 * @param {ApisauceInstance} api
 * @param {number} siteId
 * @param {number} reviewId
 * @param {object} body
 * @returns {Promise<POReview>}
 */
async function updateReview(api, siteId, reviewId, body) {
  await injectAuthHeader(api);
  const apiCall = api.post(
    `${router.sites}/${siteId}${router.reviews}/${reviewId}`,
    body
  );

  return ResponseCallback.onResponse(apiCall).then((result) =>
    POReview.fromState(result)
  );
}

/**
 * deleteReview
 *
 * @param {ApisauceInstance} api
 * @param {number} siteId
 * @param {number} reviewId
 * @returns {Promise<boolean>}
 */
async function deleteReview(api, siteId, reviewId) {
  await injectAuthHeader(api);
  const apiCall = api.delete(
    `${router.sites}/${siteId}${router.reviews}/${reviewId}`
  );

  return ResponseCallback.onResponse(apiCall).then(
    (result) => result.message !== ""
  );
}

/**
 * fetchAllergens
 *
 * @param {ApisauceInstance} api
 * @returns {Promise<[POAllergens]>}
 */
async function fetchAllergens(api) {
  await injectAuthHeader(api);
  const apiCall = api.get(router.allergens);

  return ResponseCallback.onResponse(apiCall).then((result) =>
    POAllergens.fromStateArray(result.allergens)
  );
}

/**
 * fetch products with eirKey and queries
 *
 * @param {ApisauceInstance} api
 * @param {object} eirKey
 * @param {string} pageNumber
 * @param {string} queries
 * @returns {Promise<object>}
 */
async function fetchProducts(api, eirKey, pageNumber, queries) {
  const apiCall = api.get(
    `${router.products_by_postcode}/?postcode=${eirKey.substring(
      0,
      3
    )}&page=${pageNumber}${queries}`
  );

  return ResponseCallback.onResponse(apiCall).then((result) => {
    return {
      products: POProduct.fromStateArray(result.products.data),
      pagination: POPagination.fromState(result.products),
    };
  });
}

export default {
  fetchProduct,
  fetchSellerProducts,
  fetchReviews,
  createReview,
  updateReview,
  deleteReview,
  fetchAllergens,
  fetchProducts,
};
