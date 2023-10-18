import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./App.scss";
import ThemeApp from "./containers";
import { persistor, store } from "./redux/store";
import ReactGA from "react-ga4";
import { EnableGA } from "./utils/DevDetect";

if (EnableGA()) {
  console.log("ReactGA initialize");
  ReactGA.initialize(process.env.REACT_APP_TRACKING_ID);
}

window.Vapor = require("laravel-vapor");

function App() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeApp />
      </PersistGate>
    </Provider>
  );
}

export default App;
