import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import { Button, Divider } from "@material-ui/core";
import clsx from "clsx";
import ProductDetailsContent from "../../Product/ProductDetails/ProductDetailsContent";
import "react-perfect-scrollbar/dist/css/styles.css";

const useStyles = makeStyles((theme) => ({
  close: {
    color: theme.palette.common.graydark,
  },
  btn: {
    flex: "1 1 0",
    paddingLeft: "3rem",
    paddingRight: "3rem",
    margin: "0 0.5rem",
    minHeight: "3rem",
  },
  cancelButton: {
    backgroundColor: theme.palette.common.graylight,
    "&:hover": {
      opacity: 1,
      backgroundColor: theme.palette.common.graylight,
    },
    display: "flex",
    marginBottom: "0.5rem",
    ["@media (min-width:640px)"]: {
      marginBottom: 0,
    },
  },
}));

export default function PreviewProductItem(props) {
  const { item, handleCloseModal, handleSaveProduct } = props;

  const classes = useStyles();

  return (
    <div className={"flex flex-col bg-white add-preview-modal-container"}>
      <div
        className={
          "px-4 sm:px-7 my-2 sm:my-3 flex flex-row justify-between items-center"
        }
      >
        <span className={"modal-title"}>Preview product</span>
        <button onClick={handleCloseModal}>
          <Close className={classes.close} />
        </button>
      </div>
      <Divider />
      {item.name !== undefined && (
        // <PerfectScrollbar className={"preview-item-modal"}>
        <div className={"flex flex-row flex-1 mt-2 lg:mt-8 mx-4 lg:mx-10 mb-6"}>
          <ProductDetailsContent
            backNeeded={false}
            footerNeeded={false}
            className={"mx-1 2xl:mx-4 py-2"}
            product={item}
            seller={item.seller}
            selectedOptions={
              item?.options?.map((option) => ({ id: option.id })) ?? []
            }
            setQuantity={() => {}}
            setSelectedOptions={() => {}}
            quantity={1}
          />
        </div>
        // </PerfectScrollbar>
      )}
      <div className={"mx-8 mb-4 flex flex-col sm:flex-row justify-between"}>
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classes.btn, classes.cancelButton)}
          onClick={() => handleCloseModal()}
        >
          Continue editing
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.btn}
          onClick={() => handleSaveProduct()}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
