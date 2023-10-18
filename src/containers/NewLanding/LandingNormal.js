import React from 'react';
import BgImage from "../../assets/new_landing_bg.png";
import POHeader from "../../components/POHeader";
import POHeaderVariant from "../../models/Enum/POHeaderVariant";
import ChicmacImage from "../../assets/Chicmac.png";
import LandingLi from "./LandingLi";
import LandingNi from "./LandingNi";

export default function LandingNormal() {
  return (
    <>
      <div className="relative pb-56 xl:pb-64">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover bg-blend-overlay"
            src={BgImage}
            alt="background image"
          />
        </div>
        <POHeader variant={POHeaderVariant.newLanding} isWhite={true} />
      </div>

      <div className="mx-auto px-6 md:px-8 max-w-full md:max-w-screen-xl flex flex-col">
        <h1 className="text-4xl mt-8">Keep your finger on The Pulse</h1>
        <span className={"text-xs font-bold text-po-graydark"}>
          Subheading tag line
        </span>
        <span className={"text-lg text-po-black font-normal mt-5"}>
          The Pulse is a cooking and lifestyle blog.
          <br />
          <br /> We are lovers of everything food and wine with a particular
          interest in trying new produce and recipes. We are here to inspire
          you; help you find what you are looking for and help you improve on
          your own cooking repertoire.
          <br />
          <br />
          Our articles range from hosting tips and amazing recipes to
          discovering new products and produce. Whatever the occasion, The Pulse
          wants to inspire and bring out the best in you!
        </span>
        <img className="landing-chicmac" src={ChicmacImage} alt="chicmac" />
        <span className={"text-xs font-bold text-po-black mt-3"}>
          Chicmac Sauces: Inspired by Korea
        </span>
        <h2 className={"text-2xl text-po-black mt-10"}>
          Conbini Condiments: Inspired by Japan
        </h2>
        <span className={"text-lg text-po-black font-normal mt-5"}>
          Famous for their Korean fried chicken, Chicmac has made their
          delicious sauces available for purchase. Their three sauces are a
          staple to every taste loving foodie. Their delicious K-BBQ sauce is a
          funky and sweet mix of American and Korean flavours, their Sriracha
          Caramel is sticky, sweet and salty, rounded off with some spice and
          last but not least, their latest addition of Korean Hot Sauce, a spicy
          and rich tomato based sauce that is sweet, tangy and spicy. They can
          be used to coat meats, dip in potatoes and even spread on toast –
          everything goes!
          <br />
          <br />
          Three delicious Japanese inspired sauces created by chef Holly Dalton.
          Onsen Hot Sauce is a fermented chilli sauce, Katsu Ketchup is a mix
          between ketchup and curry sauce and Sunday Sauce is a savoury, sweet
          and tangy sauce that is a mix between Teriyaki and Tonkatsu. Each can
          add a little wow factor to your creations, use them interchangeably
          and add them to your stir-frys, eggs, avocado toast, use as dipping
          sauces and even add to salad dressings. The sky’s the limit.
        </span>
        <span className={"text-lg text-po-black font-bold mt-10"}>
          Masaalon: Inspired by India
        </span>
        <span className={"text-lg text-po-black font-normal mt-5"}>
          Last but not least, Masaalon is the newest addition to the must-have
          condiment party, boasting a variety of chutneys and curry paste. Their
          Kashmiri Tikka Paste is fragrant and punchy, made with Kashmiri
          chillies and a variety of spices, excellent for curries of all shapes
          and sizes. Their chutneys are Bengali Mango Chutney, Peanut & Tamarind
          Chutney and Plumb & Cardamom Chutney. Each expertly created with the
          most delicious South Asian ingredients to strike a balance between
          sweet, tangy, savoury and spicy. All make for delicious eating, a
          great addition to marinades, excellent to eat with meats and cheeses
          and even on tortilla chips – the adventure is yours to create.
          <br />
          <br />
          Go forth and be inspired by these delicious Irish made pantry staples.
          We promise that your tastebuds will not be disappointed, so what are
          you waiting for? Grab them today.
        </span>
        <span className={"text-base text-po-black font-semibold mt-10"}>
          Bullets Uncountable
        </span>
        <LandingLi>
          Last but not least, Masaalon is the newest addition to the must-have
          condiment party, boasting a variety of chutneys and curry paste.
        </LandingLi>
        <LandingLi>
          Their Kashmiri Tikka Paste is fragrant and punchy, made with Kashmiri
          chillies and a variety of spices, excellent for curries of all shapes
          and sizes.
        </LandingLi>
        <LandingLi>
          Their chutneys are Bengali Mango Chutney, Peanut & Tamarind Chutney
          and Plumb & Cardamom Chutney. Each expertly created with the most
          delicious South Asian ingredients to strike a balance between sweet,
          tangy, savoury and spicy. All make for delicious eating, a great
          addition to marinades, excellent to eat with meats and cheeses and
          even on tortilla chips – the adventure is yours to create.
        </LandingLi>
        <span className={"text-base text-po-black font-semibold mt-10"}>
          Bullets Countable
        </span>
        <LandingNi index={1}>
          Last but not least, Masaalon is the newest addition to the must-have
          condiment party, boasting a variety of chutneys and curry paste.
        </LandingNi>
        <LandingNi index={2}>
          Their Kashmiri Tikka Paste is fragrant and punchy, made with Kashmiri
          chillies and a variety of spices, excellent for curries of all shapes
          and sizes.
        </LandingNi>
        <LandingNi index={3}>
          Their chutneys are Bengali Mango Chutney, Peanut & Tamarind Chutney
          and Plumb & Cardamom Chutney. Each expertly created with the most
          delicious South Asian ingredients to strike a balance between sweet,
          tangy, savoury and spicy. All make for delicious eating, a great
          addition to marinades, excellent to eat with meats and cheeses and
          even on tortilla chips – the adventure is yours to create.
        </LandingNi>
      </div>
    </>
  )
}
