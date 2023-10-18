import React from "react";
import { Add, Remove } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    backgroundColor: theme.palette.common.primary,
    borderRadius: 14,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function ProductQuantity(props) {
  const { quantity, setQuantity } = props;
  const classes = useStyles();
  return (
    <div className="flex justify-between md:grid md:grid-cols-2 lg:grid-cols-3 gap-1 mt-3 mb-5 md:mb-7">
      <div className="col-span-1">
        <h6 className="text-lg font-bold text-po-black">Quantity:</h6>
      </div>
      <div className="col-span-1 lg:col-span-2">
        <div className={"flex flex-row items-center space-x-4"}>
          <button
            className={classes.icon}
            onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
              }
            }}
          >
            <Remove fontSize={"small"} />
          </button>
          <span className={"text-lg lg:text-xl font-bold mx-2"}>
            {quantity}
          </span>
          <button
            className={classes.icon}
            onClick={() => setQuantity(quantity + 1)}
          >
            <Add fontSize={"small"} />
          </button>
        </div>
      </div>
    </div>
  );
}
