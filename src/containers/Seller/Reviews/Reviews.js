import React, { useEffect } from "react";
import "./styles.scss";
import Rating from "@material-ui/lab/Rating";
import { StarBorderRounded, StarRounded } from "@material-ui/icons";
import ReviewPBar from "../../../components/ReviewPBar";
import POModal from "../../../components/POModal";
import AddReview from "../../Profile/MyOrders/Reviews/AddReview";
import PODeleteModal from "../../../components/PODeleteModal";
import DeleteReview from "../../Profile/MyOrders/Reviews/DeleteReview";
import InfiniteScroll from "react-infinite-scroll-component";
import ReviewItem from "./ReviewItem";
import PODecimalUtil from "../../../utils/PODecimalUtil";
import { connect } from "react-redux";
import { POReview } from "../../../models";

function Reviews(props) {
  const {
    seller,
    userReviews,
    setUserReviews,
    loadReviews,
    user,
    setAlertInfo,
    summary,
  } = props;

  useEffect(() => {
    props.setVisibleIndex(0);
  }, []);

  const [state, setState] = React.useState({
    reviewModalVisible: false,
    reviewDeleteModalVisible: false,
    editReviewWith: null,
  });

  const handleOpenReviewModal = (item) => {
    setState({ ...state, reviewModalVisible: true, editReviewWith: item });
  };

  const handleCloseReviewModal = (result) => {
    setState({ ...state, reviewModalVisible: false });
    if (result?.alertInfo != null) {
      setAlertInfo(result.alertInfo);
    }
  };

  const handleOpenReviewDeleteModal = () => {
    setState({
      ...state,
      reviewDeleteModalVisible: true,
      reviewModalVisible: false,
    });
  };

  const handleCloseReviewDeleteModal = () => {
    setState({ ...state, reviewDeleteModalVisible: false });
  };

  const updateReviewItem = (item, deleted) => {
    if (deleted) {
      setUserReviews(userReviews.filter((v) => v.id !== item.id));
    } else {
      setUserReviews(
        userReviews.map((v) =>
          v.id === item.id ? POReview.fromState({ ...item, user: v.user }) : v
        )
      );
    }
  };

  const { reviewModalVisible, reviewDeleteModalVisible, editReviewWith } =
    state;

  const totalCount = summary
    .map((s) => s.count)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <div className={"mt-8 mb-4 flex flex-col"}>
      {PODecimalUtil.getRatingDecimal(seller.rating) > 0 ? (
        <div className={"flex flex-row items-center"}>
          <div
            className={"font-bold leading-extra-tight"}
            style={{ fontSize: "2.8125rem", letterSpacing: "-0.003em" }}
          >
            {PODecimalUtil.getRatingDecimal(seller.rating)}
          </div>
          <div className={"ml-8 mt-3"}>
            <Rating
              readOnly
              size={"large"}
              name="rating_view"
              value={PODecimalUtil.getRatingDecimalMark(seller.rating)}
              precision={0.1}
              icon={<StarRounded fontSize="inherit" />}
              emptyIcon={<StarBorderRounded fontSize="inherit" />}
            />
          </div>
          <span
            className={
              "mt-2 ml-8 tracking-extra-tight text-base leading-extra-tight text-gray-light"
            }
          >
            {totalCount} reviews
          </span>
        </div>
      ) : null}

      {userReviews.length > 0 ? (
        <div className={"mt-8 mb-4 w-full"}>
          {Array.from({ length: 5 }, (_, i) => (
            <ReviewPBar
              key={i}
              item={{
                value: 5 - i,
                percent:
                  totalCount === 0
                    ? 0
                    : ((summary.find((s) => s.rating === 5 - i)?.count ?? 0) /
                        totalCount) *
                      100,
              }}
            />
          ))}
        </div>
      ) : (
        <p className="text-lg text-po-graymain mt-6">
          {" "}
          There are no reviews for{" "}
          <span className="font-semibold">{seller.name}</span> yet
        </p>
      )}

      <InfiniteScroll
        dataLength={userReviews.length}
        next={loadReviews}
        hasMore={true}
      >
        <ul className={"flex flex-col"}>
          {userReviews.map((item, index) => (
            <ReviewItem
              key={index}
              item={item}
              handleOpenReviewModal={() => handleOpenReviewModal(item)}
              hasEditPermission={user?.id === item?.user?.id}
              hasDivider={index < userReviews.length - 1}
            />
          ))}
        </ul>
      </InfiniteScroll>
      <POModal
        modalVisible={reviewModalVisible}
        handleCloseModal={handleCloseReviewModal}
        renderContent={() => (
          <AddReview
            item={editReviewWith}
            seller={seller}
            handleCloseModal={handleCloseReviewModal}
            handleRemove={handleOpenReviewDeleteModal}
            handleUpdateAlert={(alertInfo) => setAlertInfo(alertInfo)}
            updateReviewItem={updateReviewItem}
          />
        )}
      />
      <PODeleteModal
        modalVisible={reviewDeleteModalVisible}
        handleCloseModal={handleCloseReviewDeleteModal}
        renderContent={() => (
          <DeleteReview
            item={editReviewWith}
            seller={seller}
            handleCloseModal={handleCloseReviewDeleteModal}
            handleUpdateAlert={(alertInfo) => setAlertInfo(alertInfo)}
            updateReviewItem={updateReviewItem}
          />
        )}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.User.user,
});

export default connect(mapStateToProps, null)(Reviews);
