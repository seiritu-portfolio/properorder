import React, { Component } from "react";
import "./styles.scss";
import history from "../../routes/history";
import FooterItem from "./FooterItem";
import ContactUs from "./ContactUs";
import DownloadApp from "./DownloadApp";
import { withRouter } from "react-router-dom";
import Logo from "../Logo";

class LandingFooter extends Component {
  constructor(props, context) {
    super(props, context);

    this.about = [
      {
        title: "Help & support",
        action: () => history.push("/about-proper-order"),
      },
      //  {
      //   title: "About us",
      //   action: () => history.push("/about"),
      // },

      //{
      //   title: "Blog",
      //   action: () => history.push("/"),
      // },
      {
        title: "Work with us",
        action: () => history.push("/work-with-us"),
      },
    ];

    this.legal = [
      {
        title: "Terms & conditions",
        action: () => history.push("/terms-and-conditions"),
      },
      {
        title: "Privacy policy",
        action: () => history.push("/privacy-policy"),
      },
      {
        title: "Cookies",
        action: () => history.push("/cookies-policy"),
      },
    ];
  }

  render() {
    return (
      <div
        className={"bg-secondary px-5 md:px-8 py-4 space-y-3 hidden sm:block"}
      >
        <div className="flex w-full justify-around">
          <div className={"small-logo-container"}>
            <Logo isSmall />
          </div>
          <div
            className={
              "flex bg-secondary flex flex-col space-y-3 md:space-y-0 md:space-x-5 xl:space-x-14 md:grid md:grid-cols-3  xl:grid-cols-3 2xl:grid-cols-4 pb-4 "
            }
          >
            <FooterItem title={"About"} items={this.about} />
            <FooterItem title={"Legal & support"} items={this.legal} />
            <ContactUs />
          </div>
        </div>
        <div className={"border-b border-po-graydark"}>
          <DownloadApp />
        </div>
        <div className={"flex items-center justify-center copy-right my-0"}>
          © 2022 Proper Order. All rights reserved
        </div>
      </div>
    );
  }
}

export default withRouter(LandingFooter);
