import { ValidateTokenResponse } from "../../models";
import ResponseCallback from "../ResponseCallback";
import { router } from "../URLProvider";

/**
 * registerPhone
 * @param {ApisauceInstance} api
 * @param {object} request
 * @returns {Promise<boolean>}
 */
async function registerPhone(api, request) {
  const apiCall = api.post(router.register_phone, request);
  return ResponseCallback.onResponse(apiCall).then((_) => true);
}

/**
 * register
 *
 * @param {ApisauceInstance} api
 * @param {object} request
 * @returns {Promise<ValidateTokenResponse>}
 */
async function register(api, request) {
  const apiCall = api.post(router.register, request);
  return ResponseCallback.onResponse(apiCall).then((result) =>
    ValidateTokenResponse.fromState(result)
  );
}

/**
 * Register User
 *
 * @param {ApisauceInstance} api
 * @param {object} request
 * @returns {Promise<ValidateTokenResponse>}
 */
async function registerPhoneConfirm(api, request) {
  const apiCall = api.post(router.register_phone_confirm, request);
  return ResponseCallback.onResponse(apiCall).then((result) =>
    ValidateTokenResponse.fromState(result)
  );
}

/**
 * login
 * login with email and password
 *
 * @param {ApisauceInstance} api
 * @param {object} body
 * @returns {Promise<ValidateTokenResponse>}
 */
async function login(api, body) {
  const apiCall = api.post(router.login, body);
  return ResponseCallback.onResponse(apiCall).then((result) =>
    ValidateTokenResponse.fromState(result)
  );
}

/**
 * login with social accounts
 *
 * @param {ApisauceInstance} api
 * @param {object} request
 * @returns {Promise<ValidateTokenResponse>}
 */
async function loginWithSocial(api, request) {
  const apiCall = api.post(router.register_social, request);
  return ResponseCallback.onResponse(apiCall).then((result) =>
    ValidateTokenResponse.fromState(result)
  );
}

/**
 * Verify SMS code
 *
 * @param {ApisauceInstance} api
 * @param {object} request
 * @returns {Promise<ValidateTokenResponse>}
 */
async function validateToken(api, request) {
  const apiCall = api.post(router.validate_token, request);
  return ResponseCallback.onResponse(apiCall).then((result) =>
    ValidateTokenResponse.fromState(result)
  );
}

/**
 * Resend Token
 *
 * @param {ApisauceInstance} api
 * @param {object} request
 * @returns {Promise<string>}
 */
async function resendToken(api, request) {
  const apiCall = api.post(router.resend, request);
  return ResponseCallback.onResponse(apiCall).then(
    (result) => result.message ?? "Success"
  );
}

/**
 * resetPassword
 *
 * @param {ApisauceInstance} api
 * @param {string} email
 * @returns {Promise<object>}
 */
async function resetPassword(api, email) {
  const apiCall = api.post(router.resetPassword, { email });
  return ResponseCallback.onResponse(apiCall);
}

/**
 * verifyReset
 *
 * @param {ApisauceInstance} api
 * @param {object} request
 * @returns {Promise<object>}
 */
async function verifyReset(api, request) {
  const apiCall = api.post(router.verifyReset, request);
  return ResponseCallback.onResponse(apiCall);
}

export default {
  login,
  register,
  registerPhone,
  resetPassword,
  verifyReset,
  validateToken,
  resendToken,
  registerPhoneConfirm,
  loginWithSocial,
};
