import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import ProductDetailsContent from "../../Product/ProductDetails/ProductDetailsContent";
// import PerfectScrollbar from "react-perfect-scrollbar";
import * as userActions from "../../../redux/UserSaga/actions";
import { connect } from "react-redux";
import APIManager from "../../../Network/APIManager";
import {
  getLocalCart,
  getStoredAgeStatus,
  storeLocalCart,
} from "../../../services/HelperService";
import { POCart, PODeliveryMode } from "../../../models";
import history from "../../../routes/history";
import POSpinner from "../../../components/POSpinner";
import POAlert from "../../../components/POAlert";
import POModal from "../../../components/POModal";
import AgeConfirm from "../../../components/AgeConfirm";
import Spinner from "react-spinkit";
import Constants from "../../../config/Constants";
import POProductService from "../../../services/POProductService";

const useStyles = makeStyles((theme) => ({
  close: {
    color: "#FFAA13",
    fontSize: "28px",
  },
  icon: {
    backgroundColor: theme.palette.common.primary,
    borderRadius: 14,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    paddingLeft: "3rem",
    paddingRight: "3rem",
    minHeight: "3rem",
  },
  cancelButton: {
    backgroundColor: theme.palette.common.graylight,
    "&:hover": {
      opacity: 1,
      backgroundColor: theme.palette.common.graylight,
    },
    display: "none",
    ["@media (min-width:640px)"]: {
      display: "flex",
    },
  },
}));

