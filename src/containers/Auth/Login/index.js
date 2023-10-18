import React, { Component } from "react";
import "../styles.scss";
import "./styles.scss";
import { connect } from "react-redux";
import * as userActions from "../../../redux/UserSaga/actions";
import AuthButton from "../../../components/AuthButton";
import POHeader from "../../../components/POHeader";
import POHeaderVariant from "../../../models/Enum/POHeaderVariant";
import Footer from "../../../components/POFooter";
import history from "../../../routes/history";
import EmailInput from "../Common/EmailInput";
import SimpleReactValidator from "simple-react-validator";
import POSpinner from "../../../components/POSpinner";
import POAlert from "../../../components/POAlert";
import OrderSummary from "../../CheckOut/OrderSummary/OrderSummary";

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: "",
      isLoading: false,
      error: { open: false },
    };
    this.validator = new SimpleReactValidator();
  }

  componentDidMount() {
    this.props.actions.fetchActiveOrders();
  }

  handleContinue = () => {
    const { email } = this.state;
    if (this.validator.allValid()) {
      history.push({
        pathname: "/login-with-phone",
        state: { email },
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const fromResetPassword =
      this.props?.location?.state?.fromResetPassword ?? false;
    const { email, isLoading, error } = this.state;

    return (
      <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
        <POHeader variant={POHeaderVariant.auth} />
        <div className="bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-4 lg:px-8">
          <div className="px-2 w-full md:max-w-xl xl:max-w-2xl">
            <h2 className="mb-8 text-center text-3xl font-extrabold text-gray-900">
              {fromResetPassword
                ? "Your password was successfully changed"
                : "Sign up or log in"}
            </h2>
          </div>

          <div className={"flex flex-row w-full justify-center space-x-8"}>
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
                    this.handleContinue();
                  }}
                >
                  <EmailInput
                    value={email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                  {this.validator.message("email", email, "required|email")}
                  <div className="h-14 mt-6 mb-6 md:mb-4">
                    <AuthButton onClick={this.handleContinue}>
                      Continue
                    </AuthButton>
                  </div>
                </form>
              </div>
            </div>
            {/* 
            {!fromResetPassword && this.props.userActiveOrders?.length > 0 && (
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
        <POAlert
          alertInfo={error}
          handleClose={() => this.setState({ error: { open: false } })}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userActiveOrders: state.User.userActiveOrders,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateUserToken: (userToken) => {
      dispatch(userActions.updateUserToken(userToken));
    },
    fetchUserData: () => {
      dispatch(userActions.fetchUserData());
    },
    fetchActiveOrders: () => {
      dispatch(userActions.fetchActiveOrders());
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
