import React from "react";
import Rating from "@material-ui/lab/Rating";
import { StarBorderRounded, StarRounded } from "@material-ui/icons";
import { Divider } from "@material-ui/core";
import PODecimalUtil from "../../../utils/PODecimalUtil";
import DateTimeUtil from "../../../utils/DateTimeUtil";

export default function ReviewItem(props) {
  const { item, handleOpenReviewModal, hasEditPermission, hasDivider } = props;

  return (
    <li className={"mt-6 flex flex-col"}>
      <div className={"flex flex-row justify-between"}>
        <span className={"review-item-user-name"}>{item.user?.first_name}</span>
        <div>
          <span className={"review-item-date"}>Posted </span>
          <span className={"review-item-date review-item-date__bold"}>
            {DateTimeUtil.getRateDateString(item.created_at)}
          </span>
        </div>
      </div>
      <div className={"flex flex-row items-center space-x-4 mt-3"}>
        <Rating
          readOnly
          size={"small"}
          name={`rating_view_${item.id}`}
          value={PODecimalUtil.getRatingMark(item.rating)}
          precision={0.5}
          icon={<StarRounded fontSize="inherit" />}
          emptyIcon={<StarBorderRounded fontSize="inherit" />}
        />
        <span className={"review-item-headline"}>{item.title}</span>
        {hasEditPermission && (
          <button
            className={"text-xl font-bold text-po-yellowdark ml-auto mr-4"}
            onClick={() => handleOpenReviewModal()}
          >
            Edit
          </button>
        )}
      </div>
      <span className={"review-item-description mb-8"}>{item.review}</span>
      {hasDivider && <Divider />}
    </li>
  );
}
