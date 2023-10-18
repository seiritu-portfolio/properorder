import Constants from "../config/Constants";

function findCategory(c, tags, step) {
  if (tags[step] == null) {
    return null;
  }
  const fc = c.children.find((v) => v.id === tags[step].id);
  if (fc == null) {
    return null;
  }
  let sCategory = { category: c, firstSubCategory: fc };
  if (fc.children.length > 0 && tags[step + 1] == null) {
    return null;
  }
  if (fc.children.length > 0 && tags[step + 1] != null) {
    const sc = fc.children.find((v) => v.id === tags[step + 1].id);
    if (sc != null) {
      sCategory = {
        category: c,
        firstSubCategory: fc,
        secondSubCategory: sc,
      };
    } else {
      return null;
    }
  }
  return sCategory;
}

function getRoundedStep(value) {
  let newValue;
  switch (true) {
    case value >= 0 && value <= 2.5:
      newValue = 0.5;
      break;
    case value >= 2.6 && value <= 7.5:
      newValue = 5;
      break;
    case value >= 7.6 && value <= 12.5:
      newValue = 10;
      break;
    case value >= 12.6 && value <= 17.5:
      newValue = 15;
      break;
    case value >= 17.6 && value <= 22.5:
      newValue = 20;
      break;
    case value >= 22.6:
      newValue = 25;
      break;
    default:
      newValue = Constants.MAX_RADIUS;
      break;
  }
  return newValue;
}

function isSameProduct(product1, product2) {
  for (let i = 0; i < product1.selectedOptions.length; i++) {
    const so = product1.selectedOptions[i];
    if (product2.options == null) {
      return false;
    }
    const oso = product2.options[i];
    if (
      oso == null ||
      so.id !== oso.product_option_id ||
      so.selected_id !== oso.selected_id
    ) {
      return false;
    }
  }
  return true;
}

function isSameLocalProduct(p, newProduct) {
  if (p.product.id !== newProduct.product.id) {
    return false;
  }
  for (let i = 0; i < p.selectedOptions.length; i++) {
    const so = newProduct.selectedOptions[i];
    const oso = p.selectedOptions[i];
    if (oso == null || so.id !== oso.id || so.selected_id !== oso.selected_id) {
      return false;
    }
  }
  return true;
}

export default {
  findCategory,
  getRoundedStep,
  isSameProduct,
  isSameLocalProduct,
};
