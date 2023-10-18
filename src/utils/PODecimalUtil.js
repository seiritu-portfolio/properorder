function getPriceDecimalString(price) {
  return `€${(price / 100).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function getPriceDecimalNumber(price) {
  return Number(price / 100).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function getRatingDecimal(rating) {
  return Number((rating / 100).toFixed(1));
}

function getABVDecimal(abv) {
  return Number((abv / 100).toFixed(2));
}

function getRatingDecimalMark(rating) {
  const r = (rating / 100).toFixed(1);
  if (rating % 10 >= 8 && rating % 10 <= 9) {
    return Math.floor(rating / 10) + 0.7;
  } else {
    return Number(r);
  }
}

function getRatingMark(rating) {
  return Number(rating);
}

function inputDecimalString(t) {
  let newValue = "";
  if (Number(t) < 0) {
    return 0;
  }
  newValue =
    t.indexOf(".") >= 0
      ? t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)
      : t;
  return newValue;
}

export default {
  getPriceDecimalString,
  getPriceDecimalNumber,
  getRatingDecimal,
  getRatingDecimalMark,
  getABVDecimal,
  getRatingMark,
  inputDecimalString,
};
