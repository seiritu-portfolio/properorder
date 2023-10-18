import React from "react";
import "./styles.scss";
import MailIcon from "@material-ui/icons/MailOutlined";
import InstagramIcon from "../../assets/ic_instagram.svg";
import FacebookIcon from "../../assets/ic_facebook.svg";
import TwitterIcon from "../../assets/ic_twitter.svg";
import { ReactSVG } from "react-svg";
import { IconButton } from "@material-ui/core";

export default function ContactUs() {
  return (
    <div className={"flex flex-col items-center md:items-start"}>
      <div
        className={
          "footer-item-title text-black uppercase text-center mt-3 lg:mt-1"
        }
      >
        Contact Us
      </div>
      <a
        href="mailto:hello@properorder.ie?subject=Proper Order Query"
        className="inline-flex items-center space-x-1 mt-3 lg:mt-2 text-po-graymain hover:text-black contact-email"
        type="button"
      >
        <MailIcon />
        <span className={"footer-item-text "}>hello@properorder.ie</span>
      </a>
      <div
        className={
          "md:-ml-4 lg:-ml-3 flex w-full justify-center lg:justify-between mt-2"
        }
      >
        <a
          href="https://www.instagram.com/properorderie/"
          target="_blank"
          rel="noreferrer"
        >
          <IconButton>
            <ReactSVG
              src={InstagramIcon}
              className="transform transition duration-300  ease-out hover:scale-105"
            />
          </IconButton>
        </a>
        <a
          href="https://www.facebook.com/properorderireland/"
          target="_blank"
          rel="noreferrer"
        >
          <IconButton>
            <ReactSVG
              src={FacebookIcon}
              className="transform transition duration-300 ease-out hover:scale-105"
            />
          </IconButton>
        </a>
        <a
          href="https://twitter.com/ProperOrderIE"
          target="_blank"
          rel="noreferrer"
        >
          <IconButton>
            <ReactSVG
              src={TwitterIcon}
              className="transform transition duration-300 hover:scale-110"
            />
          </IconButton>
        </a>
      </div>
    </div>
  );
}
