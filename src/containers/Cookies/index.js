import React, { useEffect } from "react";
import "./styles.scss";
import POHeader from "../../components/POHeader";
import Footer from "../../components/POFooter";
import BackToTopButton from "../../components/BackToTopBtn";

export default function Cookies() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full min-h-screen bg-gray-50">
      <POHeader classNames={"absolute w-full"} />
      <div className=" flex flex-col">
        <h1 className="text-center main-heading mb-3 lg:mb-5">
          Cookies Policy
        </h1>
      </div>

      <div className="mx-auto px-6 md:px-8 max-w-full md:max-w-screen-lg">
        <p className="text-sm text-po-black font-normal mb-1">
          This Cookies Policy applies to Proper Order websites, applications and
          email communications.
        </p>
        <p className="text-sm text-po-black font-normal mb-1">
          The purpose of this Cookies Policy is to explain to you what cookies
          we use and why we use them. If you still have questions about our use
          of cookies or your privacy in regard to the cookies, you can contact
          us at&nbsp;
          <a
            href="mailto:compliance@properorder.ie?subject=Cookies Policy"
            className={"font-bold text-po-yellowdark"}
          >
            compliance@properorder.ie
          </a>
          .
        </p>

        <h2 className="text-po-black font-semibold mt-4 mb-3 text-xl">
          What are cookies?
        </h2>
        <p className="text-sm text-po-black font-normal mb-1">
          We use cookies on our applications, websites and email communications.
        </p>
        <p className="text-sm text-po-black font-normal mb-1">
          A cookie is a very small text document, which often includes a unique
          identifier. Cookies are created when your browser loads a particular
          website. The website sends information to the browser which then
          creates a text file. Every time the user goes back to the same
          website, the browser retrieves and sends this file to the
          website&rsquo;s server. Find out more about the use of cookies on
          <a
            href="https://www.allaboutcookies.org/"
            target="_blank"
            rel="noreferrer"
            className={"font-bold text-po-yellowdark"}
          >
            {" "}
            www.allaboutcookies.org
          </a>
          .
        </p>
        <p className="text-sm text-po-black font-normal mb-1">
          We also use other forms of technologies such as scripts, web beacons
          and, in apps, software development kits (usually referred to as SDKs)
          which serve a similar purpose to cookies and which allow us to monitor
          and improve our applications, websites and email communications. When
          we talk about cookies in this Cookies Policy, this term includes these
          similar technologies. If you would like more information about our
          privacy practices, please see our privacy notice.
        </p>
        <p className="text-sm text-po-black font-normal mb-1">
          Where you consent to our use of cookies, we typically retain your
          consent for six months from your last interaction with our websites or
          applications before asking you to re-consent.
        </p>

        <h2 className="text-po-black font-semibold mt-4 mb-3 text-xl">
          Why do we use cookies?
        </h2>
        <p className="text-sm text-po-black font-normal mb-1">
          We place cookies for various different purposes. Below you will find
          an overview of the different purposes for which we use cookies.
        </p>

        <div className="shadow border-b border-gray-200 sm:rounded-lg mt-4">
          <table className="divide-y divide-gray-200 table-auto max-w-full md:max-w-screen-lg w-full">
            <thead className="bg-gray-50">
              <tr className="divide-x">
                <th className="px-6 py-3 text-left text-sm font-bold text-po-black">
                  Cookie categories
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-po-black">
                  Maximum Retention Period for Data Collected via Cookies
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-x divide-gray-200">
              <tr className="divide-x">
                <td className="px-6 py-4 text-sm text-po-black">
                  <p className="mb-1 font-semibold">1. Required cookies</p>
                  These cookies are required to enable and maintain core
                  functionalities of our websites and apps. Without these
                  cookies, services you have asked for, like adding items to
                  your order, cannot be provided. Without these cookies certain
                  parts of our websites and applications will not function for
                  you, for example, adding items to your order or proceeding to
                  checkout. We also use cookies to help keep our platform secure
                  and to test new functionality to make sure it doesn’t
                  interfere with the operation of the platform’s core
                  functionality.
                </td>
                <td className="px-6 py-4 text-sm text-po-black">25 months</td>
              </tr>
              <tr className="divide-x">
                <td className="px-6 py-4 text-sm text-po-black">
                  <p className="mb-1 font-semibold">2. Functional cookies</p>
                  We may use cookies that are not essential but enable various
                  helpful features on our websites. For example, these cookies
                  collect information about your interaction with our websites
                  and apps, and may be used to remember your preferences or your
                  interests.
                </td>
                <td className="px-6 py-4 text-sm text-po-black">25 months</td>
              </tr>
              <tr className="divide-x">
                <td className="px-6 py-4 text-sm text-po-black">
                  <p className="mb-1 font-semibold">3. Analytics cookies</p>
                  We analyse user behaviour on our website, using cookies and
                  similar technologies, to improve our website and to adapt it
                  to give you the best possible user experience. We hope that by
                  analysing this data, we can ensure that our website is as user
                  friendly as possible. For example, we keep track of which
                  pages are visited the most and how you navigate on our
                  website. We use Google Analytics to better understand how
                  customers use our websites and applications. If you don’t want
                  Google Analytics to be used in your browser, you can install
                  this Google add-on:&nbsp;
                  <a
                    href="https://tools.google.com/dlpage/gaoptout?hl=en_GB"
                    target="_blank"
                    rel="noreferrer"
                    className={"font-bold text-po-yellowdark"}
                  >
                    https://tools.google.com/dlpage/gaoptout?hl=en_GB
                  </a>
                  .
                </td>
                <td className="px-6 py-4 text-sm text-po-black">25 months</td>
              </tr>
              <tr className="divide-x">
                <td className="px-6 py-4 text-sm text-po-black">
                  <p className="mb-1 font-semibold">4. Advertising cookies</p>
                  We use cookies and similar technologies to advertise our
                  platform and services to you and to collect information about
                  your browsing habits in order to make advertising more
                  relevant to you and your interests. For this purpose we
                  analyse, among other things, how often you use our website and
                  which products you find interesting. This allows us to better
                  adapt our advertisements to your preferences. We also use such
                  cookies to check whether you come from a website of one of our
                  advertisers or affiliates. We may share this information with
                  third parties who help manage our online advertising.
                </td>
                <td className="px-6 py-4 text-sm text-po-black">25 months</td>
              </tr>
              <tr className="divide-x">
                <td className="px-6 py-4 text-sm text-po-black">
                  <p className="mb-1 font-semibold">5. Social Media cookies</p>
                  These cookies are used when you share information using a
                  social media sharing button or &quot;like&quot; button on our
                  websites or applications, or when you engage with our content
                  on, or through, a social platform such as Facebook or Twitter.
                  These cookies collect information about your social media
                  interaction with us, such as whether or not you have an
                  account with the social media site and whether you are logged
                  into it when you interact with our content on our websites and
                  applications. This information may be linked to
                  targeting/advertising activities.
                </td>
                <td className="px-6 py-4 text-sm text-po-black">25 months</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 className="text-po-black font-semibold mt-4 mb-3 text-xl">
          Managing cookie preferences
        </h2>

        <ol className="list-decimal text-sm text-po-black font-normal">
          <li className="my-2">
            <h3 className="text-base text-po-black font-normal mb-1">
              Enabling/disabling cookies and deleting cookies
            </h3>

            <p className="text-sm text-po-black font-normal mb-1">
              It may also be possible to delete or disable cookies which have
              already been placed on your device using your browser settings. By
              disabling cookies, it is possible that parts of our website will
              no longer work. Essential cookies for the operation of the website
              can not be deactivated. You can use the following links to find
              out how to change the cookie settings in your browser, and the
              extent to which you are able to delete cookies via your browser
              settings:
            </p>

            <ul className={"po-sub-ul"}>
              <li className="mb-1">
                <a
                  href="https://support.google.com/chrome/answer/95647?hl=en"
                  target="_blank"
                  rel="noreferrer"
                  className={"font-bold text-po-yellowdark"}
                >
                  Chrome
                </a>
              </li>
              <li className="mb-1">
                <a
                  href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox"
                  target="_blank"
                  rel="noreferrer"
                  className={"font-bold text-po-yellowdark"}
                >
                  Firefox
                </a>
              </li>
              <li className="mb-1">
                <a
                  href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
                  target="_blank"
                  rel="noreferrer"
                  className={"font-bold text-po-yellowdark"}
                >
                  Internet Explorer
                </a>
              </li>
              <li className="mb-1">
                <a
                  href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noreferrer"
                  className={"font-bold text-po-yellowdark"}
                >
                  Edge
                </a>
              </li>
              <li className="mb-1">
                <a
                  href="https://support.apple.com/en-us/HT201265"
                  target="_blank"
                  rel="noreferrer"
                  className={"font-bold text-po-yellowdark"}
                >
                  Safari (iOS)
                </a>
              </li>
              <li className="mb-1">
                <a
                  href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noreferrer"
                  className={"font-bold text-po-yellowdark"}
                >
                  Safari (macOS)
                </a>
              </li>
              <li className="mb-1">
                <a
                  href="https://help.opera.com/en/latest/web-preferences/#cookies"
                  target="_blank"
                  rel="noreferrer"
                  className={"font-bold text-po-yellowdark"}
                >
                  Opera
                </a>
              </li>
              <li className="mb-1">
                <a
                  href="https://www.samsung.com/uk/support/mobile-devices/what-are-cookies-and-how-do-i-enable-or-disable-them-on-my-samsung-galaxy-device/"
                  target="_blank"
                  rel="noreferrer"
                  className={"font-bold text-po-yellowdark"}
                >
                  Samsung Android Browser
                </a>
              </li>
            </ul>
          </li>

          <li className="my-2">
            <h3 className="text-base text-po-black font-normal my-1">
              Further information and questions
            </h3>

            <p className="text-sm text-po-black font-normal mb-1">
              For more information about the processing of your personal data
              including details about your rights, please refer to our privacy
              notice. If you have any questions or complaints regarding our
              Cookies Policy, we are happy to help you. We would also like to
              hear from you if you have suggestions to improve our Cookies
              Policy. You can contact us at&nbsp;
              <a
                href="mailto:compliance@properorder.ie?subject=Cookies Policy"
                className={"font-bold text-po-yellowdark"}
              >
                compliance@properorder.ie
              </a>
              .
            </p>

            {/*
              <a href="/" className={"font-bold text-base text-po-yellowdark mt-8 mb-3"}> Open cookie preferences </a>
            */}
          </li>
        </ol>
      </div>
      <div className="mt-auto pt-6">
        <Footer />
      </div>
      <BackToTopButton />
    </div>
  );
}
