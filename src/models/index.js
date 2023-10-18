import POModelBase from "./POModelBase";
import POCategory from "./POCategory";
import POSeller from "./POSeller";
import POMenu from "./POMenu";
import POProduct from "./POProduct";
import POOrder from "./POOrder";
import POOrderItem from "./POOrderItem";
import POUser from "./POUser";
import POPayment from "./POPayment";
import POCart from "./POCart";
import POUnit from "./POUnit";
import POAddress from "./POAddress";
import PODietary from "./PODietary";
import RegisterPhoneRequest from "./PORequest/RegisterPhoneRequest";
import ValidateTokenResponse from "./POResponse/ValidateTokenResponse";
import POPagination from "./POPagination";
import POOrderStatus from "./Enum/POOrderStatus";
import POOrderItemStatus from "./Enum/POOrderItemStatus";
import POFilterNeedBy from "./Enum/POFilterNeedBy";
import POProductType from "./POProductType";
import POCountry from "./POCountry";
import PODeliveryMode from "./Enum/PODeliveryMode";
import PONeedItBy from "./PONeedItBy";
import POFilterType from "./Enum/POFilterType";
import POFilter from "./POFilter";
import POSellerName from "./POSellerName";
import POReview from "./POReview";
import POProductOption from "./POProductOption";
import POOrganization from "./POOrganization";
import POAllergens from "./POAllergens";
import POSellerType from "./POSellerType";
import POProductBundle from "./POProductBundle";
import POTempBundle from "./POTempBundle";
import PODiscount from "./PODiscount";
import POProductHeader from "./POProductHeader";
import POWineType from "./POWineType";
import POGrape from "./POGrape";
import PODrinkingStyles from "./PODrinkingStyles";
import POGoesWellWith from "./POGoesWellWith";
import POWineries from "./POWineries";

/**
 * Initialize the required models
 */
export function initModels() {
  POSeller.require(POSeller);
  POCategory.require(POCategory);
  POMenu.require(POMenu);
  POProductType.require(POProductType);
  PONeedItBy.require(PONeedItBy);
  POCountry.require(POCountry);
  POProduct.require(POProduct);
  POOrder.require(POOrder);
  POOrderItem.require(POOrderItem);
  POUser.require(POUser);
  POPayment.require(POPayment);
  POCart.require(POCart);
  POUnit.require(POUnit);
  POAddress.require(POAddress);
  PODietary.require(PODietary);
  POPagination.require(POPagination);
  POFilter.require(POFilter);
  POSellerName.require(POSellerName);
  POReview.require(POReview);
  POProductOption.require(POProductOption);
  RegisterPhoneRequest.require(RegisterPhoneRequest);
  ValidateTokenResponse.require(ValidateTokenResponse);
  POOrganization.require(POOrganization);
  POAllergens.require(POAllergens);
  POSellerType.require(POSellerType);
  POProductBundle.require(POProductBundle);
  POTempBundle.require(POTempBundle);
  PODiscount.require(PODiscount);
  POProductHeader.require(POProductHeader);
  POWineType.require(POWineType);
  POGrape.require(POGrape);
  PODrinkingStyles.require(PODrinkingStyles);
  POGoesWellWith.require(POGoesWellWith);
  POWineries.require(POWineries);
}

export {
  POModelBase,
  POCategory,
  POCountry,
  POSeller,
  POMenu,
  POProductType,
  POProduct,
  POOrder,
  POOrderItem,
  POUser,
  POPayment,
  POCart,
  POUnit,
  RegisterPhoneRequest,
  ValidateTokenResponse,
  POAddress,
  PODietary,
  POPagination,
  POOrderStatus,
  POOrderItemStatus,
  POFilterNeedBy,
  PODeliveryMode,
  PONeedItBy,
  POFilterType,
  POFilter,
  POSellerName,
  POReview,
  POProductOption,
  POOrganization,
  POAllergens,
  POSellerType,
  POProductBundle,
  POTempBundle,
  PODiscount,
  POProductHeader,
  POWineType,
  POGrape,
  PODrinkingStyles,
  POGoesWellWith,
  POWineries,
};
