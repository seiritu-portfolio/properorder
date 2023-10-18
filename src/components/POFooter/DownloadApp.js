import React from "react";
import "./styles.scss";
import { Button } from "@material-ui/core";
import { ReactSVG } from "react-svg";
import GoogleButton from "../../assets/google_button.svg";
import AppleButton from "../../assets/apple_button.svg";

export default function DownloadApp() {
  return (
    <div className={"flex flex-col items-center mb-4"}>
      <div
        className={
          "footer-item-title text-black uppercase text-center mt-2 xl:ml-2"
        }
      >
        Download our app
      </div>
      <div className={"flex justify-between flex-row mt-3"}>
        <Button>
          <ReactSVG
            onClick={() =>
              window.open(
                "https://play.google.com/store/apps/details?id=ie.properorder.app"
              )
            }
            src={GoogleButton}
            className="transform transition ease-out duration-300 hover:scale-105"
          />
        </Button>
        <Button>
          <ReactSVG
            onClick={() =>
              window.open(
                "https://apps.apple.com/ie/app/proper-order/id1611038478"
              )
            }
            src={AppleButton}
            className="transform transition ease-out duration-300 hover:scale-105"
          />
        </Button>
      </div>
    </div>
  );
}
