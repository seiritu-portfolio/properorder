import { router } from "../URLProvider";
import ResponseCallback from "../ResponseCallback";
import {
  PODiscount,
  POOrder,
  POOrganization,
  POPagination,
  POProduct,
  POProductHeader,
  POSeller,
  POUser,
} from "../../models";
import FormGenerator from "./FormGenerator";

/**
 * fetchOrganisation
 *
 * @param {ApisauceInstance} api
 * @param {number} orgId
 * @returns {Promise<POOrganization>}
 */
async function fetchOrganisation(api, orgId) {
  const apiCall = api.get(`${router.admin.organization}/${orgId}`);

  return ResponseCallback.onResponse(apiCall).then((result) =>
    POOrganization.fromState(result)
  );
}

/**
 * submitOrganisation
 *
 * @param {ApisauceInstance} api
 * @param {number} orgId
 * @param {object} request
 * @returns {Promise<POOrganization>}
 */
async function submitOrganisation(api, orgId, request) {
  const apiCall = api.post(
    `${router.admin.organization}/${orgId ?? ""}`,
    FormGenerator.generateBody(request)
  );

  return ResponseCallback.onResponse(apiCall).then((result) =>
    POOrganization.fromState(result)
  );
}

/**
 * fetchProductList
 *
 * @param {ApisauceInstance} api
 * @param {number} sellerId
 * @param {string} pageNumber
 * @param {string} queries
 * @returns {Promise<object>}
 */
async function fetchProductList(api, sellerId, pageNumber, queries) {
  const apiCall = api.get(
    `${router.admin.products(sellerId)}?page=${pageNumber}${queries}`
  );

  return ResponseCallback.onResponse(apiCall).then((result) => {
    console.log(result);
    return {
      products: POProduct.fromStateArray(result.data),
      pagination: POPagination.fromState(result),
    };
  });
}

/**
 * fetchAdminOrders
 *
 * @param {ApisauceInstance} api
 * @param {number} sellerId
 * @param {string} pageNumber
 * @param {string} queries
 * @returns {Promise<object>}
 */
async function fetchAdminOrders(api, sellerId, pageNumber, queries) {
  const apiCall = api.get(
    `${router.admin.sellers(sellerId)}?page=${pageNumber}${queries}`
  );

  return ResponseCallback.onResponse(apiCall).then((result) => ({
    orders: POOrder.fromStateArray(result?.orders?.data ?? []),
    pagination: POPagination.fromState(result?.orders ?? {}),
    orders_count: result?.orders_count[0],
  }));
}

/**
 * updateOrderStatus
 *
 * @param {ApisauceInstance} api
 * @param {number} sellerId
 * @param {number} orderId
 * @param {string} request
 * @returns {Promise<object>}
 */

async function updateOrderStatus(api, sellerId, orderId, request) {
  const apiCall = api.post(
    `${router.admin.sellers(sellerId)}/${orderId}${request}`
  );
  return ResponseCallback.onResponse(apiCall);
}

/**
 * fetchUsers
 *
 * @param {ApisauceInstance} api
 * @param {number} orgId
 * @param {string} queries
 * @returns {Promise<object>}
 */
async function fetchUsers(api, orgId, queries) {
  const apiCall = api.get(`${router.admin.users(orgId)}${queries}`);
  return ResponseCallback.onResponse(apiCall).then((result) => ({
    sellers: result.sites,
    users: POUser.fromStateArray(result.users),
  }));
}

/**
 * fetchUser
 *
 * @param {ApisauceInstance} api
 * @param {number} orgId
 * @param {string} userId
 * @returns {Promise<object>}
 */
async function fetchUser(api, orgId, userId) {
  const apiCall = api.get(`${router.admin.users(orgId)}/${userId}`);
  return ResponseCallback.onResponse(apiCall).then((result) => {
    console.log(result);
    return {
      sellers: result.sites,
      users: POUser.fromStateArray(result.users),
    };
  });
}

/**
 * updateAdminUser
 *
 * @param {ApisauceInstance} api
 * @param {number} orgId
 * @param {number} userId
 * @param {object} request
 * @returns {Promise<object>}
 */
