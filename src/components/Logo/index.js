import React, { useState } from "react";
import "./styles.scss";
import logo from "../../assets/logo_dark.png";
import logoLight from "../../assets/logo_light.png";
import PropTypes from "prop-types";
import clsx from "clsx";
import history from "../../routes/history";

export default function Logo(props) {
  const {
    isWhite = false,
    special = false,
    isSmall = false,
    to,
    handleClearAll,
  } = props;
  const suffix = isSmall ? "_small" : "";

  const [readyToWrite, setReadyToWrite] = useState(false);

  if (special) {
    return (
      <div
        className={`flex ml-4 mt-1 relative h-5/6 ${
          readyToWrite ? "block" : "hidden"
        }`}
      >
        <img
          src={isWhite ? logoLight : logo}
          alt={"logo"}
          className="logo-special"
          onLoad={() => setReadyToWrite(true)}
        />
        <p className={"logo_text logo_text__dark logo_text__dark__special"}>
          roper
        </p>
        <p className="logo_text logo_text__yellow logo_text__yellow__special">
          Order
        </p>
      </div>
    );
  }

  const fromHomePage = window.location.pathname.includes("/home");

  return (
    <div className={`${readyToWrite ? "block" : "hidden"}`}>
      <a
        className={
          isSmall
            ? "logo-small-container cursor-pointer"
            : "flex ml-4 sm:ml-10 cursor-pointer logo-container mt-4"
        }
        onClick={
          fromHomePage ? handleClearAll : () => history.push(to ?? "/home")
        }
      >
        <img
          src={isWhite ? logoLight : logo}
          alt={"logo"}
          className={`logo${suffix}`}
          onLoad={() => setReadyToWrite(true)}
        />
        <p
          className={clsx(
            `logo_text${suffix}`,
            isWhite ? `logo_text${suffix}__light` : `logo_text${suffix}__dark`
          )}
        >
          roper
        </p>
        <p className={`logo_text${suffix} logo_text${suffix}__yellow`}>order</p>
      </a>
    </div>
  );
}

Logo.propTypes = {
  isWhite: PropTypes.bool,
  special: PropTypes.bool,
};
