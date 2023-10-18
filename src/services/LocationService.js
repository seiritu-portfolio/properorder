import Geocode from "react-geocode";
import APIManager from "../Network/APIManager";

/**
 * getAddress
 * get addresses from latitude, longitude
 *
 * @param {number} latitude
 * @param {number} longitude
 * @returns {object}
 */
const getAddress = async (latitude, longitude) => {
  const json = await Geocode.fromLatLng(latitude, longitude);
  return json;
};

/**
 * getLatLng
 * get latitude, longitude from address
 *
 * @param {string} address
 * @returns {object} {lat: number, lng: number}
 */
const getLatLng = async (address) => {
  const json = await Geocode.fromAddress(address);
  return json.results[0];
};

/**
 * getFormattedAddress
 *
 * @param {object} seller
 * @returns {string}
 */
function getFormattedAddress(seller) {
  return `${seller.address_l1}, ${
    seller.address_l2 ? `${seller.address_l2}, ` : ""
  }${seller.city}, ${seller.county}, ${seller.country}`;
}

/**
 * getFormattedAddressFromPlaces
 *
 * @param {object} places
 * @returns {string}
 */
function getFormattedAddressFromPlaces(places) {
  if (places.address_components == null) {
    return "";
  }
  const formatted_address = places.address_components
    .map((address) => address.long_name)
    .join(", ");
  return formatted_address;
}

function fetchPostCode(addressComponent) {
  let postcode = "";
  addressComponent.results.map((r) => {
    r.address_components.forEach((v) => {
      if (v.types.includes("postal_code")) postcode = v.long_name;
    });
  });
  if (postcode === "") {
    addressComponent.results.map((r) => {
      r.address_components.forEach((v) => {
        if (v.long_name.includes("Dublin 2")) postcode = "D02";
      });
    });
  }
  return postcode;
}

function validatePostcode(postcode, handleSuccess, handleWarning) {
  if (postcode === "") {
    handleWarning(
      "We couldn't find your Eircode/Postcode. Please enter it manually"
    );
    return;
  }

  APIManager.fetchProducts(postcode, "1")
    .then((res) => {
      if (res.pagination.total > 0) {
        handleSuccess();
      } else {
        handleWarning(
          "Oops it looks like we’re not in your area yet, but we hope to be very soon."
        );
      }
    })
    .catch((_) => {
      handleWarning(
        "We couldn't find your Eircode/Postcode. Please enter it manually"
      );
    });
}

export default {
  getAddress,
  getLatLng,
  getFormattedAddress,
  getFormattedAddressFromPlaces,
  fetchPostCode,
  validatePostcode,
};
