import React, { Component } from "react";
import "../styles.scss";
import { connect } from "react-redux";
import * as userActions from "../../../../redux/UserSaga/actions";
import { Button, Divider } from "@material-ui/core";
import AuthButton from "../../../../components/AuthButton";
import POHeader from "../../../../components/POHeader";
import POHeaderVariant from "../../../../models/Enum/POHeaderVariant";
import Footer from "../../../../components/POFooter";
import history from "../../../../routes/history";
import EmailInput from "../../Common/EmailInput";
import PasswordInput from "../../Common/PasswordInput";
import AuthCheckBox from "../../Common/AuthCheckBox";
import SimpleReactValidator from "simple-react-validator";
import APIManager from "../../../../Network/APIManager";
import POSpinner from "../../../../components/POSpinner";
import {
  storeUserToken,
  storeUserTokenTemporary,
} from "../../../../services/HelperService";
import POAlert from "../../../../components/POAlert";
import Constants from "../../../../config/Constants";

class PasswordLogin extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: "",
      password: "",
      isLoading: false,
      error: { open: false },
    };
    this.validator = new SimpleReactValidator();
  }

  handleLogin = () => {
    const { email, password } = this.state;
    if (this.validator.allValid()) {
      this.setState({ isLoading: true });
      APIManager.login({
        email,
        password,
        firebase_token: localStorage.getItem(Constants.AS_FIREBASE_PUSH_TOKEN),
      })
        .then((res) => {
          console.log(res);
          this.handleLoginSuccess(res);
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            isLoading: false,
            error: {
              open: true,
              message: error,
              severity: "warning",
            },
          });
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  handleLoginSuccess(res) {
    // Save token and go to the landing page
    if (this.authCheckBox.isChecked()) {
      storeUserToken(res);
    }
    storeUserTokenTemporary(res);
    this.props.actions.fetchUserData(
      res,
      this.onResult,
      this.props?.location?.state?.shouldGoCheckOut ?? false
    );
  }

  onResult(res) {
    // this.setState({ isLoading: false });
    // this.props.actions.updateUserToken(res);
    // if (res.isAdmin()) {
    //   history.push("/admin");
    // } else {
    //   if (this.props?.location?.state?.shouldGoCheckOut ?? false) {
    //     history.push("/checkout");
    //   } else {
    //     history.push("/");
    //   }
    // }
  }

  render() {
    const fromResetPassword =
      this.props?.location?.state?.fromResetPassword ?? false;
    const { email, password, isLoading, error } = this.state;

    return (
      <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
        <POHeader variant={POHeaderVariant.auth} />
        <div className="bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-4 lg:px-8">
          <div className="px-2 w-full md:max-w-xl xl:max-w-2xl">
            <h2 className="mb-5 text-center text-3xl font-extrabold text-gray-900">
              {fromResetPassword
                ? "Your password was successfully changed"
                : "Login to your account"}
            </h2>
          </div>

          <div className="px-2 w-full md:max-w-xl 2xl:max-w-2xl">
            <div className="bg-white py-8 px-4 rectangle-container sm:px-10">
              {fromResetPassword && (
                <p className={"text-lg font-bold w-full text-center mb-6"}>
                  You can now log in using your new password
                </p>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <EmailInput
                  value={email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                {this.validator.message("email", email, "required|email")}
                <PasswordInput
                  value={password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                {this.validator.message(
                  "password",
                  password,
                  "required|min:6|max:120"
                )}

                <div className="flex items-center justify-between">
                  <div className={"flex flex-row space-x-2 items-center mt-3"}>
                    <AuthCheckBox ref={(ref) => (this.authCheckBox = ref)} />
                    <p
                      className={"text-base text-po-black cursor-pointer"}
                      onClick={() => this.authCheckBox.handleClick()}
                    >
                      Remember me
                    </p>
                  </div>
                  {!fromResetPassword && (
                    <a
                      href={"/reset-password"}
                      className={"no-underline auth-label-special"}
                    >
                      Forgot your password?
                    </a>
                  )}
                </div>
                <div className="h-14 mt-6 lg:mt-8 mb-6 md:mb-4">
                  <AuthButton type={"submit"} onClick={this.handleLogin}>
                    Login
                  </AuthButton>
                </div>
                {!fromResetPassword && (
                  <div className={"flex justify-center"}>
                    <span className={"text-base text-po-black"}>
                      New to Proper Order?
                    </span>
                    <a
                      href={"/register-first"}
                      className={"no-underline auth-label-special ml-1"}
                    >
                      Create an account
                    </a>
                  </div>
                )}
              </form>
              {/*
              {!fromResetPassword && (
                <div className={"flex flex-row items-center mt-8"}>
                  <Divider className={"flex-1"} />
                  <span className={"login-with mx-4 text-sm"}>
                    Or login with
                  </span>
                  <Divider className={"flex-1"} />
                </div>
              )}

              {!fromResetPassword && (
                <div className="mt-6 h-14">
                  <Button
                    variant="outlined"
                    className={"h-14  w-full"}
                    classes={{ label: "font-semibold" }}
                    onClick={() => history.push("/login-with-phone")}
                  >
                    Phone Number
                  </Button>
                </div>
              )}
              */}
            </div>
          </div>
        </div>
        <div className="mt-auto pt-6">
          <Footer />
        </div>
        <POSpinner isLoading={isLoading} />
        <POAlert
          alertInfo={error}
          handleClose={() => this.setState({ error: { open: false } })}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateUserToken: (userToken) => {
      dispatch(userActions.updateUserToken(userToken));
    },
    fetchUserData: (userToken, onResult, shouldGoCheckOut) => {
      dispatch(
        userActions.fetchUserData(userToken, onResult, shouldGoCheckOut)
      );
    },
  },
});

export default connect(null, mapDispatchToProps)(PasswordLogin);
