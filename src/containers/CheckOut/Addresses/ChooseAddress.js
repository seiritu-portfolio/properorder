import React, { useEffect } from "react";
import "./styles.scss";
import { ArrowBackIos, ArrowForwardIos, Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider, IconButton } from "@material-ui/core";
import { useMediaQuery } from "react-responsive";
import clsx from "clsx";
import AddressCard from "../../../components/AddressCard";
import POAddressCard from "../../../models/Enum/POAddressCard";
import PageItem from "./PageItem";

const useStyles = makeStyles((theme) => ({
  close: {
    color: theme.palette.common.graydark,
  },
  root: {
    paddingLeft: "3rem",
    paddingRight: "3rem",
  },
  cancelButton: {
    backgroundColor: theme.palette.common.graylight,
    "&:hover": {
      opacity: 1,
      backgroundColor: theme.palette.common.graylight,
    },
    display: "none",
    ["@media (min-width:640px)"]: {
      display: "flex",
    },
  },
}));

export default function ChooseAddress(props) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { handleCloseModal, userAddresses, onSelectItem } = props;
  const classes = useStyles();
  const pageMaxLength = 5;
  const [pageStart, setPageStart] = React.useState(0);
  const itemsCount = userAddresses.length;
  const perPage = isTabletOrMobile ? 2 : 6;
  const pages = itemsCount / perPage + (itemsCount % perPage !== 0 ? 1 : 0);
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);

  useEffect(() => {
    setCurrentPageIndex(0);
    setPageStart(0);
  }, [isTabletOrMobile]);

  return (
    <div className={"flex flex-col bg-white add-address-modal-container"}>
      <div
        className={
          "px-4 sm:px-7 sm:my-3 flex flex-row justify-between items-center"
        }
      >
        <span className={"modal-title"}>Choose a delivery address</span>
        <button onClick={handleCloseModal}>
          <Close className={classes.close} />
        </button>
      </div>
      <Divider />
      <div
        className={clsx(
          "flex flex-col mx-4 sm:mx-8 my-1 sm:my-6 gap-4",
          !isTabletOrMobile && "grid grid-cols-3"
        )}
      >
        {Array.from({ length: perPage }).map((v, i) => {
          const itemIndex = i + perPage * currentPageIndex;
          const item = userAddresses[itemIndex];
          return itemIndex < itemsCount ? (
            <AddressCard
              key={`${item.id}-${i}`}
              item={item}
              variant={POAddressCard.checkout}
              onSelectItem={() => {
                onSelectItem(item);
              }}
            />
          ) : null;
        })}
      </div>
      {itemsCount > perPage && (
        <div
          className={
            "flex flex-row flex-1 items-center justify-center my-2 sm:mb-4 space-x-2"
          }
        >
          {pageStart !== 0 && (
            <IconButton
              onClick={() => {
                const prevPage = pageStart - pageMaxLength;
                if (prevPage >= 0) {
                  setPageStart(prevPage);
                  setCurrentPageIndex(prevPage + pageMaxLength - 1);
                }
              }}
            >
              <ArrowBackIos
                color={pageStart === 0 ? "disabled" : "primary"}
                fontSize={"small"}
              />
            </IconButton>
          )}

          <div className={"flex flex-row"}>
            {Array.from({
              length: pageMaxLength > pages ? pages : pageMaxLength,
            }).map((p, i) =>
              pageStart + i < pages ? (
                <PageItem
                  key={pageStart + i}
                  item={pageStart + i + 1}
                  isSelected={currentPageIndex === pageStart + i}
                  onClick={() => {
                    setCurrentPageIndex(pageStart + i);
                  }}
                />
              ) : null
            )}
          </div>
          {pageStart + pageMaxLength <= pages && (
            <IconButton
              onClick={() => {
                const nextPage = pageStart + pageMaxLength;
                if (nextPage <= pages) {
                  setPageStart(nextPage);
                  setCurrentPageIndex(nextPage);
                }
              }}
            >
              <ArrowForwardIos color={"primary"} fontSize={"small"} />
            </IconButton>
          )}
        </div>
      )}
      {/*<Divider />*/}
      {/*<div*/}
      {/*  className={*/}
      {/*    "h-12 mx-8 my-2 sm:my-8 flex flex-col sm:flex-row justify-between"*/}
      {/*  }*/}
      {/*>*/}
      {/*  <Button*/}
      {/*    variant="contained"*/}
      {/*    color="secondary"*/}
      {/*    className={clsx(classes.root, classes.cancelButton, "h-full")}*/}
      {/*    onClick={handleCloseModal}*/}
      {/*  >*/}
      {/*    Cancel*/}
      {/*  </Button>*/}
      {/*  <Button*/}
      {/*    variant="contained"*/}
      {/*    color="secondary"*/}
      {/*    className={clsx(classes.root, "h-full")}*/}
      {/*  >*/}
      {/*    Save changes*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </div>
  );
}
