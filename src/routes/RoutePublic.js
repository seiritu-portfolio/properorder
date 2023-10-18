import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

const RoutePublic = ({ component: Component, authCheck, to, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authCheck ? <Redirect to={to} /> : <Component {...props} />
    }
  />
);

RoutePublic.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  authCheck: PropTypes.bool,
  to: PropTypes.string,
};

RoutePublic.defaultProps = {
  authCheck: false,
  to: "/",
};

export default RoutePublic;
