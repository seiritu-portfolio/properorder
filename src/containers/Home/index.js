import React, { useEffect, useState } from "react";
import "./styles.scss";
import Filters from "./Filters/Filters";
import Detail from "./Detail/Detail";
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
  POTempBundle,
} from "../../models";
import { Drawer } from "@material-ui/core";
import APIManager from "../../Network/APIManager";
import POFilterService from "../../services/POFilterService";
import { connect } from "react-redux";
import Constants from "../../config/Constants";
import * as userActions from "../../redux/UserSaga/actions";

function Home(props) {
  let filters = {};
  const filterJson = localStorage.getItem(Constants.SS_HOME_FILTER_OPTIONS);
  if (filterJson != null) {
    filters = JSON.parse(filterJson);
  }

  const [sellers, setSellers] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sellerNames, setSellerNames] = React.useState(POSellerName.generate());
  //TODO: replace these template to real bundles after api done
  const [bundles, setBundles] = React.useState(POProductBundle.generate());
  const [tempBundle, setTempBundle] = useState(
    filters.tempBundle
      ? POTempBundle.generate(filters.tempBundle.checked)
      : POTempBundle.generate()
  );
  const [types, setTypes] = React.useState([]);
  const [countries, setCountries] = React.useState([]);
  const [needItBy, setNeedItBy] = React.useState(PONeedItBy.generate());

  const [deliveryMode, setDeliveryMode] = React.useState(
    filters?.deliveryMode ?? PODeliveryMode.both
  );
  const [searchString, setSearchString] = React.useState(
    filters?.searchString ?? ""
  );
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
  const [selectedSellerNames, setSelectedSellerNames] = React.useState(
    filters.selectedSellerNames
      ? POSellerName.fromStateArray(filters.selectedSellerNames)
      : []
  );
  const [selectedNeedByItem, setSelectedNeedByItem] = React.useState(
    needItBy[0]
  );

  const [categorySteps, setCategorySteps] = React.useState(
    filters.categorySteps
      ? POCategory.fromStateArray(filters.categorySteps)
      : []
  );
  const [chosenCategoryItem, setChosenCategoryItem] = React.useState(
    filters.chosenCategoryItem
      ? POCategory.fromState(filters.chosenCategoryItem)
      : null
  );
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

  const [isDataReady, setDataReady] = React.useState(true);
  const [loadMore, setLoadMore] = React.useState({
    invisible: true,
    limit: Constants.LOAD_MORE_LIMIT,
    reload: false,
  });
  const [products, setProducts] = React.useState([]);
  const [pageNumber, setPageNumber] = useState("1");
  const [subCategories, setSubCategories] = React.useState([]);

  const { allCategories } = props;

  useEffect(() => {
    if (props.currentLocation.postcode === "") {
      return;
    }
    APIManager.fetchSellers(props.currentLocation.postcode, "1").then((res) => {
      setSellerNames(POSellerName.generateFrom(res.sellers));
      setSellers(res.sellers);
    });
  }, [props.currentLocation.postcode]);

  useEffect(() => {
    if (categorySteps.length === 0) {
      setSubCategories(allCategories);
    } else {
      let step;
      for (let i = categorySteps.length - 1; i >= 0; i--) {
        step = categorySteps[i].children;
        if (step.length !== 0) {
          break;
        }
      }
      if (step.length === 0) {
        setSubCategories(allCategories);
      } else {
        setSubCategories(step);
      }
    }
  }, [allCategories, subCategories]);

  // useEffect(() => {
  //   setSelectedSellerNames(
  //     selectedSellerNames.filter((sn) =>
  //       sellerNames.some((nsn) => nsn.id === sn.id)
  //     )
  //   );
  // }, [sellerNames.map((sn) => sn.id).join()]);

  useEffect(() => {
    localStorage.setItem(
      Constants.SS_HOME_FILTER_OPTIONS,
      JSON.stringify({
        searchString,
        selectedSellerNames,
        selectedTypes,
        chosenCategoryItem,
        categorySteps,
        selectedNeedByItem,
        currentLocation: props.currentLocation,
        radiusValue,
        deliveryMode,
        selectedBundles,
        selectedCountries,
        maxPriceValue,
        abvValue,
        tempBundle,
      })
    );
    if (allCategories.length !== 0) {
      loadAllProducts(true, "1");
    }
  }, [
    searchString,
    selectedSellerNames,
    selectedTypes,
    chosenCategoryItem,
    categorySteps,
    selectedNeedByItem,
    props.currentLocation.postcode,
    radiusValue,
    deliveryMode,
    selectedBundles,
    selectedCountries,
    maxPriceValue,
    abvValue,
    tempBundle,
    allCategories,
  ]);

  useEffect(() => {
    if (loadMore.reload) {
      loadAllProducts();
    }
  }, [loadMore]);

  const loadAllProducts = (reset = false, pn = pageNumber) => {
    if (pn == null || props.currentLocation.postcode === "") {
      return;
    }

    setDataReady(false);

    tryProducts(
      pn,
      chosenCategoryItem?.id ??
        (categorySteps.length !== 0
          ? categorySteps[categorySteps.length - 1]?.id
          : null)
    )
      .then((res) => {
        setDataReady(true);
        if (reset) {
          setLoadMore({
            invisible: true,
            limit: Constants.LOAD_MORE_LIMIT,
            reload: false,
          });
          setProducts(res.products);

          if (
            res.products?.length > 0 &&
            chosenCategoryItem != null &&
            chosenCategoryItem.children.length > 0
          ) {
            setCategorySteps([
              ...categorySteps.filter(
                (s) => s.parent_id !== chosenCategoryItem.parent_id
              ),
              chosenCategoryItem,
            ]);
            setSubCategories(chosenCategoryItem.children);
            setChosenCategoryItem(null);
          }
        } else {
          const newProducts = [...products, ...res.products];
          if (newProducts.length > loadMore.limit) {
            setLoadMore({ ...loadMore, invisible: false, reload: false });
          }
          setProducts(newProducts);
        }
        setPageNumber(res.pagination.getNextPagePath());
        setTotalProducts(res.pagination.total ?? 0);
      })
      .catch((error) => {
        setDataReady(true);
        console.log(error);
      });
  };

  const priceFilterRequired =
    categorySteps.length !== 0 || chosenCategoryItem != null;
  const abvFilterHidden =
    categorySteps.find((item) => item?.name === "Alcohol") == null;
  const countryFilterHidden =
    categorySteps.find((item) => item?.name === "Alcohol") == null;

  const tryProducts = (pn, tag) => {
    return APIManager.fetchProducts(
      props.currentLocation.postcode,
      pn,
      POFilterService.getFilterQueries({
        searchString,
        selectedSellerNames,
        selectedTypes,
        tag,
        selectedNeedByItem,
        tempBundle,
        deliveryMode,
        radiusValue,
        maxPriceValue,
        abvValue,
        priceFilterRequired,
        abvFilterHidden,
        countryFilterHidden,
      })
    );
  };

  const handleDeleteBundle = (selectedItem) => {
    // setSelectedBundles(
    //   selectedBundles.filter((item) => item.id !== selectedItem.id)
    // );
    setTempBundle(POTempBundle.generate());
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

  const handleDeleteSellerName = (selectedItem) => {
    setSelectedSellerNames(
      selectedSellerNames.filter((item) => item.id !== selectedItem.id)
    );
  };

  const searchInputProps = {
    value: searchString,
    onChange: (e) => setSearchString(e.target.value),
  };

  const [showFilterDrawer, setShowFilterDrawer] = React.useState(false);

  const clearCategories = () => {
    setCategorySteps([]);
    setSubCategories(allCategories);
    setChosenCategoryItem(null);
  };

  const clearSearch = () => {
    setSearchString("");
  };

  const handleClearAll = () => {
    setTempBundle(POTempBundle.generate());
    setDeliveryMode(PODeliveryMode.both);
    setSelectedBundles([]);
    setSelectedTypes([]);
    setSelectedCountries([]);
    setSelectedSellerNames([]);
    setSelectedNeedByItem(needItBy[0]);
    setRadiusValue(
      POFilter.generate(POFilterType.CollectionRadius, Constants.MAX_RADIUS)
    );
    setMaxPriceValue(
      POFilter.generate(POFilterType.MaxPrice, Constants.MAX_PRICE)
    );
    setABVValue(POFilter.generate(POFilterType.ABV, 0));
    clearCategories();
    clearSearch();
  };

  const renderFilterView = () => (
    <Filters
      searchString={searchString}
      needItBy={needItBy}
      selectedNeedByItem={selectedNeedByItem}
      setSelectedNeedByItem={setSelectedNeedByItem}
      deliveryMode={deliveryMode}
      handleDeliveryModeChange={(e) => setDeliveryMode(e.target.value)}
      setDeliveryMode={setDeliveryMode}
      bundles={bundles}
      types={types}
      setSelectedTypes={setSelectedTypes}
      selectedTypes={selectedTypes}
      countries={countries}
      setCountries={setCountries}
      setSelectedCountries={setSelectedCountries}
      selectedCountries={selectedCountries}
      countryFilterHidden={countryFilterHidden}
      priceFilterRequired={priceFilterRequired}
      abvFilterHidden={abvFilterHidden}
      sellerNames={sellerNames}
      selectedSellerNames={selectedSellerNames}
      setSelectedSellerNames={setSelectedSellerNames}
      radiusValue={radiusValue}
      setRadiusValue={setRadiusValue}
      maxPriceValue={maxPriceValue}
      setMaxPriceValue={setMaxPriceValue}
      abvValue={abvValue}
      setABVValue={setABVValue}
      setTypes={setTypes}
      setBundles={setBundles}
      setSelectedBundles={setSelectedBundles}
      selectedBundles={selectedBundles}
      clearCategories={() => {
        setCategorySteps([]);
        setSubCategories(allCategories);
        setChosenCategoryItem(null);
      }}
      tempBundle={tempBundle}
      setTempBundle={setTempBundle}
      handleClearAll={handleClearAll}
    />
  );

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/*{!isDataReady && <POLoader />}*/}
      <Drawer
        anchor={"left"}
        open={showFilterDrawer}
        onBackdropClick={() => setShowFilterDrawer(false)}
      >
        {renderFilterView()}
      </Drawer>
      <POHeader
        variant={POHeaderVariant.home}
        searchInputProps={searchInputProps}
        handleClearAll={handleClearAll}
        locationRequired={props.currentLocation.postcode === ""}
      />
      <div className={"flex flex-col lg:flex-row md:px-2 pb-4"}>
        <div className={"home-filter-container hidden lg:block"}>
          {renderFilterView()}
        </div>
        <div className={"mt-5 lg:mt-0 home-details-container"}>
          <Detail
            deliveryMode={deliveryMode}
            searchString={searchString}
            selectedTypes={selectedTypes}
            selectedBundles={selectedBundles}
            selectedCountries={selectedCountries}
            selectedSellerNames={selectedSellerNames}
            selectedNeedByItem={selectedNeedByItem}
            chosenCategoryItem={chosenCategoryItem}
            categorySteps={categorySteps}
            handleDeleteNeedItBy={() => setSelectedNeedByItem(needItBy[0])}
            handleDeleteCountry={handleDeleteCountry}
            handleDeleteBundle={handleDeleteBundle}
            handleDeleteType={handleDeleteType}
            handleDeleteSellerName={handleDeleteSellerName}
            setChosenCategoryItem={setChosenCategoryItem}
            setCategorySteps={setCategorySteps}
            priceFilterRequired={priceFilterRequired}
            maxPriceValue={maxPriceValue}
            setMaxPriceValue={setMaxPriceValue}
            radiusValue={radiusValue}
            setRadiusValue={setRadiusValue}
            searchInputProps={searchInputProps}
            handleOpenFilter={() => setShowFilterDrawer(true)}
            products={products}
            loadAllProducts={loadAllProducts}
            abvValue={abvValue}
            setABVValue={setABVValue}
            countryFilterHidden={countryFilterHidden}
            allCategories={allCategories}
            subCategories={subCategories}
            setSubCategories={setSubCategories}
            isDataReady={isDataReady}
            tryProducts={tryProducts}
            sellers={sellers}
            totalProducts={totalProducts}
            tempBundle={tempBundle}
            loadMore={loadMore}
            setLoadMore={setLoadMore}
          />
        </div>
      </div>
      <div className="mt-auto pt-4">
        <Footer />
      </div>
      <BackToTopButton />
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentLocation: state.User.currentLocation,
  allCategories: state.User.allCategories,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateLocation: (location, address) => {
      dispatch(userActions.updateLocation(location, address));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
