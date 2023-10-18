import { combineReducers } from "redux";
import UserReducer from "./UserSaga/reducers";
import RootReducer from "./RootSaga/reducers";
import AdminReducer from "./AdminSaga/reducers";

export const combinedReducers = combineReducers({
  User: UserReducer,
  Root: RootReducer,
  Admin: AdminReducer,
});
