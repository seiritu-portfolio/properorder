import React, { useEffect } from "react";
import "./styles.scss";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import clsx from "clsx";
import { classNames } from "../CreateProduct/classes";

const useStyles = makeStyles({
  root: {
    paddingLeft: "3rem",
    paddingRight: "3rem",
    minHeight: "3rem",
    fontWeight: "bold",
    fontSize: "1.25rem",
  },
});

export default function DetailsForm(props) {
  const { user, validator, handleSaveChanges } = props;
  const [firstName, setFirstName] = React.useState(user?.first_name);
  const [lastName, setLastName] = React.useState(user?.last_name);
  const [phone, setPhone] = React.useState(user?.phone);
  const [email, setEmail] = React.useState(user?.email);

  useEffect(() => {
    setFirstName(user?.first_name);
    setLastName(user?.last_name);
    setPhone(user?.phone);
    setEmail(user?.email);
  }, [user]);

  const onSaveChanges = () => {
    handleSaveChanges({
      first_name: firstName,
      last_name: lastName,
      phone,
      email,
    });
  };

  const classes = useStyles();

  return (
    <div>
      <div className={"grid grid-col-1 md:grid-cols-2 md:gap-12"}>
        <div>
          <p className={clsx(classNames.inputLabel)}>First Name*</p>
          <input
            id="first-name"
            type="text"
            required
            className={classNames.input}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {validator.message("first name", firstName, "required")}
        </div>
        <div>
          <p className={clsx(classNames.inputLabel)}>Surname*</p>
          <input
            id="second-name"
            type="text"
            required
            className={classNames.input}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {validator.message("last name", lastName, "required")}
        </div>
      </div>
      <div className={"grid grid-col-1 md:grid-cols-2 md:gap-12 mt-3"}>
        <div>
          <p className={clsx(classNames.inputLabel)}>Phone number*</p>
          <input
            id="phone"
            type="text"
            required
            className={classNames.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {validator.message("phone", phone, "required|phone")}
        </div>
        <div>
          <p className={clsx(classNames.inputLabel)}>Email*</p>
          <input
            id="email"
            type="text"
            required
            className={classNames.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {validator.message("email", email, "required|email")}
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classes.root, "h-full w-full md:w-auto")}
          onClick={() => onSaveChanges()}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}
