import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import WOWApp from "./wow/App";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import * as serviceWorker from "./serviceWorker";
import { isDev } from "./utils/DevDetect";
import AppTypes from "./common/AppTypes";

const setup = process.env.REACT_APP_SETUP ?? AppTypes.Default;

/**
 * TODO: After completing WOW and Recipes,
 *       move WOW and Recipes to the main route and remove here.
 */
if (setup === AppTypes.Default) {
  if (!isDev()) {
    console.log("Sentry init");
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      integrations: [new Integrations.BrowserTracing()],

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 0,
    });
  }

  ReactDOM.render(<App />, document.getElementById("root"));
} else {
  ReactDOM.render(<WOWApp />, document.getElementById("root"));
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();
