import { base_url, router } from "./URLProvider";
import apisauce from "apisauce";
import SellersAPI from "./APIs/SellersAPI";
import UsersAPI from "./APIs/UsersAPI";
import AuthAPI from "./APIs/AuthAPI";
import ProductsAPI from "./APIs/ProductsAPI";
import PaymentAPI from "./APIs/PaymentAPI";
import UserAddressAPI from "./APIs/UserAddressAPI";
import OrdersAPI from "./APIs/OrdersAPI";
import { getTempUserToken } from "../services/HelperService";
import AdminAPI from "./APIs/AdminAPI";

export default {
  login,
  logout,
  register,
  registerPhone,
  validateToken,
  resetPassword,
  verifyReset,
  registerPhoneConfirm,
  loginWithSocial,
  resendToken,

  getProfile,
  updateUser,

  fetchSellers,
  fetchProducts,
  fetchSeller,
  fetchSellerProducts,
  fetchProduct,
  getCurrentAddress,

  fetchReviews,
  createReview,
  updateReview,
  deleteReview,

  createFavSite,
  fetchFavSellers,
  delFavSite,

  fetchFavProducts,
  createFavProduct,
  delFavProduct,

  createPayment,
  fetchPayments,
  updatePayment,
  deletePayment,

  createAddress,
  fetchAddresses,
  updateAddress,
  deleteAddress,

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
  updatePassword,
  getTags,
  getTypes,
  getCountries,

  // admin
  fetchOrganisation,
  submitOrganisation,
  fetchAdminProduct,
  fetchProductList,
  fetchAdminOrders,
  updateOrderStatus,
  fetchAdminUsers,
  fetchUser,
  updateAdminUser,
  deleteOrgUser,
  createProduct,
  fetchAllergens,
  updatePrices,
  fetchPrices,

  updateAdminProfile,
  updateSeller,
  fetchAdminSeller,

  fetchSellerType,
  fetchAdminDiscounts,
  createDiscount,
  fetchAdminDiscount,

  fetchProductHeaders,
  updateProductHeaders,
  createProductHeader,
  deleteProductHeader,
  onboardSeller,
};

const api = apisauce.create({
  baseURL: base_url,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
  timeout: 60000,
});

/**
 * injectAuthHeader
 *
 * @param {ApisauceInstance} requiredApi
 */
export async function injectAuthHeader(requiredApi) {
  const userToken = getTempUserToken();
  requiredApi.setHeader("Authorization", `Bearer ${userToken.access_token}`);
}

/**
 * fetch sellers with lat,long
 *
 * @param {string} eirKey
 * @param {string} pageNumber
 * @param {string} queries
 * @returns {Promise<object>}
 */
function fetchSellers(eirKey, pageNumber, queries = "") {
  return SellersAPI.fetchSellers(api, eirKey, pageNumber, queries);
}

/**
 * fetch products with eirKey and queries
 *
 * @param {string} eirKey
 * @param {string} pageNumber
 * @param {string} queries
 * @returns {Promise<object>}
 */
function fetchProducts(eirKey, pageNumber, queries = "") {
  return ProductsAPI.fetchProducts(api, eirKey, pageNumber, queries);
}

/**
 * getTags
 *
 * @param {object} tag
 */
function getTags(tag = null) {
  return SellersAPI.fetchTags(api, tag);
}

/**
 * getTypes
 *
 * fetch dietary preferences
 */
function getTypes() {
  return SellersAPI.getTypes(api);
}

/**
 * getCountries
 *
 * fetch countries
 */
function getCountries() {
  return SellersAPI.getCountries(api);
}

/**
 * fetchSeller
 * fetch seller by id
 *
 * @param {number} id
 * @param {string} postcode
 * @returns {Promise<POSeller>}
 */
function fetchSeller(id, postcode) {
  return SellersAPI.fetchSeller(api, id, postcode);
}

/**
 *
 * User API
 *
 */

/**
 * getProfile
 *
 * @returns {Promise<POUser>}
 */
async function getProfile() {
  return UsersAPI.getProfile(api);
}

/**
 * updateUser
 *
 * @param {number} userId
 * @param {string} paymentId
 * @returns {Promise<POUser>}
 */
