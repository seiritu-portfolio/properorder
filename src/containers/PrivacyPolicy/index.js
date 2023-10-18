import React, { useEffect } from "react";
import POHeader from "../../components/POHeader";
import Footer from "../../components/POFooter";
import BackToTopButton from "../../components/BackToTopBtn";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full min-h-screen bg-gray-50">
      <POHeader classNames={"absolute w-full"} />
      <div className=" flex flex-col">
        <h1 className="text-center main-heading mb-3 lg:mb-5">
          Privacy Policy
        </h1>
      </div>

      <div className="mx-auto px-6 md:px-8  max-w-full md:max-w-screen-lg">
        <h2 className="text-po-black font-bold mt-4 mb-2 text-xl">
          Introduction
        </h2>
        <p className="text-sm text-po-black font-normal mb-1">
          At Proper Order we are committed to building Ireland’s greatest food
          community, and that begins with protecting the privacy of everyone in
          our community. This means that we’ll protect the personal information
          of all visitors who access our websites or services through any mobile
          application, platform or device (collectively, the
          &quot;Services&quot;).
        </p>
        <p className="text-sm text-po-black font-normal mb-1">
          This privacy notice (&quot;Privacy notice&quot;) explains how Proper
          Order shares and uses your personal information. You’ll also find
          information about how you can exercise your privacy rights. By using
          our Services you agree to Proper Order using your personal information
          as described in this Privacy Notice. The terms &quot;we&quot;,
          &quot;us&quot; or &quot;our&quot; are each intended as reference to
          Proper Order Technology Limited and any terms not defined in this
          Privacy Notice are defined in our Terms.
        </p>
        <h2 className="text-po-black font-bold mt-4 mb-2 text-xl">Summary</h2>
        <p className="text-sm text-po-black font-normal mb-1">
          We’ve summarised the key points of our Privacy Notice below, with
          further details in the{" "}
          <span className="font-bold">More information</span>&nbsp;section.
        </p>

        <h3 className="text-po-black font-semibold mt-2 mb-2 text-lg">
          Information we collect from you and why
        </h3>
        <p className="text-sm text-po-black font-normal mb-1">
          Here are the broad categories of personal information that we may
          collect about you and the reasons why:
        </p>
        <h4 className="text-po-black font-semibold mt-1 mb-2 text-base">
          Information that you provide voluntarily:
        </h4>

        <ol className="list-decimal text-sm text-po-black font-normal ml-5">
          <li className="my-2">
            Registration information when you create a Proper Order account so
            we can:
            <ol>
              <li className="my-1 ml-2">
                a. create your account so you can place Orders under our Terms
              </li>
              <li className="mb-1 ml-2">
                b. identify you when you sign-in to your account;
              </li>
              <li className="mb-1 ml-2">
                c. contact you for your views on our Services; and
              </li>
              <li className="mb-1 ml-2">
                d. notify you of changes or updates to our Services.
              </li>
            </ol>
          </li>
          <li className="my-2">
            Transaction Information when you place an Order with a Seller in
            order to:
            <ol>
              <li className="my-1 ml-2">
                a. process your Order and to bill you (though note, Proper Order
                never stores your credit card information in our systems);
              </li>
              <li className="mb-1 ml-2">
                b. communicate your Order to the Seller;
              </li>
              <li className="mb-1 ml-2">
                c. send you status updates on your Order;
              </li>
              <li className="mb-1 ml-2">
                d. reply to your Order queries and questions and to resolve
                problems;
              </li>
              <li className="mb-1 ml-2">
                e. carry out analysis and research to develop and improve our
                Services; and
              </li>
              <li className="mb-1 ml-2">
                f. protect you and the Services by seeking to detect and prevent
                fraud or other acts in breach of our Terms or policies relevant
                to the Services.
              </li>
            </ol>
          </li>
          <li className="my-2">
            Information regarding your marketing preferences so we can:
            <ol>
              <li className="my-1 ml-2">
                a. send you customised marketing about our products or services.
              </li>
            </ol>
          </li>
          <li className="my-2">
            Feedback on your views of our Services in order to:
            <ol>
              <li className="my-1 ml-2">
                a. reply to your questions or queries;
              </li>
              <li className="my-1 ml-2">
                b. publish reviews you submit to us about our Sellers and
                services; and
              </li>
              <li className="my-1 ml-2">
                c. conduct analysis and research to improve and develop our
                Services.
              </li>
            </ol>
          </li>
        </ol>
        <h4 className="text-po-black font-semibold mt-1 mb-2 text-base">
          Information that we collect automatically
        </h4>
        <p className="text-sm text-po-black font-normal">
          Activity Information so we can:
        </p>

        <ol className="list-decimal text-sm text-po-black font-normal ml-5">
          <li className="my-2">
            provide you with an improved experience;
            <ol>
              <li className="my-1 ml-2">
                a. give you access to your Order history and preferences; and
              </li>
              <li className="mb-1 ml-2">
                b. provide other services at your request.
              </li>
            </ol>
          </li>
          <li className="my-2">
            Cookies and similar technologies so we can:
            <ol>
              <li className="my-1 ml-2">
                a. measure and analyse the use and effectiveness of our
                Services;
              </li>
              <li className="mb-1 ml-2">
                b. customise and optimise the targeting of advertising for our
                Services across other websites and platforms; and
              </li>
              <li className="mb-1 ml-2">
                b. provide location services if you choose to share your
                geo-location.
              </li>
            </ol>
          </li>
        </ol>
        <h4 className="text-po-black font-semibold mt-1 mb-2 text-base">
          Information that we obtain from third-party sources
        </h4>
        <p className="text-sm text-po-black font-normal">
          Analytics reports and market research surveys in order to:
        </p>
        <ol className="list-decimal text-sm text-po-black font-normal ml-5">
          <li className="my-2">
            measure the performance of marketing campaigns for our Services; and
          </li>
          <li className="my-2">
            better understand your preferences so that we can customise our
            marketing campaigns and Services accordingly.
          </li>
        </ol>
        <p className="text-sm text-po-black font-normal mb-1">
          We process information that you provide voluntarily, information that
          we collect automatically and information that we obtain from third
          party sources in order to constantly improve our Services. Using this,
          we can make it even easier for you to find the food you want when you
          want it, no matter what device you choose to use or where you are in
          the world.
        </p>

        <h3 className="text-po-black font-semibold mt-3 mb-2 text-lg">
          Whom we share personal information with
        </h3>

        <p className="text-sm text-po-black font-normal mb-1">
          We may share your personal information with the following recipients
          (and whenever we do, we will ensure that we have appropriate security
          and contractual safeguards in place to protect it):
        </p>

        <ol className="list-decimal text-sm text-po-black font-normal ml-5">
          <li className="my-2">
            Sellers that you have placed an Order with for processing and
            delivery;
          </li>
          <li className="my-2">Proper Order companies within our group;</li>
          <li className="my-2">
            Third parties who support our Services (e.g. partners for marketing
            or promotions in the food, drink and leisure sectors based on your
            preferences);
          </li>
          <li className="my-2">
            Any law enforcement or regulatory body, government agency, court or
            other third party where we believe disclosure is necessary under
            applicable law or regulations;
          </li>
          <li className="my-2">
            New owners or re-organised entities in the event of a business
            restructuring, sale, purchase or joint venture affecting our
            business.
          </li>
          <li className="my-2">
            Any other person provided that you have given your consent. We will
            never sell, distribute or otherwise share your personal information
            unless we have your permission.
          </li>
        </ol>

        <h3 className="text-po-black font-semibold mt-3 mb-2 text-lg">
          Legal basis for processing personal information
        </h3>
        <p className="text-sm text-po-black font-normal mb-1">
          Proper Order will always make sure we have a legal basis to collect
          and use your personal information. The legal basis we rely on will
          change depending on the type of information and the context in which
          we collect it.
        </p>
        <p className="text-sm text-po-black font-normal mb-1">
          Our main reason for collecting and using your personal information is
          to perform our contract with you (i.e. to make sure you get your Order
          when and where you want it), but we may also process it where it is in
          our legitimate business interests to do so.
        </p>

        <h3 className="text-po-black font-semibold mt-3 mb-2 text-lg">
          International data transfers
        </h3>
        <p className="text-sm text-po-black font-normal mb-1">
          We may transfer your personal information to countries outside the one
          in which you are resident to other countries where Proper Order or our
          service providers have operations. The data protection laws of these
          countries may differ from the laws of your country but Proper Order
          takes care to implement appropriate safeguards to protect your
          personal information in those countries in accordance with this
          Privacy Notice.
        </p>

        <h3 className="text-po-black font-semibold mt-3 mb-2 text-lg">
          Security
        </h3>
        <p className="text-sm text-po-black font-normal mb-1">
          Proper Order places great importance on protecting your information
          from and against unauthorised access and against unlawful processing,
          accidental loss, destruction and damage. We implement appropriate
          technical and organisational measures to safeguard such information.
        </p>

        <h3 className="text-po-black font-semibold mt-3 mb-2 text-lg">
          Data retention
        </h3>
        <p className="text-sm text-po-black font-normal mb-1">
          Proper Order will retain your personal information for no longer than
          is necessary to fulfil the purposes described in this Privacy Notice.
          We may also retain certain elements of your personal information for a
          period after you delete or deactivate your account for our legitimate
          operations such as record keeping and to comply with our legal
          obligations. Whenever we retain your information we will do so in
          compliance with applicable laws.
        </p>

        <h3 className="text-po-black font-semibold mt-3 mb-2 text-lg">
          Your data protection rights
        </h3>
        <p className="text-sm text-po-black font-normal mb-1">
          You can access your account at any time to review and update your
          personal information. You can also contact us to ask us to delete your
          personal information, restrict its processing or request that it be
          ported to a third party. You also have the right to unsubscribe from
          the marketing communications we send you by using the unsubscribe
          functionality in any marketing communication you receive from us or by
          amending your profile accordingly.
        </p>

        <h3 className="text-po-black font-semibold mt-3 mb-2 text-lg">
          Your data protection rights
        </h3>
        <p className="text-sm text-po-black font-normal mb-1">
          You can access your account at any time to review and update your
          personal information. You can also contact us to ask us to delete your
          personal information, restrict its processing or request that it be
          ported to a third party. You also have the right to unsubscribe from
          the marketing communications we send you by using the unsubscribe
          functionality in any marketing communication you receive from us or by
          amending your profile accordingly.
        </p>

        <h3 className="text-po-black font-semibold mt-3 mb-2 text-lg">
          Links to third-party sites
        </h3>
        <p className="text-sm text-po-black font-normal mb-1">
          Our websites may, from time to time, contain links to and from
          third-party websites (for example, those of our partner networks,
          advertisers and affiliates). If you follow these links, please be
          aware that Proper Order is not responsible or liable for these
          third-party websites which will have their own privacy policies.
        </p>

        <h3 className="text-po-black font-semibold mt-3 mb-2 text-lg">
          Updates to this Privacy Notice
        </h3>
        <p className="text-sm text-po-black font-normal mb-1">
          We may update this Privacy Notice from time to time in response to
          changing legal, technical or business developments. We encourage you
          to periodically review this page for the latest information on our
          privacy practices.
        </p>

        <h3 className="text-po-black font-semibold mt-3 mb-2 text-lg">
          How to contact us
        </h3>
        <p className="text-sm text-po-black font-normal mb-1">
          If you have any questions or concerns about this Privacy Notice and
          Proper Order&rsquo;s privacy practices, please contact our Data
          Protection Officer. Contact details at the bottom of{" "}
          <strong>More Information</strong>.
        </p>

        <h2 className="text-po-black font-bold mt-4 mb-2 text-xl">
          More information
        </h2>

        <h3 className="text-po-black font-semibold mt-2 mb-2 text-lg">
          Information we collect from you and why
        </h3>
        <p className="text-sm text-po-black font-normal mb-1">
          The personal information that we may collect about you broadly falls
          into the following categories:
        </p>
        <h4 className="text-po-black font-semibold mt-1 mb-2 text-base">
          Information that you provide voluntarily
        </h4>
        <p className="text-sm text-po-black font-normal mb-1">
          Certain parts of our Services may ask you to provide personal
          information voluntarily.
          <br />
          For instance:
        </p>

        <ul className="list-disc text-sm text-po-black font-normal ml-5">
          <li className="my-2">
            Registration information: When you create a Proper Order account,
            sign-up or fill in forms on the Services, we collect information
            about you including your name, address, telephone number, email
            address and the password you create.
          </li>
          <li className="my-2">
            Transaction information: We collect information relating to your
            Orders, including payment information (e.g. your credit card number)
            using the secure services of our payment processors. Payment
            operations are outsourced to our payment processors and we do not
            store your credit card information in our systems. We also collect
            delivery details (e.g. your physical address) to fulfil each Order.
          </li>
          <li className="my-2">
            Information regarding your marketing preferences: We collect
            information about your preferences to receive marketing information
            any time you subscribe or unsubscribe.
          </li>
          <li className="my-2">
            Feedback: When you post messages and reviews of the Services or you
            contact us, for example with a question, problem or comment, we
            collect information about you including your name and the content of
            your query. If you contact our customer support teams we will record
            and keep a record of your conversation for quality and training
            purposes and to aid in the resolution of your queries.
          </li>
          <li className="my-2">
            Sensitive Information: We collect information that you provide when
            you contact us (such as through our call centre or by using our
            online forms). This information may include sensitive personal
            information, such as health-related information (allergies or
            dietary requirements) or information about your religion (such as if
            you only eat halal food). We do not require this information, and we
            ask that you share this information with the seller only. However,
            there are some situations where you may nonetheless provide this
            type of information, for example if you make a complaint, and in
            those circumstances we will only be collecting it with your consent.
          </li>
        </ul>

        <h4 className="text-po-black font-semibold mt-1 mb-2 text-base">
          Information that we collect automatically
        </h4>
        <p className="text-sm text-po-black font-normal mb-1">
          When you access our Services, we may collect certain information
          automatically from your device. In some countries, including countries
          in Europe, this information may be considered personal information
          under applicable data protection laws.
          <br />
          For instance:
        </p>
        <ul className="list-disc text-sm text-po-black font-normal ml-5">
          <li className="my-2">
            Activity information: We collect information about your usage of the
            Services and information about you from the content you create and
            the notifications or messages you post or send as well as what you
            search for, look at and engage with.
          </li>
          <li className="my-2">
            Cookies and similar technologies: We use cookies and similar
            tracking technology to collect and use personal information about
            you (e.g. your Internet Protocol (IP) address, your device ID, your
            browser type and when, how often and how long you interact with the
            Services), including to facilitate interest-based advertising.
          </li>
          <li className="my-2">
            For further information about the types of cookies and similar
            technologies we use, why, and how you can control such technologies,
            see our Cookies Notice.
          </li>
        </ul>
        <h4 className="text-po-black font-semibold mt-1 mb-2 text-base">
          Information that we obtain from third party sources
        </h4>
        <p className="text-sm text-po-black font-normal mb-1">
          From time to time, we may receive personal information from third
          party sources, including advertising networks and social media
          platforms like Facebook but only where we have checked that these
          third parties either have your consent to process the information or
          are otherwise legally permitted or required to share your personal
          information with us. This information may include your likely
          demographic group.
          <br />
          For instance:
        </p>
        <ul className="list-disc text-sm text-po-black font-normal ml-5">
          <li className="my-2">
            Analytics reports and market research surveys: We collect
            information from our third party affiliates about the way you
            respond to and engage with our marketing campaigns so that we can
            customise our marketing and Services accordingly. We may also
            receive aggregated information in the form of audience segments from
            third party sources in order to display targeted advertising on
            digital properties operated by organisations like Facebook and
            Google.
          </li>
        </ul>

        <h3 className="text-po-black font-semibold mt-2 mb-2 text-lg">
          Our use of collected information
        </h3>
        <p className="text-sm text-po-black font-normal mb-1">
          Examples of how we may use this information include:
        </p>
        <h4 className="text-po-black font-semibold mt-1 mb-2 text-base">
          Information that you provide voluntarily
        </h4>

        <ul className="list-disc text-sm text-po-black font-normal ml-5">
          <li className="my-2">
            <strong>Registration information. </strong>
            The registration information you provide when you create a Proper
            Order account allows us to give you access to the Services and to
            supply them to you under our Terms. We also use this information to
            authenticate your access to the Services, to contact you for your
            views and to notify you of important changes or updates to our
            Services.
          </li>
          <li className="my-2">
            <strong>Transaction information. </strong>
            Your transaction information (such as the food items you add to your
            basket) allow us to process your Order and send you an accurate
            bill. It also helps us and any Seller you order with contact you
            where necessary. Proper Order may contact you by email, phone or SMS
            to give you status updates or other information or to resolve
            problems with your account or Order. A Seller may contact you by
            phone or SMS to provide you with status updates or other information
            regarding your Order.
          </li>
          <li className="my-2">
            Where you pay for your Order with a mobile payment or digital wallet
            service provider (such as Applepay or Pay with Google) we will send
            you transaction information via confirmation emails or SMS to the
            email address or phone number registered with that service provider
            (since this is required by those providers).
            <br />
            Some Sellers on our platform use our third party delivery companies;
            these companies may use your information to provide you with status
            updates on the delivery of your Order.
          </li>
          <li className="my-2">
            We will also analyse information on completed transactions and
            successfully delivered Orders on the basis of data matching or
            statistical analysis so that we can administer, support, improve and
            develop our business and Services. Our analyses also help us detect
            and prevent fraud or other illegal activities or acts prohibited by
            our Terms or any policies applicable to the Services.
          </li>
          <li className="my-2">
            <strong>Information regarding your marketing preferences. </strong>
            Proper Order may market to you, where permitted by law, by post,
            email, telephone, mobile ( i.e. SMS, in-app messaging and push
            notification) about our products or Services.
            <br /> Where you have given your consent, we may share your
            information with third parties (e.g. other companies) in other
            sectors (such as food, drink and entertainment) so that they can
            tell you about goods or services which may interest you.
          </li>
          <li className="my-2">
            If you don’t want us to use your data in this way or generally
            change your mind about receiving any form of marketing
            communications, you can unsubscribe at any time using the
            unsubscribe functionality in the communication you receive or by
            amending your profile accordingly. You may also be able to opt-out
            of push notifications at a device level (e.g. by way of your iOS
            settings). If you choose to unsubscribe from our marketing, we will
            keep a record of your preferences so that we do not bother you with
            unwanted marketing in future.
          </li>
          <li className="my-2">
            <strong>Feedback and reviews. </strong>
            If you give us feedback we will use it to reply to your questions or
            queries, to provide customer support and resolve any problems with
            your Orders or with the Services. We will publish reviews that you
            send to us about the Sellers on our platform and our Services in
            general and we also analyse your feedback to improve and develop our
            Services and in order to enhance your experience.
          </li>
        </ul>

        <h4 className="text-po-black font-semibold mt-1 mb-2 text-base">
          Information that we collect automatically
        </h4>

        <p className="text-sm text-po-black font-normal mb-1">
          When you access our Services, we may collect certain information
          automatically from your device such as your IP address, MAC address or
          device ID. In some countries, including in Europe, this information
          may be considered personal information under applicable data
          protection laws.
        </p>
        <ul className="list-disc text-sm text-po-black font-normal ml-5">
          <li className="my-2">
            <strong>Activity Information. </strong>
            <br /> We analyse your buying habits and how you interact with our
            Services so that we can suggest food options from new sellers we
            think you would like to try. If you choose to share your
            geo-location with us, we may use this information to show you
            content that is local to you; this information will also help smooth
            the effective and speedy delivery of your Order. We may also provide
            you with customised content and advertisements based on your
            previous interactions with our Services and our knowledge of your
            preferences which we understand from your usage and buying history
            relating to the Services.
            <br />
            We enable you to access your Order history so that you can easily
            reorder with your favourite Sellers. We may also collect information
            about your interaction with our emails and other forms of
            communication.
          </li>
          <li className="my-2">
            <strong>Cookies and similar technologies. </strong>
            <br /> We work with advertising affiliates that serve advertisements
            on our Services on the websites and services of third parties. Some
            of those networks use cookies which allow us to display
            advertisements that are personalised to your interests based upon
            your internet browsing activity.
            <br />
            Like many websites and online services we use cookies and other
            technologies to maintain a record of your interaction with our
            Services. Cookies also help us to manage a range of features and
            content as well as to store searches and re-present your information
            at the point of Order. For further information about the types of
            cookies and similar technologies we use, why, and how you can
            control such technologies, please see our Cookies Policy.
          </li>
        </ul>
        <h4 className="text-po-black font-semibold mt-1 mb-2 text-base">
          Information that we obtain from third party sources
        </h4>
        <p className="text-sm text-po-black font-normal mb-1">
          <strong>Analytics reports and market research surveys.</strong>
          <br />
          We analyse information we collect from our third-party service
          providers (such as Google, Facebook, Amazon and other affiliates) to
          understand how you engage with our Services and advertisements (e.g.
          whether you have clicked on one of our advertisements). This helps us
          to understand your preferences and recommend you Services which are
          tailored to your interests.
        </p>

        <h3 className="text-po-black font-semibold mt-2 mb-2 text-lg">
          Whom we share personal information with
        </h3>
        <p className="text-sm text-po-black font-normal mb-1">
          In delivering the Services to you, depending on the circumstances, we
          may share your personal information with the following entities:
          <br />- Sellers you place Orders with so that the Seller can process
          and deliver it to you.
          <br />- Companies within the Proper Order group of companies (which
          means our subsidiaries and affiliates, our ultimate holding company
          and its subsidiaries and affiliates either now or at any time in the
          future) - these companies act for us and process your personal
          information for the purposes set out in this Privacy Notice.
        </p>
        <p className="text-sm text-po-black font-normal mb-1">
          Third parties who undertake various activities to promote, market or
          support our Services.
          <br />
          This includes social media platforms like Facebook, offshore customer
          support agents, website and application support and hosting providers,
          marketing service providers, eCRM partners like Salesforce who manage
          our marketing emails and push notifications, companies like Twilio who
          send you text messages when your Order is on its way, delivery
          companies who deliver your Order to you, market research companies and
          payment processing providers which process payment card transactions -
          any of these third parties might be inside or outside your country of
          residence.
        </p>
        <p className="text-sm text-po-black font-normal mb-1">
          As mentioned in section 2 above, we may also share information with
          third parties (for example, in the food, drink and entertainment
          sectors) so that they can contact you about goods or services which
          may interest you. We will only share your information with these third
          parties where you have given your consent. If you don&rsquo;t want us
          to use your personal information in this way or generally change your
          mind about receiving any f orm of marketing communications, you can
          unsubscribe at any time using the unsubscribe functionality in the
          communication you receive or by amending your profile accordingly. If
          you choose to unsubscribe from our marketing, we will keep a record of
          your preferences so that we don&rsquo;t bother you with unwanted
          marketing in future.
        </p>
        <p className="text-sm text-po-black font-normal mb-1">
          If any part of our business enters into a joint venture, purchases
          another business or is sold to or merged with another business entity,
          your information may be disclosed or transferred to the target
          company, or new business partners or owners or their agents and
          advisors. In these circumstances we will always inform the relevant
          entities that they must only use your personal information for the
          purposes disclosed in this Privacy Notice.
        </p>
        <p className="text-sm text-po-black font-normal mb-1">
          Any law enforcement or regulatory body, government agency, court or
          other third party where we believe disclosure is necessary (i) as a
          matter of applicable law or regulation, (ii) to exercise, establish or
          defend our legal rights, or (iii) to protect your vital interests or
          those of any other person.
        </p>

        <p className="text-sm text-po-black font-normal mb-1">
          Any other person provided that you have given your consent to the
          disclosure. We will not sell, distribute or lease your personal
          information unless we have your permission or are required by law to
          do so.
        </p>

        <h3 className="text-po-black font-semibold mt-2 mb-2 text-lg">
          Legal basis for processing personal information
        </h3>
        <p className="text-sm text-po-black font-normal mb-1">
          Our legal basis for collecting and using your personal information as
          described above will depend on the specific context in which we
          collect it.
        </p>

        <p className="text-sm text-po-black font-normal mb-1">
          Our main reason for collecting and using your personal information is
          to perform our contract with you (i.e. to make sure you get your Order
          when you want it). However we will also use your personal information
          where it is in our legitimate business interests to do so (but only if
          our interests are not overridden by your data protection interests or
          your fundamental legal rights and freedoms). In some cases, we may
          have a legal obligation to collect personal information from you (e.g.
          in the event of legal proceedings) or we might need to process it or
          share it with others to &quot;protect your vital interests&quot; (this
          is legal speak for saving your life) or those of another person (e.g.
          in a case where another person&rsquo;s life is in danger).
        </p>
        <p className="text-sm text-po-black font-normal mb-1">
          If we ask you to provide personal information to comply with a legal
          requirement or to perform a contract with you, we will make this clear
          at the relevant time and advise you whether the provision of your
          personal information is mandatory or not (and we’ll also explain the
          possible consequences of you not providing it).
        </p>
        <p className="text-sm text-po-black font-normal mb-1">
          Similarly, we may collect and use your personal information in
          reliance on our legitimate interests (or those of any third party).
          Relevant legitimate interests include <br />
          a) to market to you or make you offers that we believe will interest
          you; <br />
          b) to analyse and understand how our services are used and so to
          improve them; <br />
          c) for fraud prevention or prevention of other criminal acts; or{" "}
          <br />
          d) to keep our systems secure.
        </p>
        <p className="text-sm text-po-black font-normal mb-1">
          If you have questions about or need further information concerning the
          legal basis on which we collect and use your personal information,
          please contact us using the contact details provided under the{" "}
          <strong>How to contact us</strong> below.
        </p>
        <h3 className="text-po-black font-semibold mt-2 mb-2 text-lg">
          International data transfers
        </h3>
        <p className="text-sm text-po-black font-normal mb-1">
          We may transfer your personal information to countries other than the
          country in which you are resident. Proper Order&rsquo;s website
          servers are located in the Republic of Ireland, however our third
          party service providers may be located in other countries.
        </p>

        <p className="text-sm text-po-black font-normal mb-1">
          Whilst these countries may have data protection laws that are
          different to the laws of your country, you can rest assured that
          Proper Order takes care to implement appropriate safeguards to protect
          your personal information in those countries in accordance with this
          Privacy Notice. Some of the safeguards we rely on include, where
          appropriate, using the European Commission&rsquo;s approved standard
          contractual clauses with our suppliers, intra-group transfer
          agreements (so that we can safely transfer your data between the
          Proper Order group of companies all over the world).
        </p>
        <h3 className="text-po-black font-semibold mt-2 mb-2 text-lg">
          Security
        </h3>
        <p className="text-sm text-po-black font-normal mb-1">
          We place great importance on keeping your personal information safe
          and secure. As such, we put in place appropriate technical and
          organisational measures / industry standard technology to protect it
          from unauthorised access and unlawful processing, accidental loss,
          destruction and damage.
        </p>

        <p className="text-sm text-po-black font-normal mb-1">
          The security measures we use are designed to provide a level of
          protection security appropriate to the risk of processing your
          personal information. Where you have chosen a password which allows
          you to access certain parts of the Services, you are responsible for
          keeping this password confidential. We advise you not to share your
          password with anyone and to use a unique password for our Services. We
          will not be liable for any unauthorised transactions entered into
          using your name and password.
        </p>
        <h3 className="text-po-black font-semibold mt-2 mb-2 text-lg">
          Data retention
        </h3>
        <p className="text-sm text-po-black font-normal mb-1">
          Proper Order will retain your personal information where we have an
          ongoing legitimate business need to do so (for example, while you hold
          an account with us or to enable us to meet our legal, tax or
          accounting obligations).
        </p>

        <p className="text-sm text-po-black font-normal mb-1">
          If you object to us processing certain categories of your personal
          information (including in relation to receiving marketing
          communications from us), we will retain a record of your objection to
          the processing of your information so that we can continue to respect
          your wishes.
        </p>
        <h3 className="text-po-black font-semibold mt-2 mb-2 text-lg">
          Your data protection rights
        </h3>
        <p className="text-sm text-po-black font-normal mb-1">
          Proper Order respects your privacy and data protection rights.
          <br />
          Below is a summary of your rights in respect of the personal
          information of yours which Proper Order handles:
        </p>

        <ul className="list-disc text-sm text-po-black font-normal ml-5">
          <li className="my-2">
            Proper Order provides you with the tools to access, review or update
            your personal information at any time through your account. If you
            wish to request deletion of your personal information, you can do so
            by contacting us using the contact details provided under the{" "}
            <strong>How to contact us</strong> heading below.
          </li>
          <li className="my-2">
            You can object to processing of your personal information, ask us to
            restrict processing of your personal information or request that it
            be ported to a third party.
            <br />
            Again, you can exercise these rights by contacting us using the
            contact details provided under the{" "}
            <strong>How to contact us</strong> heading below.
          </li>
          <li className="my-2">
            You have the right to opt-out of receiving marketing communications
            we send you at any time. You can exercise this right by using the
            unsubscribe functionality in the communication you receive or by
            amending your profile accordingly.
          </li>
          <li className="my-2">
            Similarly, if we collect and process your personal information on
            the basis of your consent, then you can withdraw your consent at any
            time. Withdrawing your consent will not affect the lawfulness of any
            processing we conducted prior to your withdrawal, nor will it affect
            processing of your personal information conducted in reliance on
            lawful processing grounds other than consent.
          </li>
          <li className="my-2">
            You have the right to complain to a data protection supervisory
            authority about our collection and use of your personal information.
          </li>
        </ul>
        <p className="text-sm text-po-black font-normal my-1">
          We respond to all requests we receive from individuals wishing to
          exercise their data protection rights in accordance with applicable
          data protection laws.
        </p>

        <h3 className="text-po-black font-semibold mt-2 mb-2 text-lg">
          Links to third-party sites
        </h3>
        <p className="text-sm text-po-black font-normal mb-1">
          Our website may, from time to time, contain links to and from the
          websites of our partner networks, advertisers and affiliates or to any
          number of websites that may offer useful information to our visitors.
          We provide these links to you only as a convenience and the inclusion
          of any link does not imply endorsement of the relevant website by
          Proper Order. If you follow a link to any of these websites, please
          note that they have their own privacy policies and that we do not
          accept any responsibility or liability for these policies or those
          linked websites. Please check these policies before you submit any
          personal information to such websites.
        </p>
        <h3 className="text-po-black font-semibold mt-2 mb-2 text-lg">
          Updates to this Privacy Notice
        </h3>
        <p className="text-sm text-po-black font-normal mb-1">
          We may update this Privacy Notice from time to time in response to
          changing legal, technical or business developments. When we update our
          Privacy Notice, we will take appropriate measures to inform you,
          consistent with the significance of the changes we make. We will
          obtain your consent to any material Privacy Notice changes if and
          where this is required by applicable data protection laws.
          <br />
          We encourage you to periodically review this page for the latest
          information on our privacy practices.
        </p>
        <h3 className="text-po-black font-semibold mt-2 mb-2 text-lg">
          How to contact us
        </h3>
        <p className="text-sm text-po-black font-normal mb-1">
          If you have any questions or concerns about this Privacy Notice and
          Proper Order&rsquo;s privacy practices, please contact our Data
          Protection Manager:
        </p>

        <ul className="list-disc text-sm text-po-black font-normal ml-5">
          <li className="my-2">
            By email at:&nbsp;
            <a
              href="mailto:compliance@properorder.ie?subject=Cookies Policy"
              className={"font-bold text-po-yellowdark"}
            >
              compliance@properorder.ie
            </a>
          </li>
          <li className="my-2">
            In writing:
            <br />
            Proper Order Technology Limited - Data Protection Manager
            <br /> 60 Grand Canal St Upper, Dublin D04 P3F8, Ireland
          </li>
        </ul>
      </div>

      <div className="mt-auto pt-6">
        <Footer />
      </div>
      <BackToTopButton />
    </div>
  );
}
