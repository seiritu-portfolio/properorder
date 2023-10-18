import React from "react";
import "./styles.scss";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import clsx from "clsx";
import * as userActions from "../../../redux/UserSaga/actions";
import { connect } from "react-redux";
import APIManager from "../../../Network/APIManager";
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

function DeletePayment(props) {
  const { handleCloseModal, item, user, handleUpdateAlert } = props;
  const classes = useStyles();

  const [isLoading, setIsLoading] = React.useState(false);

  const { brand, last4, exp_month, exp_year } = item;

  const handleDelete = () => {
    setIsLoading(true);
    APIManager.deletePayment(user.id, item.id)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        props.actions.updatePayments(user.id);
        handleCloseModal();
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
          You are about to delete this card:
        </p>
        <div className={"mt-6 flex flex-row items-center"}>
          <span className={"text-lg font-bold tracking-tightest leading-6"}>
            {brand}
          </span>
          <div
            className={
              "text-xs font-bold tracking-tightest leading-6 flex flex-row"
            }
          >
            <p className={"ml-8"}>****</p>
            <p className={"ml-4"}>{last4}</p>
            <p className={"ml-10"}>{`${exp_month}/${exp_year
              .toString()
              .slice(-2)}`}</p>
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
  user: state.User.user,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updatePayments: (userId) => {
      dispatch(userActions.updatePayments(userId));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeletePayment);
