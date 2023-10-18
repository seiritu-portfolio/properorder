import React, { Component } from "react";
import "../styles.scss";
import NavbarHelpSupport from "../NavbarHelpSupport";
import Search from "../Search";
import GetInTouch from "../GetInTouch";
import POHeader from "../../../components/POHeader";
import Footer from "../../../components/POFooter";

export default class DeliveryAndCollection extends Component {
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
                <NavbarHelpSupport navIndex={3} />
              </div>
              <div className="grid grid-cols-1 gap-4 lg:col-span-3">
                <div className="flex rectangle-container flex-col flex-initial py-5 bg-white overflow-y-auto">
                  <div className="flex-grow flex flex-col px-4 lg:px-7">
                    <h2 className="faq-heading">Delivery & Collection</h2>
                    <div>
                      <h3 className="faq-question mt-4 mb-1 text-po-graymain font-extrabold text-lg">
                        If my order is for delivery, who carries out the
                        delivery?
                      </h3>
                      <p className="text-base text-po-graymain">
                        Sellers arrange all deliveries, either using their own
                        drivers or a third party courier. At Proper Order we do
                        not handle any goods.
                      </p>

                      <h3 className="faq-question mt-4 mb-1 text-po-graymain font-extrabold text-lg">
                        When will my order be available for collection /
                        delivered to me?
                      </h3>
                      <p className="text-base text-po-graymain">
                        This varies by product and by seller. When you place an
                        order you will receive an initial email confirmation.
                        Once the order is ready for collection, or is out for
                        delivery, you will receive another email notifying you.
                      </p>

                      <h3 className="faq-question mt-4 mb-1 text-po-graymain font-extrabold text-lg">
                        What if I am not at home to take delivery?
                      </h3>
                      <p className="text-base text-po-graymain">
                        You may leave a note with your order to specify what the
                        driver should do in the event of there being nobody to
                        take delivery. Alternatively, you may contact the
                        seller.
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
