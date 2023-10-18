import React, { Component } from "react";
import "../styles.scss";
import NavbarHelpSupport from "../NavbarHelpSupport";
import Search from "../Search";
import GetInTouch from "../GetInTouch";
import POHeader from "../../../components/POHeader";
import Footer from "../../../components/POFooter";

export default class AboutProperOrder extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
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
                <NavbarHelpSupport navIndex={1} />
              </div>
              <div className="grid grid-cols-1 gap-4 lg:col-span-3">
                <div className="flex rectangle-container flex-col flex-initial py-5 bg-white overflow-y-auto">
                  <div className="flex-grow flex flex-col px-4 lg:px-7">
                    <h2 className="faq-heading">About Proper Order</h2>
                    <div>
                      <h3 className="faq-question mt-4 mb-1 text-po-graymain font-extrabold text-lg">
                        What is Proper Order?
                      </h3>
                      <p className="text-base text-po-graymain">
                        Proper Order is an online fine food store that showcases
                        high quality goods from independent retailers and
                        producers around Ireland, allowing customers to browse
                        and buy all in one place. We do not store any goods
                        ourselves; we merely connect you with sellers who will
                        in turn fulfill your order.
                      </p>

                      <h3 className="faq-question mt-4 mb-1 text-po-graymain font-extrabold text-lg">
                        What happens when I place an order?
                      </h3>
                      <p className="text-base text-po-graymain">
                        When you place an order, we send the order to the
                        seller(s) in question, who will then prepare your goods
                        for collection or delivery, depending on what you’ve
                        selected. The contract of sale is between you and the
                        seller.
                      </p>

                      <h3 className="faq-question mt-4 mb-1 text-po-graymain font-extrabold text-lg">
                        Is payment secure?
                      </h3>
                      <p className="text-base text-po-graymain">
                        All payments are secured by Stripe. We do not store
                        payment details on our system.
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
