import React, { Component } from "react";
import "../styles.scss";
import NavbarHelpSupport from "../NavbarHelpSupport";
import Search from "../Search";
import GetInTouch from "../GetInTouch";
import POHeader from "../../../components/POHeader";
import Footer from "../../../components/POFooter";

export default class QuestionsIssuesRefunds extends Component {
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
                <NavbarHelpSupport navIndex={4} />
              </div>
              <div className="grid grid-cols-1 gap-4 lg:col-span-3">
                <div className="flex rectangle-container flex-col flex-initial py-5 bg-white overflow-y-auto">
                  <div className="flex-grow flex flex-col px-4 lg:px-7">
                    <h2 className="faq-heading">Questions, issues & refunds</h2>
                    <div>
                      <h3 className="faq-question mt-4 mb-1 text-po-graymain font-extrabold text-lg">
                        What if I have questions or issues with my order?
                      </h3>
                      <p className="text-base text-po-graymain">
                        If you have any questions about your order, you should
                        contact the seller directly. If you have trouble
                        contacting the seller, or you are unable to obtain a
                        satisfactory response, please contact us by emailing
                        <a
                          href="mailto:support@properorder.ie?subject=Proper Order Question"
                          className={"font-bold text-po-yellowdark"}
                        >
                          &nbsp;support@properorder.ie
                        </a>
                        .
                        {/* Comment out, when the CHAT functionality is implemented
                             or using the chat applet on properorder.ie */}
                      </p>

                      <h3 className="faq-question mt-4 mb-1 text-po-graymain font-extrabold text-lg">
                        What if I need to request a refund?
                      </h3>
                      <p className="text-base text-po-graymain">
                        When you place an order with us, your payment is routed
                        immediately to the seller. If you feel that you are owed
                        a refund for any reason, please contact the seller
                        directly.
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