async function updateUser(userId, paymentId) {
  return UsersAPI.updateUser(api, userId, paymentId);
}

/**
 * updatePassword
 *
 * @param {number} userId
 * @param {object} body: {old_password, password}
 * @returns {Promise<boolean>}
 */
async function updatePassword(userId, body) {
  return UsersAPI.updatePassword(api, userId, body);
}

/**
 * fetchFavSites
 *
 * @param {number} userId
 * @returns {Promise<Array<POSeller>>}
 */
async function fetchFavSellers(userId) {
  return UsersAPI.fetchFavSellers(api, userId);
}

/**
 * createFavSite
 *
 * @param {number} userId
 * @param {number} siteId
 * @returns {Promise<boolean>}
 */
async function createFavSite(userId, siteId) {
  return UsersAPI.createFavSite(api, userId, siteId);
}

/**
 * delFavSite
 *
 * @param {number} userId
 * @param {number} siteId
 * @returns {Promise<boolean>}
 */
async function delFavSite(userId, siteId) {
  return UsersAPI.delFavSite(api, userId, siteId);
}

async function getCurrentAddress(id) {
  return api.get(`${router.users}/${id}/addresses`);
}

/**
 * fetchFavProducts
 *
 * @param {number} userId
 * @returns {Promise<Array<number>>}
 */
async function fetchFavProducts(userId) {
  return UsersAPI.fetchFavProducts(api, userId);
}

/**
 * createFavProduct
 *
 * @param {number} userId
 * @param {number} productId
 * @returns {Promise<boolean>}
 */
async function createFavProduct(userId, productId) {
  return UsersAPI.createFavProduct(api, userId, productId);
}

/**
 * delFavProduct
 *
 * @param {number} userId
 * @param {number} productId
 * @returns {Promise<boolean>}
 */
async function delFavProduct(userId, productId) {
  return UsersAPI.delFavProduct(api, userId, productId);
}

/**
 * Auth API
 */

async function logout() {
  return UsersAPI.logout(api);
}

/**
 * complete user registration to use this api
 *
 * body: {first_name, last_name, phone, password, sms_token}
 *
 * @param {object} body
 * @returns {Promise<ValidateTokenResponse>}
 */
async function registerPhoneConfirm(body) {
  return AuthAPI.registerPhoneConfirm(api, body);
}

/**
 * login
 * User Login with password and email
 *
 * @param {object} body
 * @returns {Promise<ValidateTokenResponse>}
 */
async function login(body) {
  return AuthAPI.login(api, body);
}

/**
 *
 * register User with social accounts
 *
 * @param {object} body
 * @returns {Promise<ValidateTokenResponse>}
 */
async function loginWithSocial(body) {
  return AuthAPI.loginWithSocial(api, body);
}

/**
 * registerPhone
 *
 * @param {string} email
 * @param {string} phone
 * @returns {Promise<boolean>}
 */
function registerPhone(email, phone) {
  return AuthAPI.registerPhone(api, { email, phone });
}

/**
 * register
 *
 * @param {object} body
 * @returns {Promise<ValidateTokenResponse>}
 */
async function register(body) {
  return AuthAPI.register(api, body);
}

/**
 * resend Token
 *
 * @param {string} phone
 * @returns {Promise<string>}
 */
async function resendToken(phone) {
  return AuthAPI.resendToken(api, { phone });
}

/**
 * Verify SMS code
 *
 * @param {string} phone
 * @param {string} token
 * @returns {Promise<ValidateTokenResponse>}
 */
function validateToken(phone, token) {
  return AuthAPI.validateToken(api, { phone, token });
}

/**
 * resetPassword
 *
 * @param {string} email
 * @returns {Promise<object>}
 */
function resetPassword(email) {
  return AuthAPI.resetPassword(api, email);
}

/**
 * verifyReset
 *
 * @param {object} request
 * @returns {Promise<object>}
 */
function verifyReset(request) {
  return AuthAPI.verifyReset(api, request);
}

// Products
/**
 * fetchSellerProducts
 *
 * @param {number} siteId
 * @returns {Promise<object>}
 */
function fetchSellerProducts(siteId) {
  return ProductsAPI.fetchSellerProducts(api, siteId);
}

