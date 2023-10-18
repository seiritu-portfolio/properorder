import React, { useEffect, useState } from "react";
import "../styles.scss";
import POHeader from "../../../components/POHeader";
import history from "../../../routes/history";
import { POCart } from "../../../models";
import APIManager from "../../../Network/APIManager";
import POSpinner from "../../../components/POSpinner";
import POAlert from "../../../components/POAlert";
import { connect } from "react-redux";
import Footer from "../../../components/POFooter";

import ProductDetailsContent from "./ProductDetailsContent";
import {
  getLocalCart,
  getPrevPath,
  storeLocalCart,
} from "../../../services/HelperService";
import * as userActions from "../../../redux/UserSaga/actions";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import POLoader from "../../../components/POLoader";
import POModal from "../../../components/POModal";
import AgeConfirm from "../../../components/AgeConfirm";

function ProductDetails(props) {
  const { productId } = useParams();
  const [seller, setSeller] = useState(null);
  const [product, setProduct] = useState();

  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [quantity, setQuantity] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [alertInfo, setAlertInfo] = React.useState({ open: false });

  const [modalVisible, setModalVisible] = React.useState(false);

  useEffect(() => {
    APIManager.fetchProduct(productId).then((res) => {
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
      product,
      quantity,
      selectedOptions: selectedOptions,
    };

    let newCart;
    if (existingCarts.length === 0) {
      newCart = POCart.generate({
        site_id: product.getSellerId(),
        products: [newProduct],
        site: seller,
      });
      storeLocalCart([...localCart, newCart]);
    } else {
      newCart = POCart.generate({
        ...existingCarts[0],
        products: [...existingCarts[0].products, newProduct],
      });
      if (
        existingCarts[0].products.some(
          (p) => p.product.id === newProduct.product.id
        )
      ) {
        const oProduct = existingCarts[0].products.find(
          (p) => p.product.id === newProduct.product.id
        );
        let sameProduct = true;
        for (let i = 0; i < oProduct.selectedOptions.length; i++) {
          const so = newProduct.selectedOptions[i];
          const oso = oProduct.selectedOptions[i];
          if (
            so == null ||
            so.id !== oso.id ||
            so.selected_id !== oso.selected_id
          ) {
            sameProduct = false;
          }
        }
        if (sameProduct) {
          newCart = POCart.generate({
            ...existingCarts[0],
            products: existingCarts[0].products.map((p) =>
              p.product.id === oProduct.product.id
                ? {
                    ...oProduct,
                    quantity: oProduct.quantity + newProduct.quantity,
                  }
                : p
            ),
          });
        }
      }
      storeLocalCart(
        localCart.map((c) => (c.site_id === newCart.site_id ? newCart : c))
      );
    }

    addedProduct("Added successfully!");
  };

  const handleAdd = () => {
    if (product?.tags.some((t) => t.name === "Alcohol")) {
      //show warning with age restriction
      setModalVisible(true);
    } else {
      handleContinueAdd();
    }
  };

  const handleContinueAdd = () => {
    if (userToken == null) {
      // setAlertInfo({
      //   open: true,
      //   message: "You need to login to add products to your order.",
      //   severity: "warning",
      // });
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
        setIsLoading(false);
        console.log("addProductToOrder", res);
        addedProduct("Added successfully!");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("addProductToOrder", err);
        handleFailure(err);
      });
  };

  const addedProduct = (message) => {
    // setAlertInfo({
    //   open: true,
    //   message,
    // });

    props.actions.fetchActiveOrders();
    const prevPathName = getPrevPath();
    if (prevPathName === `/seller/${product.getSellerId()}`) {
      history.push(prevPathName);
    } else {
      history.push({
        pathname: "/product-confirm",
        state: { seller, product },
      });
    }
  };

  const handleFailure = (error) => {
    setAlertInfo({
      open: true,
      message: error,
      severity: "error",
    });
  };

  if (product === undefined || seller == null) {
    return <POLoader />;
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      <POHeader classNames={"absolute w-full"} />
      <div className="product-header" />

      <ProductDetailsContent
        className={"md:mx-5 lg:mx-20 xl:mx-28 2xl:mx-56 z-10"}
        product={product}
        seller={seller}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        quantity={quantity}
        setQuantity={setQuantity}
        handleAdd={handleAdd}
      />

      <div className="mt-auto pt-6">
        <Footer />
      </div>
      <POSpinner isLoading={isLoading} />
      <POAlert
        alertInfo={alertInfo}
        handleClose={() => setAlertInfo({ open: false })}
      />
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
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
