import React from "react";
import xss from "xss";

import config from "./config";

export default function POHTML({ htmlString, className }) {
  return (
    <span
      dangerouslySetInnerHTML={{ __html: xss(htmlString, config) }}
      className={className}
    />
  );
}
