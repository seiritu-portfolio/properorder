import { whiteList } from "xss";

const config = {
  whiteList: {
    ...whiteList,
    span: ["style"],
    img: ["style", "src", "alt"],
  },
  css: false,
};

export default config;
