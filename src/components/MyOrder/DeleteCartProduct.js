import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import clsx from "clsx";
import APIManager from "../../Network/APIManager";
import POSpinner from "../../components/POSpinner";
import { getLocalCart, storeLocalCart } from "../../services/HelperService";
import * as userActions from "../../redux/UserSaga/actions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "3rem",
    paddingRight: "3rem",
    height: "48px",
    width: "100%",
    display: "flex",
  },
  cancelButton: {
    backgroundColor: theme.palette.common.graylight,
    "&:hover": {
      opacity: 1,
      backgroundColor: theme.palette.common.graylight,
    },
  },
  deleteButton: {
    fontWeight: "bold",
    color: "white",
    backgroundColor: theme.palette.common.reddark,
    "&:hover": {
      opacity: 1,
      backgroundColor: theme.palette.common.reddark,
    },
  },
}));

function DeleteCartProduct(props) {
  const {
    deleteModalState,
    handleCloseModal,
    onDeletedProductItem,
    handleUpdateAlert,
  } = props;
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = () => {};

  return (
    <div className={"flex flex-col sm:flex-col mt-20 px-12"}>
      <div className={"flex flex-col flex-1 items-center"}>
        <p className={"font-semibold text-base"}>
          You are about to delete this product
        </p>
        <div className={"mt-6 flex flex-row items-center"}>
          <h5 className={"font-bold mr-4"}>
            {deleteModalState?.product.quantity} x
          </h5>
          <h5 className={"font-bold"}>{deleteModalState?.product.name}</h5>
          <p className={"font-semibold text-xs ml-6 text-po-graymain"}>
            € {deleteModalState?.product.price}
          </p>
        </div>
        <h2 className={"mt-6 text-center"}>
          Are you sure you want to delete it?
        </h2>
      </div>
      <div
        className={
          "my-4 sm:my-8 flex flex-1 flex-col sm:flex-row space-y-2 sm:space-x-8 sm:space-y-0"
        }
      >
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classes.root, classes.cancelButton)}
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classes.root, classes.deleteButton)}
          onClick={() => handleDelete()}
        >
          Delete
        </Button>
      </div>
      <POSpinner isLoading={isLoading} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCartProduct);
