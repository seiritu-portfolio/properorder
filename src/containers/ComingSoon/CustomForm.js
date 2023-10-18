import React, { useState, useEffect } from "react";
import "./styles.scss";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    borderRadius: "0.5625rem",
    padding: "0.8rem",
    marginTop: "1rem",
    backgroundColor: "#FFDAAB",
    width: "100%",
    fontSize: "1.2rem",
    fontWeight: "600",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(245,169,74,0.82)",
    },
  },
});

const CustomForm = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (status === "success") clearFields();
  }, [status]);

  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    email &&
      firstName &&
      lastName &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email,
        MERGE1: firstName,
        MERGE2: lastName,
      });
  };

  const classes = useStyles();

  return (
    <form className="w-full md:w-auto" onSubmit={(e) => handleSubmit(e)}>
      <h3 className="text-po-black text-base xl:text-lg font-semibold mb-4">
        {status === "success"
          ? "Success! We'll notify you about future updates."
          : "Be notified by email as soon as we go live"}
      </h3>
      {status === "sending" && (
        <div className="text-sm text-po-black mb-1">Sending...</div>
      )}
      {status === "error" && (
        <div
          className="text-sm text-po-red mb-1"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          className="text-base"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}

      {status !== "success" ? (
        <div className="mc__field-container">
          <div className={"auto-complete-container w-full"}>
            <div id="mc_embed_signup_scroll" className="w-full rounded-md">
              <input
                label="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                value={firstName}
                placeholder="First Name"
                isRequired
                className={clsx(
                  "flex flex-1 pl-3 py-3 text-base input-comingsoon w-full",
                  ""
                )}
              />
            </div>
          </div>
          <div className={"auto-complete-container w-full"}>
            <div id="mc_embed_signup_scroll" className="w-full">
              <input
                label="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                value={lastName}
                placeholder="Last Name"
                isRequired
                className={clsx(
                  "flex flex-1 pl-3 py-3 text-base input-comingsoon w-full",
                  ""
                )}
              />
            </div>
          </div>
          <div className={"auto-complete-container w-full"}>
            <div id="mc_embed_signup_scroll" className="w-full">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={clsx(
                  "flex flex-1 pl-3 py-3 text-base input-comingsoon w-full",
                  ""
                )}
                placeholder="Email address"
                isRequired
              />
            </div>
          </div>
        </div>
      ) : null}

      {status === "success" ? null : (
        <input
          className={clsx(
            classes.button,
            "transform transition duration-300 ease-out"
          )}
          label="Subscribe"
          type="submit"
          formValues={[email, firstName, lastName]}
        />
      )}
    </form>
  );
};

export default CustomForm;
