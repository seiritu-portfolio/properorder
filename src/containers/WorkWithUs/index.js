import React, { useEffect } from "react";

import "./styles.scss";
import POHeader from "../../components/POHeader";
import Footer from "../../components/POFooter";
import { NavigateNextRounded } from "@material-ui/icons";

export default function WorkWithUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full min-h-screen bg-gray-50">
      <POHeader classNames={"absolute w-full"} />
      <div className="bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-4 lg:px-8">
        <div className="px-2 w-full md:max-w-xl xl:max-w-2xl">
          <h1 className="text-center main-heading mb-3 lg:mb-5">
            Work with us
          </h1>
        </div>
        <div className="w-full md:max-w-xl xl:max-w-2xl">
          <div className="bg-white py-8 lg:py-12 px-2 rectangle-container sm:px-6 mt-6 mx-2">
            <p className="text-lg text-po-black text-center">
              I am interested in learning more about:
            </p>
            <div className="flex flex-col mx-auto mt-6 lg:mt-8">
              <div className="w-full flex items-center justify-center">
                <div
                  className={
                    "rounded-full font-semibold bg-po-black w-2 h-2 mr-3"
                  }
                />
                <p className="text-base lg:text-xl text-po-black font-bold">
                  Selling with Proper Order
                </p>
                <NavigateNextRounded fontSize={"large"} color={"secondary"} />
                <a
                  href="mailto:sellers@properorder.ie?subject=Selling with Proper Order"
                  className={
                    "text-base lg:text-xl text-po-yellowmedium font-semibold underline underline-offset-2"
                  }
                >
                  sellers@properorder.ie
                </a>
              </div>
              <div className="w-full flex items-center justify-center mt-4">
                <div
                  className={
                    "rounded-full font-semibold bg-po-black w-2 h-2 mr-3"
                  }
                />
                <p className="text-base lg:text-xl text-po-black font-bold">
                  Roles with Proper Order
                </p>
                <NavigateNextRounded fontSize={"large"} color={"secondary"} />
                <a
                  href="mailto:team@properorder.ie?subject=Roles with Proper Order"
                  className={
                    "text-base lg:text-xl text-po-yellowmedium font-semibold underline underline-offset-2"
                  }
                >
                  team@properorder.ie
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-6">
        <Footer />
      </div>
    </div>
  );
}