async function updateAdminUser(api, orgId, userId, request) {
  const apiCall = api.post(
    `${router.admin.users(orgId)}${userId ? `/${userId}` : ""}`,
    FormGenerator.generateBody(request)
  );
  return ResponseCallback.onResponse(apiCall);
}

/**
 * deleteOrgUser
 *
 * @param {ApisauceInstance} api
 * @param {number} orgId
 * @param {number} userId
 * @returns {Promise<object>}
 */
async function deleteOrgUser(api, orgId, userId) {
  const apiCall = api.post(`${router.admin.users(orgId)}/${userId}/deactivate`);
  return ResponseCallback.onResponse(apiCall);
}

/**
 * createProduct
 *
 * @param {ApisauceInstance} api
 * @param {number} sellerId
 * @param {number} productId
 * @param {object} request
 * @returns {Promise<POProduct>}
 */
async function createProduct(api, sellerId, productId, request) {
  const body = new FormData();

  console.log("createProduct request:", request);
  const requests = Object.keys(request);
  for (const r of requests) {
    if (r === "tags" || r === "allergens" || r === "dietary_preferences") {
      request[r].forEach((ra) => body.append(`${r}[]`, ra.id));
    } else if (r === "options") {
      if (request[r] == null) {
        console.log("product options: skip");
      } else {
        request[r].forEach((option, index) => {
          body.append(`product_options[${index}][name]`, option.name);
          body.append(
            `product_options[${index}][type]`,
            option.variants.length > 1 ? "1" : "0"
          );
          option.variants.forEach((v, i) => {
            body.append(
              `product_options[${index}][variants][${i}][name]`,
              v.name
            );
            body.append(
              `product_options[${index}][variants][${i}][price]`,
              (Number(v.price) * 100).toFixed()
            );
          });
        });
      }
    } else if (r === "images" || r === "seller") {
      console.log("this is no needed");
    } else if (typeof request[r] === "boolean") {
      body.append(r, request[r] ? "1" : "0");
    } else {
      if (request[r] != null) {
        body.append(r, request[r]);
      }
    }
  }

  const apiCall = api.post(
    `${router.admin.products(sellerId)}${productId ? `/${productId}` : ""}`,
    body
  );
  return ResponseCallback.onResponse(apiCall).then((res) =>
    POProduct.fromState(res)
  );
}

/**
 * fetchProduct
 *
 * @param {ApisauceInstance} api
 * @param {number} sellerId
 * @param {number} productId
 * @returns {Promise<POProduct>}
 */
async function fetchProduct(api, sellerId, productId) {
  const apiCall = api.get(`${router.admin.products(sellerId)}/${productId}`);
  return ResponseCallback.onResponse(apiCall).then((result) =>
    POProduct.fromState(result)
  );
}

/**
 * updatePrices
 *
 * @param {ApisauceInstance} api
 * @param {number} sellerId
 * @param {object} request
 * @returns {Promise<object>}
 */
async function updatePrices(api, sellerId, request) {
  const body = new FormData();

  const requests = Object.keys(request);
  for (const r of requests) {
    const t = request[r];
    body.append(`${r}`, t);
  }

  const apiCall = api.post(`${router.admin.deliveryCoverage(sellerId)}`, body);
  return ResponseCallback.onResponse(apiCall);
}

/**
 * fetchPrices
 *
 * @param {ApisauceInstance} api
 * @param {number} sellerId
 * @returns {Promise<object>}
 */
async function fetchPrices(api, sellerId) {
  const apiCall = api.get(`${router.admin.deliveryCoverage(sellerId)}`);
  return ResponseCallback.onResponse(apiCall);
}

/**
 * updateProfile
 *
 * @param {ApisauceInstance} api
 * @param {object} request
 * @returns {Promise<object>}
 */
async function updateProfile(api, request) {
  const apiCall = api.post(
    `${router.admin.profile}`,
    FormGenerator.generateBody(request)
  );
  return ResponseCallback.onResponse(apiCall);
}

/**
 * updateSeller
 *
 * @param {ApisauceInstance} api
 * @param {number} sellerId
 * @param {object} request
 * @returns {Promise<object>}
 */
