import { all, put, takeLatest } from "redux-saga/effects";
import * as actions from "./constants";

function* handleOpenDrawer(action) {
  yield put({ type: actions.SET_DRAWER, showDrawer: action.drawerType });
}

function* handleCloseDrawer() {
  yield put({ type: actions.SET_DRAWER, showDrawer: "" });
}

export default all([
  takeLatest(actions.OPEN_DRAWER, handleOpenDrawer),
  takeLatest(actions.CLOSE_DRAWER, handleCloseDrawer),
]);
