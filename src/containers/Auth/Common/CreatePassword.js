import React, { Component } from "react";
import POHeader from "../../../components/POHeader";
import POHeaderVariant from "../../../models/Enum/POHeaderVariant";
import AuthButton from "../../../components/AuthButton";
import history from "../../../routes/history";
import AlreadyHaveAccount from "../Register/AlreadyHaveAccount";
import Footer from "../../../components/POFooter";
import PasswordInput from "./PasswordInput";
import BottomPara from "../ResetPassword/BottomPara";
import GoBack from "./GoBack";
import SimpleReactValidator from "simple-react-validator";
import POSpinner from "../../../components/POSpinner";
import APIManager from "../../../Network/APIManager";
import POAlert from "../../../components/POAlert";

export default class CreatePassword extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      password: "",
      confirmPassword: "",
      matchRequireVisible: false,
      alertInfo: { open: false },
    };

    this.isResetPassStep = props?.location?.state?.resetPassword ?? true;
    this.userDetails = props.location?.state?.userDetails;

    this.validator = new SimpleReactValidator();
  }

  handleSubmit = () => {
    const { password, confirmPassword } = this.state;
    if (this.validator.allValid()) {
      if (password !== confirmPassword) {
        this.setState({ matchRequireVisible: true });
        return;
      }
      if (this.isResetPassStep) {
        // history.push({
        //   pathname: "/login-with-password",
        //   state: { fromResetPassword: true },
        // });

        const searchStrings = this.props.location.search.split("=");
        let email = "";
        if (searchStrings.length > 1) {
          email = searchStrings[1];
        }
        const request = {
          token: this.props.match.params.token,
          password,
          email,
        };

        this.setState({ isLoading: true, error: "" });
        APIManager.verifyReset(request)
          .then((res) => {
            console.log(res);
            this.setState({
              isLoading: false,
              alertInfo: {
                open: true,
                message: "Password reset successfully!",
              },
            });
            setTimeout(() => {
              history.push("/login-with-password");
            }, 1000);
          })
          .catch((error) => {
            console.log(error);
            this.setState({ isLoading: false, error });
          });
      } else {
        this.handleSignUp(password);
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  handleSignUp = (password) => {
    const { firstName, lastName, phoneNumber, ...restDetails } =
      this.userDetails;
    this.setState({ isLoading: true, error: "" });
    APIManager.register({
      ...restDetails,
      password,
      first_name: firstName,
      last_name: lastName,
      phone: phoneNumber,
    })
      .then((res) => {
        console.log(res);
        this.setState({ isLoading: false });
        history.push("/login-with-password");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false, error });
      });
  };

  render() {
    const isResetPassStep = this.isResetPassStep;
    const { password, confirmPassword, matchRequireVisible, isLoading, error } =
      this.state;
    return (
      <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
        <POHeader variant={POHeaderVariant.auth} />
        <div className="bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-4 lg:px-8">
          <div className="px-2 w-full md:max-w-xl 2xl:max-w-2xl">
            <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">
              {isResetPassStep
                ? "Password reset"
                : "Create a new account - Step 2/2"}
            </h2>
            <GoBack
              onClick={() =>
                isResetPassStep
                  ? history.push("/login-with-password")
                  : history.goBack()
              }
              title={isResetPassStep ? "Back to login" : "Go back"}
            />
          </div>

          <div className="px-2 w-full md:max-w-xl 2xl:max-w-2xl">
            <div className="bg-white py-8 px-4 rectangle-container sm:px-10">
              <form>
                <div className={"flex flex-row space-x-3 items-center mb-4"}>
                  <p className={"step-text"}>{"2"}</p>
                  <p className={"auth-register-sub-title"}>Create a password</p>
                </div>
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
                <div className="h-14 md:h-12 mt-6">
                  <AuthButton onClick={this.handleSubmit}>
                    {isResetPassStep ? "Submit" : "Sign Up"}
                  </AuthButton>
                </div>
                {isResetPassStep ? <BottomPara /> : <AlreadyHaveAccount />}
              </form>
            </div>
          </div>
        </div>
        <div className="mt-auto pt-6">
          <Footer />
        </div>
        <POSpinner isLoading={isLoading} />
        <POAlert
          alertInfo={this.state.alertInfo}
          handleClose={() => this.setState({ alertInfo: { open: false } })}
        />
      </div>
    );
  }
}
