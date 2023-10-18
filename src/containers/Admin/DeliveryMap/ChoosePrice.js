import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: 700,
    paddingLeft: "4rem",
    paddingRight: "4rem",
    height: "2.5rem",
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

// const options = [
//   { id: 0, title: "Use the region’s default price" },
//   { id: 1, title: "Use a custom price" },
// ];

export default function ChoosePrice(props) {
  const { initialPrice, isTown, handleCloseModal, handleSavePrice } = props;
  const classes = useStyles();

  const [price, setPrice] = useState(initialPrice ?? "");
  // const [defaultRegionPrice, setDefaultRegionPrice] = useState(0);
  const [editMode, setEditMode] = useState(initialPrice != null ? 1 : 0);

  // useEffect(() => {
  //   const defaultPrice = localStorage.getItem(
  //     Constants.AS_DEFAULT_REGION_PRICE
  //   );
  //   if (defaultPrice != null) {
  //     if (Number(defaultPrice) === Number(initialPrice ?? 0)) {
  //       setEditMode(0);
  //     }
  //     setDefaultRegionPrice(Number(defaultPrice));
  //   }
  // }, []);

  const onClickSave = () => {
    // if (!isTown || editMode === 1) {
    //   handleSavePrice(price);
    // } else {
    //   handleSavePrice(defaultRegionPrice);
    // }
    handleSavePrice(price);
  };

  return (
    <div className={"flex flex-col bg-white choose-price-modal-container"}>
      <div className={"flex flex-col flex-1 mt-8 space-y-4 pl-4 pr-6"}>
        <h2 className={"self-center"}>
          {initialPrice ? "Edit" : "Add"} custom price
        </h2>
        <div className={"flex flex-row flex-1"}>
          <p className={"text-sm font-semibold self-center mx-2"}>€</p>
          <input
            id={"price"}
            placeholder={"e.g. 3.00"}
            type="number"
            className={
              "text-sm w-full rounded border border-po-graymedium px-3 py-2"
            }
            value={price}
            onChange={(event) => {
              if (event.target.value >= 0) {
                setPrice(event.target.value);
              }
            }}
          />
        </div>
      </div>
      <div
        className={
          "mx-4 my-4 sm:my-8 flex flex-col sm:flex-row justify-between"
        }
      >
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classes.root, classes.cancelButton)}
          onClick={() => handleCloseModal()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.root}
          onClick={() => onClickSave()}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
