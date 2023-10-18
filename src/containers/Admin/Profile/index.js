import React, { Component } from "react";
import "./styles.scss";
import "react-perfect-scrollbar/dist/css/styles.css";
import { connect } from "react-redux";
import DetailsForm from "./DetailsForm";
import { Divider } from "@material-ui/core";
import POModal from "../../../components/POModal";
import ChangePasswordModal from "./ChangePasswordModal";
import { withStyles } from "@material-ui/core/styles";
import SimpleReactValidator from "simple-react-validator";
import APIManager from "../../../Network/APIManager";
import POAlert from "../../../components/POAlert";
import POSpinner from "../../../components/POSpinner";
import * as userActions from "../../../redux/UserSaga/actions";

const useStyles = {
  root: {
    paddingLeft: "3rem",
    paddingRight: "3rem",
    minHeight: "3rem",
    fontWeight: "bold",
    fontSize: "1.25rem",
  },
};

class Profile extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      passwordModalVisible: false,
      isLoading: false,
      alertInfo: { open: false },
    };

    this.validator = new SimpleReactValidator();
  }

  handleSaveChanges = (request) => {
    if (this.validator.allValid()) {
      this.setState({ isLoading: true });
      APIManager.updateAdminProfile(request)
        .then((res) => {
          this.props.actions.getProfile();
          this.setState({
            isLoading: false,
            alertInfo: {
              open: true,
              message: "Updated successfully!",
            },
          });
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            isLoading: false,
            alertInfo: {
              open: true,
              message: error,
              severity: "warning",
            },
          });
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  handleOpenPasswordModal = () => this.setState({ passwordModalVisible: true });

  handleClosePasswordModal = (result) =>
    this.setState({ passwordModalVisible: false, ...result });

  render() {
    const { user } = this.props;
    const { passwordModalVisible } = this.state;

    return (
      <div className={"flex flex-1 flex-col p-3 sm:p-8  2xl:px-24 bg-gray-100"}>
        <div
          className={
            "flex flex-col sm:flex-row sm:items-center justify-between mt-4"
          }
        >
          <div className={"flex flex-row items-center"}>
            <h2 className="text-2xl font-bold px-3 mb-5">
              {`${user?.first_name ?? ""} ${user?.last_name ?? ""}'s Profile`}
            </h2>
          </div>
        </div>
        <div className="px-3 mb-8">
          <DetailsForm
            user={user}
            validator={this.validator}
            handleSaveChanges={this.handleSaveChanges}
          />
        </div>
        <Divider />

        <div className="my-6 px-3">
          <h3 className="text-bold text-2xl mb-5">Password</h3>
          <div className="flex justify-between items-center">
            <p className="font-bold text-po-graymain pl-1">****************</p>
            <button
              className={"text-xl font-bold text-po-yellowdark"}
              onClick={this.handleOpenPasswordModal}
            >
              Change password
            </button>
          </div>
        </div>
        <POModal
          modalVisible={passwordModalVisible}
          handleCloseModal={this.handleClosePasswordModal}
          renderContent={() => (
            <ChangePasswordModal
              handleCloseModal={this.handleClosePasswordModal}
              handleUpdateAlert={(alertInfo) => this.setState({ alertInfo })}
            />
          )}
        />
        <POAlert
          alertInfo={this.state.alertInfo}
          className={"mt-16"}
          handleClose={() => this.setState({ alertInfo: { open: false } })}
        />
        <POSpinner isLoading={this.state.isLoading} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.User.user,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    getProfile: () => {
      dispatch(userActions.getProfile());
    },
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Profile));
