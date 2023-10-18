import React, { useEffect, useState } from "react";
import HomeSellers from "./HomeSellers";
import HomeProducts from "./HomeProducts";
import HomeSteps from "./HomeSteps";
import clsx from "clsx";
import POHomeProductsType from "../../../models/Enum/POHomeProductsType";
import HomeCategories from "./HomeCategories";
import HomeSearchResult from "./HomeSearchResult";
import { Button, Chip, makeStyles } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { connect } from "react-redux";
import * as userActions from "../../../redux/UserSaga/actions";
import {
  POCountry,
  PODeliveryMode,
  POFilter,
  POFilterNeedBy,
  PONeedItBy,
  POProductBundle,
  POProductType,
  POSellerName,
  POTempBundle,
} from "../../../models";
import SearchBy from "../../../components/SearchBy";
import { ReactSVG } from "react-svg";
import FilterIcon from "../../../assets/filter.svg";
import POHorizontal from "../../../components/POHorizontal";
import Spinner from "react-spinkit";
import Constants from "../../../config/Constants";
import HomeTabBar from "./HomeTabBar";
import AddProductModal from "../../Seller/Products/AddProductModal";
import POModal from "../../../components/POModal";

const useStyles = makeStyles((theme) => ({
  tag: {
    marginLeft: "0.25rem",
    marginRight: "0.25rem",
    marginBottom: "0.25rem",
    height: "1.75rem",
  },
  filterButton: {
    borderRadius: "0 10px 10px 0",
    width: "50px",
    height: "50px",
    backgroundColor: theme.palette.common.yellowextralight,
  },
  searchInput: {
    borderRadius: "10px 0 0 10px",
  },
  root: {
    paddingLeft: "0.8rem",
    paddingRight: "0.8rem",
    height: "2.5rem",
    fontSize: "0.9rem",
    fontWeight: "600",

    ["@media (min-width:1280px)"]: {
      paddingLeft: "1rem",
      paddingRight: "1rem",
      fontSize: "1rem",
      height: "2.7rem",
    },
  },
}));

