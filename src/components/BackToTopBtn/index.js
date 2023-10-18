import React, { useEffect, useState } from "react";
import "./styles.scss";
import { ArrowSmUpIcon } from "@heroicons/react/outline";

export default function BackToTopBtn() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="hidden lg:block">
      {isVisible && (
        <div className="btt-button transform transition duration-300 block ease-out shadow-sm border border-po-black">
          <button
            onClick={() => scrollToTop()}
            className="btt-link h-full w-full cursor-pointer d-flex h-100"
            title="Back to Top"
          >
            <ArrowSmUpIcon
              className="p-1.5 mx-auto my-auto"
              aria-hidden="true"
            />
          </button>
        </div>
      )}
    </div>
  );
}
