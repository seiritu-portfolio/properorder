import React, { useEffect, useRef, useState } from "react";
import Products from "./Products/Products";
import About from "./About/About";
import Reviews from "./Reviews/Reviews";
import "./styles.scss";
import APIManager from "../../Network/APIManager";
import POAlert from "../../components/POAlert";
import AddProductModal from "./Products/AddProductModal";
import POModal from "../../components/POModal";
import Constants from "../../config/Constants";
import SellerTabBar from "./SellerTabBar";

export default function SellerDetail(props) {
  const {
    seller,
    loading,
    setLoading,
    productList,
    setProductList,
    selectedTypes,
    selectedCountries,
    finalProducts,
    setFinalProducts,
    maxPriceValue,
    abvValue,
    abvFilterHidden,
    countryFilterHidden,
  } = props;

  if (seller == null) {
    return null;
  }

  const productsRef = useRef();

  const [alertInfo, setAlertInfo] = React.useState({ open: false });

  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState("1");
  const [reviewPageNumber, setReviewPageNumber] = useState("1");
  const refs = seller.headers.map((_) => useRef(null));

  const [userReviews, setUserReviews] = React.useState([]);
  const [summary, setSummary] = React.useState([]);
  const [modalStatus, setModalStatus] = useState({ visible: false });
  const [searchByProduct, setSearchByProduct] = useState("");

  const [tabBarIndex, setTabBarIndex] = useState(props.tabIndex ?? 0);

  useEffect(() => {
    loadReviews();
    loadAllProducts(true);
  }, [seller]);

  useEffect(() => {
    reloadProducts();
  }, [
    searchByProduct,
    selectedTypes,
    selectedCountries,
    maxPriceValue,
    abvValue,
  ]);

  useEffect(() => {
    if (!loading && seller != null) {
      const productId = window.sessionStorage.getItem(
        Constants.SS_PRODUCT_MODAL_ID
      );
      if (productId != null) {
        window.sessionStorage.removeItem(Constants.SS_PRODUCT_MODAL_ID);
        setTimeout(() => {
          setModalStatus({ visible: true, item: { id: productId } });
        }, 1000);
      }
    }
  }, [loading, seller]);

  const onClickProductItem = (item) => {
    setModalStatus({ item, visible: true });
  };

  const loadReviews = () => {
    if (seller != null && reviewPageNumber != null) {
      APIManager.fetchReviews(seller.id, reviewPageNumber)
        .then((res) => {
          console.log(res);
          setUserReviews([...userReviews, ...res.reviews]);
          setReviewPageNumber(res.pagination.getNextPagePath());
          setSummary(res.summary);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const loadAllProducts = (reset = false) => {
    // if (seller != null && pageNumber != null) {
    if (seller == null) {
      return;
    }
    if (reset) {
      setLoading(true);
    }
    APIManager.fetchSellerProducts(seller.id)
      .then((res) => {
        console.log(res);
        if (reset) {
          setLoading(false);
        }
        // setProducts([...products, ...res.products]);
        setFinalProducts(res.products);
        reloadProducts(res.products);
        // setPageNumber(res.pagination.getNextPagePath());
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    // }
  };

  const reloadProducts = (result = finalProducts) => {
    const mSearchByProduct = searchByProduct.toLowerCase().trim();
    let productResult = result.filter(
      (r) =>
        (r.name ?? "").toLowerCase().includes(mSearchByProduct) ||
        (r.description ?? "").toLowerCase().includes(mSearchByProduct)
    );

    if (selectedTypes.length > 0) {
      productResult = productResult.filter((r) =>
        r.dietary_preferences.some((d) =>
          selectedTypes.some((t) => t.id === d.id)
        )
      );
    }

    if (selectedCountries.length > 0 && !countryFilterHidden) {
      productResult = productResult.filter((r) =>
        selectedCountries.some((c) => c.name === r.origin)
      );
    }

    if (maxPriceValue.value < Constants.MAX_PRICE) {
      productResult = productResult.filter(
        (r) => Number(r.getPrice()) <= maxPriceValue.getValue()
      );
    }

    // if (!abvFilterHidden && abvValue.value > 0) {
    //   productResult = productResult.filter((r) => r.abv <= abvValue.value);
    // }

    setProducts(productResult);
    const newProductList = seller.headers.map((header) => {
      return {
        header,
        products: productResult.filter(
          (product) => product.product_header_id === header.id
        ),
      };
    });
    setProductList(newProductList.filter((h) => h.products.length > 0));
  };

  return (
    <div
      ref={productsRef}
      className="relative flex flex-col md:mx-3 shadow-lg px-3 sm:px-8 py-2 lg:py-5 rounded-xl bg-white mb-12"
    >
      <SellerTabBar tabBarIndex={tabBarIndex} setTabBarIndex={setTabBarIndex} />
      {tabBarIndex === 0 && (
        <Products
          {...props}
          onClickProductItem={onClickProductItem}
          handleMore={() => {}}
          products={products}
          productList={productList}
          refs={refs}
          productsRef={productsRef}
          searchByProduct={searchByProduct}
          setSearchByProduct={setSearchByProduct}
        />
      )}
      {tabBarIndex === 1 && <About seller={seller} {...props} />}
      {tabBarIndex === 2 && (
        <Reviews
          {...props}
          seller={seller}
          userReviews={userReviews}
          setUserReviews={setUserReviews}
          setAlertInfo={setAlertInfo}
          loadReviews={loadReviews}
          summary={summary}
        />
      )}
      <POAlert
        alertInfo={alertInfo}
        handleClose={() => setAlertInfo({ open: false })}
      />
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
