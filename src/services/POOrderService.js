import { PODeliveryMode, POOrderStatus } from "../models";

function getSubItems(orders) {
  return orders
    .map((order) => {
      return order.products
        .map((p) => Number(p.quantity))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

function capitalize(s) {
  if (s.length < 1) {
    return s;
  }
  // returns the first letter capitalized + the string from index 1 and out aka. the rest of the string
  return s[0].toUpperCase() + s.substr(1);
}

function getNextStatus(deliveryMethod, s) {
  let status = "";
  if (deliveryMethod === PODeliveryMode.collection) {
    if (s === "placed") {
      status = "ready_for_collection";
    }
    if (s === "ready_for_collection") {
      status = "collected";
    }
  }
  if (deliveryMethod === PODeliveryMode.delivery) {
    if (s === "placed") {
      status = "ready_for_delivery";
    }
    if (s === "ready_for_delivery") {
      status = "out_for_delivery";
    }
  }
  return status;
}

export default {
  getSubItems,
  capitalize,
  getNextStatus,
};
