import * as actions from "./constants";

export const openDrawer = (drawerType) => ({
  type: actions.OPEN_DRAWER,
  drawerType,
});

export const closeDrawer = () => ({
  type: actions.CLOSE_DRAWER,
});