function Detail(props) {
  const {
    deliveryMode,
    searchString,
    selectedTypes,
    selectedBundles,
    selectedCountries,
    selectedNeedByItem,
    handleDeleteBundle,
    handleDeleteType,
    handleDeleteCountry,
    handleDeleteNeedItBy,
    priceFilterRequired,
    maxPriceValue,
    setMaxPriceValue,
    radiusValue,
    setRadiusValue,
    selectedSellerNames,
    handleDeleteSellerName,
    searchInputProps,
    handleOpenFilter,
    products,
    loadAllProducts,
    abvValue,
    setABVValue,
    allCategories,
    subCategories,
    setSubCategories,
    isDataReady,
    tryProducts,
    sellers,
    totalProducts,
    tempBundle,
  } = props;
  const [isLoading, setIsLoading] = useState(null);
  const [tabBarIndex, setTabBarIndex] = useState(1);
  const [modalStatus, setModalStatus] = useState({ visible: false });

  const {
    chosenCategoryItem: chosenItem,
    categorySteps: steps,
    setChosenCategoryItem: setChosenItem,
    setCategorySteps: setSteps,
    loadMore,
    setLoadMore,
  } = props;

  // const { favProducts } = props;

  const handleClickStep = (step, index) => {
    if (step == null) {
      setSteps([]);
      setSubCategories(allCategories);
    } else {
      setSteps(steps.slice(0, index + 1));
      setSubCategories(step.children);
    }
    setChosenItem(null);
  };

  const handleClickCategory = (item) => {
    if (item?.id === chosenItem?.id) {
      if (steps.length >= 2) {
        handleClickStep(steps[steps.length - 2], steps.length - 2);
      } else if (steps.length === 1) {
        handleClickStep(null);
      }
      return;
    }
    if (item.children.length === 0) {
      // setIsLoading(null);
      setSteps([...steps.filter((s) => s.parent_id !== item.parent_id), item]);
      setChosenItem(item);
    } else {
      setIsLoading(item.id);

      tryProducts("1", item.id)
        .then((res) => {
          setIsLoading(null);
          if (res.products?.length > 0) {
            setSteps([
              ...steps.filter((s) => s.parent_id !== item.parent_id),
              item,
            ]);
            setSubCategories(item.children);
            setChosenItem(null);
          } else {
            setSteps([
              ...steps.filter((s) => s.parent_id !== item.parent_id),
              { ...item, children: [] },
            ]);
            setChosenItem(item);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDeleteChipItem = (item) => {
    switch (true) {
      case item instanceof POTempBundle:
        handleDeleteBundle();
        break;
      case item instanceof POProductBundle:
        handleDeleteBundle(item);
        break;
      case item instanceof POProductType:
        handleDeleteType(item);
        break;
      case item instanceof POCountry:
        handleDeleteCountry(item);
        break;
      case item instanceof PONeedItBy:
        handleDeleteNeedItBy();
        break;
      case item instanceof POSellerName:
        handleDeleteSellerName(item);
        break;
      case item instanceof POFilter:
        if (item.type === maxPriceValue.type) {
          setMaxPriceValue(
            POFilter.generate(maxPriceValue.type, Constants.MAX_PRICE)
          );
        } else if (item.type === abvValue.type) {
          setABVValue(POFilter.generate(abvValue.type, 0));
        } else {
          setRadiusValue(
            POFilter.generate(radiusValue.type, Constants.MAX_RADIUS)
          );
        }
        break;
      default:
        console.log("unknown type");
        break;
    }
  };

  // const tabBarNeeded = selectedBundles.length !== 0;
  const tabBarNeeded = true;
  const canShowProducts = searchString !== "";
  const classes = useStyles();
  const chipItems = [
    ...selectedBundles,
    ...selectedTypes,
    ...selectedCountries,
    ...selectedSellerNames,
  ];

  if (tempBundle.checked) {
    chipItems.push(tempBundle);
  }
  if (selectedNeedByItem.title !== POFilterNeedBy.Whenever)
    chipItems.push(selectedNeedByItem);
  if (priceFilterRequired && maxPriceValue.value < Constants.MAX_PRICE) {
    chipItems.push(maxPriceValue);
  }
  if (
    (deliveryMode === PODeliveryMode.collection ||
      deliveryMode === PODeliveryMode.both) &&
    radiusValue.value < Constants.MAX_RADIUS
  ) {
    chipItems.push(radiusValue);
  }
  if (priceFilterRequired && abvValue.value > 0) {
    chipItems.push(abvValue);
  }

  //  Commented out to show the Products tab being active on the default screen:
  // useEffect(() => {
  //   if (selectedBundles.length === 0) {
  //     setTabBarIndex(0);
  //   } else {
  //     setTabBarIndex(1);
  //   }
  // }, [selectedBundles]);

  return (
    <div className={"flex flex-col lg:mx-3"}>
      <div
        className={clsx(
          "w-full lg:shadow-lg pb-5 lg:rounded-xl bg-po-darkerwhite"
        )}
      >
        {" "}
        {/*
        <HomeSteps
          visible={!canShowProducts}
          steps={steps}
          handleClickStep={handleClickStep}
          isLoading={isLoading}
        />
        */}
        <div className="hidden lg:block">
          <HomeSearchResult
            totalProducts={totalProducts}
            sellers={sellers}
            headerVisible={true}
            visible={canShowProducts}
            searchString={searchString}
          />
        </div>
        <div>
          {!canShowProducts && (
            <POHorizontal tabsInfo={subCategories}>
              <HomeCategories
                subCategories={subCategories}
                handleClickCategory={handleClickCategory}
                chosenItem={chosenItem}
                isLoading={isLoading}
              />
            </POHorizontal>
          )}

          <div className={"px-3 md:px-4"}>
            <div className={"flex-row flex lg:hidden py-2"}>
              <SearchBy
                className={clsx("flex flex-1", classes.searchInput)}
                searchInputProps={searchInputProps}
                placeholder="Search by product or seller"
              />
              <Button
                variant="contained"
                color="secondary"
                className={classes.filterButton}
                onClick={() => handleOpenFilter()}
              >
                <ReactSVG src={FilterIcon} />
              </Button>
            </div>

            <div className="block lg:hidden">
              <HomeSearchResult
                totalProducts={totalProducts}
                sellers={sellers}
                headerVisible={true}
                visible={canShowProducts}
                searchString={searchString}
              />
            </div>
          </div>
          <div
            className={clsx(
              "flex flex-row h-8 top-0 z-50 space-y-0 bg-white px-4 mb-2 mb:mt-1",
              chipItems.length > 0 || steps.length > 0 ? "sticky" : ""
            )}
          >
            <HomeSteps
              visible={!canShowProducts}
              steps={steps}
              handleClickStep={handleClickStep}
              isLoading={isLoading}
            />
            <ul className={"flex flex-row flex-wrap py-1 ml-0"}>
              {chipItems.map((item, index) => (
                <Chip
                  key={index}
                  deleteIcon={<Close />}
                  label={item.getChipTitle(deliveryMode)}
                  color={"secondary"}
                  size="small"
                  classes={{ root: classes.tag }}
                  onClick={() => {}}
                  onDelete={() => handleDeleteChipItem(item)}
                />
              ))}
            </ul>
            {/*<SortBy classNames={"hidden lg:flex"} />*/}
          </div>
          <div className={"px-3 md:px-4"}>
            {/*<div className={"flex flex-1 flex-col relative"}>*/}
            {/*  <SortBy*/}
            {/*    classNames={*/}
            {/*      "flex lg:hidden self-end absolute my-0 -top-3 md:-top-1"*/}
            {/*    }*/}
            {/*  />*/}
            {/*</div>*/}

            <div className={"mt-2 lg:mt-1"}>
              <HomeTabBar
                tabBarIndex={tabBarIndex}
                tabBarNeeded={tabBarNeeded && !canShowProducts}
                sellers={sellers}
                totalProducts={totalProducts}
                setTabBarIndex={setTabBarIndex}
              />
              <HomeSellers
                deliveryMode={deliveryMode}
                isVisible={tabBarIndex === 0 || canShowProducts}
                titleVisible={!tabBarNeeded || canShowProducts}
                sellers={sellers}
                searchString={searchString}
              />
              {/*{favProducts.length > 0 &&*/}
              {/*allCategories?.length > 0 &&*/}
              {/*!priceFilterRequired ? (*/}
              {/*  <HomeProducts*/}
              {/*    products={favProducts}*/}
              {/*    variant={POHomeProductsType.favourites}*/}
              {/*    visible={!canShowProducts}*/}
              {/*  />*/}
              {/*) : null}*/}
              {/*<HomeProducts*/}
              {/*  products={TempConstants.featureProducts}*/}
              {/*  variant={POHomeProductsType.featured}*/}
              {/*  selectedTypes={selectedTypes}*/}
              {/*  handleDeleteType={handleDeleteType}*/}
              {/*  visible={!canShowProducts}*/}
              {/*/>*/}
              <HomeProducts
                deliveryMode={deliveryMode}
                products={products}
                loadMore={() => {
                  if (loadMore.invisible) {
                    loadAllProducts();
                  }
                }}
                variant={POHomeProductsType.allProducts}
                searchString={searchString}
                visible={canShowProducts || (tabBarNeeded && tabBarIndex === 1)}
                totalProducts={totalProducts}
                titleVisible={!tabBarNeeded || canShowProducts}
                onClickProduct={(item) =>
                  setModalStatus({ item, visible: true })
                }
              />
              <div className={"flex justify-center mt-1 h-10"}>
                {!loadMore.invisible &&
                  totalProducts > products.length &&
                  (tabBarIndex === 1 || canShowProducts) && (
                    <Button
                      variant="contained"
                      color="secondary"
                      className={clsx(
                        classes.root,
                        "h-full shadow-sm transform transition duration-300 block ease-out"
                      )}
                      onClick={() => {
                        setLoadMore({
                          invisible: true,
                          limit: loadMore.limit + 40,
                          reload: true,
                        });
                      }}
                    >
                      Load more products
                    </Button>
                  )}
              </div>
              {!isDataReady && (
                <div className={"home-details-read-spin"}>
                  <Spinner
                    name="ball-spin-fade-loader"
                    fadeIn="none"
                    color={"#E27F03"}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <POModal
        modalVisible={modalStatus.visible}
        handleCloseModal={() =>
          setModalStatus({ ...modalStatus, visible: false })
        }
        renderContent={() => (
          <AddProductModal
            item={modalStatus.item}
            handleCloseModal={() =>
              setModalStatus({ ...modalStatus, visible: false })
            }
          />
        )}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.User.user,
  favProducts: state.User.favProducts,
  currentLocation: state.User.currentLocation,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchFavouriteProducts: (userId) => {
      dispatch(userActions.fetchFavouriteProducts(userId));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
