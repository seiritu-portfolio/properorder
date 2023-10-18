import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { FaPrint } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  printBtn: {
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    minHeight: "2.4rem",
    fontWeight: "semibold",
    fontSize: "1.1rem",
    borderRadius: "0.4rem",
    marginLeft: "auto",
    width: "100%",
    marginBottom: "0.8rem",

    ["@media (min-width:640px)"]: {
      width: "auto",
      marginBottom: 0,
    },
  },
}));

export default function Header({
  orderId,
  currentStatus,
  borderStatusColor,
  textStatusColor,
}) {
  const classes = useStyles();
  const statusContainerClass = `self-end h-12 w-max rounded-3xl border-2 ${borderStatusColor} flex justify-center items-center`;
  const statusClass = `capitalize py-5 lg:py-8 px-3 lg:px-4 font-extrabold text-xl lg:text-2xl leading-5 ${textStatusColor}`;
  return (
    <div className={"flex flex-col sm:flex-row items-center mt-4 mb-2"}>
      <div className={"flex flex-row items-center mb-4 sm:mb-0"}>
        <h2 className="text-2xl font-bold mr-4">
          <h2 className="text-xl sm:text-2xl font-bold px-3">
            Order <span className={"font-black"}>#{orderId}</span>
          </h2>
        </h2>
        <div className={statusContainerClass}>
          <h4 className={statusClass}>{currentStatus}</h4>
        </div>
      </div>
      {/*TODO: Add Print order function */}
      {/*} <Button
        variant="contained"
        color="secondary"
        startIcon={<FaPrint className={"w-5 h-5"} />}
        className={classes.printBtn}
      >
        Print order
      </Button>*/}
    </div>
  );
}
