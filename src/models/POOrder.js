import {
  PODeliveryMode,
  POModelBase,
  POOrderStatus,
  POPayment,
  POProduct,
  POSeller,
  POUser,
} from ".";
import { v4 as uuidv4 } from "uuid";

export default class POOrder extends POModelBase {
  id = 0;
  delivery_price = "0.00";
  delivery_method = PODeliveryMode.collection;
  user = new POUser();
  carrier = new POUser();
  deliveredTime = new Date();
  status = POOrderStatus.open;
  fees = 0;
  subtotal = 0;
  tax = 0;
  trip = 0;
  total = 0;
  special_instructions = "";
  latitude = 0.0;
  longitude = 0.0;
  products = [];
  isDelivery = false;
  reviewed = false;
  coupon_id = null;
  payment = new POPayment();
  site = new POSeller();
  free_delivery = 0;

  static get className() {
    return "POOrder";
  }

  static fromState(state) {
    return super.fromState({
      ...state,
      products: state.products?.map((v) => POProduct.fromState(v)) ?? [],
    });
  }

  /**
   * getSubTotal
   *
   * @static
   * @param {object} orders Array<POOrder>
   * @returns {string} subtotal
   */
  static getSubTotal(orders) {
    if (orders.length === 0) {
      return "0";
    }
    return orders
      .map((v) => v.getOrderPrice())
      .reduce((accumulator, currentValue) => accumulator + currentValue)
      .toFixed(2);
  }

  /**
   * getTotal
   *
   * @static
   * @param {object} orders Array<POOrder>
   * @returns {number} total
   */
  static getTotal(orders) {
    if (orders.length === 0) {
      return 0;
    }
    const deliveryPrice = orders
      .map((v) =>
        v.delivery_method === PODeliveryMode.collection ||
        v.products.length === 0
          ? 0
          : Number(v.getDeliveryPrice()) * 100
      )
      .reduce((accumulator, currentValue) => accumulator + currentValue);
    return (deliveryPrice + Number(POOrder.getSubTotal(orders))).toFixed(2);
  }

  static generateFromLocal(localCart) {
    return localCart.map((c) => {
      const { products, ...rest } = c;
      return POOrder.fromState({
        products: products.map((p) => ({
          ...p.product,
          quantity: p.quantity,
          options: p.selectedOptions.map((o) => {
            const opts = p.product.options.filter((v) => v.id === o.id);
            if (opts.length === 0) {
              return {};
            }

            const variants = opts[0].variants.filter(
              (v) => v.id === o.selected_id
            );
            if (variants.length === 0) {
              return {};
            }

            return {
              id: uuidv4(),
              name: opts[0].name,
              product_option_id: opts[0].id,
              price: variants[0].price,
              selected_option: variants[0].name,
              selected_id: variants[0].id,
            };
          }),
        })),
        ...rest,
      });
    });
  }

  /**
   * getOrderPrice
   *
   * @returns {number}
   */
  getOrderPrice() {
    return this.products
      .map((product) => Number(product.getCalculatedTotalForOrder()))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  /**
   * getDeliveryPrice
   *
   * @returns {string}
   */
  getDeliveryPrice() {
    if (this.delivery_price == null) {
      return "0.00";
    }
    const OrderSubTotal = Number(this.getOrderPrice()) / 100;
    if (OrderSubTotal > this.site.free_delivery / 100) {
      return "0.00";
    }
    return Number(this.delivery_price / 100).toFixed(2);
  }

  isUnavailableOrder() {
    return (
      this.site.delivery_method == null ||
      this.site.delivery_method === "none" ||
      (this.delivery_method != null &&
        this.delivery_method !== "" &&
        this.delivery_method !== this.site.delivery_method &&
        this.site.delivery_method !== "both")
    );
  }
}
