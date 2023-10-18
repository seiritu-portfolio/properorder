import React from "react";
import { Button } from "@material-ui/core";

export default function RemoveFav(props) {
  const { selectedItem, handleRemoveFav } = props;

  return (
    <div className={"remove-product-ff-modal-container"}>
      <p className={"text-2xl mb-8 text-center"}>
        Remove <span className={"font-bold"}>{selectedItem?.name}</span> from
        Favourites?
      </p>
      <Button
        variant="contained"
        color="secondary"
        className={"w-64 h-12"}
        onClick={handleRemoveFav}
      >
        Remove
      </Button>
    </div>
  );
}
