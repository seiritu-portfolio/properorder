import React from "react";
import "./styles.scss";
import ChatIcon from "../../assets/chat.svg";
import MailIcon from "../../assets/mail_lg.svg";
import { ReactSVG } from "react-svg";

export default function GetInTouch() {
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-semibold">
          Still need help? Get in touch:
        </h1>
        <div className="flex justify-center mt-4">
          <div className="flex flex-col items-center mx-4">
            <ReactSVG src={MailIcon} className="" />
            <p className="text-base  text-po-graymain hover:text-po-black font-semibold">
              <a href="mailto:hello@properorder.ie?subject=Proper Order Query">
                hello@properorder.ie
              </a>
            </p>
          </div>
          {/* Chat option temporary hidde for V1:
          <div className="flex flex-col items-center mx-4">
            <ReactSVG src={ChatIcon} className="" />
            <p className="text-base text-po-graymain hover:text-po-black font-semibold">
              Open chat
            </p>
          </div>
          */}
        </div>
      </div>
    </div>
  );
}
