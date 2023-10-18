import React from "react";
import "./styles.scss";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import clsx from "clsx";
import { ReactSVG } from "react-svg";
import Call from "../../../assets/phone_small.svg";
import Location from "../../../assets/Location.svg";
import APIManager from "../../../Network/APIManager";
import * as userActions from "../../../redux/UserSaga/actions";
import { connect } from "react-redux";
import POSpinner from "../../../components/POSpinner";

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

function DeleteAddress(props) {
  const { item, handleCloseModal, handleUpdateAlert, user } = props;
  const classes = useStyles();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleDelete = () => {
    setIsLoading(true);
    APIManager.deleteAddress(user.id, item.id)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        props.actions.updateAddresses(user.id);
        handleCloseModal({
          alertInfo: { open: true, message: "Deleted successfully!" },
        });
      })
      .catch((error) => {
        setIsLoading(false);
        handleUpdateAlert({
          open: true,
          message: error,
          severity: "error",
        });
      });
  };

  return (
    <div className={"flex flex-col sm:flex-col mt-20 px-12"}>
      <div className={"flex flex-col flex-1 items-center"}>
        <p className={"font-semibold text-base"}>
          You are about to delete this address:
        </p>
        <div className={"flex flex-row mt-6"}>
          <span className={"text-lg font-bold tracking-tightest leading-6"}>
            {item.address_name}
          </span>
          <div className={"flex flex-col mt-1 ml-7"}>
            <div className={"flex flex-row"}>
              <span className={"text-xs font-bold tracking-tightest"}>
                {item.name}
              </span>
              <div className={"flex flex-row items-center ml-5 space-x-2"}>
                <ReactSVG src={Call} />
                <span className={"text-xs tracking-tightest"}>
                  {item.phone}
                </span>
              </div>
            </div>
            <div className={"flex flex-row space-x-2 mt-3"}>
              <ReactSVG src={Location} />
              <span className={"delete-address-location-text"}>
                {item?.formatted_address()}
              </span>
            </div>
          </div>
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
          onClick={handleDelete}
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
  user: state.User.user,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateAddresses: (userId) => {
      dispatch(userActions.updateAddresses(userId));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAddress);
