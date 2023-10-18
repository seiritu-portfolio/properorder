import React from "react";
import { RoomSharp } from "@material-ui/icons";

export default function POMarker({ lat, lng }) {
  return <RoomSharp lat={lat} lng={lng} style={{ color: "red" }} />;
}
