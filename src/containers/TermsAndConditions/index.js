import React, { useEffect } from "react";
import "./styles.scss";
import POHeader from "../../components/POHeader";
import Footer from "../../components/POFooter";
import BackToTopButton from "../../components/BackToTopBtn";

export default function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full min-h-screen bg-gray-50">
      <POHeader classNames={"absolute w-full"} />
      <div className=" flex flex-col">
        <h1 className="text-center main-heading mb-3 lg:mb-5">
          Terms & Conditions
        </h1>
      </div>

      <div className="mx-auto px-6 md:px-8  max-w-full md:max-w-screen-lg">
        <p className="text-sm text-po-black font-normal">
          This page (together with our{" "}
          <a href="/cookies-policy" className={"font-bold text-po-yellowdark"}>
            Cookies Policy
          </a>
          ) sets out the terms and conditions (&quot;Platform Terms&quot;) on
          which we, Proper Order Technology Limited (&quot;we&quot;,
          &quot;our&quot; or &quot;Proper Order&quot;), provide access to our
          website{" "}
          <a href="/" className={"font-bold text-po-yellowdark"}>
            https://www.properorder.ie
          </a>{" "}
          and any Proper Order mobile application and ordering platform through
          which you order products (together, &quot;the Platform&quot;). Please
          read these Platform Terms carefully before ordering any products
          through the Platform. By ordering products through the Platform
          (whether now or in the future), you agree to be bound by these
          Platform Terms. Use of the Platform is also subject to these Platform
          Terms.
        </p>
        <p className="text-sm text-po-black font-normal mt-3">
          We reserve the right to change these Platform Terms from time to time
          by changing them on this page. We advise you to print a copy of these
          Platform Terms for future reference. Use of your personal information
          submitted via the Platform is governed by our Privacy Policy and
          Cookies Policy.
        </p>
        <p className="text-sm text-po-black font-normal mt-3">
          For the avoidance of doubt, please note that references to
          &quot;Platform&quot; in these Platform Terms include any current or
          future version of our website{" "}
          <a href="/" className={"font-bold text-po-yellowdark"}>
            https://www.properorder.ie
          </a>{" "}
          and any Proper Order mobile application through which you access and
          use our Platform, in each case whether accessed through any current or
          future platform or device (including without limitation any mobile
          website, mobile application, affiliate website or related website for
          accessing and using our Platform that may be developed from time to
          time).
        </p>
        <p className="text-sm text-po-black  font-normal mt-3">
          By accessing any part of the Platform, you indicate that you accept
          these Platform Terms. If you do not accept these Platform Terms, you
          should leave the Platform immediately, and you will not be able to
          order any products through the Platform.
        </p>

        <h2 className="text-center text-po-black font-semibold mt-4 mb-3 text-xl">
          Terms & conditions of use and sale
        </h2>

        <ol className="list-decimal text-sm text-po-black font-normal">
          <li className="my-2">
            INTRODUCTION AND OUR ROLE
            <ol>
              <li className="my-2">
                1.1. Company details: Proper Order Technology Limited is a
                company registered in Ireland with registered company number
                707638, whose registered office is at 60 Grand Canal St Upper,
                Dublin D04 P3F8.
              </li>
              <li className="my-2">
                1.2. VAT number: Our VAT number is 3860970OH.
              </li>
              <li className="my-2">
                1.3. Product Orders: We provide a way for you to communicate
                your orders (&quot;Orders&quot;) for products
                (&quot;Products&quot;) to partner businesses
                (&quot;Seller(s)&quot;) displayed on the Platform. The legal
                contract for the supply and purchase of Products is between you
                and the Seller that you place your Order with and we will
                conclude the sale of Products on behalf of, and agent for, the
                Seller in all cases.
              </li>
            </ol>
          </li>
          <li className="my-2">
            WEBSITE ACCESS AND TERMS
            <ol>
              <li className="my-2">
                2.1. Platform access: You may access some areas of the Platform
                without making an Order or registering your details with us.
                Most areas of the Platform are open to everyone.
              </li>
              <li className="my-2">
                2.2. Acceptance of terms: By accessing any part of the Platform,
                you indicate that you accept these Platform Terms. If you do not
                accept these Platform Terms, you should leave the Platform
                immediately, and you will not be able to order any Products
                through the Platform.
              </li>
              <li className="my-2">
                2.3. Revision of terms: We may revise these Platform Terms at
                any time. You should check the Platform regularly to review the
                current Platform Terms, because they are binding on you. You
                will be subject to the policies and terms and conditions in
                force at the time that you place an Order through us.
              </li>
              <li className="my-2">
                2.4. Responsibility: You are responsible for making all
                arrangements necessary for you to have access to the Platform.
                You are also responsible for ensuring that all persons who
                access the Platform through your Internet connection are aware
                of these Platform Terms and that they comply with them.
              </li>
            </ol>
          </li>
          <li className="my-2">
            YOUR STATUS
            <ol>
              <li className="my-2">
                3.1. Capacity and age: By placing an Order through the Platform,
                you warrant that:
                <ol>
                  <li className="my-2 ml-3">
                    3.1.1. You are legally capable of entering into binding
                    contracts with Sellers; and
                  </li>
                  <li className="my-2 ml-3">
                    3.1.2. You are at least 18 years old.
                  </li>
                </ol>
              </li>
              <li className="my-2">
                3.2. You acknowledge and agree that if you are ordering food
                items and you have a specific food allergy or intolerance, you
                will contact the Seller directly to check that the food is
                suitable for you, before placing your order directly with them.
              </li>
              <li className="my-2">
                3.3. Alcohol, cigarettes and other smoking products:
                <ol>
                  <li className="my-2 ml-3">
                    3.3.1. You acknowledge and agree that it is an offence for
                    any person under the age of 18 to buy, or attempt to buy,
                    alcohol, or for any person to buy, or attempt to buy,
                    alcohol, tobacco or other smoking products on behalf of any
                    person who is under the age of 18.
                  </li>
                  <li className="my-2 ml-3">
                    3.3.2. If your Order includes any alcohol, cigarettes or
                    other smoking products, you will be asked to provide proof
                    of your age on collection or delivery of your Order. If you
                    are unable to provide proof that you are aged 18 or over to
                    the satisfaction of your chosen Seller, or if the Seller
                    reasonably believes that the alcohol, cigarettes or other
                    smoking products you have ordered have been bought by you on
                    behalf of someone under the age of 18, the Seller reserves
                    the right not to complete the delivery of the alcohol,
                    cigarettes or other smoking products to you.
                  </li>
                </ol>
              </li>
            </ol>
          </li>
          <li className="my-2">
            HOW TO MAKE AN ORDER AND HOW IT IS PROCESSED
            <ol>
              <li className="my-2">
                4.1. Compiling your Order: Once you have selected the Products
                you wish to order from the list of products (&quot;Product
                List&quot;) of your chosen Seller(s) and provided the other
                required information, you will be given the opportunity to
                submit your Order by clicking or selecting the
                &quot;proceed&quot;, &quot;place my order&quot; or similar
                button. If your order consists of products from multiple
                Sellers, a separate Order will be created from you to each
                Seller. It is important that you check all the information that
                you enter and correct any errors before clicking or selecting
                this button; once you do so you will be entering into a contract
                with the Seller(s) and errors cannot be corrected (subject to
                paragraph 4.2. below).
              </li>
              <li className="my-2">
                4.2. Amending or cancelling your Order: Once you have submitted
                your Order and your payment has been authorised, you will not be
                entitled to change or cancel your Order, nor will you be
                entitled to a refund (please refer to paragraphs 4.4 and 5.6 for
                details of the process relating to rejected Orders and refunding
                of payment). If you wish to change or cancel your Order, you may
                contact our Customer Care team as described in paragraph 6.3 and
                they will attempt to contact the Seller in order to communicate
                your requests. However, there is no guarantee that we will be
                able to reach the Seller or that the Seller will agree to your
                requests as they may have already started processing your Order.
              </li>
              <li className="my-2">
                4.3. Payment authorisation: Where any payment you make is not
                authorised, your Order will not be processed or communicated to
                the relevant Seller.
              </li>
              <li className="my-2">
                4.4. Processing your Order and Seller rejections: On receipt of
                your Order, we will send it to the relevant Seller and will
                notify you by email that your Order has been received and is
                being processed. Please note that any confirmation page that you
                may see on the Platform and any Order confirmation email that
                you may receive each confirm that you have a contract for the
                sale of Products with a Seller but does not necessarily mean
                that your Order will be fulfilled by the Seller. We will notify
                you (generally by email) as soon as reasonably practicable if a
                Seller rejects your Order. However, Sellers have the ability to
                reject Orders at any time for reasons such as stock levels,
                weather conditions, demand, or for any other reason. In doing
                so, Sellers will be in breach of their agreement with you and
                any payment made in respect of the order will be returned to you
                in accordance with paragraph 5.6 below.
              </li>
              <li className="my-2">
                4.5. Delivery of your Order: If your Order is to be delivered,
                delivery will be arranged by the Seller, either using one of
                their own couriers, or a third party. Estimated times for
                deliveries and collections are provided by the Sellers and are
                only estimates. Neither we nor the Sellers guarantee that Orders
                will be delivered or will be available for collection within the
                estimated times. The Platform is not involved in the delivery
                process, and any questions about the status of the delivery
                should be directed to the Seller.
              </li>
              <li className="my-2">
                4.5. Collection of your Order: If your Order is to be collected
                from the Seller, any questions that you may have about the
                status of the Order and when it is ready for collection should
                be directed to the Seller.
              </li>
            </ol>
          </li>
          <li className="my-2">
            PRICE AND PAYMENT
            <ol>
              <li className="my-2">
                5.1. VAT and delivery costs: Prices will be as quoted on the
                Platform. These prices include VAT, delivery fees and the
                Service Charge (described in paragraph 5.2 below). These will be
                added to the total amount due where applicable.
              </li>
              <li className="my-2">
                5.2. Service Charge: Where you place an Order, we may charge you
                a service charge for use of the Platform and the associated
                benefits provided to you including Customer Care (the
                &quot;Service Charge&quot;).
              </li>
              <li className="my-2">
                5.3. Incorrect pricing: This Platform contains a large number of
                Product Lists and it is possible that some of the Product Lists
                may include incorrect prices. If the correct price for an Order
                is higher than the price stated on the Platform, the Seller will
                normally contact you before the relevant Order is dispatched. In
                such an event, neither we nor the relevant Seller is under any
                obligation to ensure that the Order is provided to you at the
                incorrect lower price or to compensate you in respect of
                incorrect pricing.
              </li>
              <li className="my-2">
                5.4. Payment methods: Payment for Orders must be made by an
                accepted credit or debit card through the Platform.
              </li>
              <li className="my-2">
                5.5. Card payments: If you pay by credit or debit card, you may
                be required to show the card to the Seller at the time of
                delivery or collection as proof of identification and so that
                they can check that the card corresponds with the receipt data
                for the Order. Please note that from time to time there may be
                delays with the processing of card payments and transactions;
                this may result in payments taking up to sixty (60) days to be
                deducted from your bank account or charged to your credit or
                debit card.
              </li>
              <li className="my-2">
                5.6. Credit and discount vouchers: A credit or discount may
                apply to your Order if you use a promotional voucher or code
                recognised by the Platform and endorsed by Proper Order, and you
                pay for any balance by credit or debit card. Please refer to our
                Voucher Terms & Conditions for the full terms and conditions
                applicable to the use of credit and discount vouchers. Please
                note that because of standard banking procedures, your bank or
                card issuer will initially &quot;ring-fence&quot; the full
                amount of the Order (before any credit or discount) in your
                account for up to 10 working days (or longer, depending on your
                bank or card issuer), and this amount will therefore be
                unavailable in your account for that period. The credit or
                discount will be applied at the time your bank or card issuer
                transfers the funds for your Order to us, at which point the
                credit or discounted amount will not be transferred to us and
                will instead be released by your bank or card issuer back into
                your available balance. You acknowledge and agree that neither
                we nor the relevant Seller will be responsible or liable to you
                in relation to this delay by your bank or card issuer in the
                release of funds back into your account.
              </li>
              <li className="my-2">
                5.7. Rejected Orders: Because of standard banking procedures,
                once you have submitted an Order that you are paying for by
                credit or debit card and your payment has been authorised, your
                bank or card issuer will &quot;ring-fence&quot; the full amount
                of your Order. If your Order is subsequently rejected by the
                Seller (as described in paragraph 4.4 above) or cancelled for
                any other reason, your bank or card issuer will not transfer the
                funds for the Order to us, and will instead release the relevant
                amount back into your available balance. However, this may take
                up to 10 working days (or longer, depending on your bank or card
                issuer). You acknowledge and agree that neither we nor the
                relevant Seller will be responsible or liable to you in relation
                to this delay by your bank or card issuer in the release of
                funds back into your account.
              </li>
            </ol>
          </li>
          <li className="my-2">
            CUSTOMER CARE
            <ol>
              <li className="my-2">
                6.1. General: Customer care is extremely important to us.
                Subject to paragraphs 6.5 and 11, our Customer Care team will
                therefore try to assist you where possible if you have any
                problems with your Order. You can contact our Customer Care team
                by clicking or selecting the &quot;Help&quot; or similar button
                or by calling the telephone number shown on the Platform.
              </li>
              <li className="my-2">
                6.2. Questions about your Order: If your Order is taking longer
                than expected or you have any other problems with your Order,
                you can contact our Customer Care Team as described above and
                one of our Customer Care Advisers will attempt to contact the
                Seller in order to follow up on your query.
              </li>
              <li className="my-2">
                6.3. Changing or cancelling your Order: If you wish to change or
                cancel your Order after it has been submitted and payment has
                been authorised, you may contact our Customer Care team as
                described above and they will attempt to contact the Seller in
                order to communicate your requests. However, there is no
                guarantee that we will be able to reach the Seller or that the
                Seller will agree to your requests as they may have already
                started processing your Order.
              </li>
              <li className="my-2">
                6.4. Complaints or feedback: In the event that you are
                dissatisfied with the quality of any Products or the service
                provided by a Seller, please consider providing feedback in the
                form of ratings, comments and reviews on the Platform (together,
                &quot;Reviews&quot;) to reflect your experience. The Reviews are
                an important part of our quality control process.
              </li>
              <li className="my-2">
                6.5. Compensation: If you are dissatisfied with the quality of
                any Products or the service provided by a Seller and wish to
                seek a refund, a proportionate price reduction or any other
                compensation, you should contact the Seller directly to lodge
                your complaint and, where appropriate, follow the Seller&rsquo;s
                own complaint procedures. If you are unable to contact the
                Seller, or the Seller refuses to deal with your complaint, you
                can contact our Customer Care Team as described above within 48
                hours of placing your Order and one of our Customer Care
                Advisers will attempt to contact the Seller in order to request
                compensation on your behalf. Please note, however, that the
                legal contract for the supply and purchase of Products is
                between you and the Seller that you place your Order with. We
                have no control over Sellers and the quality of the Products or
                service that they provide, and we are not able to provide, and
                have no responsibility or liability for providing, any
                compensation to you on behalf of any Seller.
              </li>
            </ol>
          </li>
          <li className="my-2">
            LICENCE
            <ol>
              <li className="my-2">
                7.1. Terms of permitted use: You are permitted to use the
                Platform and print and download extracts from the Platform for
                your own personal non-commercial use on the following basis:
                <ol>
                  <li className="my-2 ml-3">
                    7.1.1. You must not misuse the Platform (including by
                    hacking or &quot;scraping&quot;).
                  </li>
                  <li className="my-2 ml-3">
                    7.1.2. Unless otherwise stated, the copyright and other
                    intellectual property rights in the Platform and in material
                    published on it (including without limitation photographs
                    and graphical images) are owned by us or our licensors.
                    These works are protected by copyright laws and treaties
                    around the world and all rights are reserved. For the
                    purposes of these Platform Terms, any use of extracts from
                    the Platform other than in accordance with paragraph 7.1 is
                    prohibited.
                  </li>
                  <li className="my-2 ml-3">
                    7.1.3. You must not modify the digital or paper copies of
                    any materials that you print off in accordance with
                    paragraph 7.1 and you must not use any pictures, photographs
                    or any other graphics, video or audio sequences separately
                    from any accompanying text.
                  </li>
                  <li className="my-2 ml-3">
                    7.1.4. You must ensure that our status as the author of the
                    material on the Platform is always acknowledged.
                  </li>
                  <li className="my-2 ml-3">
                    7.1.5. You are not allowed to use any of the materials on
                    the Platform or the Platform itself for commercial purposes
                    without obtaining a licence from us to do so.
                  </li>
                </ol>
              </li>
              <li className="my-2">
                7.2. Limitation on use: Except as stated in paragraph 7.1, the
                Platform may not be used, and no part of the Platform may be
                reproduced or stored in any other website or included in any
                public or private electronic retrieval system or service,
                without our prior written permission.
              </li>
              <li className="my-2">
                7.3. Reservation of rights: Any rights not expressly granted in
                these Platform Terms are reserved.
              </li>
            </ol>
          </li>
          <li className="my-2">
            WEBSITE ACCESS
            <ol>
              <li className="my-2">
                8.1. Platform availability: While we try to ensure the Platform
                is normally available twenty four (24) hours a day, we do not
                undertake any obligation to do so, and we will not be liable to
                you if the Platform is unavailable at any time or for any
                period.
              </li>
              <li className="my-2">
                8.2. Suspension of access: Access to the Platform may be
                suspended temporarily at any time and without notice.
              </li>
              <li className="my-2">
                8.3. Information security: The transmission of information via
                the Internet is not completely secure. Although we take the
                steps required by law to protect your information, we cannot
                guarantee the security of your data transmitted to the Platform;
                any transmission is at your own risk.
              </li>
            </ol>
          </li>
          <li className="my-2">
            VISITOR MATERIAL AND REVIEWS
            <ol>
              <li className="my-2">
                9.1. General:
                <ol>
                  <li className="my-2 ml-3">
                    9.1.1. Other than personally identifiable information, which
                    is covered under our Privacy Policy, any material you post,
                    upload or transmit or upload to the Platform (including
                    without limitation Reviews) Visitor Material will be
                    considered non-confidential and non-proprietary. By posting,
                    uploading or transmitting any Visitor Material, you
                    represent and warrant that you own or otherwise control all
                    of the rights to such Visitor Material. You agree that we
                    will have no obligations with respect to any Visitor
                    Material, and that we and anyone we designate will be free
                    to copy, disclose, distribute, incorporate and otherwise use
                    any Visitor Material and all data, images, sounds, text and
                    other things embodied in it for any and all commercial or
                    non-commercial purposes.
                  </li>
                  <li className="my-2 ml-3">
                    9.1.2. You represent and warrant that any Visitor Material
                    you post, upload or transmit does not and will not breach
                    any of the restrictions in paragraphs 9.2 to 9.3 below.
                  </li>
                </ol>
              </li>
              <li className="my-2">
                9.2. Visitor Material Policy: You are prohibited from posting,
                uploading or transmitting to or from the Platform any Visitor
                Material (including any Reviews) that:
                <ol>
                  <li className="my-2 ml-3">
                    9.2.1. breaches any applicable local, national or
                    international law;
                  </li>
                  <li className="my-2 ml-3">
                    9.2.2. is unlawful or fraudulent;
                  </li>
                  <li className="my-2 ml-3">
                    9.2.3. amounts to unauthorised advertising; or
                  </li>
                  <li className="my-2 ml-3">
                    9.2.4. contains viruses or any other harmful programs.
                  </li>
                </ol>
              </li>
              <li className="my-2">
                9.3. Visitor Reviews Policy: In particular (but without
                limitation), any Reviews that you submit through the Platform
                must not:
                <ol>
                  <li className="my-2 ml-3">
                    9.3.1. contain any defamatory, obscene or offensive
                    material;
                  </li>
                  <li className="my-2 ml-3">
                    9.3.2. promote violence or discrimination;
                  </li>
                  <li className="my-2 ml-3">
                    9.3.3. infringe the intellectual property rights of another
                    person;
                  </li>
                  <li className="my-2 ml-3">
                    9.3.4. breach any legal duty owed to a third party (such as
                    a duty of confidence);
                  </li>
                  <li className="my-2 ml-3">
                    9.3.5. promote illegal activity or invade another&rsquo;s
                    privacy;
                  </li>
                  <li className="my-2 ml-3">
                    9.3.6. give the impression that they originate from us; or
                  </li>
                  <li className="my-2 ml-3">
                    9.3.7. be used to impersonate another person or to
                    misrepresent your affiliation with another person.
                  </li>
                </ol>
              </li>
              <li className="my-2">
                9.4. Removal of Reviews: The prohibited acts listed in
                paragraphs 9.2&nbsp;and&nbsp;9.3 above are non-exhaustive. We
                reserve the right (but do not undertake, except as required by
                law, any obligation) and have the sole discretion to remove or
                edit at any time any Reviews or other Visitor Material posted,
                uploaded or transmitted to the Platform that we determine
                breaches a prohibition in paragraphs 9.2&nbsp;or&nbsp;9.3 above,
                is otherwise objectionable or may expose us or any third parties
                to any harm or liability of any type, or for any other reason.
              </li>
              <li className="my-2">
                9.5. Use of Reviews: The Reviews and other Visitor Material
                contained on the Platform are for information purposes only and
                do not constitute advice from us. Reviews and Visitor Material
                reflect the opinions of customers who have ordered through the
                Platform or other third parties, and any statements, advice or
                opinions provided by such persons are theirs only. Accordingly,
                to the fullest extent permitted by law, we assume no
                responsibility or liability to any person for any Reviews or
                other Visitor Material, including without limitation any
                mistakes, defamation, obscenity, omissions or falsehoods that
                you may encounter in any such materials.
              </li>
              <li className="my-2">
                9.6. Liability: You agree to indemnify us against any losses,
                damages and claims (and all related costs) incurred by or made
                against us by a Seller or any other third party arising out of
                or in connection with any Reviews or other Visitor Material that
                you provide in breach of any of the representations and
                warranties, agreements or restrictions set forth in this
                paragraph 9.
              </li>
              <li className="my-2">
                9.7. Disclosure to authorities and courts: You acknowledge that
                we will fully cooperate with any competent authority requesting
                or directing us to disclose the identity or location of anyone
                posting any Reviews or other Visitor Material in breach of
                paragraph&nbsp;9.2&nbsp;or&nbsp;9.3 or any other applicable
                restriction and you release us to the fullest extent permitted
                by law from all liability in relation to such disclosure.
              </li>
            </ol>
          </li>
          <li className="my-2">
            LINKS TO AND FROM OTHER WEBSITES
            <ol>
              <li className="my-2">
                10.1. Third party websites: Links to third party websites on the
                Platform are provided solely for your convenience. If you use
                these links, you leave the Platform. We have not reviewed and do
                not control any of these third party websites (and are not
                responsible for these websites or their content or
                availability). We do not endorse or make any representation
                about these websites, their content, or the results from using
                such websites or content. If you decide to access any of the
                third party websites linked to the Platform, you do so entirely
                at your own risk.
              </li>
              <li className="my-2">
                10.2. Linking permission: You may link to the Platform&rsquo;s
                homepage (
                <a href="/" className={"font-bold text-po-yellowdark"}>
                  https://www.properorder.ie
                </a>
                ), provided that:
                <ol>
                  <li className="my-2 ml-3">
                    10.2.1. you do so in a fair and legal way which does not
                    damage or take advantage of our reputation;
                  </li>
                  <li className="my-2 ml-3">
                    10.2.2. you do not establish a link from a website that is
                    not owned by you or in a way that suggests a form of
                    association with or endorsement by us where none exists;
                  </li>
                  <li className="my-2 ml-3">
                    10.2.3. any website from which you link must comply with the
                    content standards set out in these Platform Terms (in
                    particular paragraph 9 (Visitor Materials and Reviews));
                  </li>
                  <li className="my-2 ml-3">
                    10.2.4. we have the right to withdraw linking permission at
                    any time and for any reason.
                  </li>
                </ol>
              </li>
            </ol>
          </li>
          <li className="my-2">
            DISCLAIMERS
            <ol>
              <li className="my-2">
                11.1. Platform information: While we try to ensure that
                information on the Platform is correct, we do not promise it is
                accurate or complete. We may make changes to the material on the
                Platform or to the functionality, Products and prices described
                on it, at any time without notice. The material on the Platform
                may be out of date, and we make no commitment to update that
                material.
              </li>
              <li className="my-2">
                11.2. Allergy, dietary and other Product List information: When
                a Seller signs up with us, they have to provide us with
                up-to-date Product List information. We then include this on
                their dedicated page on the Platform. Where this information
                includes allergy or other dietary information, we will do our
                best to republish this information on the website or app exactly
                as it appears on the Seller’s Product List. If you are ordering
                food items and you have, or someone you are ordering for has, a
                concern about food allergies, intolerances or other dietary
                preferences, you should always contact the Seller directly
                before placing your order.
              </li>
              <li className="my-2">
                11.3. Seller actions and omissions: The legal contract for the
                supply and purchase of Products is between you and the Seller
                that you place your Order with. We have no control over the
                actions or omissions of any Sellers. Without limiting the
                generality of the foregoing, you acknowledge and accept the
                following by using the Platform:
                <ol>
                  <li className="my-2 ml-3">
                    11.3.1. We do not give any undertaking that the Products
                    ordered from any Seller through the Platform will be of
                    satisfactory quality or suitable for your purpose and we
                    disclaim any such warranties.
                  </li>
                  <li className="my-2 ml-3">
                    11.3.2. Estimated times for deliveries and collections are
                    provided by the Sellers and are only estimates. Neither we
                    nor the Sellers guarantee that Orders will be delivered or
                    will be available for collection within the estimated times.
                  </li>
                  <li className="my-2 ml-3">
                    11.3.3. We encourage all our Sellers to accept all Orders
                    and to communicate any rejection promptly, and we will
                    notify you (generally by email) as soon as reasonably
                    practicable if a Seller rejects your Order. However, we do
                    not guarantee that Sellers will accept and fulfil all
                    Orders, and Sellers have the discretion to reject Orders at
                    any time because they are too busy, if you fail to provide
                    proof of age for purchases of alcohol, cigarettes or other
                    smoking products when required, due to weather conditions or
                    for any other reason.
                  </li>
                  <li className="my-2 ml-3">
                    11.3.4. The foregoing disclaimers do not affect your
                    statutory rights against any Seller.
                  </li>
                </ol>
              </li>
              <li className="my-2">
                11.4. Exclusion of terms: We provide you with access to and use
                of the Platform on the basis that, to the maximum extent
                permitted by law, we exclude all representations, warranties,
                conditions, undertakings and other terms in relation to the
                Platform and your use of it (including any representations,
                warranties, conditions, undertakings and other terms which might
                otherwise apply to the Platform or your use of it, or be
                otherwise implied or incorporated into these Platform Terms, by
                statute, common law or otherwise).
              </li>
            </ol>
          </li>
          <li className="my-2">
            LIABILITY
            <ol>
              <li className="my-2">
                12.1. General: Nothing in these Platform Terms excludes or
                limits our liability for death or personal injury arising from
                our negligence, our liability for fraudulent misrepresentation,
                or any other liability which cannot be excluded or limited under
                applicable law. Nothing in these Platform Terms affects your
                statutory rights.
              </li>
              <li className="my-2">
                12.2. Exclusion of liability: Subject to clause 12.1, we will
                under no circumstances whatever be liable to you, whether in
                contract, tort (including negligence), breach of statutory duty,
                or otherwise, even if foreseeable, arising under or in
                connection with the Platform (including the use, inability to
                use or the results of use of the Platform) for:
                <ol>
                  <li className="my-2 ml-3">
                    12.2.1. any loss of profits, sales, business, or revenue;
                  </li>
                  <li className="my-2 ml-3">
                    12.2.2. loss or corruption of data, information or software;
                  </li>
                  <li className="my-2 ml-3">
                    12.2.3. loss of business opportunity;
                  </li>
                  <li className="my-2 ml-3">
                    12.2.4. loss of anticipated savings;
                  </li>
                  <li className="my-2 ml-3">12.2.5. loss of goodwill; or</li>
                  <li className="my-2 ml-3">
                    12.2.6. any indirect or consequential loss.
                  </li>
                </ol>
              </li>
              <li className="my-2">
                12.3. Limitation of liability: Subject to clauses 11, 12.1 and
                12.2, our total liability to you in respect of all other losses
                arising under or in connection with the Platform or your use of
                it, whether in contract, tort (including negligence), breach of
                statutory duty, or otherwise, shall in no circumstances exceed
                twice the value of your Order or €100, whichever is lower.
              </li>
              <li className="my-2">
                12.4. Additional costs: You assume full and sole responsibility
                for any additional or associated costs that you may incur in
                connection with or as a result of your use of the Platform,
                including without limitation costs relating to the servicing,
                repair or adaptation of any equipment, software or data that you
                may own, lease, license or otherwise use.
              </li>
            </ol>
          </li>
          <li className="my-2">
            TERMINATION
            <ol>
              <li className="my-2">
                13.1. Grounds for termination: We may terminate or suspend (at
                our absolute discretion) your right to use the Platform
                immediately by notifying you in writing (including by email) if
                we believe in our sole discretion that:
                <ol>
                  <li className="my-2 ml-3">
                    13.1.1. you have used the Platform in breach of paragraph
                    7.1 (License);
                  </li>
                  <li className="my-2 ml-3">
                    13.1.2. you have posted Reviews or other Visitor Material in
                    breach of paragraphs 9.2 or 9.3 (Visitor Material and
                    Reviews);
                  </li>
                  <li className="my-2 ml-3">
                    13.1.3. you have breached paragraph 10.2 (Links to and from
                    other websites); or
                  </li>
                  <li className="my-2 ml-3">
                    13.1.4. you have breached any other material terms of these
                    Platform Terms.
                  </li>
                </ol>
              </li>
              <li className="my-2">
                13.2. Obligations upon termination: Upon termination or
                suspension you must immediately destroy any downloaded or
                printed extracts from the Platform.
              </li>
            </ol>
          </li>
          <li className="my-2">
            WRITTEN COMMUNICATIONS
            <ol>
              <li className="my-2">
                14.1. Applicable laws require that some of the information or
                communications we send to you should be in writing. When using
                the Platform or ordering Products via the Platform, you accept
                that communication with us will be mainly electronic. We will
                contact you by email or provide you with information by posting
                notices on the Platform. For contractual purposes, you agree to
                this electronic means of communication and you acknowledge that
                all contracts, notices, information and other communications
                that we provide to you electronically comply with any legal
                requirement that such communications be in writing. This
                condition does not affect your statutory rights.
              </li>
            </ol>
          </li>
          <li className="my-2">
            EVENTS OUTSIDE OUR CONTROL
            <ol>
              <li className="my-2">
                15.1. We will not be liable or responsible for any failure to
                perform, or delay in performance of, any of our obligations
                under these Platform Terms that is caused by events outside our
                reasonable control (&quot;Force Majeure Event&quot;).
              </li>
              <li className="my-2">
                15.2. A Force Majeure Event includes any act, event,
                non-occurrence, omission or accident beyond our reasonable
                control and includes in particular (without limitation) the
                following:
                <ol>
                  <li className="my-2 ml-3">
                    15.2.1. strikes, lock-outs or other industrial action;
                  </li>
                  <li className="my-2 ml-3">
                    15.2.2. civil commotion, riot, invasion, terrorist attack or
                    threat of terrorist attack, war (whether declared or not) or
                    threat or preparation for war;
                  </li>
                  <li className="my-2 ml-3">
                    15.2.3. fire, explosion, storm, flood, earthquake,
                    subsidence, epidemic or other natural disaster;
                  </li>
                  <li className="my-2 ml-3">
                    15.12.4. impossibility of the use of railways, shipping,
                    aircraft, motor transport or other means of public or
                    private transport;
                  </li>
                  <li className="my-2 ml-3">
                    15.12.5. impossibility of the use of public or private
                    telecommunications networks; and
                  </li>
                  <li className="my-2 ml-3">
                    15.12.6. acts, decrees, legislation, regulations or
                    restrictions of any government.
                  </li>
                </ol>
              </li>
              <li className="my-2">
                15.3. Our performance under these Platform Terms is deemed to be
                suspended for the period that any Force Majeure Event continues,
                and we will have an extension of time for performance for the
                duration of that period. We will use our reasonable endeavours
                to bring any Force Majeure Event to a close or to find a
                solution by which our obligations under these Platform Terms may
                be performed despite the Force Majeure Event.
              </li>
            </ol>
          </li>
          <li className="my-2">
            ADDITIONAL TERMS
            <ol>
              <li className="my-2">
                16.1. Privacy Policy: We are committed to protecting your
                privacy and security. All personal data that we collect from you
                will be processed in accordance with our Privacy Policy. You
                should review our Privacy Policy, which is incorporated into
                these Platform Terms by this reference and is available here.
              </li>
              <li className="my-2">
                16.2. Other terms: You should also review our Cookies Policy for
                information regarding how and why we use cookies to improve the
                quality of the Platform and your use of it, our Voucher Terms
                and Conditions for information regarding the use of credits and
                promotional discounts on the Platform, and our Competitions
                Terms and Conditions for information regarding the terms
                applicable to competitions that we may run from time to time.
                All of these are incorporated into these Platform Terms by this
                reference.
              </li>
              <li className="my-2">
                16.3. Severability: If any of these Platform Terms are
                determined by any competent authority to be invalid, unlawful or
                unenforceable to any extent, such term, condition or provision
                will to that extent be severed from the remaining terms,
                conditions and provisions which will continue to be valid to the
                fullest extent permitted by law.
              </li>
              <li className="my-2">
                16.4. Entire agreement: These Platform Terms and any document
                expressly referred to in them constitute the whole agreement
                between you and us and supersede all previous discussions,
                correspondence, negotiations, previous arrangement,
                understanding or agreement between us relating to the subject
                matter of any contract.
              </li>
              <li className="my-2">
                16.5. No waiver: Any failure or delay by you or us in enforcing
                (in whole or in part) any provision of these Platform Terms will
                not be interpreted as a waiver of your or our rights or
                remedies.
              </li>
              <li className="my-2">
                16.6. Assignment: You may not transfer any of your rights or
                obligations under these Platform Terms without our prior written
                consent. We may transfer any of our rights or obligations under
                these Platform Terms without your prior written consent to any
                of our affiliates or any business that we enter into a joint
                venture with, purchase or are sold to.
              </li>
              <li className="my-2">
                16.7. Headings: The headings in these Platform Terms are
                included for convenience only and shall not affect their
                interpretation.
              </li>
            </ol>
          </li>
          <li className="my-2">
            GOVERNING LAW AND JURISDICTION
            <ol>
              <li className="my-2">
                17.1. These Platform Terms shall be governed by and construed in
                accordance with the laws of Ireland.You can bring legal
                proceedings in respect of Platform Terms in the Irish courts. If
                you live in any other Member State of the European Union, you
                can bring legal proceedings in respect of these Platform Terms
                in either the Irish courts or the courts of your home country.
              </li>
              <li className="my-2">
                17.2. As a consumer, you will benefit from any mandatory
                provisions of the law of the country in which you are resident.
                Nothing in these Platform Terms, including the paragraph above,
                affects your rights as a consumer to rely on such mandatory
                provisions of local law.
              </li>
            </ol>
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
