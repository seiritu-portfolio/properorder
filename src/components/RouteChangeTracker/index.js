import React from "react";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga4";

const RouteChangeTracker = ({ history }) => {
  history.listen((location, action) => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  });

  return <div />;
};

export default withRouter(RouteChangeTracker);