async function updateSeller(api, sellerId, request) {
  const apiCall = api.post(
    `${router.admin.settings(sellerId)}`,
    FormGenerator.generateBody(request)
  );
  return ResponseCallback.onResponse(apiCall);
}

/**
 * fetchAdminDiscounts
 *
 * @param {ApisauceInstance} api
 * @param {number} sellerId
 * @param {string} pageNumber
 * @param {string} queries
 * @returns {Promise<object>}
 */
async function fetchAdminDiscounts(api, sellerId, pageNumber, queries) {
  const apiCall = api.get(
    `${router.admin.discounts(sellerId)}?page=${pageNumber}${queries}`
  );

  return ResponseCallback.onResponse(apiCall).then((result) => ({
    discounts: PODiscount.fromStateArray(result ?? []),
  }));
}

/**
 * createDiscount
 *
 * @param {ApisauceInstance} api
 * @param {number} sellerId
 * @param {string} discountId
 * @param {object} request
 * @returns {Promise<object>}
 */
async function createDiscount(api, sellerId, discountId, request) {
  console.log(request);
  const apiCall = api.post(
    `${router.admin.discounts(sellerId)}${
      discountId !== "-1" ? `/${discountId}` : ""
    }`,
    request
  );
  return ResponseCallback.onResponse(apiCall);
}

/**
 * fetchAdminDiscount
 *
 * @param {ApisauceInstance} api
 * @param {number} sellerId
 * @param {string} discountId
 * @returns {Promise<PODiscount>}
 */
async function fetchAdminDiscount(api, sellerId, discountId) {
  const apiCall = api.get(`${router.admin.discounts(sellerId)}/${discountId}`);
  return ResponseCallback.onResponse(apiCall).then((result) =>
    PODiscount.fromState(result)
  );
}

/**
 * onboardSeller
 *
 * @param {ApisauceInstance} api
 * @param {number} sellerId
 * @returns {Promise<PODiscount>}
 */
async function onboardSeller(api, sellerId) {
  const apiCall = api.get(`${router.admin.onboard(sellerId)}`);
  return ResponseCallback.onResponse(apiCall);
}

/**
 * fetchSeller
 *
 * @param {ApisauceInstance} api
 * @param {string} sellerId
 * @returns {Promise<PODiscount>}
 */
async function fetchSeller(api, sellerId) {
  const apiCall = api.get(`/admin/sites/${sellerId}`);
  return ResponseCallback.onResponse(apiCall).then((result) =>
    POSeller.fromState(result.site)
  );
}

/**
 * updateProductHeaders
 *
 * @param {ApisauceInstance} api
 * @param {string} sellerId
 * @param {object} body
 * @returns {Promise<[POProductHeader]>}
 */
async function updateProductHeaders(api, sellerId, body) {
  const apiCall = api.post(
    `${router.admin.productHeaders(sellerId)}/multiple/update`,
    body
  );
  return ResponseCallback.onResponse(apiCall).then((result) =>
    POProductHeader.fromStateArray(result)
  );
}

/**
 * deleteProductHeader
 *
 * @param {ApisauceInstance} api
 * @param {string} sellerIndex
 * @param {number} headerId
 * @returns {Promise<[POProductHeader]>}
 */
async function deleteProductHeader(api, sellerIndex, headerId) {
  const apiCall = api.delete(
    `${router.admin.productHeaders(sellerIndex)}/${headerId}`
  );
  return ResponseCallback.onResponse(apiCall).then((result) =>
    POProductHeader.fromStateArray(result)
  );
}

export default {
  fetchOrganisation,
  submitOrganisation,
  fetchProductList,
  fetchAdminOrders,
  fetchUsers,
  fetchUser,
  updateAdminUser,
  updateOrderStatus,
  deleteOrgUser,
  createProduct,
  fetchProduct,
  updatePrices,
  fetchPrices,
  updateProfile,
  fetchSeller,
  updateSeller,
  fetchAdminDiscounts,
  createDiscount,
  fetchAdminDiscount,
  onboardSeller,
  updateProductHeaders,
  deleteProductHeader,
};
