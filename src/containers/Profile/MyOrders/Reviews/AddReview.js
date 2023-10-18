import React, { useState } from "react";
import "./styles.scss";
import { Close, StarBorderRounded, StarRounded } from "@material-ui/icons";
import { Button, Divider, TextField } from "@material-ui/core";
import deleteIcon from "../../../../utils/customSVG/deleteIcon";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import APIManager from "../../../../Network/APIManager";
import POSpinner from "../../../../components/POSpinner";
import PODecimalUtil from "../../../../utils/PODecimalUtil";

const useStyles = makeStyles((theme) => ({
  inputMobile: {
    borderRadius: "10px 0 0 10px",
  },
  close: {
    color: theme.palette.common.graydark,
  },
  root: {
    paddingLeft: "3rem",
    paddingRight: "3rem",
    height: "3rem",
  },
}));

export default function AddReview(props) {
  const {
    item,
    seller,
    handleCloseModal,
    handleRemove,
    handleUpdateAlert,
    updateReviewItem,
  } = props;
  const isEditMode = item != null;
  const [isLoading, setIsLoading] = useState(false);

  const [rating, setRating] = useState(
    item?.rating ? PODecimalUtil.getRatingMark(item.rating) : 0
  );
  const [title, setTitle] = useState(item?.title ?? "");
  const [review, setReview] = useState(item?.review ?? "");
  const [error, setError] = useState("");

  const handleApply = () => {
    const body = { rating, title, review };
    console.log(body);
    if (rating < 1) {
      setError("The rating must be at least 1");
      return;
    }
    if (title === "") {
      setError("The headline field is required");
      return;
    }
    if (review === "") {
      setError("The review field is required");
      return;
    }

    setIsLoading(true);
    setError("");
    if (isEditMode) {
      APIManager.updateReview(seller.id, item.id, body)
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          updateReviewItem(res);
          handleCloseModal({
            alertInfo: {
              open: true,
              message: "Updated successfully!",
            },
          });
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
      // TODO: create the review
      APIManager.createReview(seller.id, body)
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          handleCloseModal({
            alertInfo: {
              open: true,
              message: "Created successfully!",
            },
          });
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

  const classes = useStyles();
  return (
    <div className={"flex flex-col bg-white add-review-modal-container"}>
      <div
        className={
          "px-4 sm:px-7 my-2 sm:my-3 flex flex-row justify-between items-center"
        }
      >
        <span className={"modal-title"}>
          {isEditMode ? "Edit" : "Add a"} review
        </span>
        <button onClick={handleCloseModal}>
          <Close className={classes.close} />
        </button>
      </div>
      <Divider />
      <div className={"mt-8 mx-10"}>
        <h5 className={"w-full text-center"}>
          {isEditMode ? "Edit your review for " : "Create a review for "}
          <span className={"font-semibold"}>{seller.name}</span>
        </h5>
        <h4 className={"mt-8 mb-2"}>Overall rating</h4>
        <Rating
          size={"large"}
          name="rating"
          defaultValue={0}
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          precision={1}
          icon={<StarRounded fontSize="inherit" />}
          emptyIcon={<StarBorderRounded fontSize="inherit" />}
        />
        <h4 className={"mt-6 mb-2"}>Headline</h4>
        <TextField
          id="headline"
          variant="outlined"
          placeholder={"What’s most important to know?"}
          className={clsx(classes.inputMobile, "flex flex-1 w-full")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h4 className={"mt-6 mb-2"}>Review</h4>
        <TextField
          id="headline"
          multiline
          rows={4}
          variant="outlined"
          placeholder={""}
          className={clsx(classes.inputMobile, "flex flex-1 w-full")}
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        {error !== "" && <p className={"po-validation-message"}>{error}</p>}
      </div>
      <div
        className={
          "mx-8 my-4 sm:my-8 flex flex-col sm:flex-row justify-between"
        }
      >
        {isEditMode && (
          <button
            id={"remove"}
            className={clsx(
              "flex flex-row items-center space-x-1 h-12 mb-2 w-full justify-center sm:w-auto"
            )}
            onClick={handleRemove}
          >
            {deleteIcon()}
            <p className={"text-sm font-bold text-po-reddark mt-0.5"}>
              Delete this review
            </p>
          </button>
        )}
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classes.root, !isEditMode && "w-full")}
          onClick={() => handleApply()}
        >
          {isEditMode ? "Save changes" : "Submit review"}
        </Button>
      </div>
      <POSpinner isLoading={isLoading} />
    </div>
  );
}
