import { put } from "redux-saga/effects";
import * as userActions from "./UserSaga/constants";
import * as actions from "./UserSaga/constants";
import {
  getUserToken,
  removeTempUserToken,
  storeUserTokenTemporary,
} from "../services/HelperService";
import { ValidateTokenResponse } from "../models";
import Constants from "../config/Constants";

export function* fetchInfoSaga() {
  let userToken = getUserToken();
  if (userToken != null) {
    userToken = ValidateTokenResponse.fromState(userToken);
  }
  console.log("fetchInfoSaga: ", userToken);

  const currentLocation = localStorage.getItem(Constants.SS_CURRENT_LOCATION);

  if (currentLocation != null) {
    yield put({
      type: actions.USER_UPDATE_LOCATION,
      ...JSON.parse(currentLocation),
    });
  }

  yield put({
    type: actions.FETCH_CATEGORIES,
  });

  if (userToken != null) {
    storeUserTokenTemporary(userToken);
    yield put({
      type: actions.FETCH_USER_DATA,
      userToken,
    });
  } else {
    removeTempUserToken();
    yield put({
      type: actions.USER_ACTIVE_ORDERS_REQUEST,
    });
    yield put({
      type: userActions.UPDATE_USER_TOKEN,
      userToken,
    });
  }
}
