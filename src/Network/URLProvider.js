export const base_url = process.env.REACT_APP_API_URL;

const admin = "/admin";
export const router = {
  login: "/login",
  logout: "/logout",
  users: "/users",
  register_phone_confirm: "/registerphoneconfirm",
  register_social: "/registersocial",
  register_phone: "/registerphone",
  validate_token: "/validatetoken",
  register: "/register",
  resend: "resendtoken",
  resetPassword: "/reset",
  verifyReset: "/verifyreset",
  profile: "/users/current",
  categories: "/categories",
  sites_by_location: "/sites/bylocation",
  sites_by_postcode: "/sites/bypostcode",
  sites: "/sites",
  siteTypes: "site-types",
  productHeaders: "product-headers",
  menus: "/menus",
  products: "/products",
  products_by_postcode: "/products/bypostcode",
  product: "/product",
  reviews: "/reviews",
  allergens: "/allergens",

  favourites_sites: "/favourites/sites",
  favourites_products: "/favourites/products",
  payment_methods: "/paymentmethods",
  addresses: "/addresses",

  coupons: "/coupons",
  orders: "/orders",
  order: "/order",
  update_password: "/updatepassword",

  signed_storage_url: "/vapor/signed-storage-url",

  admin: {
    organization: `${admin}/organisations`,
    products: (id) => `${admin}/sites/${id}/products`,
    settings: (id) => `${admin}/sites/${id}/settings`,
    sellers: (id) => `${admin}/sites/${id}/orders`,
    users: (id) => `${admin}/organisations/${id}/users`,
    deliveryCoverage: (id) => `${admin}/sites/${id}/delivery-coverage`,
    discounts: (id) => `${admin}/sites/${id}/coupons`,
    productHeaders: (id) => `${admin}/sites/${id}/product-headers`,
    onboard: (id) => `${admin}/sites/${id}/stripe/onboard`,
    profile: `${admin}/profile`,
  },
};
