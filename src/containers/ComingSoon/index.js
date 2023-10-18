import React, { useState } from "react";
import "./styles.scss";
import background from "../../assets/landing-bg.jpeg";
import smallBackground from "../../assets/landing-bg-small.webp";
import mediumBackground from "../../assets/landing-bg-medium.webp";
import Decoration from "../../components/Decoration";
import clsx from "clsx";
import { Button, makeStyles } from "@material-ui/core";
import SendIcon from "../../assets/send.svg";
import { ReactSVG } from "react-svg";
import Logo from "../../components/Logo";

import MailchimpForm from "./MailchimpForm";

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: "0 0.5625rem 0.5625rem 0",
    padding: "1rem",
    backgroundColor: theme.palette.common.yellowextralight,
  },
  root: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "right",
    ["@media (max-width:768px)"]: {
      backgroundImage: `url(${smallBackground})`,
      backgroundPositionY: 200,
      backgroundPosition: "left",
    },
    ["@media (min-width:1024px)"]: {
      backgroundImage: `url(${mediumBackground})`,
      backgroundPositionY: 0,
    },
    ["@media (min-width:1280px)"]: {
      backgroundImage: `url(${background})`,
      backgroundPosition: "right",
    },
  },
}));

export default function ComingSoon() {
  const classes = useStyles();

  return (
    <div className="flex w-full flex-col h-screen">
      <div className={clsx("flex-1 back", classes.root)}>
        <div className="flex flex-wrap justify-between md:grid md:grid-cols-7 lg:grid-cols-6 2xl:grid-cols-7 sm:gap-4 z-50">
          <div className="md:col-span-2 lg:col-span-1 disableClick">
            <Logo />
          </div>
        </div>
        <div className="mt-24 mx-4 sm:ml-12">
          <div className={"flex items-center 2xl:ml-14"}>
            <Decoration onLoaded={() => {}} />
            <div className={"sub-title ml-2"}>
              Ireland’s finest food producers,
            </div>
          </div>
          <div
            className={
              "flex items-center justify-end sm:justify-start sm:ml-48 2xl:ml-60"
            }
          >
            <div className={"sub-title mr-2"}>all on one platform</div>
            <Decoration onLoaded={() => {}} />
          </div>
          <div
            className={
              "flex flex-col inline-flex mt-20 ml-0 w-full md:w-auto 2xl:w-3/12 2xl:ml-14 xl:ml-6"
            }
          >
            <h1 className="text-4xl md:text-5xl font-semibold text-center md:text-left text-po-black tracking-wider">
              COMING SOON...
            </h1>

            <MailchimpForm />
          </div>
          <div
            className={"flex flex-col mt-14 ml-0 2xl:w-3/12 2xl:ml-14 ml-6"}
          />
        </div>
      </div>
    </div>
  );
}
