import React from "react";
import "./styles.scss";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider } from "@material-ui/core";
import clsx from "clsx";
import moment from "moment";
import { ReactSVG } from "react-svg";
import Calendar from "../../assets/Calendar.svg";

const useStyles = makeStyles((theme) => ({
  close: {
    color: theme.palette.common.graydark,
  },
  root: {
    paddingLeft: "3rem",
    paddingRight: "3rem",
    minHeight: "3rem",
  },
}));

export default function SelectDeliveryDate(props) {
  const { handleCloseModal } = props;
  const classes = useStyles();
  const renderWeek = (weekName, date, startDay = 0) => {
    const weekStart = date.clone().startOf("isoWeek");
    const days = [];
    for (let i = startDay; i <= 5; i++) {
      days.push(moment(weekStart).add(i, "days"));
    }
    return (
      <div className={"flex flex-col"}>
        <div className={"flex flex-row flex-1 items-center"}>
          <Divider className={"flex-1"} />
          <p className={"select-delivery-date-text text-po-graydark mx-4"}>
            {weekName}
          </p>
          <Divider className={"flex-1"} />
        </div>
        {days.map((day, i) => (
          <button key={i} className={"select-delivery-date-text text-po-black"}>
            {day.format("dddd, DD MMM")}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={"flex flex-col bg-white select-date-modal-container"}>
      <div
        className={
          "px-4 sm:px-7 my-2 sm:my-3 flex flex-row justify-between items-center"
        }
      >
        <span className={"modal-title"}>Select delivery date</span>
        <button onClick={handleCloseModal}>
          <Close className={classes.close} />
        </button>
      </div>
      <Divider />
      <div className={"flex flex-col mx-8 mt-4 mb-4"}>
        {renderWeek("This week", moment(), moment().day())}
        {renderWeek("Next week", moment().add(1, "weeks").startOf("isoWeek"))}
        <div className={"flex flex-row flex-1 items-center"}>
          <Divider className={"flex-1"} />
          <p className={"select-delivery-date-text text-po-graydark mx-4"}>
            OR
          </p>
          <Divider className={"flex-1"} />
        </div>
        <button className={"flex flex-row items-center justify-center"}>
          <ReactSVG src={Calendar} />
          <p
            className={
              "select-delivery-date-text font-semibold text-po-yellowlight"
            }
          >
            Select another date
          </p>
        </button>
      </div>
      <Divider />
      <div
        className={
          "h-12 mx-8 my-2 sm:my-4 flex flex-col sm:flex-row justify-between"
        }
      >
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classes.root, "w-full")}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
