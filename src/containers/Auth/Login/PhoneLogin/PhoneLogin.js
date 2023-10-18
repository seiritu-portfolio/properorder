import React, { Component } from "react";
import "../styles.scss";
import "../../styles.scss";
import AuthButton from "../../../../components/AuthButton";
import POHeader from "../../../../components/POHeader";
import POHeaderVariant from "../../../../models/Enum/POHeaderVariant";
import Footer from "../../../../components/POFooter";
import history from "../../../../routes/history";
import PhoneInput from "../../Common/PhoneInput";
import GoBack from "../../Common/GoBack";
import SimpleReactValidator from "simple-react-validator";
import APIManager from "../../../../Network/APIManager";
import POSpinner from "../../../../components/POSpinner";
import POAlert from "../../../../components/POAlert";

export default class PhoneLogin extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      phoneNumber: "",
      isLoading: false,
      error: { open: false },
    };
    this.validator = new SimpleReactValidator();
  }

  handleContinue = () => {
    const email = this.props.location?.state?.email ?? "";
    const { phoneNumber } = this.state;
    if (this.validator.allValid()) {
      this.setState({ isLoading: true });
      APIManager.registerPhone(email, phoneNumber)
        .then((res) => {
          console.log(res);
          this.setState({ isLoading: false });
          history.push({
            pathname: "/verify-phone-number",
            state: {
              userDetails: { email, phoneNumber },
              isSignUp: true,
            },
          });
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

  render() {
    const { phoneNumber, isLoading, error } = this.state;
    return (
      <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
        <POHeader variant={POHeaderVariant.auth} />
        <div className="bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-4 lg:px-8">
          <div className="px-2  w-full md:max-w-xl 2xl:max-w-2xl">
            <h2 className="mb-5 text-center text-3xl font-extrabold text-gray-900">
              Sign up to Proper Order
            </h2>
            <GoBack onClick={() => history.goBack()} />
          </div>

          <div className="px-2  w-full md:max-w-xl 2xl:max-w-2xl">
            <div className="bg-white py-8 px-4 rectangle-container sm:px-10">
              {/*<h4 className="text-center text-bold mb-7 text-lg">*/}
              {/*  Enter your phone number*/}
              {/*</h4>*/}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  this.handleContinue();
                }}
              >
                {/*<EmailInput*/}
                {/*  value={email}*/}
                {/*  onChange={(e) => this.setState({ email: e.target.value })}*/}
                {/*/>*/}
                {/*{this.validator.message("email", email, "required|email")}*/}
                <PhoneInput
                  value={phoneNumber}
                  onChange={(e) =>
                    this.setState({ phoneNumber: e.target.value })
                  }
                />
                {this.validator.message("phone", phoneNumber, "required|phone")}
                <div className="h-14 mt-9">
                  <AuthButton onClick={this.handleContinue}>
                    Continue
                  </AuthButton>
                </div>
              </form>
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
