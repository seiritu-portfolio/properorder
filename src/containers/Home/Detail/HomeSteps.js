import React from "react";
import homeIcon from "../../../utils/customSVG/homeIcon";
import { useTheme } from "@material-ui/core/styles";
import { IoMdArrowRoundBack } from "react-icons/io";
import clsx from "clsx";
import "./styles.scss";
import { Close } from "@material-ui/icons";

export default function HomeSteps(props) {
  const theme = useTheme();
  const primaryColor = theme.palette.common.black;
  const secondaryColor = theme.palette.common.graymedium;
  const { steps, handleClickStep, visible, isLoading } = props;
  const atHome = steps.length === 0;

  const homeButton = () => {
    if (atHome) {
      return (
        <div className={"pl-2 pr-3 breadcrumbs-home-active"}>
          {homeIcon(secondaryColor)}
        </div>
      );
    }

    return (
      <>
        <div
          className={"pl-3 pr-1 cursor-pointer text-po-black block md:hidden"}
          onClick={() => {
            const step = steps.length - 2;
            if (step >= 0) {
              handleClickStep(steps[step], step);
            } else {
              handleClickStep(null, -1);
            }
          }}
        >
          <IoMdArrowRoundBack
            className={"w-6 h-6 text-po-black hover:text-po-yellowdark"}
          />
        </div>
        <div
          className={
            "pl-3 pr-2 cursor-pointer breadcrumbs-home text-po-black hidden md:block"
          }
          onClick={() => handleClickStep(null, -1)}
        >
          {homeIcon(primaryColor)}
        </div>
      </>
    );
  };

  return (
    <div
      className={clsx(
        "home-steps-container flex my-1 h-7",
        !visible && "hidden"
      )}
    >
      {!atHome ? (
        <>
          {homeButton()}
          <div className={"home-steps-divider self-center"} />
        </>
      ) : null}
      {steps.map((step, index) => {
        const isActive = index === steps.length - 1;
        return (
          <div
            key={index}
            className={`flex-row justify-center ${
              !isActive ? "hidden md:flex" : "flex"
            }`}
          >
            <a
              className={clsx(
                "text-sm pl-3 pr-1 self-center",
                isActive
                  ? `font-normal text-po-black`
                  : "font-bold text-po-black hover:text-po-yellowdark cursor-pointer transform transition duration-300 ease-out"
              )}
              onClick={() => (!isActive ? handleClickStep(step, index) : {})}
            >
              {step.name}
            </a>
            {!isActive && <div className={"home-steps-divider self-center"} />}
            {isActive && (
              <Close
                style={{ fontSize: "1rem" }}
                className={"mr-1 ml-2 cursor-pointer self-center h-4"}
                color={"primary"}
                onClick={() => handleClickStep(steps[index - 1], index - 1)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
