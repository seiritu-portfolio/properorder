import { all, call, put, takeLatest, select } from "redux-saga/effects";
import * as actions from "./constants";
import * as userActions from "./constants";
import APIManager from "../../Network/APIManager";
import {
  getLocalCart,
  getTempUserToken,
  removeLocalCart,
  removeTempUserToken,
  removeUserToken,
} from "../../services/HelperService";
import history from "../../routes/history";
import { POOrder } from "../../models";

const getUser = (state) => state.User;

function* handleFetchUserData(action) {
  try {
    // Active Orders
    yield put({
      type: userActions.USER_ACTIVE_ORDERS_REQUEST,
    });

    // User Orders
    yield put({
      type: userActions.USER_ORDERS_REQUEST,
    });

    const user = yield call(APIManager.getProfile);
    yield put({
      type: actions.USER_PROFILE_SUCCESS,
      user,
    });

    // Addresses
    yield put({
      type: userActions.USER_ADDRESSES_REQUEST,
      userId: user.id,
    });

    // Fav sellers
    yield put({
      type: userActions.FAVOURITE_SELLERS_REQUEST,
      userId: user.id,
    });

    // Fav products
    yield put({
      type: userActions.FAVOURITE_PRODUCTS_REQUEST,
      userId: user.id,
    });

    // Payments
    yield put({
      type: userActions.USER_PAYMENT_REQUEST,
      userId: user.id,
    });
  } catch (error) {
    yield put({
      type: actions.UPDATE_ERROR,
      error,
    });
  }

  yield put({
    type: userActions.UPDATE_USER_TOKEN_REQUEST,
    userToken: action.userToken,
    shouldGoCheckOut: action.shouldGoCheckOut,
  });

  // if (action.onResult) {
  //   action.onResult(action.userToken);
  // }
}

/**
 * handleFetchFavSellers
 */
function* handleFetchFavSellers(action) {
  yield put({
    type: actions.START_FETCHING,
  });
  try {
    const favSellers = yield call(APIManager.fetchFavSellers, action.userId);

    yield put({
      type: actions.FAVOURITE_SELLERS_SUCCESS,
      favSellers,
    });
  } catch (error) {
    yield put({
      type: actions.UPDATE_ERROR,
      error,
    });
  }
}

/**
 * handleFetchFavProducts
 */
function* handleFetchFavProducts(action) {
  yield put({
    type: actions.START_FETCHING,
  });
  try {
    const favProducts = yield call(APIManager.fetchFavProducts, action.userId);

    yield put({
      type: actions.FAVOURITE_PRODUCTS_SUCCESS,
      favProducts,
    });
  } catch (error) {
    yield put({
      type: actions.UPDATE_ERROR,
      error,
    });
  }
}

/**
 * handleFetchActiveOrders
 */
function* handleFetchActiveOrders() {
  const User = yield select(getUser);

  if (User.userToken == null) {
    const localCart = yield call(getLocalCart);
    let userActiveOrders = POOrder.generateFromLocal(localCart);
    yield put({
      type: actions.START_FETCHING,
    });

    try {
      for (const activeOrder of userActiveOrders) {
        if (activeOrder.products.length > 0) {
          const seller = yield call(
            APIManager.fetchSeller,
            activeOrder.site.id,
            User.currentLocation.postcode
          );
          userActiveOrders = userActiveOrders.map((v) =>
            v.site.id === seller.id
              ? POOrder.fromState({ ...v, site: seller })
              : v
          );
        }
      }
    } catch (error) {
      yield put({
        type: actions.UPDATE_ERROR,
        error,
      });
    }

    yield put({
      type: actions.UPDATE_USER_ACTIVE_ORDERS,
      userActiveOrders,
    });
    return;
  }

  yield put({
    type: actions.START_FETCHING,
  });
  try {
    const userActiveOrders = yield call(APIManager.fetchActiveOrders);

    if (getTempUserToken()) {
      yield put({
        type: actions.UPDATE_USER_ACTIVE_ORDERS,
        userActiveOrders,
      });
    }
  } catch (error) {
    yield put({
      type: actions.UPDATE_ERROR,
      error,
    });
  }
}

/**
 * handleFetchOrders
 */
function* handleFetchOrders() {
  yield put({
    type: actions.START_FETCHING,
  });
  try {
    const userOrders = yield call(APIManager.fetchOrders);

    yield put({
      type: actions.UPDATE_USER_ORDERS,
      userOrders,
    });
  } catch (error) {
    yield put({
      type: actions.UPDATE_ERROR,
      error,
    });
  }
}

/**
 * Fetch Profile
 */
function* handleGetProfile() {
  try {
    const user = yield call(APIManager.getProfile);

    yield put({
      type: actions.USER_PROFILE_SUCCESS,
      user,
    });
  } catch (error) {
    yield put({
      type: actions.USER_PROFILE_ERROR,
      error,
    });
  }
}

/**
 * Addresses
 */
function* handleGetAddresses(action) {
  yield put({
    type: actions.START_FETCHING,
  });
  try {
    const userAddresses = yield call(APIManager.fetchAddresses, action.userId);

    yield put({
      type: actions.USER_ADDRESSES_SUCCESS,
      userAddresses,
    });
  } catch (error) {
    yield put({
      type: actions.UPDATE_ERROR,
      error,
    });
  }
}

/**
 * Payments
 */
function* handleGetPayments(action) {
  yield put({
    type: actions.START_FETCHING,
  });
  try {
    const userPayments = yield call(APIManager.fetchPayments, action.userId);

    if (userPayments.length > 0) {
      yield put({
        type: actions.USER_PAYMENT_SUCCESS,
        userPayments,
      });
    }
  } catch (error) {
    yield put({
      type: actions.UPDATE_ERROR,
      error,
    });
  }
}

