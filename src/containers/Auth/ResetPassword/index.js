import React, { Component } from "react";
import POHeader from "../../../components/POHeader";
import POHeaderVariant from "../../../models/Enum/POHeaderVariant";
import EmailInput from "../Common/EmailInput";
import AuthButton from "../../../components/AuthButton";
import Footer from "../../../components/POFooter";
import BottomPara from "./BottomPara";
import history from "../../../routes/history";
import GoBack from "../Common/GoBack";
import SimpleReactValidator from "simple-react-validator";
import APIManager from "../../../Network/APIManager";
import POAlert from "../../../components/POAlert";
import POSpinner from "../../../components/POSpinner";

export default class ResetPassword extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: "",
      isLoading: false,
      alertInfo: { open: false },
    };

    this.validator = new SimpleReactValidator();
  }

  handleSubmit = () => {
    if (this.validator.allValid()) {
      this.setState({ isLoading: true });
      APIManager.resetPassword(this.state.email)
        .then((res) => {
          console.log(res);
          if (res.message === "Password reset email sent.") {
            this.setState({
              isLoading: false,
              alertInfo: {
                open: true,
                message: "We have emailed you a password reset link",
              },
            });
            setTimeout(() => {
              history.push("login-with-password");
            }, 1000);
          } else {
            this.setState({
              isLoading: false,
              alertInfo: {
                open: true,
                message: res.message,
                severity: "warning",
              },
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            isLoading: false,
            alertInfo: {
              open: true,
              message: error,
              severity: "warning",
            },
          });
        });

      // history.push({
      //   pathname: "/create-password",
      //   state: {
      //     resetPassword: true,
      //     userDetails: { email: this.state.email },
      //   },
      // });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const { email } = this.state;
    return (
      <div className="flex-1 flex flex-col bg-gray-50 min-h-screen bg-gray-50">
        <POHeader variant={POHeaderVariant.auth} />
        <div className="bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-4 lg:px-8">
          <div className="px-2 w-full md:max-w-xl 2xl:max-w-2xl">
            <h2 className="mb-5 text-center text-3xl font-extrabold text-gray-900">
              Password reset
            </h2>
            <GoBack
              onClick={() => history.push("/login-with-password")}
              title={"Back to login"}
            />
          </div>

          <div className="px-2 w-full md:max-w-xl 2xl:max-w-2xl">
            <div className="bg-white py-8 px-4 rectangle-container sm:px-10">
              <form>
                <p className={"text-2xl font-semibold w-full text-center"}>
                  Forgotten your password?
                </p>
                <div
                  className={"flex flex-row space-x-3 items-center mt-6 mb-8"}
                >
                  <p className={"step-text"}>1</p>
                  <p className={"text-base flex-1"}>
                    Enter your email you use to sign in to Proper Order account
                  </p>
                </div>
                <EmailInput
                  value={email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                {this.validator.message("email", email, "required|email")}
                <div className="h-14 mt-8">
                  <AuthButton onClick={this.handleSubmit}>
                    Reset my password
                  </AuthButton>
                </div>
                <BottomPara />
              </form>
            </div>
          </div>
        </div>
        <div className="mt-auto pt-6">
          <Footer />
        </div>
        <POAlert
          alertInfo={this.state.alertInfo}
          handleClose={() => this.setState({ alertInfo: { open: false } })}
        />
        <POSpinner isLoading={this.state.isLoading} />
      </div>
    );
  }
}
