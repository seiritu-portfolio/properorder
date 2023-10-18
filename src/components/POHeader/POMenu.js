import React from "react";
import "./styles.scss";
import DarkMenu from "../../assets/menu.svg";
import whiteMenu from "../../assets/menu_white.svg";
import { ReactSVG } from "react-svg";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as rootActions from "../../redux/RootSaga/actions";
import { connect } from "react-redux";
import PODrawerType from "../../models/Enum/PODrawerType";

function POMenu(props) {
  const {
    className,
    isWhite = false,
    actions: { openDrawer },
  } = props;
  return (
    <ReactSVG
      src={isWhite ? whiteMenu : DarkMenu}
      className={clsx("menu-icon cursor-pointer", className)}
      onClick={() => openDrawer(PODrawerType.default)}
    />
  );
}

const mapDispatchToProps = (dispatch) => ({
  actions: {
    openDrawer: (drawerType) => {
      dispatch(rootActions.openDrawer(drawerType));
    },
  },
});
export default connect(null, mapDispatchToProps)(POMenu);

POMenu.propTypes = {
  className: PropTypes.string,
  isWhite: PropTypes.bool,
  actions: PropTypes.object,
};
