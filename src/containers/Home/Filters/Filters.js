import React, { useEffect } from "react";
import "../styles.scss";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import clsx from "clsx";
import NestedList from "../../../components/NestedList";
import MySlider from "../../../components/MySlider";
import POStepSlider from "../../../components/POStepSlider";
import {
  POCountry,
  PODeliveryMode,
  POFilter,
  POFilterType,
  POProductType,
  POTempBundle,
} from "../../../models";
import VerticalTabs from "../../../components/VerticalTabs";
import APIManager from "../../../Network/APIManager";
import Constants from "../../../config/Constants";
import TempConstants from "../../../config/TempConstants";
import POProductService from "../../../services/POProductService";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles({
  root: {
    paddingLeft: "0.75rem",
    paddingRight: "0.2rem",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  label: {
    paddingTop: 3,
    paddingLeft: 3,
    fontSize: "16",
    fontWeight: "semibold",
    lineHeight: "1.37",
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    backgroundColor: "rgba(255, 230, 186, 0.5)",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "rgba(255, 230, 186, 0.5)",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "rgba(255, 230, 186, 0.5)",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#E27F03,#E27F03 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "rgba(255, 230, 186, 0.5)",
    },
  },
});

export default function Filters(props) {
  const {
    handleClearAll,
    isFromSeller = false,
    needItBy,
    types,
    selectedTypes,
    countries,
    selectedCountries,
    deliveryMode,
    setDeliveryMode,
    setSelectedTypes,
    setSelectedCountries,
    handleDeliveryModeChange,
    setSelectedNeedByItem,
    countryFilterHidden,
    priceFilterRequired,
    abvFilterHidden,
    radiusValue,
    setRadiusValue,
    maxPriceValue,
    setMaxPriceValue,
    abvValue,
    setABVValue,
    sellerNames,
    selectedSellerNames,
    setSelectedSellerNames,
    setTypes,
    setCountries,
    bundles,
    selectedBundles,
    setSelectedBundles,
    searchString,
    clearCategories = () => {},
    tempBundle,
    setTempBundle = () => {},
    productList = [],
    productHeader,
    setProductHeader,
    visibleIndex,
    setVisibleIndex,
    productHeaderId,
  } = props;

  const sellerNamesRequired = true;
  // selectedBundles.length !== 0 || searchString !== "";

  useEffect(() => {
    APIManager.getTypes().then((res) => {
      setTypes(POProductType.generateFrom(res));
    });
    APIManager.getCountries().then((res) => {
      setCountries(POCountry.generateFrom(res[0]));
    });
  }, []);

  useEffect(() => {
    if (countryFilterHidden) {
      setSelectedCountries([]);
    }
    if (!priceFilterRequired) {
      setSelectedTypes([]);
    }
    if (!sellerNamesRequired) {
      setSelectedSellerNames([]);
    }
  }, [
    countryFilterHidden,
    priceFilterRequired,
    abvFilterHidden,
    sellerNamesRequired,
  ]);

  // const handleClearAll = () => {
  //   setTempBundle(POTempBundle.generate());
  //   setDeliveryMode(PODeliveryMode.both);
  //   setSelectedBundles([]);
  //   setSelectedTypes([]);
  //   setSelectedCountries([]);
  //   setSelectedSellerNames([]);
  //   setSelectedNeedByItem(needItBy[0]);
  //   setRadiusValue(
  //     POFilter.generate(POFilterType.CollectionRadius, Constants.MAX_RADIUS)
  //   );
  //   setMaxPriceValue(
  //     POFilter.generate(POFilterType.MaxPrice, Constants.MAX_PRICE)
  //   );
  //   setABVValue(POFilter.generate(POFilterType.ABV, 0));
  //   clearCategories();
  // };

  const handleBundleChanged = (changedItem) => {
    if (selectedBundles.some((v) => v.id === changedItem.id)) {
      setSelectedBundles(
        selectedBundles.filter((item) => item.id !== changedItem.id)
      );
    } else {
      setSelectedBundles([...selectedBundles, changedItem]);
    }
  };

  const handleTypeChanged = (changedItem) => {
    if (selectedTypes.some((v) => v.id === changedItem.id)) {
      setSelectedTypes(
        selectedTypes.filter((item) => item.id !== changedItem.id)
      );
    } else {
      setSelectedTypes([...selectedTypes, changedItem]);
    }
  };

  const handleCountryChanged = (changedItem) => {
    if (selectedCountries.some((v) => v.id === changedItem.id)) {
      setSelectedCountries(
        selectedCountries.filter((item) => item.id !== changedItem.id)
      );
    } else {
      setSelectedCountries([...selectedCountries, changedItem]);
    }
  };

  const handleSellerNameChanged = (changedItem) => {
    let newSelectedSellerNames;
    if (selectedSellerNames.some((v) => v.id === changedItem.id)) {
      newSelectedSellerNames = selectedSellerNames.filter(
        (item) => item.id !== changedItem.id
      );
    } else {
      newSelectedSellerNames = [...selectedSellerNames, changedItem];
    }
    setSelectedSellerNames(newSelectedSellerNames);
  };

  // Temporary commented out, to be back in later version:
  // const handleNeedItByChanged = (changedItem) => {
  //   setSelectedNeedByItem(changedItem);
  // };

  const classes = useStyles();
  const StyledRadio = (props) => {
    return (
      <Radio
        className={classes.root}
        checkedIcon={
          <span className={clsx(classes.icon, classes.checkedIcon)} />
        }
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  };

  // Collection Radius:
  const handleChangeRadius = (event, newValue) => {
    setRadiusValue(
      POFilter.generate(
        radiusValue.type,
        POProductService.getRoundedStep(newValue)
      )
    );
  };

  // Price:
  const handleChangePrice = (event, newValue) => {
    setMaxPriceValue(
      POFilter.generate(
        maxPriceValue.type,
        POProductService.getRoundedStep(newValue)
      )
    );
  };

  function priceLabelFormat(pV) {
    return `€${pV}`;
  }

  // ABV:
  const handleChangeABV = (event, newValue) => {
    setABVValue(POFilter.generate(abvValue.type, newValue));
  };

  function ABVLabelFormat(aV) {
    return `${aV}%`;
  }

  const FilterHeader = () => (
    <div className={"flex flex-1 flex-row justify-between items-center"}>
      <h3 className={"uppercase"}>Filters</h3>
      <button
        className={
          "text-base font-semibold text-po-yellowlight hover:text-po-yellowmedium transform transition duration-300 ease-out"
        }
        onClick={handleClearAll}
      >
        Clear all
      </button>
    </div>
  );

  const renderContent = () => (
    <div className="flex flex-col lg:flex-1 mx-3 space-y-3 lg:shadow-lg lg:px-4 py-5 lg:rounded-xl bg-po-darkerwhite w-64">
      {!isFromSeller && FilterHeader()}
      {isFromSeller ? (
        <VerticalTabs
          items={productList}
          productHeader={productHeader}
          setProductHeader={setProductHeader}
          visibleIndex={visibleIndex}
          setVisibleIndex={setVisibleIndex}
          productHeaderId={productHeaderId}
        />
      ) : null}

      {/* Temporary commented out, to be back when it's fixed (should be instead of NULL above):

        <RadioGroup value={deliveryMode} onChange={handleDeliveryModeChange}>
          <FormControlLabel
            value={PODeliveryMode.both}
            control={<StyledRadio />}
            label="Both"
            classes={{ label: classes.label }}
          />
          <FormControlLabel
            value={PODeliveryMode.collection}
            control={<StyledRadio />}
            label="Collection"
            classes={{ label: classes.label }}
          />
          <FormControlLabel
            value={PODeliveryMode.delivery}
            control={<StyledRadio />}
            label="Delivery"
            classes={{ label: classes.label }}
          />
        </RadioGroup>
     */}

      {/*{isFromSeller && FilterHeader()}*/}
      {/*<Divider />*/}
      {tempBundle != null && (
        <>
          <FormControlLabel
            control={<Checkbox color={"secondary"} name={"Bundles & gifts"} />}
            label={"Bundles & gifts"}
            checked={tempBundle.checked}
            onChange={() =>
              setTempBundle(POTempBundle.generate(!tempBundle.checked))
            }
          />
        </>
      )}
      {/* <Divider /> */}

      {/*{priceFilterRequired && (*/}
      {/*  <NestedList*/}
      {/*    defaultOpen={false}*/}
      {/*    title={"Type"}*/}
      {/*    items={types}*/}
      {/*    selectedItems={selectedTypes}*/}
      {/*    handleChangeItem={handleTypeChanged}*/}
      {/*  />*/}
      {/*)}*/}
      {/*<Divider hidden={!priceFilterRequired} />*/}
      {/*{!countryFilterHidden && (*/}
      {/*  <NestedList*/}
      {/*    defaultOpen={false}*/}
      {/*    title={"Country"}*/}
      {/*    items={countries}*/}
      {/*    selectedItems={selectedCountries}*/}
      {/*    handleChangeItem={handleCountryChanged}*/}
      {/*  />*/}
      {/*)}*/}

      {/*<Divider hidden={countryFilterHidden} />*/}
      {/*<NestedList*/}
      {/*  title={"Bundles & gifts"}*/}
      {/*  items={bundles}*/}
      {/*  selectedItems={selectedBundles}*/}
      {/*  handleChangeItem={handleBundleChanged}*/}
      {/*/>*/}

      {/*  Temporary commented out, to be back in later version:

      {sellerNamesRequired && sellerNames.length > 0 && (
        <NestedList
          defaultOpen={false}
          title={"Seller"}
          items={sellerNames}
          selectedItems={selectedSellerNames}
          handleChangeItem={handleSellerNameChanged}
        />
      )}


      <Divider hidden={!(sellerNamesRequired && sellerNames.length > 0)} />
*/}
      {/*{priceFilterRequired && (*/}
      {/*  <NestedList*/}
      {/*    title={"Price"}*/}
      {/*    renderContent={() => (*/}
      {/*      <div className={"ml-4 mr-5 relative"}>*/}
      {/*        <POStepSlider*/}
      {/*          value={maxPriceValue.value}*/}
      {/*          onChange={handleChangePrice}*/}
      {/*          valueLabelDisplay="off"*/}
      {/*          min={0}*/}
      {/*          max={Constants.MAX_PRICE + 0.5}*/}
      {/*          step={0.5}*/}
      {/*          marks={TempConstants.priceMarks}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  />*/}
      {/*)}*/}

      {/*{!abvFilterHidden && (*/}
      {/*  <div>*/}
      {/*    <Divider />*/}
      {/*    <NestedList*/}
      {/*      title={"ABV %"}*/}
      {/*      renderContent={() => (*/}
      {/*        <div className={"ml-4 mr-5 relative"}>*/}
      {/*          <MySlider*/}
      {/*            value={abvValue.value}*/}
      {/*            onChange={handleChangeABV}*/}
      {/*            valueLabelFormat={ABVLabelFormat}*/}
      {/*            valueLabelDisplay="on"*/}
      {/*            min={0}*/}
      {/*            max={16}*/}
      {/*          />*/}
      {/*          {abvValue.value < 14 && (*/}
      {/*            <span*/}
      {/*              className={"absolute text-xs"}*/}
      {/*              style={{ top: 25, right: -18 }}*/}
      {/*            >*/}
      {/*              16*/}
      {/*            </span>*/}
      {/*          )}*/}
      {/*        </div>*/}
      {/*      )}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*)}*/}

      {/*<Divider hidden={!priceFilterRequired} />*/}

      {!isFromSeller && (
        <>
          {/*  Temporary commented out, to be back in later version:
      <Divider />
      <NestedList
        title={"I need it by"}
        renderContent={() => (
          <div className={"space-y-2"}>
            {needItBy.map((item, index) => (
              <NavRadio
                key={index}
                selected={item.id === selectedNeedByItem.id}
                item={item}
                onClick={() => handleNeedItByChanged(item)}
              />
            ))}
          </div>
        )}
      />
            */}

          {/*<NestedList*/}
          {/*  title={"Offers"}*/}
          {/*  items={["Free delivery (15)", "Discounts (13)"]}*/}
          {/*/>*/}

          {/*{deliveryMode === PODeliveryMode.collection ||*/}
          {/*deliveryMode === PODeliveryMode.both ? (*/}
          {/*  <NestedList*/}
          {/*    title={"Collection radius (km)"}*/}
          {/*    renderContent={() => (*/}
          {/*      <div className={"ml-4 mr-5 relative"}>*/}
          {/*        <POStepSlider*/}
          {/*          value={radiusValue.value}*/}
          {/*          onChange={handleChangeRadius}*/}
          {/*          // valueLabelFormat={radiusLabelFormat}*/}
          {/*          valueLabelDisplay="off"*/}
          {/*          min={0}*/}
          {/*          max={Constants.MAX_RADIUS + 0.5}*/}
          {/*          step={0.5}*/}
          {/*          marks={TempConstants.radiusMarks}*/}
          {/*        />*/}
          {/*        /!*{radiusValue.value < 420 && (*!/*/}
          {/*        /!*  <span*!/*/}
          {/*        /!*    className={"absolute text-xs"}*!/*/}
          {/*        /!*    style={{ top: 25, right: -18 }}*!/*/}
          {/*        /!*  >*!/*/}
          {/*        /!*    500km*!/*/}
          {/*        /!*  </span>*!/*/}
          {/*        /!*)}*!/*/}
          {/*      </div>*/}
          {/*    )}*/}
          {/*  />*/}
          {/*) : null}*/}
        </>
      )}
    </div>
  );

  return <div className={"home-filter-sticky"}>{renderContent()}</div>;
}
