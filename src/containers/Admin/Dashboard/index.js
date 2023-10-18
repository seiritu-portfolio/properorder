import React from "react";
import "./styles.scss";
import DeliveryMap from "../DeliveryMap";

export default function Dashboard() {
  return (
    <div className="flex-1 focus:outline-none bg-gray-100">
      <main className="flex-1 relative pb-8 z-0">
        <DeliveryMap />
      </main>
    </div>
  );
}
