import React, { Component } from "react";
import "../styles.scss";
import "./styles.scss";
import AuthButton from "../../../components/AuthButton";
import POHeader from "../../../components/POHeader";
import POHeaderVariant from "../../../models/Enum/POHeaderVariant";
import Footer from "../../../components/POFooter";
import history from "../../../routes/history";
import EmailInput from "../Common/EmailInput";
import SimpleReactValidator from "simple-react-validator";
import POSpinner from "../../../components/POSpinner";
import POAlert from "../../../components/POAlert";

export default class StepFirst extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: "",
      isLoading: false,
      error: { open: false },
    };
    this.validator = new SimpleReactValidator();
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
    const { email, isLoading, error } = this.state;

    return (
      <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
        <POHeader variant={POHeaderVariant.auth} />
        <div className="bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-4 lg:px-8">
          <div className="px-2 w-full md:max-w-xl xl:max-w-2xl">
            <h2 className="mb-8 text-center text-3xl font-extrabold text-gray-900">
              Sign up to Proper Order
            </h2>
          </div>

          <div className={"flex flex-row w-full justify-center space-x-8"}>
            <div className="px-2 w-full md:max-w-xl 2xl:max-w-2xl">
              <div className="bg-white py-8 px-4 rectangle-container sm:px-10">
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

                  <div className={"flex justify-center"}>
                    <span className={"text-base text-po-black"}>
                      Already have an account?
                    </span>
                    <a
                      href={"/login-with-password"}
                      className={"no-underline auth-label-special ml-1"}
                    >
                      Log in here
                    </a>
                  </div>
                </form>
              </div>
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
