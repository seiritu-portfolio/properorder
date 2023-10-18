import React, { useEffect } from "react";
import "./styles.scss";
import Logo from "../Logo";
import { Button, Divider } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import * as rootActions from "../../redux/RootSaga/actions";
import { connect } from "react-redux";
import history from "../../routes/history";
import { ReactSVG } from "react-svg";
import NestedList from "../NestedList";
import logoutIcon from "../../assets/Logout.svg";
import clsx from "clsx";
import * as userActions from "../../redux/UserSaga/actions";
import sideItems from "./sideItems";

function SideAppBar(props) {
  const { userToken, user } = props;
  const { closeDrawer } = props.actions;

  useEffect(() => {
    if (userToken) {
      props.actions.fetchOrders();
    }
  }, [userToken]);

  const navigateTo = (path) => {
    closeDrawer();
    history.push(`/${path}`);
  };

  const handleLogout = () => {
    closeDrawer();
    props.actions.logout();
  };

  const renderItem = (item, onClick) => {
    if (item.title === "My orders" && props.userOrders.length === 0) {
      return null;
    }

    return (
      <button
        key={item.title}
        className={clsx(
          "flex flex-row space-x-2 ml-5 items-center flex-1 my-3",
          !userToken && "mb-8"
        )}
        onClick={() => {
          if (onClick == null) {
            return;
          }
          closeDrawer();
          onClick();
        }}
      >
        <div className={"h-6 w-6 items-center justify-center flex"}>
          <ReactSVG src={item.icon} />
        </div>
        <span className={"item-title ml-1"}>{item.title}</span>
      </button>
    );
  };

  return (
    <div className={"app-side-bar"}>
      <div className={"flex flex-row justify-between items-end pb-3"}>
        <Logo special />
        <Close
          className={"mb-2 mr-3 cursor-pointer"}
          color={"secondary"}
          onClick={() => closeDrawer()}
        />
      </div>
      <Divider />
      {!userToken && (
        <div className="flex h-11 mt-8 space-x-0.5 relative ml-9">
          <Button
            variant="contained"
            color="primary"
            className="button h-11"
            onClick={() => navigateTo("login-with-password")}
            style={{ border: "1px solid #FFAA13", fontSize: "1.1rem" }}
          >
            Log in
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="button h-11"
            onClick={() => navigateTo("register-first")}
            style={{ fontSize: "1.1rem" }}
          >
            Sign up
          </Button>
          <div className="rounded-full h-7 w-7 flex items-center justify-center absolute or bg-white shadow-lg">
            or
          </div>
        </div>
      )}

      {userToken ? (
        <div className={"px-4 mt-6 ml-5"}>
          <p className="item-title tracking-wide">Hi, {user?.first_name}!</p>
        </div>
      ) : null}

      <ul className={"px-4 mt-4"}>
        {sideItems.map((item) =>
          item.child ? (
            userToken ? (
              <NestedList
                key={item.title}
                renderTitle={() => renderItem(item)}
                renderContent={() => (
                  <div className={"ml-4 mr-5 relative space-y-6 mb-2"}>
                    {item.child.map((ci) => renderItem(ci, ci.action))}
                  </div>
                )}
              />
            ) : null
          ) : (
            renderItem(item, item.action)
          )
        )}
      </ul>
      {userToken && (
        <button
          className={"flex flex-row space-x-2 ml-9 items-center flex-1 my-3"}
          onClick={handleLogout}
        >
          <ReactSVG src={logoutIcon} />
          <span className={"item-title item-title__logout"}>Log out</span>
        </button>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  userToken: state.User.userToken,
  userOrders: state.User.userOrders,
  user: state.User.user,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchOrders: () => {
      dispatch(userActions.fetchOrders());
    },
    closeDrawer: () => {
      dispatch(rootActions.closeDrawer());
    },
    logout: () => {
      dispatch(userActions.logout());
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SideAppBar);
