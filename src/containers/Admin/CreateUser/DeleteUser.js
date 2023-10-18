import React from "react";
import "./styles.scss";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import clsx from "clsx";
import APIManager from "../../../Network/APIManager";
import * as userActions from "../../../redux/UserSaga/actions";
import { connect } from "react-redux";
import POSpinner from "../../../components/POSpinner";
import PODeleteModal from "../../../components/PODeleteModal";
import DeleteUser from "./DeleteUser";

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

export default function DeleteUser(props) {
  const { handleCloseModal, handleUpdateAlert } = props;

  const [state, setState] = React.useState({
    userDeleteModalVisible: false,
  });

  const handleOpenUserDeleteModal = () => {
    setState({
      ...state,
      userDeleteModalVisible: true,
    });
  };

  const handleCloseUserDeleteModal = (result) => {
    setState({ ...state, userDeleteModalVisible: false });
  };

  return (
    <div className={"flex flex-col sm:flex-col mt-20 px-12"}>
      <div className={"flex flex-col flex-1 items-center"}>
        <p className={"font-semibold text-base"}>
          You are about to deactivate this user:
        </p>
        <div className={"flex flex-row mt-6"}>
          <span className={"text-lg font-bold tracking-tightest leading-6"}>
            John Smith
          </span>
        </div>
        <h2 className={"mt-6 text-center"}>
          Are you sure you want to proceed?
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
          // onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classes.root, classes.deleteButton)}
          // onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
      {/*  <POSpinner isLoading={isLoading} /> */}
      <PODeleteModal
        modalVisible={userDeleteModalVisible}
        handleCloseModal={handleCloseUserDeleteModal}
        renderContent={() => (
          <DeleteUser
            // item={editUsersWith}
            handleCloseModal={handleCloseUserDeleteModal}
            // handleUpdateAlert={(alertInfo) => setAlertInfo(alertInfo)}
          />
        )}
      />
    </div>
  );
}
