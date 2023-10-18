import React from "react";
import "../styles.scss";
import ProductItem from "./ProductItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { PODeliveryMode } from "../../../models";

export default function HomeProducts(props) {
  const {
    variant,
    products,
    searchString = "",
    visible = true,
    loadMore,
    totalProducts,
    titleVisible,
    deliveryMode = PODeliveryMode.both,
    onClickProduct = () => {},
  } = props;

  const renderProducts = () => (
    <ul className="product-item-sub-container">
      {products.map((item, index) => (
        <ProductItem
          key={index}
          item={item}
          deliveryMode={deliveryMode}
          onClickItem={onClickProduct}
        />
      ))}
    </ul>
  );

  return (
    <div className={visible ? "" : "hidden"}>
      {titleVisible && (
        <div className={"flex flex-row items-center ml-1 mr-4 mt-4 md:mt-0"}>
          {/*<h4 className="text-po-graymain text-sm">{`${*/}
          {/*  totalProducts === 0*/}
          {/*    ? "No results found"*/}
          {/*    : `${searchString === "" ? variant : "Products"}`*/}
          {/*} `}</h4>*/}
          {/*<h4 className={"font-semibold text-sm text-po-graydark pl-1"}>{`${*/}
          {/*  totalProducts === 0 ? "" : `(${totalProducts})`*/}
          {/*}`}</h4>*/}
          <h4 className="text-po-graymain text-sm">{`${
            searchString === "" ? variant : "Products"
          } `}</h4>
          <h4
            className={"font-semibold text-sm text-po-graydark pl-1"}
          >{`(${totalProducts})`}</h4>
        </div>
      )}

      {loadMore ? (
        <InfiniteScroll
          dataLength={products.length}
          next={loadMore}
          hasMore={visible}
        >
          {renderProducts()}
        </InfiniteScroll>
      ) : (
        renderProducts()
      )}
    </div>
  );
}
