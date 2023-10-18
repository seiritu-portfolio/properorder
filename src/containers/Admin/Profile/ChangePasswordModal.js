import React, { Component } from "react";
import { Close } from "@material-ui/icons";
import { Button, Divider, TextField } from "@material-ui/core";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import SimpleReactValidator from "simple-react-validator";
import APIManager from "../../../Network/APIManager";
import POSpinner from "../../../components/POSpinner";
import { compose } from "redux";
import { connect } from "react-redux";

const useStyles = (theme) => ({
  close: {
    color: theme.palette.common.graydark,
  },
  root: {
    paddingLeft: "3rem",
    paddingRight: "3rem",
    minHeight: "3rem",
  },
  cancelButton: {
    backgroundColor: theme.palette.common.graylight,
    "&:hover": {
      opacity: 1,
      backgroundColor: theme.palette.common.graylight,
    },
    display: "none",
    ["@media (min-width:640px)"]: {
      display: "flex",
    },
  },
});

class ChangePasswordModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      matchRequireVisible: false,
      isLoading: false,
    };

    this.validator = new SimpleReactValidator();
  }

  handleSaveChanges = () => {
    const { currentPassword, newPassword, confirmPassword } = this.state;
    if (this.validator.allValid()) {
      if (newPassword !== confirmPassword) {
        this.setState({ matchRequireVisible: true });
        return;
      }

      this.setState({ isLoading: true });
      APIManager.updatePassword(this.props.user.id, {
        old_password: currentPassword,
        password: newPassword,
      })
        .then((res) => {
          if (res) {
            this.setState({
              isLoading: false,
            });
            this.props.handleCloseModal({
              alertInfo: {
                open: true,
                message: "Password changed successfully!",
              },
            });
          } else {
            this.setState({
              isLoading: false,
            });
            this.props.handleUpdateAlert({
              open: true,
              message: "Please try again later",
              severity: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            isLoading: false,
          });
          this.props.handleUpdateAlert({
            open: true,
            message: error,
            severity: "error",
          });
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const { handleCloseModal, classes } = this.props;
    const {
      currentPassword,
      newPassword,
      confirmPassword,
      matchRequireVisible,
      isLoading,
    } = this.state;

    return (
      <div className={"flex flex-col bg-white change-password-modal-container"}>
        <div
          className={
            "px-4 sm:px-7 my-2 sm:my-3 flex flex-row justify-between items-center"
          }
        >
          <span className={"modal-title"}>Change password</span>
          <button onClick={handleCloseModal}>
            <Close className={classes.close} />
          </button>
        </div>
        <Divider />
        <div className={"flex flex-col mx-8 mt-8 space-y-6"}>
          <TextField
            required
            id="current-password"
            label="Current password"
            type={"password"}
            variant="outlined"
            value={currentPassword}
            onChange={(e) => this.setState({ currentPassword: e.target.value })}
          />
          {this.validator.message(
            "current password",
            currentPassword,
            "required|min:6|max:120"
          )}
          <TextField
            required
            id="new-password"
            label="New password"
            type={"password"}
            variant="outlined"
            value={newPassword}
            onChange={(e) =>
              this.setState({
                newPassword: e.target.value,
                matchRequireVisible: false,
              })
            }
          />
          {this.validator.message(
            "new password",
            newPassword,
            "required|min:6|max:120"
          )}
          <TextField
            required
            id="repeat-password"
            label="Confirm new password"
            type={"password"}
            variant="outlined"
            value={confirmPassword}
            onChange={(e) =>
              this.setState({
                confirmPassword: e.target.value,
                matchRequireVisible: false,
              })
            }
          />
          {this.validator.message(
            "repeat password",
            confirmPassword,
            "required|min:6|max:120"
          )}
          {matchRequireVisible && (
            <p className={"po-validation-message"}>Passwords need to match</p>
          )}
        </div>
        <div
          className={
            "h-12 mx-8 my-4 sm:my-8 flex flex-col sm:flex-row justify-between sm:space-x-4"
          }
        >
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="secondary"
            className={clsx(
              classes.root,
              classes.cancelButton,
              "h-full w-5/12"
            )}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={clsx(classes.root, "h-full sm:w-7/12")}
            onClick={this.handleSaveChanges}
          >
            Save changes
          </Button>
        </div>
        <POSpinner isLoading={isLoading} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.User.user,
});

export default compose(
  connect(mapStateToProps, null),
  withStyles(useStyles)
)(ChangePasswordModal);
