import React, { Component } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export class PasswordInput extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
    };
  }

  render() {
    const { show } = this.state;
    const { isConfirmPassword = false } = this.props;
    let id = "password";
    if (isConfirmPassword) {
      id = "confirm_password";
    }
    return (
      <div className="mt-4 mb-1">
        <label
          htmlFor={id}
          className="block text-base font-semibold text-po-black"
        >
          {isConfirmPassword && "Confirm "}Password
        </label>
        <div className="mt-1 relative">
          <input
            id={id}
            name={id}
            type={show ? "text" : "password"}
            required
            className="auth-input appearance-none block w-full sm:text-sm"
            {...this.props}
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-xl leading-5"
            onClick={() => this.setState({ show: !show })}
          >
            {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordInput;
