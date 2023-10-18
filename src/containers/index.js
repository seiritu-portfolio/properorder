import React, { Component } from "react";
import { Redirect, Router, Switch } from "react-router-dom";
import { create } from "jss";
import MuiPickersUtilsProvider from "@material-ui/pickers/MuiPickersUtilsProvider";
import DateFnsUtils from "@date-io/date-fns";
import { jssPreset, StylesProvider, ThemeProvider } from "@material-ui/styles";
import RoutePublic from "../routes/RoutePublic";
import history from "../routes/history";
import Landing from "./Landing";
import { CssBaseline, Drawer } from "@material-ui/core";
import Home from "./Home";
import Seller from "./Seller";
import PersonalDetails from "../containers/Profile/PersonalDetails";
import DeliveryAddresses from "../containers/Profile/DeliveryAddresses";
import PaymentMethods from "../containers/Profile/PaymentMethods";
import MyOrders from "../containers/Profile/MyOrders";
import OrderDetails from "../containers/Profile/MyOrders/OrderDetails/OrderDetails";
import MyFavourites from "../containers/Profile/MyFavourites";
import { Login, Register, ResetPassword } from "./Auth";
import PhoneLogin from "./Auth/Login/PhoneLogin/PhoneLogin";
import VerifyPhone from "./Auth/Common/VerifyPhone";
import ProductDetails from "../containers/Product/ProductDetails";
import ProductAddedToOrder from "../containers/Product/ProductAddedToOrder";
import { connect } from "react-redux";
import * as rootActions from "../redux/RootSaga/actions";
import SideAppBar from "../components/SideAppBar";
import PODrawerType from "../models/Enum/PODrawerType";
import MyOrder from "../components/MyOrder";
import CheckOut from "./CheckOut";
import CheckOutConfirm from "./CheckOutConfirm";
import CreatePassword from "./Auth/Common/CreatePassword";
import Geocode from "react-geocode";
import { initModels } from "../models";
import { store } from "../redux/store";
import base64 from "base-64";
import RoutePrivate from "../routes/RoutePrivate";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Admin from "./Admin";
import ComingSoon from "./ComingSoon";
import PasswordLogin from "./Auth/Login/PasswordLogin";
import { getPrevPath, storePrevPath } from "../services/HelperService";
import StepFirst from "./Auth/Register/StepFirst";
import WorkWithUs from "./WorkWithUs";
import TermsAndConditions from "./TermsAndConditions";
import Cookies from "./Cookies";
import PrivacyPolicy from "./PrivacyPolicy";
import AboutProperOrder from "./HelpSupport/AboutProperOrder";
import SellersAndFees from "./HelpSupport/SellersAndFees";
import DeliveryAndCollection from "./HelpSupport/DeliveryAndCollection";
import QuestionsIssuesRefunds from "./HelpSupport/QuestionsIssuesRefunds";
import RouteChangeTracker from "../components/RouteChangeTracker";
import { EnableGA } from "../utils/DevDetect";
import FirebaseTokenProvider from "../components/FirebaseTokenProvider";
import Constants from "../config/Constants";
import AppTheme from "../common/AppTheme";
import NewLanding from "./NewLanding";

