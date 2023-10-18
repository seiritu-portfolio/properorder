import clsx from "clsx";
import POHomeProductsType from "../../../models/Enum/POHomeProductsType";
import React, { useEffect } from "react";

const getDimensions = (ele) => {
  const { height } = ele.getBoundingClientRect();
  const offsetTop = ele.offsetTop;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
};

export default function HomeHeaderCardsFilter(props) {
  const {
    favouriteRef,
    featuredRef,
    allProductsRef,
    sellersRef,
    canShowSellers,
    headerVisible,
    setHeaderVisible,
  } = props;

  const [visibleSection, setVisibleSection] = React.useState();
  const headerRef = React.useRef(null);

  const sectionRefs = [
    { section: POHomeProductsType.favourites, ref: favouriteRef },
    { section: POHomeProductsType.featured, ref: featuredRef },
    { section: POHomeProductsType.allProducts, ref: allProductsRef },
    { section: POHomeProductsType.sellers, ref: sellersRef },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const { height: headerHeight } = getDimensions(headerRef.current);
      const scrollPosition = window.scrollY + headerHeight;

      const selected = sectionRefs.find(({ section, ref }) => {
        const ele = ref.current;
        if (ele) {
          let { offsetBottom, offsetTop } = getDimensions(ele);
          if (
            section === POHomeProductsType.favourites ||
            section === POHomeProductsType.sellers
          ) {
            offsetTop = 0;
          }
          return scrollPosition > offsetTop && scrollPosition < offsetBottom;
        }
      });

      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
      }

      setHeaderVisible(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleSection]);

  const scrollTo = (ele) => {
    ele.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div
      className={clsx(
        "home-header-categories",
        headerVisible ? "block" : "hidden"
      )}
    >
      <div className="home-header-categories-container" ref={headerRef}>
        <button
          type="button"
          className={clsx(
            "home-header-link",
            visibleSection === POHomeProductsType.sellers &&
              "home-header-selected",
            !canShowSellers && "hidden"
          )}
          onClick={() => {
            scrollTo(sellersRef.current);
          }}
        >
          Sellers
        </button>
        <button
          type="button"
          className={clsx(
            "home-header-link",
            visibleSection === POHomeProductsType.favourites &&
              "home-header-selected",
            canShowSellers && "hidden"
          )}
          onClick={() => {
            scrollTo(favouriteRef.current);
          }}
        >
          Favourites
        </button>
        <button
          type="button"
          className={clsx(
            "home-header-link",
            visibleSection === POHomeProductsType.featured &&
              "home-header-selected",
            canShowSellers && "hidden"
          )}
          onClick={() => {
            scrollTo(featuredRef.current);
          }}
        >
          Featured
        </button>
        <button
          type="button"
          className={clsx(
            "home-header-link",
            visibleSection === POHomeProductsType.allProducts &&
              "home-header-selected"
          )}
          onClick={() => {
            scrollTo(allProductsRef.current);
          }}
        >
          {canShowSellers ? "Products" : "All products"}
        </button>
      </div>
    </div>
  );
}
