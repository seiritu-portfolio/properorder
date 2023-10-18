import React, { useEffect } from "react";
import "../Login/styles.scss";
import "../styles.scss";
import clsx from "clsx";
import POHeader from "../../../components/POHeader";
import POHeaderVariant from "../../../models/Enum/POHeaderVariant";
import Footer from "../../../components/POFooter";
import history from "../../../routes/history";
import VerificationInput from "react-otp-input";
import AlreadyHaveAccount from "../Register/AlreadyHaveAccount";
import GoBack from "./GoBack";
import APIManager from "../../../Network/APIManager";
import POSpinner from "../../../components/POSpinner";
import {
  storeUserToken,
  storeUserTokenTemporary,
} from "../../../services/HelperService";
import * as userActions from "../../../redux/UserSaga/actions";
import { connect } from "react-redux";
import HelperService from "../../../utils/HelperService";
import OtpInput from "../../../components/OtpInput";

function VerifyPhone(props) {
  const [resent, setResent] = React.useState(false);
  const [smsCode, setSmsCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const isSignUpStep = props?.location?.state?.isSignUp ?? false;
  const userDetails = props.location?.state?.userDetails;

  useEffect(() => {
    if (smsCode.length === 6) {
      handleSubmit();
    }
  }, [smsCode]);

  const handleSubmit = () => {
    if (userDetails != null) {
      setIsLoading(true);
      setError("");
      APIManager.validateToken(userDetails.phoneNumber, smsCode)
        .then((result) => {
          console.log(result);
          handleGetResult(result);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          setSmsCode("");
          HelperService.getFirstOTPInput().focus();
          setError(error);
        });
    }
  };

  const handleGetResult = (result) => {
    setIsLoading(false);
    if (isSignUpStep) {
      history.push({
        pathname: "/register",
        state: { userDetails: { ...userDetails, token: smsCode } },
      });
    } else {
      if (result.isValidToken()) {
        // GoTo SignUp Screen once the token validated only without access_token
        history.push({
          pathname: "/register",
          state: { userDetails: { ...userDetails, token: smsCode } },
        });
        // setError(
        //   "This account does not exist. Please sign up with your phone number"
        // );
      } else {
        // GoTo the Landing Screen with the given access_token
        storeUserToken(result);
        storeUserTokenTemporary(result);
        props.actions.updateUserToken(result);
        // props.actions.fetchUserData();
        if (result.isAdmin()) {
          history.push("/admin");
        } else {
          history.push("/");
        }
      }
    }
  };

  const handleResendCode = () => {
    if (userDetails != null) {
      setIsLoading(true);
      setError("");
      APIManager.resendToken(userDetails.phoneNumber)
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          setResent(true);
          setTimeout(() => setResent(false), 2000);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setError(err);
        });
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <POHeader variant={POHeaderVariant.auth} />
      <div className="bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-4 lg:px-8 mb-auto">
        <div className="px-2 w-full md:max-w-xl 2xl:max-w-2xl">
          <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignUpStep
              ? "Sign up to Proper Order"
              : "Log in to your account"}
          </h2>
          <GoBack onClick={() => history.goBack()} />
        </div>

        <div className="px-2 w-full md:max-w-xl 2xl:max-w-2xl">
          <div className="bg-white py-8 px-4 rectangle-container sm:px-10">
            {/*<div*/}
            {/*  className={clsx(*/}
            {/*    "flex flex-row items-center mb-8",*/}
            {/*    !isSignUpStep && "justify-center"*/}
            {/*  )}*/}
            {/*>*/}
            {/*  {isSignUpStep && <p className={"step-text mr-2"}>2</p>}*/}
            {/*  <h4 className="auth-register-sub-title">Verify phone number</h4>*/}
            {/*</div>*/}
            <div>
              <div className="flex justify-center">
                <OtpInput
                  value={smsCode}
                  onChange={(value) => setSmsCode(value)}
                  numInputs={6}
                  shouldAutoFocus={true}
                  separator={<span className={"ml-2"} />}
                  inputStyle={"character"}
                  focusStyle={"character--selected"}
                />
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  className="font-bold text-base text-po-yellowmedium hover:text-po-yellowdark"
                  onClick={handleResendCode}
                >
                  Resend code
                </button>
              </div>
              <div className="flex justify-center">
                {error !== "" && (
                  <p className={"po-validation-message ml-1"}>{error}</p>
                )}
                {resent && (
                  <p className={"verify-phone-number-resend ml-1"}>
                    The code was successfully resent.
                  </p>
                )}
              </div>
              {/*<div className="h-14 md:h-12 mt-8">*/}
              {/*  <AuthButton onClick={handleSubmit}>*/}
              {/*    {isSignUpStep ? "Continue" : "Submit"}*/}
              {/*  </AuthButton>*/}
              {/*</div>*/}
              {/*{isSignUpStep && <AlreadyHaveAccount />}*/}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-6">
        <Footer />
      </div>
      <POSpinner isLoading={isLoading} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateUserToken: (userToken) => {
      dispatch(userActions.updateUserToken(userToken));
    },
    fetchUserData: () => {
      dispatch(userActions.fetchUserData());
    },
  },
});

export default connect(null, mapDispatchToProps)(VerifyPhone);
