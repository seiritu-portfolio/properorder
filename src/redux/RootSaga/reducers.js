import * as actions from "./constants";

const initialState = {
  showDrawer: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_DRAWER:
      return {
        ...state,
        showDrawer: action.showDrawer,
      };
    default:
      return { ...state };
  }
};
