import React, { useEffect, useState } from "react";
import "./styles.scss";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Button } from "@material-ui/core";
import { PlusSmIcon } from "@heroicons/react/outline";
import { classNames } from "../CreateProduct/classes";
import clsx from "clsx";
import ReorderView from "./ReorderView";
import { makeStyles } from "@material-ui/core/styles";
import APIManager from "../../../Network/APIManager";
import { useParams } from "react-router-dom";
import history from "../../../routes/history";
import * as adminActions from "../../../redux/AdminSaga/actions";
import { connect } from "react-redux";
import Spinner from "react-spinkit";
import { POProductHeader } from "../../../models";
import POAlert from "../../../components/POAlert";

const useStyles = makeStyles((theme) => ({
  btn: {
    paddingLeft: "1.1rem",
    paddingRight: "1.1rem",
    minHeight: "2.4rem",
    fontWeight: "semibold",
    fontSize: "1.1rem",
    borderRadius: "0.4rem",
    marginLeft: "auto",
  },
  saveBtn: {
    paddingLeft: "1.1rem",
    paddingRight: "1.1rem",
    minHeight: "2.4rem",
    minWidth: "4.4rem",
    fontWeight: "semibold",
    fontSize: "1.1rem",
    borderRadius: "0.4rem",
    marginLeft: "1rem",
    boxShadow: "none",
  },
  cancelBtn: {
    paddingLeft: "1.1rem",
    paddingRight: "1.1rem",
    minHeight: "2.4rem",
    fontWeight: "500",
    fontSize: "1.1rem",
    borderRadius: "0.4rem",
    marginLeft: "1rem",
    boxShadow: "none",
    backgroundColor: theme.palette.common.graylight,
    "&:hover": {
      backgroundColor: "#BFBFC6",
    },
  },
}));

