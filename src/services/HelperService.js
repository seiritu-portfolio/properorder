import Constants from "../config/Constants";

/**
 * Store userToken
 *
 * @param {object} userToken
 */
export const storeUserToken = (userToken) => {
  try {
    localStorage.setItem(Constants.AS_USER_TOKEN, JSON.stringify(userToken));
  } catch (error) {
    console.log(error);
  }
};

/**
 * Store userToken to localStorage temporary
 *
 * @param {object} userToken
 */
export const storeUserTokenTemporary = (userToken) => {
  try {
    localStorage.setItem(
      Constants.AS_USER_TOKEN_TEMP,
      JSON.stringify(userToken)
    );
  } catch (error) {
    console.log(error);
  }
};

/**
 * Fetch userToken from LocalStorage
 *
 * @returns {object}
 */
export function getUserToken() {
  const token = localStorage.getItem(Constants.AS_USER_TOKEN);
  if (token == null) {
    return null;
  }
  return JSON.parse(token);
}

/**
 * Fetch the temp userToken from LocalStorage
 *
 * @returns {object}
 */
export function getTempUserToken() {
  const token = localStorage.getItem(Constants.AS_USER_TOKEN_TEMP);
  if (token == null) {
    return null;
  }
  return JSON.parse(token);
}

/**
 * Remove userToken from LocalStorage
 *
 * @returns {object}
 */
export function removeUserToken() {
  localStorage.removeItem(Constants.AS_USER_TOKEN);
}

/**
 * Remove temp userToken from LocalStorage
 *
 * @returns {object}
 */
export function removeTempUserToken() {
  localStorage.removeItem(Constants.AS_USER_TOKEN_TEMP);
}

/**
 * storeLocalCart
 *
 * @param {object} cart
 */
export const storeLocalCart = (cart) => {
  try {
    localStorage.setItem(Constants.AS_LOCAL_CART, JSON.stringify(cart));
  } catch (error) {
    console.log(error);
  }
};

/**
 * getLocalCart
 *
 * @returns {object}
 */
export function getLocalCart() {
  const localCart = localStorage.getItem(Constants.AS_LOCAL_CART);
  if (localCart == null) {
    return [];
  }
  return JSON.parse(localCart);
}

/**
 * removeLocalCart
 *
 * @returns {object}
 */
export function removeLocalCart() {
  localStorage.removeItem(Constants.AS_LOCAL_CART);
}

/**
 * storePrevPath
 *
 * @param {object} cart
 */
export const storePrevPath = (pathname) => {
  try {
    localStorage.setItem(Constants.AS_PREV_PATHNAME, pathname);
  } catch (error) {
    console.log(error);
  }
};

/**
 * getPrevPath
 *
 * @returns {object}
 */
export function getPrevPath() {
  return localStorage.getItem(Constants.AS_PREV_PATHNAME);
}

/**
 * storeAgeStatus
 *
 * @param {string} age
 */
export const storeAgeStatus = (age) => {
  try {
    localStorage.setItem(Constants.AS_AGE_STORE, age);
  } catch (error) {
    console.log(error);
  }
};

/**
 * getStoredAgeStatus
 *
 * @returns {object}
 */
export function getStoredAgeStatus() {
  return localStorage.getItem(Constants.AS_AGE_STORE);
}
