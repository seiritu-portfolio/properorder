import { PODeliveryMode, POFilterNeedBy } from "../models";
import DateTimeUtil from "../utils/DateTimeUtil";
import Constants from "../config/Constants";
import TempConstants from "../config/TempConstants";

const getFilterQueries = ({
  searchString = "",
  selectedSellerNames = [],
  selectedTypes = [],
  tag,
  selectedNeedByItem,
  tempBundle,
  radiusValue,
  deliveryMode,
  abvValue,
  maxPriceValue,
  priceFilterRequired,
  abvFilterHidden,
}) => {
  let queries = "";
  let link = "&";

  if (searchString !== "" && searchString.length >= 3) {
    queries += `&search_term=${searchString}`;
  }

  if (selectedSellerNames.length > 0) {
    selectedSellerNames.forEach((v, i) => {
      queries += `${link}sites[${i}]=${v.id}`;
    });
  }

  if (selectedTypes.length > 0) {
    selectedTypes.forEach((v, i) => {
      queries += `${link}dietary_preferences[${i}]=${v.id}`;
    });
  }

  if (tag) {
    queries += `${link}tag_id=${tag}`;
  }
  if (selectedNeedByItem.title !== POFilterNeedBy.Whenever) {
    queries += `${link}need_it_by=${DateTimeUtil.getServerTimeString(
      selectedNeedByItem.date
    )}`;
  }

  // if (tempBundle != null) {
  //   queries += `${link}bundle=${tempBundle.checked ? 1 : 0}`;
  // }
  if (tempBundle != null && tempBundle.checked) {
    queries += `${link}bundle=1`;
  }

  if (
    radiusValue.value < Constants.MAX_RADIUS &&
    deliveryMode !== PODeliveryMode.delivery
  ) {
    const v = TempConstants.radiusMarks.find(
      (r) => r.value === radiusValue.value
    );
    queries += `${link}collection_radius=${v.label.replace("km", "")}`;
  }

  // queries += `${link}delivery_method=${deliveryMode}`;

  if (abvValue.value > 0 && !abvFilterHidden) {
    queries += `${link}abv=${abvValue.value}`;
  }

  if (maxPriceValue.value < Constants.MAX_PRICE && priceFilterRequired) {
    const v = TempConstants.priceMarks.find(
      (p) => p.value === maxPriceValue.value
    );
    queries += `${link}max_price=${Number(v.label.replace("€", "")) * 100}`;
  }

  return queries;
};

/**
 * getPriceFilter
 *
 * @param searchString
 * @param status
 * @return {string}
 */
const getPriceFilter = ({ searchString, status }) => {
  let queries = "";
  let link = "&";

  if (searchString != null && searchString.length >= 3) {
    queries += `&search_by=${searchString}`;
    link = "&";
  }

  // if (category != null && category !== "") {
  //   queries += `${link}tag_id=${category.id}`;
  //   link = "&";
  // }
  //
  // if (maxPrice != null && maxPrice !== "") {
  //   queries += `${link}max_price=${Number(maxPrice) * 100}`;
  //   link = "&";
  // }

  if (status != null && status !== "-1") {
    queries += `${link}active=${status}`;
  }

  return queries;
};

const getOrderFilter = (
  classification,
  { searchString, period, status, customer }
) => {
  let queries = "";
  let link = "&";

  if (searchString != null && searchString !== "") {
    queries += `&search_by=${searchString}`;
    link = "&";
  }

  if (status != null && status !== "") {
    queries += `${link}order_status[]=${status}`;
    link = "&";
  }

  if (period != null && period !== "") {
    let dateBy = new Date();
    switch (period) {
      case "Last 7 days":
        dateBy = new Date(dateBy.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "Last 30 days":
        dateBy = new Date(dateBy.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "Last 90 days":
        dateBy = new Date(dateBy.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
    }
    queries += `${link}date_by=${DateTimeUtil.getServerTimeString(dateBy)}`;
    link = "&";
  }

  if (customer != null && customer !== "") {
    queries += `${link}customer_id=${customer}`;
    link = "&";
  }

  if (classification != null && classification !== "") {
    queries += `${link}order_classification=${classification}`;
  }

  return queries;
};

export default {
  getFilterQueries,
  getPriceFilter,
  getOrderFilter,
};