const stripePromise = loadStripe(
  `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
);

Geocode.setApiKey(base64.decode(process.env.REACT_APP_GOOGLE));
Geocode.setRegion("ie");

class ThemeApp extends Component {
  constructor(props, context) {
    super(props, context);

    initModels();
    this.jss = create({ plugins: [...jssPreset().plugins] });
    this.theme = AppTheme();
  }

  componentDidMount() {
    store.dispatch({ type: "StartUp/FetchInfo" });
    window.addEventListener("resize", () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

    history.listen((location) => {
      const { pathname } = location;
      if (pathname != null && !pathname.includes("/product-details")) {
        const prevPathName = getPrevPath();
        if (prevPathName !== pathname) {
          storePrevPath(pathname);
        }
      }
    });
  }

  render() {
    const {
      showDrawer,
      userToken,
      actions: { closeDrawer },
      readyToGo,
      user,
    } = this.props;

    if (!readyToGo) {
      return null;
    }

    if (userToken?.isAdmin() && user == null) {
      return null;
    }

    return (
      <StylesProvider jss={this.jss}>
        <ThemeProvider theme={this.theme}>
          <Elements stripe={stripePromise}>
            <CssBaseline />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Drawer
                anchor={"right"}
                open={showDrawer !== ""}
                onBackdropClick={() => closeDrawer()}
              >
                {showDrawer === PODrawerType.default ? (
                  <SideAppBar />
                ) : (
                  <MyOrder
                    isEditMode={showDrawer === PODrawerType.edit_order}
                  />
                )}
              </Drawer>
              <div className="flex flex-1">
                <Router history={history}>
                  <FirebaseTokenProvider>
                    <Switch>
                      <RoutePublic
                        path={"/landing"}
                        exact
                        component={Landing}
                      />
                      <RoutePublic
                        path={"/new-landing"}
                        exact
                        component={NewLanding}
                      />
                      <RoutePublic
                        path="/about-proper-order"
                        exact
                        component={AboutProperOrder}
                      />
                      <RoutePublic
                        path="/sellers-and-fees"
                        exact
                        component={SellersAndFees}
                      />
                      <RoutePublic
                        path="/delivery-and-collection"
                        exact
                        component={DeliveryAndCollection}
                      />
                      <RoutePublic
                        path="/questions-issues-refunds"
                        exact
                        component={QuestionsIssuesRefunds}
                      />
                      <RoutePublic path="/home" exact component={Home} />
                      <RoutePublic
                        path="/seller/:sellerId"
                        exact
                        component={Seller}
                      />
                      <RoutePublic
                        path="/product-details/:productId"
                        exact
                        component={ProductDetails}
                      />
                      <RoutePublic
                        path="/login"
                        authCheck={!!userToken}
                        exact
                        component={Login}
                      />
                      <RoutePublic
                        path="/register-first"
                        authCheck={!!userToken}
                        exact
                        component={StepFirst}
                      />
                      <RoutePublic
                        path="/login-with-phone"
                        authCheck={!!userToken}
                        exact
                        component={PhoneLogin}
                      />
                      <RoutePublic
                        path="/login-with-password"
                        authCheck={!!userToken}
                        exact
                        component={PasswordLogin}
                      />
                      <RoutePublic
                        path="/verify-phone-number"
                        authCheck={!!userToken}
                        exact
                        component={VerifyPhone}
                      />
                      <RoutePublic
                        path="/register"
                        authCheck={!!userToken}
                        exact
                        component={Register}
                      />
                      <RoutePublic
                        path="/reset-password/:token"
                        authCheck={!!userToken}
                        exact
                        component={CreatePassword}
                      />
                      <RoutePublic
                        path="/reset-password"
                        authCheck={!!userToken}
                        exact
                        component={ResetPassword}
                      />
                      <RoutePrivate
                        path="/personal-details"
                        isAuthenticated={!!userToken}
                        exact
                        component={PersonalDetails}
                      />
                      <RoutePrivate
                        isAuthenticated={!!userToken}
                        path="/delivery-addresses"
                        exact
                        component={DeliveryAddresses}
                      />
                      <RoutePrivate
                        isAuthenticated={!!userToken}
                        path="/payment-methods"
                        exact
                        component={PaymentMethods}
                      />
                      <RoutePublic
                        path="/my-orders"
                        exact
                        component={MyOrders}
                      />
                      <RoutePublic
                        path="/order"
                        exact
                        component={OrderDetails}
                      />
                      {/* Temporary hidden untill fixed: */}
                      <RoutePrivate
                        isAuthenticated={!!userToken}
                        path="/my-favourites"
                        exact
                        component={MyFavourites}
                      />

                      <RoutePublic
                        path="/checkout"
                        exact
                        component={CheckOut}
                      />
                      <RoutePrivate
                        isAuthenticated={!!userToken}
                        path="/checkout-confirm/:orderIds"
                        exact
                        component={CheckOutConfirm}
                      />
                      <RoutePublic
                        path="/product-confirm"
                        exact
                        component={ProductAddedToOrder}
                      />
                      <RoutePrivate
                        isAdmin={true}
                        isAuthenticated={!!userToken}
                        path="/admin/:orgId"
                        userToken={userToken}
                        component={Admin}
                      />
                      <RoutePublic
                        path="/coming-soon"
                        exact
                        component={ComingSoon}
                      />
                      <RoutePublic
                        path="/work-with-us"
                        exact
                        component={WorkWithUs}
                      />
                      <RoutePublic
                        path="/terms-and-conditions"
                        exact
                        component={TermsAndConditions}
                      />
                      <RoutePublic
                        path="/cookies-policy"
                        exact
                        component={Cookies}
                      />
                      <RoutePublic
                        path="/privacy-policy"
                        exact
                        component={PrivacyPolicy}
                      />
                      <Redirect
                        to={
                          userToken?.isAdmin()
                            ? `/admin/${
                                user?.sites == null
                                  ? -1
                                  : user?.sites[0]?.organisation?.id ?? -1
                              }`
                            : userToken == null
                            ? "/landing"
                            : window.sessionStorage.getItem(
                                Constants.SS_REDIRECT_AFTER_LOGIN
                              ) ?? "/home"
                        }
                      />
                    </Switch>
                  </FirebaseTokenProvider>
                  {EnableGA() && <RouteChangeTracker />}
                </Router>
              </div>
            </MuiPickersUtilsProvider>
          </Elements>
        </ThemeProvider>
      </StylesProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  showDrawer: state.Root.showDrawer,
  userToken: state.User.userToken,
  readyToGo: state.User.readyToGo,
  user: state.User.user,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    closeDrawer: () => {
      dispatch(rootActions.closeDrawer());
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeApp);
