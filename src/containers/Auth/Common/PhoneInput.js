import React, { Component } from "react";

export class PhoneInput extends Component {
  render() {
    return (
      <div className="mt-4 mb-1">
        <label
          htmlFor="phone"
          className="block text-base font-semibold text-po-black"
        >
          Phone number
        </label>
        <div className="mt-1">
          <input
            id="phone"
            name="phone"
            type="text"
            required
            className="auth-input appearance-none block w-full px-3 py-2 sm:text-sm"
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

export default PhoneInput;
