import React from "react";
import { Svg, Path, Stop, Ellipse, Defs } from "@react-pdf/renderer";

const LocationSVG = () => (
  <Svg
    width="12"
    height="13.5"
    viewBox="0 0 24 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1 11.3327C1.02064 5.6067 5.96223 0.980607 12.0373 1.00006C18.1125 1.01952 23.0206 5.67715 22.9999 11.4032V11.5206C22.9252 15.2427 20.7202 18.683 18.0169 21.3719C16.4709 22.885 14.7445 24.2247 12.872 25.364C12.3713 25.7722 11.6286 25.7722 11.1279 25.364C8.3365 23.6515 5.88655 21.4894 3.89014 18.9766C2.11078 16.7853 1.10052 14.1257 1 11.368L1 11.3327Z"
      stroke="black"
      strokeWidth="1"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Ellipse
      cx="12.0005"
      cy="11.5321"
      rx="3.52547"
      ry="3.32289"
      stroke="black"
      strokeWidth="1"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default LocationSVG;
