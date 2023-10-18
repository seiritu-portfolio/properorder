import { all, takeLatest } from "redux-saga/effects";
import UserSaga from "./UserSaga/sagas";
import RootSaga from "./RootSaga/sagas";
import AdminSaga from "./AdminSaga/sagas";
import { fetchInfoSaga } from "./startupSaga";

export function* mainSaga() {
  yield all([
    takeLatest("StartUp/FetchInfo", fetchInfoSaga),
    UserSaga,
    RootSaga,
    AdminSaga,
  ]);
}
