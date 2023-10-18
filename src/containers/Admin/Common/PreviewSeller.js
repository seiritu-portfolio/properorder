import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import { Divider } from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import React from "react";
import Seller from "../../Seller";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  close: {
    color: theme.palette.common.graydark,
  },
}));

function PreviewSeller(props) {
  const { handleCloseModal, sellerIndex } = props;

  const classes = useStyles();

  return (
    <div className={"flex flex-col bg-white preview-seller-modal-container"}>
      <div
        className={
          "px-4 sm:px-7 my-2 sm:my-3 flex flex-row justify-between items-center"
        }
      >
        <span className={"modal-title"}>Preview your shop page</span>
        <button onClick={handleCloseModal}>
          <Close className={classes.close} />
        </button>
      </div>
      <Divider />
      <PerfectScrollbar className={"preview-seller-modal"}>
        <div
          className={
            "flex mt-2 mx-4 lg:mx-10 justify-center mb-6 pointer-events-none"
          }
        >
          <Seller
            location={{ state: { sellerId: sellerIndex.id, preview: true } }}
          />
        </div>
      </PerfectScrollbar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  sellerIndex: state.Admin.sellerIndex,
});

export default connect(mapStateToProps, null)(PreviewSeller);
