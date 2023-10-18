import React from "react";
import "./styles.scss";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import CustomForm from "./CustomForm";

const MailchimpFormContainer = (props) => {
  const postUrl =
    "https://peloton.us5.list-manage.com/subscribe/post?u=e3054759626c2bdcd58847253&id=8af27ad95d";

  return (
    <div className="flex flex-row mt-3 mt-10 w-full md:w-auto">
      <MailchimpSubscribe
        url={postUrl}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
          />
        )}
      />
    </div>
  );
};

export default MailchimpFormContainer;
