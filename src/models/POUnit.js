import { POModelBase } from ".";

export default class POUnit extends POModelBase {
  id = 0;
  name = "";
  short_name = "";

  static get className() {
    return "POUnit";
  }
}
