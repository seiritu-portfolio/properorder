import { POModelBase } from "..";

export default class ValidateTokenResponse extends POModelBase {
  message = ""; // message: string
  access_token = ""; // access_token: string
  token_type = ""; // token_type: string
  expires_at = ""; // expires_at: string
  roles = [];

  static get className() {
    return "ValidateTokenResponse";
  }

  /**
   * isValidToken
   * if message is 'Token Valid' then user need to register
   *
   * @returns {boolean}
   */
  isValidToken() {
    return this.message === "Token Valid";
  }

  /**
   * isAdmin
   *
   * @returns {boolean}
   */
  isAdmin() {
    return this.roles.includes("admin");
  }
}
