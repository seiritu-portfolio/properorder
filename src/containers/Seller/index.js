import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import history from "../../routes/history";
import { Button, Drawer, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { ArrowBackIos } from "@material-ui/icons";
import SellerHeader from "./SellerHeader";
import SellerDetail from "./SellerDetail";
import POHeader from "../../components/POHeader";
import POHeaderVariant from "../../models/Enum/POHeaderVariant";
import Footer from "../../components/POFooter";
import BackToTopButton from "../../components/BackToTopBtn";

import {
  POCategory,
  POCountry,
  PODeliveryMode,
  POFilter,
  POFilterType,
  PONeedItBy,
  POProductBundle,
  POProductType,
  POSellerName,
} from "../../models";
import Filters from "../Home/Filters/Filters";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import APIManager from "../../Network/APIManager";
import POLoader from "../../components/POLoader";
import Constants from "../../config/Constants";
import HelperService from "../../utils/HelperService";

const useStyles = makeStyles({
  backButton: {
    borderWidth: 0,
    color: "white",
    marginLeft: "0",
    ["@media (min-width:640px)"]: {
      marginLeft: 18,
    },
  },
});

export default function Seller(props) {
  let { sellerId } = useParams();

  let filters = {};
  const filterJson = window.sessionStorage.getItem(
    Constants.SS_SELLER_FILTER_OPTIONS
  );
  if (filterJson != null) {
    filters = JSON.parse(filterJson);
  }

  const isPreview = props?.location?.state?.preview ?? false;
  if (isPreview) {
    sellerId = props?.location?.state?.sellerId;
  }

  const [seller, setSeller] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    APIManager.fetchSeller(sellerId).then((res) => setSeller(res));
  }, [sellerId]);

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const [finalProducts, setFinalProducts] = useState([]);
  const [showFilterDrawer, setShowFilterDrawer] = React.useState(false);
  const [bundles, setBundles] = React.useState(POProductBundle.generate());
  const [types, setTypes] = React.useState([]);
  const [countries, setCountries] = React.useState([]);
  const [needItBy, setNeedItBy] = React.useState(PONeedItBy.generate());

  // TODO: set deliveryMode from seller details.
  const deliveryMode = PODeliveryMode.delivery;
  const [selectedBundles, setSelectedBundles] = React.useState(
    filters.selectedBundles
      ? POProductBundle.fromStateArray(filters.selectedBundles)
      : []
  );
  const [selectedTypes, setSelectedTypes] = React.useState(
    filters.selectedTypes
      ? POProductType.generateFrom(filters.selectedTypes)
      : []
  );
  const [selectedCountries, setSelectedCountries] = React.useState(
    filters.selectedCountries
      ? POCountry.fromStateArray(filters.selectedCountries)
      : []
  );
  const [selectedNeedByItem, setSelectedNeedByItem] = React.useState(
    needItBy[0]
  );

  const [productHeader, setProductHeader] = useState(0);
  const [visibleIndex, setVisibleIndex] = React.useState({
    index: null,
    status: false,
  });
  const [productList, setProductList] = useState([]);

  const [radiusValue, setRadiusValue] = React.useState(
    filters.radiusValue
      ? POFilter.fromState(filters.radiusValue)
      : POFilter.generate(POFilterType.CollectionRadius, Constants.MAX_RADIUS)
  );
  const [maxPriceValue, setMaxPriceValue] = React.useState(
    filters.maxPriceValue
      ? POFilter.fromState(filters.maxPriceValue)
      : POFilter.generate(POFilterType.MaxPrice, Constants.MAX_PRICE)
  );
  const [abvValue, setABVValue] = React.useState(
    filters.abvValue
      ? POFilter.fromState(filters.abvValue)
      : POFilter.generate(POFilterType.ABV, 0)
  );

  const handleDeleteBundle = (selectedItem) => {
    setSelectedBundles(
      selectedBundles.filter((item) => item.id !== selectedItem.id)
    );
  };

  const handleDeleteType = (selectedItem) => {
    setSelectedTypes(
      selectedTypes.filter((item) => item.id !== selectedItem.id)
    );
  };

  const handleDeleteCountry = (selectedItem) => {
    setSelectedCountries(
      selectedCountries.filter((item) => item.id !== selectedItem.id)
    );
  };

  const priceFilterRequired = true;
  const countryFilterHidden = !finalProducts.some((p) =>
    p.tags.some((t) => t.name === "Alcohol")
  );

  const classes = useStyles();

  useEffect(() => {
    window.sessionStorage.setItem(
      Constants.SS_SELLER_FILTER_OPTIONS,
      JSON.stringify({
        selectedTypes,
        selectedNeedByItem,
        radiusValue,
        deliveryMode,
        selectedBundles,
        selectedCountries,
        maxPriceValue,
        abvValue,
      })
    );
  }, [
    selectedTypes,
    selectedNeedByItem,
    radiusValue,
    deliveryMode,
    selectedBundles,
    selectedCountries,
    maxPriceValue,
    abvValue,
  ]);

  const renderFilterView = () => (
    <Filters
      isFromSeller={true}
      needItBy={needItBy}
      selectedNeedByItem={selectedNeedByItem}
      setSelectedNeedByItem={setSelectedNeedByItem}
      deliveryMode={deliveryMode}
      types={types}
      setSelectedTypes={setSelectedTypes}
      selectedTypes={selectedTypes}
      countries={countries.slice(0, 10)}
      setCountries={setCountries}
      setSelectedCountries={setSelectedCountries}
      selectedCountries={selectedCountries}
      countryFilterHidden={countryFilterHidden}
      abvFilterHidden={countryFilterHidden}
      priceFilterRequired={priceFilterRequired}
      sellerNames={[]}
      selectedSellerNames={[]}
      setSelectedSellerNames={() => {}}
      radiusValue={radiusValue}
      setRadiusValue={setRadiusValue}
      maxPriceValue={maxPriceValue}
      setMaxPriceValue={setMaxPriceValue}
      setTypes={setTypes}
      bundles={bundles}
      setBundles={setBundles}
      setSelectedBundles={setSelectedBundles}
      selectedBundles={selectedBundles}
      setDeliveryMode={() => {}}
      productList={productList}
      productHeader={productHeader}
      setProductHeader={setProductHeader}
      visibleIndex={visibleIndex}
      setVisibleIndex={setVisibleIndex}
      productHeaderId={props?.location?.state?.productHeaderId}
      abvValue={abvValue}
      setABVValue={setABVValue}
    />
  );

  return (
    <div className="flex flex-col w-full min-h-screen">
      {(seller === undefined || loading) && <POLoader isLoading={true} />}
      {/*Header*/}
      <div className="relative pb-24 xl:pb-32">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover bg-blend-overlay"
            src={seller?.image}
            alt="background image"
          />
          <div
            className="absolute inset-0 bg-yellow-light mix-blend-multiply"
            aria-hidden="true"
          />
        </div>
        <POHeader variant={POHeaderVariant.secondary} />

        <SellerHeader seller={seller} />
      </div>

      <div>
        <section className={"z-10 -mt-24 lg:px-3 pb-4 2xl:mx-32"}>
          <div className="my-2 lg:mt-3">
            <Button
              variant="outlined"
              className={clsx("h-12", classes.backButton)}
              onClick={() => history.push("/home")}
            >
              <ArrowBackIos color={"secondary"} />
              <span>Back to results</span>
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className={"home-filter-container hidden lg:block"}>
              {renderFilterView()}
            </div>
            <div className={"flex-auto"}>
              <SellerDetail
                tabIndex={props?.location?.state?.tabIndex}
                seller={seller}
                deliveryMode={deliveryMode}
                selectedTypes={selectedTypes}
                selectedCountries={selectedCountries}
                selectedSellerNames={[]}
                selectedNeedByItem={selectedNeedByItem}
                handleDeleteNeedItBy={() => setSelectedNeedByItem(needItBy[0])}
                handleDeleteCountry={handleDeleteCountry}
                handleDeleteType={handleDeleteType}
                handleDeleteBundle={handleDeleteBundle}
                handleDeleteSellerName={() => {}}
                priceFilterRequired={priceFilterRequired}
                maxPriceValue={maxPriceValue}
                setMaxPriceValue={setMaxPriceValue}
                radiusValue={radiusValue}
                setRadiusValue={setRadiusValue}
                handleOpenFilter={() => setShowFilterDrawer(true)}
                loading={loading}
                setLoading={setLoading}
                selectedBundles={selectedBundles}
                productHeader={productHeader}
                setProductHeader={setProductHeader}
                visibleIndex={visibleIndex}
                setVisibleIndex={setVisibleIndex}
                productHeaderId={props?.location?.state?.productHeaderId}
                productList={productList}
                setProductList={setProductList}
                finalProducts={finalProducts}
                setFinalProducts={setFinalProducts}
                abvValue={abvValue}
                setABVValue={setABVValue}
                abvFilterHidden={countryFilterHidden}
                countryFilterHidden={countryFilterHidden}
              />
            </div>
          </div>
        </section>
      </div>
      <div className="mt-auto pt-6">
        <Footer />
      </div>
      <BackToTopButton />
      <Drawer
        anchor={"left"}
        open={showFilterDrawer}
        onBackdropClick={() => setShowFilterDrawer(false)}
      >
        {renderFilterView()}
      </Drawer>
    </div>
  );
}
