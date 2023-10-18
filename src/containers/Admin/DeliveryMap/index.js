import React from "react";
import DeliveryMainMap from "./DeliveryMainMap";
import "react-perfect-scrollbar/dist/css/styles.css";
import { DeliveryMapProvider } from "../Provider/DeliveryMapProvider";

export default function DeliveryMap() {
  return (
    <DeliveryMapProvider>
      <div className="relative flex flex-1">
        <div className="flex flex-col flex-1">
          <DeliveryMainMap />
        </div>
      </div>
    </DeliveryMapProvider>
  );
}