/**
 * fetchAllergens
 *
 * @returns {Promise<[POAllergens]>}
 */
function fetchAllergens() {
  return ProductsAPI.fetchAllergens(api);
}

/**
 * fetchProduct
 *
 * @param {number} id
 * @returns {Promise<POProduct>}
 */
function fetchProduct(id) {
  return ProductsAPI.fetchProduct(api, id);
}

/**
 * fetchReviews
 *
 * @param id
 * @param {string} pageNumber
 * @returns {Promise<object>}
 */
async function fetchReviews(id, pageNumber) {
  return ProductsAPI.fetchReviews(api, id, pageNumber);
}

/**
 * createReview
 *
 * @param {number} sellerId
 * @param {object} body
 * @returns {Promise<POReview>}
 */
function createReview(sellerId, body) {
  return ProductsAPI.createReview(api, sellerId, body);
}

/**
 * updateReview
 *
 * @param {number} siteId
 * @param {number} reviewId
 * @param {object} body
 * @returns {Promise<POReview>}
 */
function updateReview(siteId, reviewId, body) {
  return ProductsAPI.updateReview(api, siteId, reviewId, body);
}

/**
 * deleteReview
 *
 * @param {number} siteId
 * @param {number} reviewId
 * @returns {Promise<boolean>}
 */
function deleteReview(siteId, reviewId) {
  return ProductsAPI.deleteReview(api, siteId, reviewId);
}

// User Payments

/**
 * createPayment
 *
 * @param {number} userId
 * @param {string} token
 * @returns {Promise<POPayment>}
 */
function createPayment(userId, token) {
  return PaymentAPI.createPayment(api, userId, token);
}

/**
 * fetchPayments
 *
 * @param {number} userId
 * @returns {Promise<object>}
 */

function fetchPayments(userId) {
  return PaymentAPI.fetchPayments(api, userId);
}

/**
 * updatePayment
 *
 * @param {number} userId
 * @param {number} paymentId
 * @param {string} token
 * @returns {Promise<boolean>}
 */
function updatePayment(userId, paymentId, token) {
  return PaymentAPI.updatePayment(api, userId, paymentId, token);
}

/**
 * deletePayment
 *
 * @param {number} userId
 * @param {number} paymentId
 * @returns {Promise<boolean>}
 */
function deletePayment(userId, paymentId) {
  return PaymentAPI.deletePayment(api, userId, paymentId);
}

// User Addresses

/**
 * createAddress
 *
 * @param {number} userId
 * @param {object} address
 * @returns {Promise<object>}
 */
function createAddress(userId, address) {
  return UserAddressAPI.createAddress(api, userId, address);
}

/**
 * fetchAddresses
 *
 * @param {number} userId
 * @returns {Promise<object>}
 */
function fetchAddresses(userId) {
  return UserAddressAPI.fetchAddresses(api, userId);
}

/**
 * updateAddress
 *
 * @param {number} userId
 * @param {number} addressId
 * @param {object} address
 * @returns {Promise<boolean>}
 */
function updateAddress(userId, addressId, address) {
  return UserAddressAPI.updateAddress(api, userId, addressId, address);
}

/**
 * deleteAddress
 *
 * @param {number} userId
 * @param {number} addressId
 * @returns {Promise<boolean>}
 */
function deleteAddress(userId, addressId) {
  return UserAddressAPI.deleteAddress(api, userId, addressId);
}

/**
 * createOrder
 *
 * @param {number} siteId
 * @returns {Promise<object>}
 */
function createOrder(siteId) {
  return OrdersAPI.createOrder(api, { site_id: siteId });
}

/**
 * updateOrder
 *
 * @param {number} orderId
 * @param {object} body
 * @returns {Promise<object>}
 */
function updateOrder(orderId, body) {
  return OrdersAPI.updateOrder(api, orderId, body);
}

/**
 * deleteOrder
 *
 * @param {number} orderId
 * @returns {Promise<object>}
 */
function deleteOrder(orderId) {
  return OrdersAPI.deleteOrder(api, orderId);
}

/**
 * fetchOrders
 *
 * @param {string} pageNumber
 * @param {string} params
 * @returns {Promise<object>}
 */
