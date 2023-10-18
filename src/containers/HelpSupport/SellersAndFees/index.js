import React, { Component } from "react";
import "../styles.scss";
import NavbarHelpSupport from "../NavbarHelpSupport";
import Search from "../Search";
import GetInTouch from "../GetInTouch";
import POHeader from "../../../components/POHeader";
import Footer from "../../../components/POFooter";

export default class SellersAndFees extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="flex flex-col w-full min-h-screen">
        <POHeader classNames={"absolute w-full"} />
        <div className="help-support-header flex flex-col">
          <h1 className="text-center main-heading lg:mb-5">Help & support</h1>
        </div>
        {/*
        <Search />
        */}
        <main className="pb-8 -mt-14 md:-mt-24 z-40">
          <div className="mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-4 lg:gap-8">
              <div className="grid grid-cols-1 gap-4">
                <NavbarHelpSupport navIndex={2} />
              </div>
              <div className="grid grid-cols-1 gap-4 lg:col-span-3">
                <div className="flex rectangle-container flex-col flex-initial py-5 bg-white overflow-y-auto">
                  <div className="flex-grow flex flex-col px-4 lg:px-7">
                    <h2 className="faq-heading">Sellers & fees</h2>
                    <div>
                      <h3 className="faq-question mt-4 mb-1 text-po-graymain font-extrabold text-lg">
                        Can I order from multiple sellers in one go?
                      </h3>
                      <p className="text-base text-po-graymain">
                        Yes. In this case a separate order is created for each
                        seller, and you will receive separate email
                        confirmations.
                      </p>

                      <h3 className="faq-question mt-4 mb-1 text-po-graymain font-extrabold text-lg">
                        How much does delivery cost?
                      </h3>
                      <p className="text-base text-po-graymain">
                        This is set by each seller, and may vary by distance
                        e.g. a seller may decide to offer free delivery in their
                        own area but may charge a fee for longer distances.
                      </p>

                      <h3 className="faq-question mt-4 mb-1 text-po-graymain font-extrabold text-lg">
                        I was informed that a seller was on the platform, but I
                        do not see them
                      </h3>
                      <p className="text-base text-po-graymain">
                        The delivery coverage of each seller is determined by
                        Eircode. If a particular seller is on the platform but
                        is not shown, it is likely because they do not deliver
                        to your area. If you wish to collect, try using an
                        address or area to the seller.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <GetInTouch />
        </main>
        <div className="mt-auto pt-6">
          <Footer />
        </div>
      </div>
    );
  }
}
