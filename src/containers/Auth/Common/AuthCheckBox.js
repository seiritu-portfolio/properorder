import React, { Component } from "react";
import { HiCheck } from "react-icons/hi";
import clsx from "clsx";

export default class AuthCheckBox extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      checked: true,
    };
  }

  isChecked() {
    return this.state.checked;
  }

  handleClick() {
    this.setState({ checked: !this.state.checked });
  }

  render() {
    const { checked } = this.state;
    return (
      <div
        className={clsx(
          "w-4 h-4 flex items-center justify-center border border-po-black",
          checked && "bg-po-primary"
        )}
        onClick={() => this.handleClick()}
      >
        {checked && <HiCheck />}
      </div>
    );
  }
}