function fetchOrders(pageNumber = "1", params = "") {
  return OrdersAPI.fetchOrders(api, pageNumber, params);
}

/**
 * fetchActiveOrders
 * @param {string} postcode
 *
 * @returns {Promise<[POOrder]>}
 */
function fetchActiveOrders(postcode) {
  return OrdersAPI.fetchActiveOrders(api, postcode);
}

/**
 * addProductToOrder
 *
 * @param {number} orderId
 * @param {object} body
 * @returns {Promise<boolean>}
 */
function addProductToOrder(orderId, body) {
  return OrdersAPI.addProductToOrder(api, orderId, body);
}

/**
 * updateProductToOrder
 *
 * @param {number} orderId
 * @param {number} productId
 * @param {object} body
 * @returns {Promise<object>}
 */
function updateProductToOrder(orderId, productId, body) {
  return OrdersAPI.updateProductToOrder(api, orderId, productId, body);
}

/**
 * deleteProductFromOrder
 *
 * @param {number} orderId
 * @param {number} productId
 *
 * @returns {Promise<object>}
 */
function deleteProductFromOrder(orderId, productId) {
  return OrdersAPI.deleteProductFromOrder(api, orderId, productId);
}

/**
 * applyCoupon
 *
 * @param {number} orderId
 * @param {string} coupon
 * @returns {Promise<object>}
 */
function applyCoupon(orderId, coupon) {
  return OrdersAPI.applyCoupon(api, orderId, coupon);
}

/**
 * fetchOrder
 *
 * @param {number} id
 * @returns {Promise<POOrder>}
 */
function fetchOrder(id) {
  return OrdersAPI.fetchOrder(api, id);
}

/**
 * confirmOrder
 *
 * @param {number} id
 * @returns {Promise<object>}
 */
function confirmOrder(id) {
  return OrdersAPI.confirmOrder(api, id);
}

/**
 * fetchOrganisation
 *
 * @param {number} id
 * @returns {Promise<POOrganization>}
 */
function fetchOrganisation(id) {
  return AdminAPI.fetchOrganisation(api, id);
}

/**
 * submitOrganisation
 *
 * @param {number} id
 * @param {object} request
 * @returns {Promise<POOrganization>}
 */
function submitOrganisation(id, request) {
  return AdminAPI.submitOrganisation(api, id, request);
}

/**
 * fetchProductList
 *
 * @param {number} sellerId
 * @param {string} pageNumber
 * @param {string} queries
 * @returns {Promise<object>}
 */
function fetchProductList(sellerId, pageNumber, queries) {
  return AdminAPI.fetchProductList(api, sellerId, pageNumber, queries);
}

/**
 * fetchAdminOrders
 *
 * @param {number} sellerId
 * @param {string} pageNumber
 * @param {string} queries
 * @returns {Promise<object>}
 */
function fetchAdminOrders(sellerId, pageNumber, queries) {
  return AdminAPI.fetchAdminOrders(api, sellerId, pageNumber, queries);
}

/**
 * updateOrderStatus
 *
 * @param {number} sellerId
 * @param {number} orderId
 * @param {object} request
 * @returns {Promise<object>}
 */
function updateOrderStatus(sellerId, orderId, request) {
  return AdminAPI.updateOrderStatus(api, sellerId, orderId, request);
}

/**
 * fetchAdminUsers
 *
 * @param {number} orgId
 * @param {string} queries
 * @returns {Promise<object>}
 */
function fetchAdminUsers(orgId, queries) {
  return AdminAPI.fetchUsers(api, orgId, queries);
}

/**
 * fetchUser
 *
 * @param {number} orgId
 * @param {string} userId
 * @returns {Promise<object>}
 */
function fetchUser(orgId, userId) {
  return AdminAPI.fetchUser(api, orgId, userId);
}

/**
 * updateAdminUser
 *
 * @param {number} orgId
 * @param {number} userId
 * @param {object} request
 * @returns {Promise<object>}
 */
function updateAdminUser(orgId, userId, request) {
  return AdminAPI.updateAdminUser(api, orgId, userId, request);
}

/**
 * deleteOrgUser
 *
 * @param {number} orgId
 * @param {number} userId
 * @returns {Promise<object>}
 */
