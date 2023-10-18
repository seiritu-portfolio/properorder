function ge(e) {
  return document.getElementById(e);
}

function gebc(e) {
  return document.getElementsByClassName(e);
}

const getDimensions = (ele) => {
  const { height } = ele.getBoundingClientRect();
  const offsetTop = ele.offsetTop;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
};

function getFirstOTPInput() {
  return document.querySelector(
    '[aria-label="Please enter verification code. Character 1"]'
  );
}

export default {
  ge,
  gebc,
  getDimensions,
  getFirstOTPInput,
};
