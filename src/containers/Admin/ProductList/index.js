import React, { useEffect, useState } from "react";
import "./styles.scss";
import clsx from "clsx";
import SearchBy from "../../../components/SearchBy";
import {
  InputBase,
  makeStyles,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import history from "../../../routes/history";
import APIManager from "../../../Network/APIManager";
import { connect } from "react-redux";
import PODecimalUtil from "../../../utils/PODecimalUtil";
import Spinner from "react-spinkit";
import { useParams } from "react-router-dom";
import * as adminActions from "../../../redux/AdminSaga/actions";
import ProductImagePlaceholder from "../../../assets/image_placeholder.png";
import { PlusSmIcon } from "@heroicons/react/outline";
import InfiniteScroll from "react-infinite-scroll-component";
import POAlert from "../../../components/POAlert";
import POSpinner from "../../../components/POSpinner";
import BackToTopButton from "../../../components/BackToTopBtn";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

const QUERY_SEARCH = "search";
const QUERY_STATUS = "status";

const useStyles = makeStyles({
  root: {
    width: "100%",
    paddingRight: 0,
    fontSize: "1rem",
    fontWeight: "bold",
  },
  inputRoot: {
    width: "100%",
    height: "2.5rem",
  },
  menuList: {
    paddingLeft: "0.5rem",
    fontSize: "1rem",
  },
  btn: {
    paddingLeft: "1.1rem",
    paddingRight: "1.1rem",
    minHeight: "2.4rem",
    fontWeight: "semibold",
    fontSize: "1.1rem",
    borderRadius: "0.4rem",
    marginLeft: "auto",
  },
});

function ProductList(props) {
  const { orgId, sellerIndex = -1 } = useParams();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search);
  const classes = useStyles();

  const [categories, setCategories] = React.useState([]);

  const [category, setCategory] = React.useState("");
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ open: false });

  const { products, totalProducts } = props.productDetails;

  useEffect(() => {
    props.actions.updateSellerIndex({ id: sellerIndex, status: false });
  }, [sellerIndex]);

  useEffect(() => {
    if (props.sellerIndex.status) {
      history.push(`/admin/${orgId}/site/${props.sellerIndex.id}/products`);
      props.actions.fetchAdminProducts({
        sellerIndex: props.sellerIndex.id,
      });
    }
  }, [props.sellerIndex]);

  const loadProducts = (reset = false) => {
    if (sellerIndex !== -1) {
      props.actions.fetchAdminProducts({
        reset,
        sellerIndex,
      });
    }
  };

  // useEffect(() => {
  //   APIManager.getTags()
  //     .then((res) => {
  //       setCategories(res);
  //     })
  //     .catch(() => {
  //       setCategories([]);
  //     });
  // }, []);

  const changeStatus = (product, status) => {
    console.log(product);
    setIsLoading(true);
    APIManager.createProduct(sellerIndex, product.id, {
      ...product,
      active: status,
    })
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        props.actions.updateAdminProducts(
          products.map((p) => (p.id === product.id ? res : p))
        );
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        setAlertInfo({
          open: true,
          message: error,
          severity: "warning",
        });
      });
  };

  return (
    <div className={"flex flex-1 flex-col p-8 2xl:px-24 bg-gray-100"}>
      <header className={"flex flex-row justify-between"}>
        <h2 className="text-2xl font-bold px-3">Product list</h2>
        <Button
          variant="contained"
          color="secondary"
          startIcon={
            <div className={"w-6 h-6"}>
              <PlusSmIcon />
            </div>
          }
          className={classes.btn}
          onClick={() =>
            history.push(`/admin/${orgId}/site/${sellerIndex}/products/-1`)
          }
        >
          Add new product
        </Button>
      </header>
      <p className="text-sm font-semibold px-3 mt-2 text-po-graydark">
        {totalProducts === 0 ? "No products" : `${totalProducts} products`}
      </p>

      <div className="grid grid-cols-5 gap-4 mt-6 px-4">
        <div className="flex flex-col col-span-2">
          <p className={"db-product-filter-label"}>Product Name</p>
          <SearchBy
            className={clsx("flex flex-1 rounded-r-lg")}
            placeholder="Search by name or product id"
            searchInputProps={{
              value: searchQuery.get(QUERY_SEARCH),
              onChange: (e) => {
                searchQuery.set(QUERY_SEARCH, e.target.value);
                history.replace({
                  pathname: location.pathname,
                  search: searchQuery.toString(),
                });
                loadProducts(true);
              },
            }}
          />
        </div>
        {/*
        <div className="flex flex-col">
          <p className={"db-product-filter-label"}>Category</p>
          <div className={"db-product-select-container"}>
            <Select
              displayEmpty
              classes={{ root: classes.root }}
              input={<InputBase classes={{ root: classes.inputRoot }} />}
              labelId="select"
              id="select"
              value={category}
              IconComponent={ExpandMoreIcon}
              onChange={(event) => setCategory(event.target.value)}
            >
              <MenuItem value={""} classes={{ gutters: classes.menuList }}>
                All
              </MenuItem>
              {categories.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item}
                  classes={{ gutters: classes.menuList }}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>

        <div className={"flex flex-col"}>
          <p className={"db-product-filter-label"}>Price</p>
          <div className={"flex flex-row"}>
            <input
              id="min_price"
              name="min_price"
              type="number"
              className="db-product-price-input"
              placeholder="Min"
              onChange={(evt) => {
                setMinPrice(evt.target.value);
              }}
              value={minPrice}
            />
            <input
              id="max_price"
              name="max_price"
              type="number"
              className="db-product-price-input ml-1"
              placeholder="Max"
              onChange={(evt) => {
                setMaxPrice(evt.target.value);
              }}
              value={maxPrice}
            />
          </div>
        </div>
        */}

        {/* TODO: Make the status filter working*/}
        <div className={"flex flex-col col-start-5"}>
          <p className={"db-product-filter-label"}>Status</p>
          <div className={"db-product-select-container"}>
            <Select
              displayEmpty
              classes={{ root: classes.root }}
              input={<InputBase classes={{ root: classes.inputRoot }} />}
              labelId="select_status"
              id="select_status"
              value={searchQuery.get(QUERY_STATUS) ?? -1}
              IconComponent={ExpandMoreIcon}
              onChange={(event) => {
                searchQuery.set(QUERY_STATUS, event.target.value);
                history.replace({
                  pathname: location.pathname,
                  search: searchQuery.toString(),
                });
                loadProducts(true);
              }}
            >
              <MenuItem value={-1} classes={{ gutters: classes.menuList }}>
                All
              </MenuItem>
              {[
                { name: "Live", value: 1 },
                { name: "Paused", value: 0 },
              ].map((s) => (
                <MenuItem
                  key={s.name}
                  value={s.value}
                  classes={{ gutters: classes.menuList }}
                >
                  {s.name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-6">
        <div className="overflow-x-auto sm:-mx-4 lg:-mx-6">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <InfiniteScroll
                dataLength={products.length}
                next={() => loadProducts()}
                hasMore={products.length < totalProducts}
              >
                <table className=" min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="db-product-th">
                        #
                      </th>
                      <th scope="col" className="db-product-th">
                        SKU
                      </th>
                      <th scope="col" className="db-product-th">
                        Image
                      </th>
                      <th scope="col" className="db-product-th">
                        Product name
                      </th>
                      <th scope="col" className="db-product-th">
                        Tags
                      </th>
                      <th scope="col" className="db-product-th">
                        Price
                      </th>
                      <th scope="col" className="db-product-th">
                        Status
                      </th>
                      <th scope="col" className="db-product-th">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((p, index) => {
                      const product = p;
                      return (
                        <tr key={`${index}`}>
                          <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">
                            {index + 1}
                          </td>
                          <td className="px-4 py-4 text-xs text-gray-500">
                            {product.sku ? <span> {product.sku} </span> : null}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-gray-500">
                            <img
                              className="h-10 w-16 object-cover"
                              src={product.image ?? ProductImagePlaceholder}
                              alt="Product image"
                            />
                          </td>
                          <td className="px-4 py-4 w-32 max-w-xs">
                            <a
                              className={"flex cursor-pointer"}
                              onClick={() =>
                                history.push(
                                  `/admin/${orgId}/site/${sellerIndex}/products/${product.id}`
                                )
                              }
                            >
                              <div className="text-sm truncate max-w-xs font-medium text-po-blue underline">
                                <p className="truncate">{product.name}</p>
                              </div>
                              {/* Pencil icon hidden:
                            <FiEdit3
                              className={"w-4 h-4 ml-1 text-po-blue"}
                            />
                            */}
                            </a>
                          </td>
                          <td className="px-4 py-4 w-32 max-w-xs">
                            <div className="text-sm truncate font-medium text-gray-900 max-w-xs">
                              <p className="truncate">
                                {product.getTagLabel()}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {PODecimalUtil.getPriceDecimalString(
                                product.price
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {product.active ? (
                              <span className="px-2 inline-flex text-sm leading-6 font-bold text-green-600">
                                Live
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-sm leading-6 font-bold text-red-800">
                                Paused
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {product.active ? (
                              <button
                                className="text-base font-semibold cursor-pointer text-gray-900 bg-po-yellowlight hover:bg-po-yellowdark px-2 py-1 rounded-lg"
                                onClick={() => changeStatus(product, 0)}
                              >
                                Pause&nbsp;
                              </button>
                            ) : (
                              <button
                                className="text-base font-semibold cursor-pointer text-white bg-green-500 hover:bg-green-700 px-2 py-1 rounded-lg"
                                onClick={() => changeStatus(product, 1)}
                              >
                                Resume
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>

      {props.loadingProducts && (
        <div className={"db-product-loader-container"}>
          <Spinner
            name="ball-spin-fade-loader"
            fadeIn="none"
            color={"#E27F03"}
          />
        </div>
      )}

      <POAlert
        alertInfo={alertInfo}
        handleClose={() => setAlertInfo({ open: false })}
      />
      <POSpinner isLoading={isLoading} />
      <BackToTopButton />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.User.user,
  sellerIndex: state.Admin.sellerIndex,
  productDetails: state.Admin.productDetails,
  loadingProducts: state.Admin.updateProcessing,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateSellerIndex: (sellerId) => {
      dispatch(adminActions.updateSellerIndex(sellerId));
    },
    fetchAdminProducts: (request) => {
      dispatch(adminActions.fetchAdminProducts(request));
    },
    updateAdminProducts: (products) => {
      dispatch(adminActions.updateAdminProducts(products));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
