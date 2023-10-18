import React, { Component } from "react";

class NameInput extends Component {
  render() {
    const { id, label } = this.props;
    return (
      <div className="mt-4 mb-1">
        <label
          htmlFor={id}
          className="block text-base font-semibold text-po-black"
        >
          {label}
        </label>
        <div className="mt-1">
          <input
            id={id}
            name={id}
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

export default NameInput;
