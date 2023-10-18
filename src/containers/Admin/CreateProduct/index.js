import React, { useEffect, useState } from "react";
import "./styles.scss";
import GoBack from "../Common/GoBack";
import history from "../../../routes/history";
import ProductImages from "./ProductImages";
import ProductDetails from "./ProductDetails";
import ProductOptions from "./ProductOptions";
import POAlert from "../../../components/POAlert";
import "react-perfect-scrollbar/dist/css/styles.css";
import ProductCategorySelector from "./ProductCategorySelector";
import AdditionalOptions from "./ProductOptions/AdditionalOptions";
import ProductDMSelector from "./ProductDMSelector";
import ProductSKU from "./ProductSKU";
import { Button, makeStyles } from "@material-ui/core";
import { useStyles } from "./classes";
import AllergensSelector from "./AllergensSelector";
import TagsSelector from "./TagsSelector";
import POModal from "../../../components/POModal";
import PreviewProductItem from "./PreviewProductItem";
import { POProduct } from "../../../models";
import ProductStatus from "./ProductStatus";
import ProductDiscount from "./ProductDiscount";
import { connect } from "react-redux";
import POSpinner from "../../../components/POSpinner";
import APIManager from "../../../Network/APIManager";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import POLoader from "../../../components/POLoader";
import POProductService from "../../../services/POProductService";
import DPSelector from "./DPSelector";
import ProductHeaderSelector from "./ProductHeaderSelector";
import Spinner from "react-spinkit";
import * as adminActions from "../../../redux/AdminSaga/actions";
import POFileService from "../../../services/POFileService";
import { PlusSmIcon } from "@heroicons/react/outline";
import { classNames } from "./classes";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";

const useStyle = makeStyles((theme) => ({
  btn: {
    paddingLeft: "1.1rem",
    paddingRight: "1.1rem",
    minHeight: "2.4rem",
    fontWeight: "700",
    fontSize: "1.1rem",
    borderRadius: "0.4rem",
    marginRight: "auto",
    marginBottom: "0.4rem",
  },
  previewBtn: {
    paddingLeft: "1.1rem",
    paddingRight: "1.1rem",
    minHeight: "2.4rem",
    fontWeight: "500",
    fontSize: "1.1rem",
    borderRadius: "0.4rem",
    marginRight: "1rem",
    marginBottom: "0.4rem",
    backgroundColor: "#ffffff",
    "&:hover": {
      backgroundColor: "#FFFEFC",
    },
  },
}));

