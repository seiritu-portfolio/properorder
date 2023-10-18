import React, { useEffect } from "react";
import "../styles.scss";
import POHeader from "../../../components/POHeader";
import Success from "../../../assets/ic_success.png";
import ProductCard from "./SmallProductCard";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import clsx from "clsx";
import history from "../../../routes/history";
import PODrawerType from "../../../models/Enum/PODrawerType";
import * as rootActions from "../../../redux/RootSaga/actions";
import { connect } from "react-redux";
import Footer from "../../../components/POFooter";
import { POProduct, POSeller } from "../../../models";
import APIManager from "../../../Network/APIManager";
import POLoader from "../../../components/POLoader";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "3rem",
    paddingRight: "3rem",
    height: "4rem",
    fontSize: "1.25rem",
  },
  cancelButton: {
    backgroundColor: theme.palette.common.graylight,
    // order: 2,
    marginTop: "1rem",
    ["@media (min-width:768px)"]: {
      marginTop: "0",
      marginRight: "2rem",
      // order: -1,
    },
    "&:hover": {
      opacity: 1,
      backgroundColor: theme.palette.common.graylight,
    },
  },
}));

function ProductAddedToOrder(props) {
  const {
    actions: { openDrawer },
  } = props;

  const product = POProduct.fromState(props.location?.state?.product ?? {});
  const seller = POSeller.fromState(props.location?.state?.seller ?? {});
  const [products, setProducts] = React.useState(null);

  useEffect(() => {
    APIManager.fetchSellerProducts(seller.id).then((res) => {
      const newProducts = res.products.filter((p) => p.id !== product.id);
      setProducts(newProducts);
    });
  }, []);

  const classes = useStyles();
  return (
    <div className="flex flex-col w-full  min-h-screen">
      {products == null && <POLoader />}
      <POHeader classNames={"absolute w-full"} />
      <div className="product-header" />

      <div className="rectangle-container product-container bg-white md:mx-5 lg:mx-20 xl:mx-28 2xl:ml-48 z-10">
        <div className="py-8 px-6 lg:p-10">
          <div className="2xl:flex justify-center items-center text-center">
            <div className="flex justify-center">
              <img
                className={"h-12 mb-5 xl:mb-0 xl:mr-4"}
                src={Success}
                alt={"success"}
              />
            </div>
            <div className="2xl:flex items-center justify-center">
              <h3 className="font-normal text-2xl lg:text-2xl xl:text-3xl">
                <span className="font-bold">{product.name}</span>
              </h3>
              <p className="font-normal text-2xl lg:text-2xl xl:text-3xl">
                &nbsp;was added to
                <button
                  onClick={() => openDrawer(PODrawerType.my_order)}
                  className="font-bold text-po-yellowdark text-2xl lg:text-2xl xl:text-3xl"
                >
                  &nbsp;your order
                </button>
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-6 lg:mt-10 mb-5">
            <hr className="w-1/6 text-po-divideColor" />
          </div>
          <h4 className="text-center text-2xl text-graymain font-normal">
            Also by&nbsp;
            <a
              onClick={() => history.push(`/seller/${seller.id}`)}
              className="cursor-pointer font-bold text-po-yellowdark"
            >
              {seller.name}:
            </a>
          </h4>
          <div className="flex flex-wrap mx-4 xl:mx-20 2xl:mx-20 my-5 justify-center">
            {products != null &&
              products
                .slice(0, 8)
                .map((item, index) => <ProductCard key={index} item={item} />)}
          </div>
          <div
            className={
              "mx-4 md:mt-10 flex flex-col sm:flex-row sm:space-x-2 md:space-x-6 space-y-4 md:space-y-0 justify-center xl:mx-20 2xl:mx-20"
            }
          >
            <Button
              variant="contained"
              color="secondary"
              className={clsx(classes.root, classes.cancelButton, "h-full")}
              onClick={() => history.push("/home")}
            >
              Continue shopping
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={clsx(classes.root, "h-full")}
              onClick={() => history.push(`/seller/${seller.id}`)}
            >
              Visit {seller.name}
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-6">
        <Footer />
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  actions: {
    openDrawer: (drawerType) => {
      dispatch(rootActions.openDrawer(drawerType));
    },
  },
});

export default connect(null, mapDispatchToProps)(ProductAddedToOrder);
