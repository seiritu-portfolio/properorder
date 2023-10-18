import React from "react";
import "./styles.scss";
import { ReactSVG } from "react-svg";
import p1 from "../../assets/ic_p1.svg";
import PropTypes from "prop-types";

export default function Decoration(props) {
  return (
    <ReactSVG
      src={p1}
      className={props.className}
      afterInjection={() => props.onLoaded()}
    />
  );
}

Decoration.propTypes = {
  className: PropTypes.string,
};