function deleteOrgUser(orgId, userId) {
  return AdminAPI.deleteOrgUser(api, orgId, userId);
}

/**
 * createProduct
 *
 * @param {number} sellerId
 * @param {number} productId
 * @param {object} request
 * @returns {Promise<POProduct>}
 */
function createProduct(sellerId, productId, request) {
  return AdminAPI.createProduct(api, sellerId, productId, request);
}

/**
 * fetchAdminProduct
 *
 * @param sellerId
 * @param productId
 * @returns {Promise<POProduct>}
 */
function fetchAdminProduct(sellerId, productId) {
  return AdminAPI.fetchProduct(api, sellerId, productId);
}

/**
 * updatePrices
 *
 * @param sellerId
 * @param request
 * @returns {Promise<object>}
 */
function updatePrices(sellerId, request) {
  return AdminAPI.updatePrices(api, sellerId, request);
}

/**
 * fetchPrices
 *
 * @param sellerId
 * @returns {Promise<object>}
 */
function fetchPrices(sellerId) {
  return AdminAPI.fetchPrices(api, sellerId);
}

/**
 * updateAdminProfile
 *
 * @param request
 * @returns {Promise<object>}
 */
function updateAdminProfile(request) {
  return AdminAPI.updateProfile(api, request);
}

/**
 * updateSeller
 *
 * @param sellerId
 * @param request
 * @returns {Promise<object>}
 */
function updateSeller(sellerId, request) {
  return AdminAPI.updateSeller(api, sellerId, request);
}

/**
 * fetchAdminSeller
 *
 * @param sellerId
 */
function fetchAdminSeller(sellerId) {
  return AdminAPI.fetchSeller(api, sellerId);
}

/**
 * fetchSellerType
 *
 * @returns {Promise<[POSellerType]>}
 */
function fetchSellerType() {
  return SellersAPI.fetchSellerType(api);
}

/**
 * fetchProductHeaders
 *
 * @param {string} sellerIndex
 * @returns {Promise<[POProductHeader]>}
 */
function fetchProductHeaders(sellerIndex) {
  return SellersAPI.fetchProductHeaders(api, sellerIndex);
}

/**
 * updateProductHeaders
 *
 * @param {string} sellerIndex
 * @param {object} body
 * @returns {Promise<[POProductHeader]>}
 */
function updateProductHeaders(sellerIndex, body) {
  return AdminAPI.updateProductHeaders(api, sellerIndex, body);
}

/**
 * createProductHeader
 *
 * @param {string} sellerIndex
 * @param {object} body
 * @returns {Promise<[POProductHeader]>}
 */
function createProductHeader(sellerIndex, body) {
  return SellersAPI.createProductHeader(api, sellerIndex, body);
}

/**
 * deleteProductHeader
 *
 * @param {string} sellerIndex
 * @param {number} headerId
 * @returns {Promise<[POProductHeader]>}
 */
function deleteProductHeader(sellerIndex, headerId) {
  return AdminAPI.deleteProductHeader(api, sellerIndex, headerId);
}

/**
 * onboardSeller
 *
 * @param {number} sellerId
 * @returns {Promise<object>}
 */
function onboardSeller(sellerId) {
  return AdminAPI.onboardSeller(api, sellerId);
}

/**
 * fetchAdminDiscounts
 *
 * @param {number} sellerId
 * @param {string} pageNumber
 * @param {string} queries
 * @returns {Promise<object>}
 */
function fetchAdminDiscounts(sellerId, pageNumber, queries = "") {
  return AdminAPI.fetchAdminDiscounts(api, sellerId, pageNumber, queries);
}

/**
 * createProduct
 *
 * @param {number} sellerId
 * @param {string} discountId
 * @param {object} request
 * @returns {Promise<object>}
 */
function createDiscount(sellerId, discountId, request) {
  return AdminAPI.createDiscount(api, sellerId, discountId, request);
}

/**
 * fetchAdminDiscount
 *
 * @param {number} sellerId
 * @param {string} discountId
 * @returns {Promise<PODiscount>}
 */
function fetchAdminDiscount(sellerId, discountId) {
  return AdminAPI.fetchAdminDiscount(api, sellerId, discountId);
}
