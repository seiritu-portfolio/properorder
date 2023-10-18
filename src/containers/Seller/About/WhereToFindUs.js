import React from "react";
import GoogleMap from "google-map-react";
import base64 from "base-64";
import POMarker from "../../../components/POMarker";

export default function WhereToFindUs(props) {
  const { seller } = props;

  const defaultProps = {
    center: {
      lat: Number(seller.lat),
      lng: Number(seller.long),
    },
    zoom: 11,
  };

  return (
    <div>
      <h2 className={"my-4"}>Where to find us</h2>
      <div style={{ height: "13.6rem", width: "100%" }}>
        <GoogleMap
          bootstrapURLKeys={{
            key: base64.decode(process.env.REACT_APP_GOOGLE),
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals
        >
          <POMarker
            lat={defaultProps.center.lat}
            lng={defaultProps.center.lng}
          />
        </GoogleMap>
      </div>
    </div>
  );
}
