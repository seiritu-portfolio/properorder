import React, { Component } from "react";

export class EmailInput extends Component {
  render() {
    return (
      <div>
        <label
          htmlFor="email"
          className="block text-base font-semibold text-po-black"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            required
            className="auth-input appearance-none block w-full px-3 py-2 sm:text-sm"
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

export default EmailInput;
