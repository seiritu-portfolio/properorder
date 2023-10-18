import React, { Component } from "react";
import "./styles.scss";
import AuthButton from "../../../components/AuthButton";
import POHeader from "../../../components/POHeader";
import POHeaderVariant from "../../../models/Enum/POHeaderVariant";
import Footer from "../../../components/POFooter";
import NameInput from "../Common/NameInput";
import history from "../../../routes/history";
import SimpleReactValidator from "simple-react-validator";
import APIManager from "../../../Network/APIManager";
import POSpinner from "../../../components/POSpinner";
import { connect } from "react-redux";
import * as userActions from "../../../redux/UserSaga/actions";
import PasswordInput from "../Common/PasswordInput";
import GoBack from "../Common/GoBack";
import {
  storeUserToken,
  storeUserTokenTemporary,
} from "../../../services/HelperService";
import ReactGA from "react-ga4";
import { EnableGA } from "../../../utils/DevDetect";

class Register extends Component {
  constructor(props, context) {
    super(props, context);

    console.log(props.location?.state?.userDetails);
    this.state = {
      firstName: "",
      lastName: "",
      email: props.location?.state?.userDetails?.email ?? "",
      phoneNumber: props.location?.state?.userDetails?.phoneNumber ?? "",
      password: "",
      confirmPassword: "",
      matchRequireVisible: false,
      isLoading: false,
      error: "",
    };
    this.validator = new SimpleReactValidator();
  }

  componentDidMount() {
    this.props.actions.fetchActiveOrders();
  }

  handleContinue = () => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    } = this.state;

    if (password !== confirmPassword) {
      this.setState({ matchRequireVisible: true });
      return;
    }

    if (this.validator.allValid()) {
      this.setState({ isLoading: true });
      APIManager.registerPhoneConfirm({
        password,
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phoneNumber,
        token: this.props.location?.state?.userDetails?.token,
      })
        .then((res) => {
          console.log(res);
          this.setState({ isLoading: false });
          storeUserToken(res);
          storeUserTokenTemporary(res);
          // this.props.actions.updateUserToken(res);
          this.props.actions.fetchUserData(res);
          if (EnableGA()) {
            ReactGA.event({
              category: "User",
              action: "Created an Account",
              label: `${firstName} registered`,
            });
          }
          // if (res.isAdmin()) {
          //   history.push("/admin");
          // } else {
          //   history.push("/home");
          // }
        })
        .catch((error) => {
          console.log(error);
          this.setState({ isLoading: false, error });
        });
      // history.push({
      //   pathname: "/create-password",
      //   state: {
      //     userDetails: {
      //       firstName,
      //       lastName,
      //       email,
      //       phoneNumber,
      //       token: this.props.location?.state?.userDetails?.token,
      //     },
      //   },
      // });
      // this.setState({ isLoading: true, error: "" });
      // APIManager.registerPhone(email, phoneNumber)
      //   .then((res) => {
      //     console.log(res);
      //     this.setState({ isLoading: false });
      //     history.push({
      //       pathname: "/verify-phone-number",
      //       state: {
      //         isSignUp: true,
      //         userDetails: { firstName, lastName, email, phoneNumber },
      //       },
      //     });
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     this.setState({ isLoading: false, error });
      //   });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      isLoading,
      error,
      password,
      confirmPassword,
      matchRequireVisible,
    } = this.state;

    return (
      <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
        <POHeader variant={POHeaderVariant.auth} />
        <div className="bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-4 lg:px-8 mb-auto">
          <div className="px-2 w-full md:max-w-xl 2xl:max-w-2xl">
            <h2 className="mb-5 text-center text-3xl font-extrabold text-gray-900">
              Sign up to Proper Order
            </h2>
            <GoBack onClick={() => history.goBack()} />
          </div>

          <div className={"flex flex-row w-full justify-center space-x-4"}>
            <div className="px-2 w-full md:max-w-xl 2xl:max-w-2xl">
              <div className="bg-white py-8 px-4 rectangle-container sm:px-10">
                <form>
                  {/*<div className={"flex flex-row space-x-3 items-center mb-4"}>*/}
                  {/*  <p className={"step-text"}>1</p>*/}
                  {/*  <p className={"auth-register-sub-title"}>Personal info</p>*/}
                  {/*</div>*/}
                  <div className={"flex flex-row space-x-3 mb-3"}>
                    <div className={"flex-1"}>
                      <NameInput
                        id={"first-name"}
                        label={"First name"}
                        value={firstName}
                        onChange={(e) =>
                          this.setState({ firstName: e.target.value })
                        }
                      />
                      {this.validator.message(
                        "first name",
                        firstName,
                        "required"
                      )}
                    </div>
                    <div className={"flex-1"}>
                      <NameInput
                        id={"second-name"}
                        label={"Surname"}
                        value={lastName}
                        onChange={(e) =>
                          this.setState({ lastName: e.target.value })
                        }
                      />
                      {this.validator.message(
                        "last name",
                        lastName,
                        "required"
                      )}
                    </div>
                  </div>

                  {/*<EmailInput*/}
                  {/*  value={email}*/}
                  {/*  onChange={(e) => this.setState({ email: e.target.value })}*/}
                  {/*/>*/}
                  {/*{this.validator.message("email", email, "required|email")}*/}
                  {/*<PhoneInput*/}
                  {/*  value={phoneNumber}*/}
                  {/*  onChange={(e) =>*/}
                  {/*    this.setState({ phoneNumber: e.target.value })*/}
                  {/*  }*/}
                  {/*/>*/}
                  {/*{this.validator.message(*/}
                  {/*  "phone",*/}
                  {/*  phoneNumber,*/}
                  {/*  "required|phone"*/}
                  {/*)}*/}
                  <PasswordInput
                    value={password}
                    onChange={(e) =>
                      this.setState({
                        password: e.target.value,
                        matchRequireVisible: false,
                      })
                    }
                  />
                  {this.validator.message(
                    "password",
                    password,
                    "required|min:6|max:120"
                  )}
                  <PasswordInput
                    isConfirmPassword={true}
                    value={confirmPassword}
                    onChange={(e) =>
                      this.setState({
                        confirmPassword: e.target.value,
                        matchRequireVisible: false,
                      })
                    }
                  />
                  {this.validator.message(
                    "confirm password",
                    confirmPassword,
                    "required|min:6|max:120"
                  )}
                  {matchRequireVisible && (
                    <p className={"po-validation-message"}>
                      Passwords need to match
                    </p>
                  )}
                  {error !== "" && (
                    <p className={"po-validation-message"}>{error}</p>
                  )}
                  <div className="h-14 mt-6">
                    <AuthButton onClick={this.handleContinue}>
                      Sign up
                    </AuthButton>
                  </div>
                  {/*<AlreadyHaveAccount />*/}
                </form>
              </div>
            </div>
            {/*
            {this.props.userActiveOrders?.length > 0 && (
              <div className={"auth-order-summary-container"}>
                <OrderSummary justShow={true} />
              </div>
            )}
            */}
          </div>
        </div>
        <div className="mt-auto pt-6">
          <Footer />
        </div>
        <POSpinner isLoading={isLoading} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userActiveOrders: state.User.userActiveOrders,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchActiveOrders: () => {
      dispatch(userActions.fetchActiveOrders());
    },
    updateUserToken: (userToken) => {
      dispatch(userActions.updateUserToken(userToken));
    },
    fetchUserData: (userToken) => {
      dispatch(userActions.fetchUserData(userToken));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
