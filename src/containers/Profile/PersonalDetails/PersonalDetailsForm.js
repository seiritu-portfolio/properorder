import React from "react";
import "./styles.scss";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles({
  root: {
    paddingLeft: "3rem",
    paddingRight: "3rem",
    minHeight: "3rem",
    fontWeight: "bold",
    fontSize: "1.25rem",
  },
});

export default function PersonalDetailsForm(props) {
  const { user, validator, handleSaveChanges } = props;
  const [firstName, setFirstName] = React.useState(user?.first_name);
  const [lastName, setLastName] = React.useState(user?.last_name);
  const [phone, setPhone] = React.useState(user?.phone);
  const [email, setEmail] = React.useState(user?.email);

  const classes = useStyles();

  const onSaveChanges = () => {
    handleSaveChanges({ firstName, lastName, phone, email });
  };

  return (
    <div className="flex flex-col mb-6">
      <div className={"flex flex-col md:grid md:grid-cols-2 gap-4 lg:gap-8"}>
        <div className={"flex flex-col"}>
          <TextField
            required
            disabled
            id="first-name"
            label="First name"
            variant="outlined"
            className={"flex flex-1"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {validator.message("first name", firstName, "required")}
        </div>
        <div className={"flex flex-col"}>
          <TextField
            required
            disabled
            id="second-name"
            label="Surname"
            variant="outlined"
            className={"flex flex-1"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {validator.message("last name", lastName, "required")}
        </div>

        <div className={"flex flex-col"}>
          <TextField
            required
            disabled
            id="phone"
            label="Phone"
            variant="outlined"
            className={"flex flex-1"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {validator.message("phone", phone, "required|phone")}
        </div>
        <div className={"flex flex-col"}>
          <TextField
            required
            disabled
            id="email"
            label="Email"
            variant="outlined"
            className={"flex flex-1"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {validator.message("email", email, "required|email")}
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        {/*}     <Button
          variant="contained"
          color="secondary"
          className={clsx(classes.root, "h-full w-full md:w-auto")}
          onClick={() => onSaveChanges()}
        >
          Save changes
        </Button>*/}
      </div>
    </div>
  );
}
