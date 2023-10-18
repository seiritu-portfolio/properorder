import React from "react";
import { ReactSVG } from "react-svg";
import csvIcon from "../../../assets/csv.svg";
import { Link } from "@mui/material";
import { usePDF } from "@react-pdf/renderer";
import OrderDocument from "../../../components/OrderDocument";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((_) => ({
  printBtn: {
    paddingLeft: "1.1rem",
    paddingRight: "1.1rem",
    fontWeight: "semibold",
    fontSize: "1.1rem",
    borderRadius: "0.4rem",
  },
}));

export default function ExportCSV({ order }) {
  const classes = useStyles();
  const [instance, updateInstance] = usePDF({
    document: <OrderDocument order={order} />,
  });

  return (
    <Link
      href={instance.url}
      download={`order${order.id}.pdf`}
      variant="contained"
      color="secondary"
      startIcon={<ReactSVG src={csvIcon} className={"w-6 h-6"} />}
      className={classes.printBtn}
    >
      Print order
    </Link>
  );
}
