import React, { useEffect } from "react";
import ContactInfo from "./ContactInfo";
import DeliveryDetails from "./DeliveryDetails";
import WhereToFindUs from "./WhereToFindUs";
import OpeningTimes from "./OpeningTimes";
import POHTML from "../../../components/POHTML";

const MAX_LENGTH = 300;

export default function About(props) {
  const { seller } = props;

  if (seller == null) {
    return null;
  }

  useEffect(() => {
    props.setVisibleIndex(0);
  }, []);

  const description = seller.description;
  let limitedLength = description.indexOf(".", MAX_LENGTH);
  if (limitedLength === -1) limitedLength = description.length;
  else limitedLength = limitedLength + 1;
  const [readMore, setReadMore] = React.useState(true);

  return (
    <div className={"mt-8 mb-4 flex flex-col"}>
      <h2>A little bit about us</h2>
      <span className={"my-2 font-normal text-xl"}>
        <POHTML
          htmlString={description.slice(
            0,
            readMore ? limitedLength : description.length
          )}
        />
        {/* {description.slice(0, readMore ? limitedLength : description.length)}
         */}
      </span>
      {limitedLength < description.length && (
        <button
          className={"font-semibold text-xl text-po-yellowlight inline-flex"}
          onClick={() => setReadMore(!readMore)}
        >
          {readMore ? "Read more" : "Read less"}
        </button>
      )}
      <div className={"grid grid-cols-1 xl:grid-cols-2 gap-x-10"}>
        <div className={"flex-col space-y-10 divide-y divide-normal"}>
          <ContactInfo seller={seller} />
          {/*<DeliveryDetails seller={seller} />*/}
          <OpeningTimes seller={seller} />
        </div>
        <div className={"flex-col space-y-6"}>
          <WhereToFindUs seller={seller} />
        </div>
      </div>
    </div>
  );
}
