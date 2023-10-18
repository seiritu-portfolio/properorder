import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import clsx from "clsx";
import Rating from "@material-ui/lab/Rating";
import { StarBorderRounded, StarRounded } from "@material-ui/icons";
import PODecimalUtil from "../../../../utils/PODecimalUtil";
import APIManager from "../../../../Network/APIManager";
import POSpinner from "../../../../components/POSpinner";

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

export default function DeleteReview(props) {
  const {
    item,
    seller,
    handleCloseModal,
    updateReviewItem,
    handleUpdateAlert,
  } = props;
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = () => {
    setIsLoading(true);
    APIManager.deleteReview(seller.id, item.id)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        updateReviewItem(item, true);
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

  return (
    <div className={"flex flex-col sm:flex-col mt-20 px-12"}>
      <div className={"flex flex-col flex-1 items-center"}>
        <p className={"font-semibold text-base"}>
          You are about to delete this review for{" "}
          <p className={"font-bold inline-flex"}>{seller.name}:</p>
        </p>
        <div className={"mt-6 flex flex-col items-center"}>
          <div className={"flex flex-row items-center space-x-4 mt-3"}>
            <Rating
              readOnly
              size={"small"}
              name="rating"
              defaultValue={5}
              value={PODecimalUtil.getRatingDecimal(item.rating)}
              precision={0.5}
              icon={<StarRounded fontSize="inherit" />}
              emptyIcon={<StarBorderRounded fontSize="inherit" />}
            />
            <span className={"text-lg font-bold"}>{item.title}</span>
          </div>
          <span className={"text-sm mt-3 mx-10"}>{item.review}</span>
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
