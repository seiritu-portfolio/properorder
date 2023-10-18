import React from "react";
import { makeStyles, Radio } from "@material-ui/core";
import Calendar from "../../../assets/calendar_seconday.svg";
import clsx from "clsx";
import { ReactSVG } from "react-svg";

const useStyles = makeStyles({
  root: {
    paddingLeft: "0.75rem",
  },
});

export default function NavRadio(props) {
  const classes = useStyles();
  const { item, selected, onClick } = props;
  return (
    <button className={"flex flex-row items-center"} onClick={onClick}>
      <Radio color={"primary"} className={classes.root} checked={selected} />
      <p
        className={clsx(
          "text-base text-po-graymain mt-0.5 ml-2",
          selected && "font-bold"
        )}
      >
        {item.getLabel()}
      </p>
      {item.calendarIcon && <ReactSVG src={Calendar} className={"ml-2"} />}
    </button>
  );
}
