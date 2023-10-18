import { POModelBase } from ".";

export default class POUser extends POModelBase {
  id = 0;
  first_name = "";
  last_name = "";
  email = "";
  phone = "";
  email_verified_at = null;
  current_team_id = null;
  profile_photo_path = null;
  facebook_id = null;
  active = 1;
  created_at = new Date();
  updated_at = new Date();
  token = null;
  token_reissued = null;
  token_updated_at = null;
  google_id = null;
  gravatar = "";
  roles = [];

  static get className() {
    return "POUser";
  }

  /**
   * getFullName
   *
   * @returns {string | null} full name
   */
  getFullName() {
    if (this.first_name == null || this.last_name == null) {
      return null;
    }
    return `${this.first_name} ${this.last_name}`;
  }

  /**
   * isAdmin
   *
   * @returns {boolean}
   */
  isAdmin() {
    return this.roles.some((r) => r.name === "admin");
  }
}
