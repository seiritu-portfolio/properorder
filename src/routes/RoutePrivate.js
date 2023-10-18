import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

function RoutePrivate({
  component: Component,
  isAdmin,
  to,
  userToken,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const isAuthenticated = !!userToken;
        const renderRedirect = () => (
          <Redirect
            to={{
              pathname: to,
              state: { redirect: props.location.pathname, isAuthenticated },
            }}
          />
        );

        if (!isAuthenticated) {
          return renderRedirect();
        }

        if (isAdmin && !userToken.isAdmin()) {
          return renderRedirect();
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
}

const mapStateToProps = (state) => ({
  userToken: state.User.userToken,
});

RoutePrivate.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool,
  location: PropTypes.object,
  to: PropTypes.string,
  userToken: PropTypes.object,
};

RoutePrivate.defaultProps = {
  to: "/",
  isAdmin: false,
};

export default connect(mapStateToProps, null)(RoutePrivate);