function ProductHeaders(props) {
  const { orgId, sellerIndex } = useParams();
  const [state, setState] = useState({
    focused: false,
    headers: [],
    inputVisible: false,
    newHeaderValue: "",
    loading: false,
  });

  const classes = useStyles();
  const { focused, inputVisible, newHeaderValue, loading, headers } = state;

  const [alertInfo, setAlertInfo] = useState({ open: false });

  useEffect(() => {
    props.actions.updateSellerIndex({ id: sellerIndex, status: false });
  }, [sellerIndex]);

  useEffect(() => {
    if (props.sellerIndex.status) {
      history.push(`/admin/${orgId}/site/${props.sellerIndex.id}/settings`);
    }
  }, [props.sellerIndex]);

  useEffect(() => {
    if (sellerIndex !== -1) {
      APIManager.fetchProductHeaders(sellerIndex).then((res) => {
        console.log(res);
        setState({ ...state, headers: res });
      });
    }
  }, []);

  const handleSaveProductHeader = () => {
    setState({ ...state, loading: true });
    APIManager.createProductHeader(sellerIndex, {
      name: state.newHeaderValue,
      position: headers.length,
    })
      .then((res) => {
        setState({
          ...state,
          headers: res.map((v) => headers.find((h) => h.id === v.id) ?? v),
          inputVisible: false,
          newHeaderValue: "",
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemove = (header) => {
    if (header.can_delete) {
      const newHeaders = headers.filter((h) => h.id !== header.id);
      setState({
        ...state,
        headers: newHeaders,
      });
      APIManager.deleteProductHeader(sellerIndex, header.id)
        .then((res) => {
          console.log("deleted header", res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setAlertInfo({
        open: true,
        message: "You can't delete this header",
        severity: "warning",
      });
    }
  };

  const handleUpdateProductHeader = (headerId, newValue) => {
    if (newValue === "") {
      setAlertInfo({
        open: true,
        message: "Product header name is required",
        severity: "warning",
      });
      return;
    }

    const newHeaders = headers.map((h) =>
      h.id !== headerId ? h : { ...h, name: newValue, editMode: false }
    );
    APIManager.updateProductHeaders(
      sellerIndex,
      POProductHeader.generateFormData(newHeaders)
    )
      .then((res) => {
        console.log("updatedProductHeaders", res);
        setState({
          ...state,
          headers: newHeaders,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancelEditing = (headerId) => {
    setState({
      ...state,
      headers: headers.map((h) =>
        h.id !== headerId ? h : { ...h, editMode: false }
      ),
    });
  };

  const reOrdered = (newOrders) => {
    const newHeaders = POProductHeader.reOrderedHeaders(headers, newOrders);
    if (newHeaders.some((h, index) => h.id !== headers[index].id)) {
      APIManager.updateProductHeaders(
        sellerIndex,
        POProductHeader.generateFormData(newHeaders)
      )
        .then((res) => {
          console.log("updatedProductHeaders", res);
          setState({
            ...state,
            headers: newHeaders,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <PerfectScrollbar
      className={"flex flex-1 flex-col p-4 sm:p-8 2xl:px-24 bg-gray-50"}
    >
      <header className={"flex flex-row justify-between"}>
        <h2 className="text-2xl font-bold px-3">Product headers</h2>
        {!inputVisible && (
          <Button
            variant="contained"
            color="secondary"
            startIcon={
              <div className={"w-6 h-6"}>
                <PlusSmIcon />
              </div>
            }
            className={classes.btn}
            onClick={() => setState({ ...state, inputVisible: true })}
          >
            Add product header
          </Button>
        )}
      </header>

      <div className="flex flex-col mt-2">
        <div className="overflow-x-auto sm:-mx-4 lg:-mx-6">
          <div className="py-2 align-middle inline-block min-w-full sm:px-4 lg:px-8">
            <p className={"text-base text-po-black mt-1"}>
              Please provide custom categories/headers for your products e.g.
              Hampers & Gifts, Cookies, Bread, Gluten Free selection.
            </p>
            <p className={"text-base text-po-black mt-1"}>
              You can drag and drop the product headers to reorder them, the
              product headers will appear on the order they are created here.
            </p>
            <p className={"text-base text-po-black mt-1"}>
              Note: you can only delete a header if it is not assigned to any
              products.
            </p>

            <div className="mt-6">
              {inputVisible ? (
                <div className={"flex flex-row"}>
                  <input
                    id={`product_header`}
                    type="text"
                    className={clsx(
                      classNames.input,
                      focused ? "border-po-yellowlight" : "border-po-graymedium"
                    )}
                    placeholder="Enter a new product header"
                    onFocus={() => setState({ ...state, focused: true })}
                    value={newHeaderValue}
                    onChange={(e) =>
                      setState({ ...state, newHeaderValue: e.target.value })
                    }
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.saveBtn}
                    onClick={() => handleSaveProductHeader()}
                  >
                    {loading ? (
                      <Spinner name="circle" fadeIn="none" color={"black"} />
                    ) : (
                      "Save"
                    )}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.cancelBtn}
                    onClick={() =>
                      setState({
                        ...state,
                        inputVisible: false,
                        newHeaderValue: "",
                      })
                    }
                  >
                    Cancel
                  </Button>
                </div>
              ) : null}
              {headers.length > 0 && (
                <ReorderView
                  listData={headers}
                  handleCancelEditing={handleCancelEditing}
                  handleSaveProductHeader={handleUpdateProductHeader}
                  handleRemove={handleRemove}
                  handledOrdered={reOrdered}
                  handleUpdateHeaderMode={(headerId, editMode) => {
                    setState({
                      ...state,
                      headers: headers.map((h) =>
                        h.id === headerId ? { ...h, editMode } : h
                      ),
                    });
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <POAlert
        alertInfo={alertInfo}
        handleClose={() => setAlertInfo({ open: false })}
      />
    </PerfectScrollbar>
  );
}

const mapStateToProps = (state) => ({
  sellerIndex: state.Admin.sellerIndex,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateSellerIndex: (sellerId) => {
      dispatch(adminActions.updateSellerIndex(sellerId));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductHeaders);