function AddProductModal(props) {
  const { handleCloseModal, item } = props;
  const classes = useStyles();

  const [seller, setSeller] = useState(null);
  const [product, setProduct] = useState();

  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [triedSubmit, setTriedSubmit] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [alertInfo, setAlertInfo] = React.useState({ open: false });

  const [modalVisible, setModalVisible] = React.useState(false);
  const productComesFrom = window.sessionStorage.getItem(
    Constants.SS_PRODUCT_COMING_FROM
  );

  const [startHiding, setStartHiding] = useState(0);

  useEffect(() => {
    APIManager.fetchProduct(item.id).then((res) => {
      console.log(res);
      setProduct(res);
      setSelectedOptions(res.options.map((option) => ({ id: option.id })));
      APIManager.fetchSeller(res.getSellerId()).then((resSeller) => {
        setSeller(resSeller);
      });
    });
  }, []);

  const { userToken } = props;

  const storeCart = async () => {
    const localCart = await getLocalCart();

    const existingCarts = localCart.filter(
      (c) => c.site_id === product.getSellerId()
    );

    const newProduct = {
      product: {
        ...product,
        price: product.getCalculatedTotal(quantity, selectedOptions),
      },
      quantity,
      selectedOptions: selectedOptions,
    };

    let delivery_method = generateDeliveryMethod();

    let newCart;
    if (existingCarts.length === 0) {
      newCart = POCart.generate({
        site_id: product.getSellerId(),
        products: [newProduct],
        site: seller,
        delivery_method,
      });
      storeLocalCart([...localCart, newCart]);
    } else {
      const oProduct = existingCarts[0].products.find((p) =>
        POProductService.isSameLocalProduct(p, newProduct)
      );
      if (oProduct) {
        newCart = POCart.generate({
          ...existingCarts[0],
          products: existingCarts[0].products.map((p) =>
            POProductService.isSameLocalProduct(p, oProduct)
              ? {
                  ...oProduct,
                  quantity: oProduct.quantity + newProduct.quantity,
                }
              : p
          ),
        });
      } else {
        newCart = POCart.generate({
          ...existingCarts[0],
          products: [...existingCarts[0].products, newProduct],
          delivery_method:
            existingCarts[0].products.length === 0
              ? delivery_method
              : existingCarts[0].delivery_method,
        });
      }
      storeLocalCart(
        localCart.map((c) => (c.site_id === newCart.site_id ? newCart : c))
      );
    }

    addedProduct("Added successfully!");
  };

  const handleAdd = () => {
    if (
      product?.tags.some((t) => t.name === "Alcohol") &&
      getStoredAgeStatus() !== "Yes"
    ) {
      setModalVisible(true);
    } else {
      handleContinueAdd();
    }
  };

  const handleContinueAdd = () => {
    setTriedSubmit(false);
    if (selectedOptions.length > 0) {
      if (selectedOptions.some((s) => s.selected_id == null)) {
        setTriedSubmit(true);
        return;
      }
    }

    setModalVisible(false);
    if (userToken == null) {
      storeCart();
      return;
    }

    setIsLoading(true);
    APIManager.fetchActiveOrders()
      .then((orders) => {
        const existingOrders = orders.filter(
          (order) => order.site_id === product.getSellerId()
        );
        if (existingOrders.length === 0) {
          startAddCart(null);
        } else {
          startAddCart(existingOrders[0]);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        handleFailure(error);
      });
  };

  const startAddCart = async (order) => {
    if (order == null) {
      // start new order
      console.log("starting a new order");
      APIManager.createOrder(product.getSellerId())
        .then((result) => {
          console.log(result);
          addProductToOrder(result);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
          handleFailure(error);
        });
    } else {
      // add the given product to the order
      console.log("existing order");
      addProductToOrder(order);
    }
  };

  const addProductToOrder = (order) => {
    const body = {
      product_id: product.id,
      quantity,
      options:
        selectedOptions.length > 0 ? JSON.stringify(selectedOptions) : "",
    };
    // Generate an orderItem and add it to the cart
    APIManager.addProductToOrder(order.id, body)
      .then((res) => {
        console.log("addProductToOrder", res);
        if (generateDeliveryMethod() === "" || order.delivery_method) {
          setIsLoading(false);
          addedProduct("Added successfully!");
          return;
        }
        APIManager.updateOrder(order.id, {
          delivery_method: generateDeliveryMethod(),
        })
          .then((res) => {
            console.log(res);
            setIsLoading(false);
            addedProduct("Added successfully!");
          })
          .catch((error) => {
            setIsLoading(false);
            handleFailure(error);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("addProductToOrder", err);
        handleFailure(err);
      });
  };

  const addedProduct = (message) => {
    setAlertInfo({
      open: true,
      message,
    });

    setStartHiding(1);

    setTimeout(() => {
      setStartHiding(2);
    }, 700);

    setTimeout(() => {
      handleCloseModal();
      // history.push({
      //   pathname: `/seller/${product.getSellerId()}`,
      //   state: { productHeaderId: product.product_header_id },
      // });
      props.actions.updateCartBadgeStatus(true);
    }, 850);

    props.actions.fetchActiveOrders();
    // const prevPathName = getPrevPath();
    // if (prevPathName === `/seller/${product.getSellerId()}`) {
    //   history.push(prevPathName);
    // } else {
    //   history.push({
    //     pathname: "/product-confirm",
    //     state: { seller, product },
    //   });
    // }
  };

  const handleFailure = (error) => {
    setAlertInfo({
      open: true,
      message: error,
      severity: "error",
    });
    setTimeout(() => {
      handleCloseModal();
    }, 1000);
  };

  const generateDeliveryMethod = () => {
    let delivery_method = "";
    const lastDeliveryFilter = window.sessionStorage.getItem(
      Constants.SS_LAST_DELIVERY_MODE
    );

    const sellerDM = seller.delivery_method;
    if (sellerDM === "delivery") {
      delivery_method = "delivery";
    } else if (sellerDM === "collection") {
      delivery_method = "collection";
    } else {
      if (lastDeliveryFilter === PODeliveryMode.delivery) {
        delivery_method = "delivery";
      } else if (lastDeliveryFilter === PODeliveryMode.collection) {
        delivery_method = "collection";
      } else if (lastDeliveryFilter === PODeliveryMode.both) {
        delivery_method = "";
      }
    }
    return delivery_method;
  };

  return (
    <div
      className={`flex flex-col bg-white w-full add-product-modal-container ${
        startHiding === 1
          ? "add-product-modal-container-anim"
          : startHiding === 2
          ? "hidden"
          : ""
      }`}
    >
      {product === undefined || seller == null ? (
        <div
          className={
            "flex flex-row flex-1 items-center justify-center pb-32 pt-32"
          }
        >
          <Spinner
            name="ball-spin-fade-loader"
            fadeIn="none"
            color={"#E27F03"}
          />
        </div>
      ) : (
        <div className={"flex-row flex flex-1"}>
          <div
            className={
              "flex flex-col flex-1 opacity-100 add-product-modal-content"
            }
          >
            <button
              onClick={handleCloseModal}
              className="close-btn transform transition duration-300 ease-out"
            >
              <Close className={classes.close} />
            </button>
            <div className={"flex flex-row flex-1"}>
              <ProductDetailsContent
                backNeeded={false}
                footerNeeded={true}
                product={product}
                seller={seller}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                triedSubmit={triedSubmit}
                quantity={quantity}
                setQuantity={setQuantity}
                handleAdd={handleAdd}
                cancelOption={{
                  label: productComesFrom.includes("/seller")
                    ? "Cancel"
                    : "Back to products",
                  action: () => handleCloseModal(),
                }}
              />
            </div>
          </div>
        </div>
      )}
      <POSpinner isLoading={isLoading} />
      <div className={"hidden md:block"}>
        <POAlert
          alertInfo={alertInfo}
          handleClose={() => setAlertInfo({ open: false })}
        />
      </div>
      <POModal
        modalVisible={modalVisible}
        handleCloseModal={() => setModalVisible(false)}
        renderContent={() => (
          <AgeConfirm
            handleCloseModal={() => setModalVisible(false)}
            handleContinue={handleContinueAdd}
          />
        )}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  userToken: state.User.userToken,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchActiveOrders: () => {
      dispatch(userActions.fetchActiveOrders());
    },
    updateCartBadgeStatus: (updated) => {
      dispatch(userActions.updateCartBadgeStatus(updated));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProductModal);
