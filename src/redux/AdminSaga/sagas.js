import { all, call, put, select, takeLatest } from "redux-saga/effects";
import * as actions from "./constants";
import APIManager from "../../Network/APIManager";
import POFilterService from "../../services/POFilterService";
import SearchQueries from "../../utils/SearchQueries";

const getUser = (state) => state.User;
const getAdminData = (state) => state.Admin;

function* handleFetchAdminProducts({ request }) {
  const { reset = true, sellerIndex } = request;
  const searchQuery = new URLSearchParams(location.search);
  yield put({
    type: actions.START_FETCHING,
  });
  try {
    const AdminData = yield select(getAdminData);

    const { products, pagination } = yield call(
      APIManager.fetchProductList,
      sellerIndex,
      reset ? "1" : AdminData.productDetails.pageNumber,
      POFilterService.getPriceFilter({
        searchString: searchQuery.get("search"),
        status: searchQuery.get("status"),
      })
    );

    yield put({
      type: actions.UPDATE_ADMIN_PRODUCTS,
      productDetails: {
        products: reset
          ? products
          : [...AdminData.productDetails.products, ...products],
        pageNumber: pagination.getNextPagePath(),
        totalProducts: pagination.total ?? 0,
      },
    });
  } catch (error) {
    yield put({
      type: actions.UPDATE_ERROR,
      error,
    });
  }
}

function* handleUpdateAdminProducts({ products }) {
  try {
    const AdminData = yield select(getAdminData);

    yield put({
      type: actions.UPDATE_ADMIN_PRODUCTS,
      productDetails: {
        ...AdminData.productDetails,
        products,
      },
    });
  } catch (error) {
    yield put({
      type: actions.UPDATE_ERROR,
      error,
    });
  }
}

function* handleFetchAdminOrders({ request }) {
  const { reset = true, sellerIndex } = request;
  const searchQuery = new URLSearchParams(location.search);
  yield put({
    type: actions.START_FETCHING,
  });
  try {
    const AdminData = yield select(getAdminData);

    const { orders, pagination, orders_count } = yield call(
      APIManager.fetchAdminOrders,
      sellerIndex,
      reset ? "1" : AdminData.orderDetails.pageNumber,
      POFilterService.getOrderFilter(
        searchQuery.get(SearchQueries.classification) ?? "all",
        {
          searchString: searchQuery.get(SearchQueries.search),
          period: searchQuery.get(SearchQueries.period),
          customer: searchQuery.get(SearchQueries.customer),
          status: searchQuery.get(SearchQueries.status),
        }
      )
    );

    yield put({
      type: actions.UPDATE_ADMIN_ORDERS,
      orderDetails: {
        orders: reset ? orders : [...AdminData.orderDetails.orders, ...orders],
        ordersCounts: orders_count,
        pageNumber: pagination.getNextPagePath(),
        totalOrders: pagination.total ?? 0,
      },
    });
  } catch (error) {
    yield put({
      type: actions.UPDATE_ERROR,
      error,
    });
  }
}

function* handleUpdateAdminOrders({ orders }) {
  try {
    const AdminData = yield select(getAdminData);

    yield put({
      type: actions.UPDATE_ADMIN_ORDERS,
      orderDetails: {
        ...AdminData.orderDetails,
        orders: orders,
      },
    });
  } catch (error) {
    yield put({
      type: actions.UPDATE_ERROR,
      error,
    });
  }
}

export default all([
  takeLatest(actions.UPDATE_ADMIN_PRODUCTS_REQUEST, handleFetchAdminProducts),
  takeLatest(actions.UPDATE_ADMIN_ORDERS_REQUEST, handleFetchAdminOrders),
  takeLatest(actions.UPDATE_ONLY_ADMIN_ORDERS, handleUpdateAdminOrders),
  takeLatest(actions.UPDATE_ONLY_ADMIN_PRODUCTS, handleUpdateAdminProducts),
]);