function CreateProduct(props) {
  const classes = useStyles();
  const { sellerIndex = -1, productId, orgId } = useParams();
  const btnClass = useStyle();

  useEffect(() => {
    props.actions.updateSellerIndex({ id: sellerIndex, status: false });
  }, [sellerIndex]);

  useEffect(() => {
    if (props.sellerIndex.status) {
      history.push(
        `/admin/${orgId}/site/${props.sellerIndex.id}/products/${productId}`
      );
    }
  }, [props.sellerIndex]);

  const [product, setProduct] = useState();

  const [optionsVisible, setOptionsVisible] = React.useState(false);

  const isEditMode = productId !== "-1";

  const [productName, setProductName] = useState(product?.name ?? "");
  const [productCode, setProductCode] = useState("");
  const [productDescription, setProductDescription] = useState(
    product?.description ?? ""
  );
  const [productPrice, setProductPrice] = useState(product?.price ?? "");
  const [productImages, setProductImages] = useState({});
  const initialFiles = product?.images ?? {};

  const [options, setOptions] = useState(
    product?.options ?? [{ variants: [{ price: "" }] }]
  );

  const [selectedCategories, setSelectedCategories] = useState([
    { category: null },
  ]);

  const [productHeaderId, setProductHeaderId] = useState("");

  const [categoryDetails, setCategoryDetails] = useState({});

  const [deliveryOptions, setDeliveryOptions] = useState(
    product?.delivery_method ?? "Both"
  );
  const [deliveryInfo, setDeliveryInfo] = useState({
    estimatedDelivery: "Same day",
    readyCollect: "Same day",
  });

  const [plasticFree, setPlasticFree] = useState(
    product?.plastic_free ?? false
  );
  const [isBundle, setIsBundle] = useState(false);
  const [isActive, setActive] = useState(product?.active ?? false);

  const [allergens, setAllergens] = useState(product?.allergens ?? []);
  const [dietaryPreferences, setDietaryPreferences] = useState([]);
  // const [tags, setTags] = useState(product?.tags ?? []);

  const [alertInfo, setAlertInfo] = useState({ open: false });
  const [previewModalState, setPreviewModalState] = useState({
    visible: false,
    previewItem: {},
  });

  const [seller, setSeller] = useState();
  const [isLoading, setIsLoading] = useState(false);

  let isDefaultImage = true;

  useEffect(() => {
    if (sellerIndex !== -1) {
      setSeller(props.user.sites.find((s) => s.id === Number(sellerIndex)));
    }
  }, [props.user, sellerIndex]);

  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    if (!isEditMode) {
      APIManager.getTags().then((res) => {
        setAllCategories(res);
      });
    }
  }, []);

  useEffect(() => {
    if (sellerIndex !== -1 && productId !== "-1") {
      APIManager.fetchAdminProduct(sellerIndex, productId)
        .then((res) => {
          console.log("edit product with ", res);
          setProductDescription(res.description);
          setProduct(res);
          setProductName(res.name);
          setProductPrice(Number(res.price / 100).toFixed(2));
          if (res.options?.length > 0) {
            setOptions(
              res.options.map((option) => ({
                ...option,
                variants: option.variants.map((v) => ({
                  ...v,
                  price: Number(v.price / 100).toFixed(2),
                })),
              }))
            );
            setOptionsVisible(true);
          }
          setProductCode(res.product_code);
          setPlasticFree(res.plastic_free);
          setIsBundle(res.bundle);
          setActive(res.active);
          setCategoryDetails({
            origin: res.origin,
            pairing: res.pairing,
            abv: Number(res.abv / 100).toFixed(2),
          });
          setAllergens(res.allergens);
          setDietaryPreferences(res.dietary_preferences);
          setProductHeaderId(res.product_header_id ?? "");

          APIManager.getTags().then((ac) => {
            setAllCategories(ac);
            if (res.tags.length > 0) {
              let step = 0;
              let sCategories = [];
              while (step < res.tags.length) {
                const c = ac.find((v) => v.id === res.tags[step].id);
                if (c != null) {
                  step++;
                  const sCategory = POProductService.findCategory(
                    c,
                    res.tags,
                    step
                  );
                  if (sCategory != null) {
                    step++;
                    if (sCategory.secondSubCategory != null) {
                      step++;
                    }
                    sCategories = [...sCategories, sCategory];
                  } else {
                    if (res.tags.length === 1) {
                      sCategories = [...sCategories, { category: c }];
                    }
                  }
                } else {
                  const c = ac.find((v) =>
                    v.children.some((s) => s.id === res.tags[step].id)
                  );
                  if (c != null) {
                    const sCategory = POProductService.findCategory(
                      c,
                      res.tags,
                      step
                    );
                    step++;
                    if (sCategory != null) {
                      if (sCategory.secondSubCategory != null) {
                        step++;
                      }
                      sCategories = [...sCategories, sCategory];
                    }
                  } else {
                    const c = ac.find((v) =>
                      v.children.some((s) =>
                        s.children.some((l) => l.id === res.tags[step].id)
                      )
                    );
                    if (c != null) {
                      const fc = c.children.find((v) =>
                        v.children.some((s) => s.id === res.tags[step].id)
                      );
                      if (fc != null) {
                        const sc = fc.children.find(
                          (v) => v.id === res.tags[step].id
                        );
                        if (sc != null) {
                          sCategories = [
                            ...sCategories,
                            {
                              category: c,
                              firstSubCategory: fc,
                              secondSubCategory: sc,
                            },
                          ];
                        }
                      }
                    }
                    step++;
                  }
                }
              }
              setSelectedCategories(sCategories);
            }
          });
        })
        .catch((error) => console.log(error));
    }
  }, [sellerIndex]);

  if (isEditMode && product == null) {
    return (
      <div className={"flex flex-1 flex-col p-8 items-center justify-center"}>
        <Spinner name="ball-spin-fade-loader" fadeIn="none" color={"#E27F03"} />
      </div>
    );
  }

  const handleClickPreview = () => {
    const previewItem = generatePreviewItem();
    if (previewItem == null) {
      return;
    }

    // preview
    setPreviewModalState({ visible: true, previewItem });
  };

  const generatePreviewItem = () => {
    // validation
    let message = "";

    if (productName === "") {
      message = "Product name field is required";
    }

    /* if (productDescription === "") {
       message = "Description field is required";
     }*/

    if (productPrice === "") {
      message = "Price field is required";
    }

    if (productHeaderId === "") {
      message = "Product header is required";
    }

    /*if (productImages[0] === undefined) {
      message = "You need to add the cover picture";
    }*/

    for (const {
      category,
      firstSubCategory,
      secondSubCategory,
    } of selectedCategories) {
      if (category == null) {
        message = "Category field is required";
      } else {
        if (category.children?.length > 0) {
          if (firstSubCategory == null) {
            message = "Subcategory 1 is required";
          } else {
            // if (categoryDetails.countryOfOrigin === undefined) {
            //   message = "Country of Origin is required";
            // }

            if (
              firstSubCategory.children?.length > 0 &&
              secondSubCategory == null
            ) {
              message = "Subcategory 2 is required";
            }
          }
        }
      }
    }

    /*if (productCode === "") {
      message = "Product code is required";
    }*/

    // if (deliveryOptions == null) {
    //   message = "Delivery option is required";
    // } else {
    //   if (deliveryOptions === "Both" || deliveryOptions === "Delivery Only") {
    //     if (deliveryInfo?.estimatedDelivery == null) {
    //       message = "Estimated delivery is required";
    //     }
    //   }
    //
    //   if (deliveryOptions === "Both" || deliveryOptions === "Collection Only") {
    //     if (deliveryInfo?.readyCollect == null) {
    //       message = "Ready to Collect is required";
    //     }
    //   }
    // }

    const generatedOptions = options
      .filter((option) => option.name !== undefined && option.name !== "")
      .map((option, index) => ({
        id: index,
        name: option.name,
        variants: option.variants.filter(
          (variant) => variant.name !== undefined && variant.name !== ""
        ),
      }));

    if (message !== "") {
      setAlertInfo({
        open: true,
        message,
        severity: "warning",
      });
      return null;
    }

    if (generatedOptions.length === 0 && optionsVisible) {
      setAlertInfo({
        open: true,
        message: "Product options is required",
        severity: "warning",
      });
      return null;
    }

    let tags = [];

    for (const {
      category,
      firstSubCategory,
      secondSubCategory,
    } of selectedCategories) {
      if (category != null) {
        tags = [...tags, category];
      }
      if (firstSubCategory != null) {
        tags = [...tags, firstSubCategory];
      }
      if (secondSubCategory != null) {
        tags = [...tags, secondSubCategory];
      }
    }

    console.log(productImages);
    console.log("categoryDetails", categoryDetails);

    return POProduct.fromState({
      seller,
      name: productName,
      price: productPrice,
      description: productDescription,
      origin: categoryDetails.countryOfOrigin,
      pairing: categoryDetails.foodParing,
      abv:
        categoryDetails.abv == null || categoryDetails.abv === ""
          ? null
          : (Number(categoryDetails.abv) * 100).toFixed(),
      tags,
      allergens,
      dietary_preferences: dietaryPreferences,
      options: generatedOptions.length === 0 ? null : generatedOptions,
      plastic_free: plasticFree ? 1 : 0,
      bundle: isBundle ? 1 : 0,
      images: Object.keys(productImages)
        .filter((k) => productImages[k] !== undefined)
        .map((key, index) => ({
          id: index,
          prevImage: productImages[key],
        })),
      product_code: productCode,
      active: isActive ? 1 : 0,
      product_header_id: productHeaderId,
    });
  };

  const handleClosePreviewModal = () => {
    setPreviewModalState({ ...previewModalState, visible: false });
  };

  const handleSaveProduct = () => {
    handleClosePreviewModal();
    const generatedProduct = generatePreviewItem();
    if (generatedProduct == null) {
      return;
    }
    setIsLoading(true);
    isDefaultImage = true;
    if (generatedProduct.images.some((image) => image.prevImage != null)) {
      uploadFile(generatedProduct, 0);
    } else {
      continueSaveProduct({ ...generatedProduct, images: [] });
    }
  };

  const uploadFile = (generatedProduct, currentProcessingIndex) => {
    if (currentProcessingIndex >= generatedProduct.images.length) {
      continueSaveProduct(generatedProduct);
      return;
    }

    const image = generatedProduct.images[currentProcessingIndex].prevImage;
    POFileService.storeFile(image)
      .then((response) => {
        uploadFile(
          {
            ...generatedProduct,
            [`images[${currentProcessingIndex}][key]`]: response.uuid,
            [`images[${currentProcessingIndex}][ext]`]: response.extension,
            [`images[${currentProcessingIndex}][default]`]: isDefaultImage,
          },
          currentProcessingIndex + 1
        );
        isDefaultImage = false;
      })
      .catch((error) => {
        setIsLoading(false);
        setAlertInfo({
          open: true,
          message: "Image upload failed, please tray again later",
          severity: "warning",
        });
      });
    // if (image.path == null) {
    //   uploadFile(generatedProduct, currentProcessingIndex + 1);
    // } else {
    //
    // }
  };

  const continueSaveProduct = (generatedProduct) => {
    console.log("generatedProduct", generatedProduct);
    APIManager.createProduct(seller.id, product?.id, {
      ...generatedProduct,
      price: (Number(generatedProduct.price) * 100).toFixed(0),
    })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setAlertInfo({
          open: true,
          message: isEditMode
            ? "Updated successfully!"
            : "Created successfully!",
        });
        if (isEditMode) {
          props.actions.updateAdminProducts(
            props.productDetails.products.map((p) =>
              p.id === res.id ? res : p
            )
          );
          setTimeout(() => {
            gotoProducts();
          }, 1500);
        } else {
          props.actions.fetchAdminProducts({
            sellerIndex: props.user.sites[0].id,
          });
          setTimeout(() => {
            history.push(
              `/admin/${orgId}/site/${props.sellerIndex.id}/products`
            );
          }, 1500);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setAlertInfo({
          open: true,
          message: "Cannot apply now, try again later",
          severity: "warning",
        });
      });
  };

  const gotoProducts = () => {
    // history.push(`/admin/${orgId}/site/${props.sellerIndex.id}/products`);
    history.goBack();
  };

  return (
    <PerfectScrollbar
      className={"flex flex-1 flex-col p-3 sm:p-8 2xl:px-24 bg-gray-100"}
    >
      <GoBack title={"Back to all products"} onClick={() => gotoProducts()} />
      <div
        className={
          "flex flex-col sm:flex-row sm:items-center justify-between mt-4"
        }
      >
        <div className={"flex flex-row items-center"}>
          <h2 className="text-2xl font-bold">
            {isEditMode ? "Edit" : "Add new"} product
          </h2>
          {isEditMode && <p className="mt-1.5 ml-6">PO-{product.id}</p>}
        </div>
        {/*
        <ProductStatus visible={isEditMode} />
        */}
        <div className="flex">
          <Button
            variant="contained"
            color="secondary"
            className={btnClass.previewBtn}
            onClick={handleClickPreview}
          >
            Preview product page
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={btnClass.btn}
            onClick={() => handleSaveProduct()}
          >
            Save
          </Button>
        </div>
      </div>
      <div className={"grid grid-cols-1 xl:grid-cols-2 gap-12 mt-3 px-1"}>
        <ProductDetails
          productName={productName}
          setProductName={setProductName}
          productDescription={productDescription}
          setProductDescription={setProductDescription}
          productPrice={productPrice}
          setProductPrice={setProductPrice}
          productCode={productCode}
          setProductCode={setProductCode}
        />
        <div className="flex flex-col justify-between items-between mt-8 lg:mt-0">
          <ProductImages
            initialFiles={initialFiles}
            productImages={productImages}
            setProductImages={setProductImages}
          />
          {!optionsVisible && (
            <div className={"mt-12"}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={
                  <div className={"w-6 h-6"}>
                    <PlusSmIcon />
                  </div>
                }
                className={btnClass.btn}
                onClick={() => {
                  setOptionsVisible(true);
                }}
              >
                Add product option
              </Button>
              <p className={classNames.inputDescription}>
                If a product has different options, please click the button
                above and specify product option name with corresponding
                variants and prices.
              </p>
            </div>
          )}
        </div>
      </div>
      {optionsVisible ? (
        <div className="border border-po-graymedium shadow-sm border-solid rounded-md py-2 px-2 my-4">
          <ProductOptions
            options={options}
            setOptions={setOptions}
            setAlertInfo={setAlertInfo}
            setOptionsVisible={setOptionsVisible}
            productPrice={productPrice}
          />
        </div>
      ) : null}
      <div className="border border-po-graymedium shadow-sm rounded-md border-solid py-2 px-2 my-4">
        <ProductCategorySelector
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          allCategories={allCategories}
        />
      </div>
      <AdditionalOptions
        selectedCategories={selectedCategories}
        categoryDetails={categoryDetails}
        setCategoryDetails={setCategoryDetails}
      />
      {/*<ProductDMSelector*/}
      {/*  deliveryOptions={deliveryOptions}*/}
      {/*  setDeliveryOptions={setDeliveryOptions}*/}
      {/*  deliveryInfo={deliveryInfo}*/}
      {/*  setDeliveryInfo={setDeliveryInfo}*/}
      {/*/>*/}
      <ProductSKU
        plasticFree={plasticFree}
        setPlasticFree={setPlasticFree}
        isBundle={isBundle}
        setIsBundle={setIsBundle}
        isActive={isActive}
        setActive={setActive}
      />
      <DPSelector
        dietaryPreferences={dietaryPreferences}
        setDietaryPreferences={setDietaryPreferences}
      />
      <AllergensSelector allergens={allergens} setAllergens={setAllergens} />
      <ProductHeaderSelector
        sellerIndex={sellerIndex}
        productHeaderId={productHeaderId}
        setProductHeaderId={setProductHeaderId}
      />
      {/*<TagsSelector tags={tags} setTags={setTags} />*/}
      {/*<ProductDiscount />*/}
      <div className="flex flex-1 justify-center">
        <Button
          variant="contained"
          color="secondary"
          className={classes.previewBtn}
          onClick={() => handleSaveProduct()}
        >
          Save
        </Button>
      </div>
      <POAlert
        alertInfo={alertInfo}
        handleClose={() => setAlertInfo({ open: false })}
      />
      <POSpinner isLoading={isLoading} />
      <POModal
        modalVisible={previewModalState.visible}
        handleCloseModal={handleClosePreviewModal}
        renderContent={() => (
          <PreviewProductItem
            item={previewModalState.previewItem}
            handleCloseModal={handleClosePreviewModal}
            handleSaveProduct={handleSaveProduct}
          />
        )}
      />
    </PerfectScrollbar>
  );
}

const mapStateToProps = (state) => ({
  user: state.User.user,
  sellerIndex: state.Admin.sellerIndex,
  productDetails: state.Admin.productDetails,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateSellerIndex: (sellerId) => {
      dispatch(adminActions.updateSellerIndex(sellerId));
    },
    updateAdminProducts: (products) => {
      dispatch(adminActions.updateAdminProducts(products));
    },
    fetchAdminProducts: (request) => {
      dispatch(adminActions.fetchAdminProducts(request));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
