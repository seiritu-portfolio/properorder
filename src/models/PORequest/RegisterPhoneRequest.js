import { POModelBase } from "..";

export default class RegisterPhoneRequest extends POModelBase {
  email = ""; // email: string
  phone = ""; // phone: string

  static get className() {
    return "RegisterPhoneRequest";
  }
}
