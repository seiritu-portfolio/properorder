import React from "react";
import "./styles.scss";
import "react-perfect-scrollbar/dist/css/styles.css";
import { DeliveryMapProvider } from "../Provider/DeliveryMapProvider";
import DeliveryMap from "./DeliveryMap";

export default function DeliveryCoverageMap() {
  return (
    <DeliveryMapProvider>
      <DeliveryMap />
    </DeliveryMapProvider>
  );
}
