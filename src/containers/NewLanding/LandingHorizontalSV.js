import React, { useEffect, useRef, useState } from "react";
import UIService from "../../services/UIService";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import clsx from "clsx";

export default function LandingHorizontalSV({ children, tabsInfo }) {
  const [scrollLeft, setScrollLeft] = useState(0);
  const [gotToScrollLimit, setGotToScrollLimit] = useState(false);
  const [hasStart, setHasStart] = useState(true);
  const [hasOverflow, setHasOverflow] = useState(false);

  const scrollerRef = useRef(null);

  useEffect(() => {
    setGotToScrollLimit(
      UIService.getHorizontalScrollPercentage(scrollerRef.current) >= 99
    );
  }, [scrollLeft]);

  useEffect(() => {
    scrollerRef.current.scrollLeft = 0;
    setScrollLeft(0);
    setHasOverflow(UIService.isOverflown(scrollerRef.current));
  }, [tabsInfo]);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const scrollTo = (change, duration = 500) => {
    let start = scrollerRef.current.scrollLeft,
      currentTime = 0;

    let animateScroll = function (increment) {
      currentTime += increment;
      const val = Math.easeInOutQuad(currentTime, start, change, duration);
      scrollerRef.current.scrollLeft = val;
      setScrollLeft(val);
      if (currentTime < duration) {
        setTimeout(() => animateScroll(increment + 1), increment);
      }
    };
    animateScroll(10);
  };

  const clickLeftArrow = () => {
    scrollTo(-width / 2);
  };

  const clickRightArrow = () => {
    scrollTo(width / 2);
  };

  const onScroll = () => {
    const sLeft = scrollerRef.current.scrollLeft;
    setGotToScrollLimit(
      UIService.getHorizontalScrollPercentage(scrollerRef.current) >= 99
    );
    setHasStart(sLeft <= 0);
  };

  const renderArrow = (isLeft, hidden, className) =>
    hidden ? null : (
      <button
        className={clsx(
          "p-2 rounded-full bg-po-graymain absolute z-50 shadow-xl",
          className
        )}
        onClick={() => (isLeft ? clickLeftArrow() : clickRightArrow())}
      >
        {isLeft ? (
          <BsArrowLeftShort className={"w-8 h-8 text-white"} />
        ) : (
          <BsArrowRightShort className={"w-8 h-8 text-white"} />
        )}
      </button>
    );

  return (
    <div className={"w-full relative"}>
      <div
        ref={scrollerRef}
        className={"home-categories-container"}
        onScroll={onScroll}
      >
        <div className={"py-2 px-2"}>{children}</div>
        {renderArrow(true, scrollLeft <= 0 && hasStart, "top-28 left-3")}
        {renderArrow(false, gotToScrollLimit || !hasOverflow, "top-28 right-3")}
      </div>
    </div>
  );
}

Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};
