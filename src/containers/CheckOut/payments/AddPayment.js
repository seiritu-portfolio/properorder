import React, { useState } from "react";
import "./styles.scss";
import { Close } from "@material-ui/icons";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  InputLabel,
  TextField,
} from "@material-ui/core";
import clsx from "clsx";
import deleteIcon from "../../../utils/customSVG/deleteIcon";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import APIManager from "../../../Network/APIManager";
import { connect } from "react-redux";
import POSpinner from "../../../components/POSpinner";
import * as userActions from "../../../redux/UserSaga/actions";

const useStyles = makeStyles((theme) => ({
  close: {
    color: theme.palette.common.graydark,
  },
  root: {
    paddingLeft: "3rem",
    paddingRight: "3rem",
    minHeight: "3rem",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  checkBox: {
    color: theme.palette.common.black,
    "&$checked": {
      color: theme.palette.common.black,
    },
  },
  formControl: {
    height: 50,
    padding: "14px 1.1875rem",
    borderRadius: 10,
    position: "relative",
    borderColor: theme.palette.common.graymedium,
    "&:hover": {
      borderColor: theme.palette.common.black,
    },
  },
  inputLabel: {
    position: "absolute",
    top: "-0.46rem",
    left: "0.8rem",
    backgroundColor: "white",
    padding: "0 0.3rem",
  },
  error: {
    borderColor: theme.palette.common.reddark,
  },
}));

function AddPayment(props) {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = React.useState(false);
  const {
    user,
    item,
    handleCloseModal,
    handleRemove,
    handleUpdateAlert,
    handleAdded = () => {},
  } = props;

  const [cardHolderName, setCardHolderName] = React.useState("");
  const [holderNameError, setHolderNameError] = React.useState(false);
  const [cardElementFocus, setCardElementFocus] = React.useState(false);

  const [saveCard, setSaveCard] = useState(false);
  const [isDefault, setIsDefault] = useState(false);

  const isEditMode = item != null;
  const classes = useStyles();

  const handleApply = async (event) => {
    event.preventDefault();

    if (cardHolderName === "") {
      setHolderNameError(true);
      return;
    }

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { token, error } = await stripe.createToken(cardElement);
    console.log(token);
    if (error) {
      console.log(error);
      handleUpdateAlert({
        open: true,
        message: error.message ?? "Invalid card",
        severity: "error",
      });
    } else {
      submitPaymentMethod(token.id);
    }
  };

  const submitPaymentMethod = (tokenId) => {
    setIsLoading(true);
    if (isEditMode) {
      APIManager.updatePayment(user.id, item.id, tokenId)
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          props.actions.updatePayments(user.id);
          handleCloseModal();
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          handleUpdateAlert({
            open: true,
            message: error,
            severity: "error",
          });
        });
    } else {
      APIManager.createPayment(user.id, tokenId)
        .then((res) => {
          console.log(res);
          props.actions.updatePayments(user.id);
          if (!isDefault) {
            handleSuccess(res.id);
          } else {
            updateDefaultPayment(res);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          handleUpdateAlert({
            open: true,
            message: error,
            severity: "error",
          });
        });
    }
  };

  /**
   * updateDefaultPayment
   *
   * @param {POPayment} updatedPayment
   */
  const updateDefaultPayment = (updatedPayment) => {
    APIManager.updateUser(user.id, updatedPayment.id)
      .then((res) => {
        console.log(res);
        props.actions.getProfile();
        handleSuccess(updatedPayment.id);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        handleUpdateAlert({
          open: true,
          message: error,
          severity: "error",
        });
      });
  };

  const handleSuccess = (paymentId) => {
    setIsLoading(false);
    handleAdded(paymentId);
    handleCloseModal();
  };

  return (
    <div className={"flex flex-col bg-white add-payment-modal-container"}>
      <div
        className={
          "px-4 sm:px-7 my-2 sm:my-3 flex flex-row justify-between items-center"
        }
      >
        <span className={"modal-title"}>
          {isEditMode ? "Edit" : "Add new"} card
        </span>
        <button onClick={handleCloseModal}>
          <Close className={classes.close} />
        </button>
      </div>
      <Divider />
      <div className={"flex flex-col mx-3 md:mx-8 mt-12 mb-2 space-y-7"}>
        <TextField
          required
          InputProps={{
            classes: { notchedOutline: holderNameError ? classes.error : {} },
          }}
          id="cardholder-name"
          label="Cardholder name"
          variant="outlined"
          value={cardHolderName}
          onChange={(e) => {
            setCardHolderName(e.target.value);
            setHolderNameError(false);
          }}
        />
        <div
          className={clsx(
            classes.formControl,
            !cardElementFocus ? "border" : "border-2"
          )}
        >
          <InputLabel
            focused={cardElementFocus}
            shrink={true}
            className={classes.inputLabel}
          >
            Card Details *
          </InputLabel>
          <CardElement
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  fontSize: "1rem",
                  fontWeight: "300",
                  color: props.theme.palette.common.black,

                  "::placeholder": {
                    color: "#CACACA",
                  },
                },
                invalid: {
                  color: "#FB1818",
                },
              },
            }}
            onFocus={() => setCardElementFocus(true)}
            onBlur={() => setCardElementFocus(false)}
          />
        </div>

        <div className={"flex flex-row justify-between"}>
          <FormControlLabel
            control={
              <Checkbox
                color={"primary"}
                classes={{ root: classes.checkBox }}
                checked={saveCard}
                onChange={(e) => setSaveCard(e.target.checked)}
              />
            }
            label={"Save card"}
          />
          <FormControlLabel
            disabled={!saveCard}
            control={
              <Checkbox
                color={"primary"}
                classes={{ root: classes.checkBox }}
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
              />
            }
            label={"Set as default"}
          />
        </div>
      </div>
      <Divider />
      <div
        className={"sm:h-12 mx-4 md:mx-8 my-4 sm:my-8 flex  justify-between"}
      >
        {isEditMode && (
          <button
            id={"remove"}
            className={"flex flex-row items-center space-x-1"}
            onClick={handleRemove}
          >
            {deleteIcon()}
            <p className={"text-sm font-bold text-po-reddark mt-0.5"}>
              Delete <span className="hidden md:inline">this card</span>
            </p>
          </button>
        )}
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classes.root, !isEditMode && "w-full")}
          onClick={handleApply}
        >
          {isEditMode ? "Save changes" : "Add card"}
        </Button>
      </div>
      <POSpinner isLoading={isLoading} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.User.user,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updatePayments: (userId) => {
      dispatch(userActions.updatePayments(userId));
    },
    getProfile: () => {
      dispatch(userActions.getProfile());
    },
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(AddPayment));
