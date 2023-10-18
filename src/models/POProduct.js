import { POModelBase, POUnit } from ".";
import TempConstants from "../config/TempConstants";

export default class POProduct extends POModelBase {
  id = 0;
  name = "";
  image = null;
  price = 0;
  calories = 0;
  spice_level = 0;
  vat_rate = null;
  description = "";
  active = false;
  menu_category_id = 0;
  unit = null; // POUnit
  unit_description = "";
  stepper = 1000;
  // extras
  allergens = [];
  dietary_preferences = [];
  menu_category = {};
  //options
  options = [];
  tags = [];
  pairing = "";
  origin = "";
  style = "";
  discount = 0;
  exclusive = 0;
  best_seller = 0;
  new = 0;

  static get className() {
    return "POProduct";
  }

  /**
   * fromState
   * Create a new instance of POProduct for unit.
   *
   * @static
   * @param {object} state
   * @returns {POProduct}
   */
  static fromState(state) {
    return super.fromState({
      ...state,
      unit: state.unit ? POUnit.fromState(state.unit) : null,
    });
  }

  /**
   * @static
   * generateTemplate
   */
  static generateTemplate() {
    return this.fromState({
      id: 2342314,
      seller: { name: "Tester" },
      name: "GF Fudge Fudgery Cake",
      price: "42.50",
      description: "Product description",
      options: [
        {
          name: "Size",
          variants: [
            { name: "10'Round", price: "42.50" },
            { name: "12'Round", price: "42.80" },
          ],
        },
        {
          name: "Flavour",
          variants: [
            { name: "Chocolate", price: "0.00" },
            { name: "Caramel", price: "0.50" },
          ],
        },
      ],
      category: TempConstants.categories[5],
      delivery_method: "Delivery Only",
      tags: ["Tags 1"],
      allergens: ["Milk", "Eggs"],
      plastic_free: true,
      images: [
        {
          image:
            "https://i.ibb.co/r0BPMC2/Gluten-Free-Chocolate-Fudge-Cake-1.jpg",
        },
      ],
    });
  }

  /**
   * getPrice
   *
   * @returns {float}
   */
  getPrice() {
    // if (this.unit == null) {
    //   // return (this.price / 100).toFixed(2);
    //   return this.price;
    // }
    // return (this.price / this.stepper).toFixed(2);
    return Number(this.price) / 100;
  }

  /**
   * getTotal
   *
   * @param {[object]} selectedOptions
   *
   * @returns {number}
   */
  getTotal(selectedOptions) {
    // Identify the selected items and recalculate the total with them.
    let total = Number(this.price);
    if (selectedOptions == null) {
      return total;
    }

    selectedOptions.forEach((s) => {
      const option = this.options.filter((o) => o.id === s.id);
      if (option.length !== 0) {
        const variant = option[0].variants.filter(
          (v) => v.id === s.selected_id
        );
        if (variant.length !== 0) {
          total += Number(variant[0].price);
        }
      }
    });

    return total;
  }

  /**
   * getCalculatedTotal
   *
   * @returns {number}
   */
  getCalculatedTotal(quantity, selectedOptions) {
    return Math.round(this.getTotal(selectedOptions) * quantity * 100) / 100;
  }

  /**
   * getTotalForOrder
   *
   * @returns {number}
   */
  getTotalForOrder() {
    return Number(this.price);
    // let total = Number(this.price);
    // if (this.options == null) {
    //   return total;
    // }
    //
    // total = this.options
    //   .map((v) => Number(v.price))
    //   .reduce((accumulator, currentValue) => accumulator + currentValue, total);
    //
    // return total;
  }

  /**
   * getCalculatedTotalForOrder
   *
   * @returns {string}
   */
  getCalculatedTotalForOrder() {
    return (this.getTotalForOrder() * this.quantity).toFixed(2);
  }

  /**
   * getTagLabel
   *
   * @returns {string}
   */
  getTagLabel() {
    if (this.tags == null) {
      return "";
    }
    return this.tags.map((v) => v.name).join(", ");
  }

  /**
   * getAllergens
   *
   * @returns {string}
   */
  getAllergens() {
    return this.allergens.map((v) => v.name).join(", ");
  }

  /**
   * getSellerId
   *
   * @returns {number}
   */
  getSellerId() {
    return this.site_id;
  }
}