function* addProductToOrder(c, order) {
  for (let j = 0; j < c.products.length; j++) {
    const product = c.products[j];
    const body = {
      product_id: product.product.id,
      quantity: product.quantity,
      options: JSON.stringify(product.selectedOptions),
    };
    yield call(APIManager.addProductToOrder, order.id, body);
  }
}

function* startAddCart(c, order) {
  const product = c.products[0];
  if (order == null) {
    try {
      const result = yield call(
        APIManager.createOrder,
        product.product.site_id
      );
      yield call(addProductToOrder, c, result);
    } catch (e) {
      console.log(e);
    }
  } else {
    yield call(addProductToOrder, c, order);
  }
}

/**
 * handleUpdateUserToken
 *
 */
function* handleUpdateUserToken(action) {
  const localCart = yield call(getLocalCart);

  if (localCart.length > 0) {
    yield put({
      type: actions.START_FETCHING,
    });
    try {
      const orders = yield call(APIManager.fetchActiveOrders);

      for (let i = 0; i < localCart.length; i++) {
        const c = localCart[i];

        if (c.products?.length > 0) {
          const product = c.products[0];
          const existingOrders = orders.filter(
            (order) => order.site_id === product.product.site_id
          );
          if (existingOrders.length === 0) {
            yield call(startAddCart, c, null);
          } else {
            yield call(startAddCart, c, existingOrders[0]);
          }
        }
      }
    } catch (error) {
      console.log("handleUpdateUserToken error", error);
      yield put({
        type: actions.UPDATE_ERROR,
        error,
      });
    }
  }

  yield call(removeLocalCart);

  if (action.userToken) {
    try {
      const userActiveOrders = yield call(APIManager.fetchActiveOrders);

      yield put({
        type: actions.UPDATE_USER_ACTIVE_ORDERS,
        userActiveOrders,
      });
    } catch (error) {
      yield put({
        type: actions.UPDATE_ERROR,
        error,
      });
    }
  }

  yield put({
    type: userActions.UPDATE_USER_TOKEN,
    userToken: action.userToken,
  });

  if (action.shouldGoCheckOut) {
    history.push("/checkout");
  }

  // yield put({
  //   type: userActions.FETCH_USER_DATA,
  // });
}

function* handleFetchCategories() {
  try {
    const categories = yield call(APIManager.getTags);
    let allCategories = [];
    const specs = [
      "Meat",
      "Seafood",
      "Fruit & Veg",
      "Dairy & Eggs",
      "Bakery",
      "Treats",
      "Alcohol",
      "Beverages",
      "Cupboard",
      "Home Dining",
      "Deli",
      "Baby",
    ];
    for (const spec of specs) {
      const specCategory = categories.find((c) => c.name === spec);
      if (specCategory != null) {
        allCategories.push(specCategory);
      }
    }
    allCategories = [
      ...allCategories,
      // ...categories.filter((c) => !specs.includes(c.name)),
    ];

    const categoryRefactoring = (selCategories, step) => {
      if (selCategories == null || selCategories.length === 0) {
        return;
      }

      if (selCategories[step].children?.length > 0) {
        categoryRefactoring(selCategories[step].children, 0);
      }

      if (selCategories[step + 1] == null) {
        let newCategories;
        newCategories = selCategories.filter((v) => v.name !== "Other");
        newCategories = [
          ...newCategories,
          ...selCategories.filter((v) => v.name === "Other"),
        ];

        for (let i = 0; i < selCategories.length; i++) {
          selCategories[i] = newCategories[i];
        }
      } else {
        categoryRefactoring(selCategories, step + 1);
      }
    };

    // categoryRefactoring(allCategories, 0);

    yield put({
      type: actions.FETCH_CATEGORIES_SUCCESS,
      allCategories,
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * Log out
 */
function* logout() {
  try {
    yield call(APIManager.logout);

    yield put({
      type: actions.UPDATE_USER_ACTIVE_ORDERS,
      userActiveOrders: [],
    });
    yield put({
      type: actions.USER_PROFILE_SUCCESS,
      user: null,
    });
    yield put({
      type: actions.FAVOURITE_PRODUCTS_SUCCESS,
      favProducts: [],
    });
    yield put({
      type: actions.USER_ADDRESSES_SUCCESS,
      userAddresses: [],
    });

    removeUserToken();
    removeTempUserToken();
    yield put({
      type: actions.UPDATE_USER_TOKEN,
      userToken: null,
    });
    history.push("/home");
  } catch (error) {
    console.log("logout error -> ", error);
  }
}

export default all([
  takeLatest(actions.FETCH_USER_DATA, handleFetchUserData),
  takeLatest(actions.USER_PROFILE_REQUEST, handleGetProfile),
  takeLatest(actions.USER_ADDRESSES_REQUEST, handleGetAddresses),
  takeLatest(actions.USER_PAYMENT_REQUEST, handleGetPayments),
  takeLatest(actions.FAVOURITE_SELLERS_REQUEST, handleFetchFavSellers),
  takeLatest(actions.FAVOURITE_PRODUCTS_REQUEST, handleFetchFavProducts),
  takeLatest(actions.USER_ACTIVE_ORDERS_REQUEST, handleFetchActiveOrders),
  takeLatest(actions.USER_ORDERS_REQUEST, handleFetchOrders),
  takeLatest(actions.UPDATE_USER_TOKEN_REQUEST, handleUpdateUserToken),
  takeLatest(actions.FETCH_CATEGORIES, handleFetchCategories),
  takeLatest(actions.USER_LOG_OUT, logout),
]);
