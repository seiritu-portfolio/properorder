import React, { useEffect, useRef } from "react";
import "./styles.scss";
import { Button, Chip } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import ProductItem from "../../Home/Detail/ProductItem";
import {
  POCountry,
  PODeliveryMode,
  POFilter,
  POFilterNeedBy,
  PONeedItBy,
  POProductBundle,
  POProductType,
  POSellerName,
} from "../../../models";
import SearchBy from "../../../components/SearchBy";
import { ReactSVG } from "react-svg";
import FilterIcon from "../../../assets/filter.svg";
import AgeRestriction from "../../../components/AgeRestriction";
import Constants from "../../../config/Constants";
import HelperService from "../../../utils/HelperService";
import MobileHeaders from "./MobileHeaders";
import { useMediaQuery } from "react-responsive";

const useStyles = makeStyles((theme) => ({
  tag: {
    margin: "0.25rem",
  },
  filterButton: {
    borderRadius: "0 10px 10px 0",
    width: "50px",
    height: "50px",
    backgroundColor: theme.palette.common.yellowextralight,
  },
}));

const pow = Math.pow;

export default function Products(props) {
  const classes = useStyles();
  const isLaptopOrDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const {
    seller,
    deliveryMode,
    selectedTypes,
    selectedCountries,
    selectedNeedByItem,
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
    handleOpenFilter,
    products,
    handleMore,
    selectedBundles,
    handleDeleteBundle,
    onClickProductItem,
    productHeader,
    setProductHeader,
    productList,
    refs,
    visibleIndex,
    productsRef,
    searchByProduct,
    setSearchByProduct,
    abvValue,
    setABVValue,
    abvFilterHidden,
    setVisibleIndex,
    productHeaderId,
  } = props;

  const headerRef = useRef();

  useEffect(() => {
    scrollTo(refs[visibleIndex?.index]?.current);
  }, [visibleIndex]);

  const easeOutQuart = (x) => {
    return 1 - pow(1 - x, 4);
  };

  const animateScroll = ({ targetPosition, initialPosition, duration }) => {
    let start;
    let position;
    let animationFrame;

    const requestAnimationFrame = window.requestAnimationFrame;
    const cancelAnimationFrame = window.cancelAnimationFrame;

    // maximum amount of pixels we can scroll
    const maxAvailableScroll =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const amountOfPixelsToScroll = initialPosition - targetPosition;

    function step(timestamp) {
      if (start === undefined) {
        start = timestamp;
      }

      const elapsed = timestamp - start;

      // this just gives us a number between 0 (start) and 1 (end)
      const relativeProgress = elapsed / duration;

      // ease out that number
      const easedProgress = easeOutQuart(relativeProgress);

      // calculate new position for every thick of the requestAnimationFrame
      position =
        initialPosition - amountOfPixelsToScroll * Math.min(easedProgress, 1);

      // set the scrollbar position
      window.scrollTo(0, position);

      // Stop when max scroll is reached
      if (
        initialPosition !== maxAvailableScroll &&
        window.scrollY === maxAvailableScroll
      ) {
        cancelAnimationFrame(animationFrame);
        return;
      }

      // repeat until the end is reached
      if (elapsed < duration) {
        animationFrame = requestAnimationFrame(step);
      }
    }

    animationFrame = requestAnimationFrame(step);
  };

  const scrollTo = (ele) => {
    // ele?.scrollIntoView({
    //   behavior: "smooth",
    //   block: "start",
    // });
    if (ele != null) {
      // SmoothVerticalScrolling(ele, 275, "top");
      animateScroll({
        targetPosition:
          ele.offsetTop +
          productsRef.current.offsetTop -
          (isLaptopOrDesktop ? 40 : 60),
        initialPosition: window.scrollY,
        duration: 1000,
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      let scrollPosition = window.scrollY + 2;

      // if (productsRef != null) {
      //   scrollPosition -= HelperService.getDimensions(
      //     productsRef.current
      //   ).offsetTop;
      // }

      let i = 0;
      for (; i < refs.length; i++) {
        const ele = refs[i].current;
        if (ele) {
          let { offsetBottom, offsetTop } = HelperService.getDimensions(ele);
          if (scrollPosition > offsetTop && scrollPosition < offsetBottom) {
            break;
          }
        }
      }
      const selected = refs[i];

      if (selected) {
        setProductHeader(i);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDeleteChipItem = (item) => {
    switch (true) {
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
          setRadiusValue(POFilter.generate(radiusValue.type, 0));
        }
        break;
      default:
        console.log("unknown type");
        break;
    }
  };

  const chipItems = [
    ...selectedBundles,
    ...selectedTypes,
    ...selectedCountries,
    ...selectedSellerNames,
  ];

  if (selectedNeedByItem.title !== POFilterNeedBy.Whenever)
    chipItems.push(selectedNeedByItem);
  if (priceFilterRequired && maxPriceValue.value < Constants.MAX_PRICE) {
    chipItems.push(maxPriceValue);
  }
  if (deliveryMode === PODeliveryMode.collection && radiusValue.value > 0) {
    chipItems.push(radiusValue);
  }
  if (!abvFilterHidden && abvValue.value > 0) {
    chipItems.push(abvValue);
  }

  return (
    <div ref={headerRef}>
      <div className={"search-seller-container"}>
        <SearchBy
          className={"search-seller"}
          searchInputProps={{
            value: searchByProduct,
            onChange: (e) => setSearchByProduct(e.target.value),
          }}
          placeholder="Search by product"
        />
        {/*
        <div className={"block lg:hidden"}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.filterButton}
            onClick={() => handleOpenFilter()}
          >
            <ReactSVG src={FilterIcon} />
          </Button>
        </div>
        */}
      </div>

      {products.some((p) => p.tags.some((t) => t.name === "Alcohol")) && (
        <div className={"flex flex-col items-center lg:items-start mt-2"}>
          <AgeRestriction />
        </div>
      )}
      <div className={"mt-3 mb-4 flex flex-row justify-between"}>
        <div className={"flex flex-col sm:flex-row space-y-2 sm:space-y-0"}>
          <ul className={"flex flex-row flex-wrap"}>
            {chipItems.map((item, index) => (
              <Chip
                size="small"
                key={index}
                deleteIcon={<Close />}
                label={item.getChipTitle()}
                color={"secondary"}
                classes={{ root: classes.tag }}
                onClick={() => {}}
                onDelete={() => handleDeleteChipItem(item)}
              />
            ))}
          </ul>
        </div>
      </div>

      <MobileHeaders
        items={productList}
        productHeader={productHeader}
        setProductHeader={setProductHeader}
        visibleIndex={visibleIndex}
        setVisibleIndex={setVisibleIndex}
        productHeaderId={productHeaderId}
      />

      {productList.length !== 0 ? (
        productList.map((heading, index) => (
          <div
            key={`${index}`}
            ref={refs[index]}
            className={index === productList.length - 1 ? "mb-32" : "mb-4"}
          >
            <div
              className={
                "flex flex-row items-center mr-4 h-8 mt-1 lg:mt-2 mb-1 lg:mb-2"
              }
            >
              <h4 className="text-po-graymain font-bold text-xl whitespace-nowrap ml-1">
                {heading.header.name}
              </h4>
              <h4 className={"text-lg text-po-graymain pl-1"}>
                ({heading.products.length})
              </h4>
            </div>
            <ul className="flex-1 grid grid-cols-2 gap-4 sm:gap-6 pb-4 items-stretch md:grid-cols-3 xl:grid-cols-4">
              {heading.products.map((item, index) => (
                <ProductItem
                  key={index}
                  item={item}
                  seller={seller}
                  variant={"secondary"}
                  onClickItem={onClickProductItem}
                />
              ))}
            </ul>
          </div>
        ))
      ) : (
        <ul className="flex-1 grid grid-cols-2 gap-4 sm:gap-6 pb-4 items-stretch md:grid-cols-3 xl:grid-cols-4">
          {products.map((item, index) => (
            <ProductItem
              key={index}
              item={item}
              seller={seller}
              variant={"secondary"}
              onClickItem={onClickProductItem}
            />
          ))}
        </ul>
      )}
      {/*{loading && (*/}
      {/*  <div className={"flex flex-col items-center"}>*/}
      {/*    <Spinner name="cube-grid" color={"#FF8F03"} />*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
}
