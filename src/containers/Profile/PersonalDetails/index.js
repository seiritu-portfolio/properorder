import React, { Component } from "react";
import "./styles.scss";
import { connect } from "react-redux";
import POHeader from "../../../components/POHeader";
import NavSidebar from "../NavSidebar";
import PersonalDetailsForm from "./PersonalDetailsForm";
import { Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import POModal from "../../../components/POModal";
import ChangePasswordModal from "./ChangePasswordModal";
import PODeleteModal from "../../../components/PODeleteModal";
import DeactivateAccount from "./DeactivateAccount";
import * as userActions from "../../../redux/UserSaga/actions";
import SimpleReactValidator from "simple-react-validator";
import POAlert from "../../../components/POAlert";
import Footer from "../../../components/POFooter";

const useStyles = {
  root: {
    paddingLeft: "3rem",
    paddingRight: "3rem",
    minHeight: "3rem",
    fontWeight: "bold",
    fontSize: "1.25rem",
  },
};

class PersonalDetails extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      passwordModalVisible: false,
      accountDeleteModalVisible: false,
      alertInfo: { open: false },
    };

    this.validator = new SimpleReactValidator();
  }

  handleSaveChanges = (request) => {
    if (this.validator.allValid()) {
      //TODO: save changes through api.
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  handleOpenPasswordModal = () => this.setState({ passwordModalVisible: true });

  handleClosePasswordModal = (result) =>
    this.setState({ passwordModalVisible: false, ...result });

  handleOpenAccountDeleteModal = () =>
    this.setState({ accountDeleteModalVisible: true });

  handleCloseAccountDeleteModal = () =>
    this.setState({ accountDeleteModalVisible: false });

  render() {
    const { user, classes } = this.props;
    const { passwordModalVisible, accountDeleteModalVisible, alertInfo } =
      this.state;
    return (
      <div className="flex flex-col w-full min-h-screen">
        <POHeader classNames={"absolute w-full"} />
        <div className="profile-header flex flex-col">
          <h1 className="profile-main-heading pl-2 pt-2 uppercase ml-5 mt-3 lg:mt-0 lg:ml-20 xl:ml-28 2xl:ml-48">
            Account settings
          </h1>
        </div>

        <div className="rectangle-container bg-white profile-container lg:mx-20 xl:mx-28 2xl:ml-48 z-10">
          <div className="divide-y divide-light md:grid md:grid-cols-7 lg:grid-cols-4 md:divide-y-0 md:divide-x">
            <NavSidebar navIndex={1} />
            <div className="py-8 px-3 md:px-6 lg:px-10  md:col-span-5 lg:col-span-3">
              <div className="w-full">
                <h3 className="text-bold text-3xl mb-5">Personal details</h3>
                <PersonalDetailsForm
                  user={user}
                  validator={this.validator}
                  handleSaveChanges={this.handleSaveChanges}
                />
                <Divider />

                <div className="my-5">
                  <h3 className="text-bold text-2xl mb-5">Password</h3>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-po-graymain pl-1">
                      ****************
                    </p>
                    <button
                      className={"text-xl font-bold text-po-yellowdark"}
                      onClick={this.handleOpenPasswordModal}
                    >
                      Change password
                    </button>
                  </div>
                </div>
                <Divider />

                <div className="mt-5">
                  <h3 className="text-bold text-2xl mb-5">
                    Permanently deactivate account
                  </h3>

                  <p className="text-po-graymain pl-1 text-lg">
                    In order to deactivate your account, please
                    <a
                      href="mailto:hello@properorder.ie?subject=Deactivate Account"
                      className={"font-bold text-po-yellowdark"}
                    >
                      &nbsp;contact the support team
                    </a>
                    .
                  </p>
                  <p className="text-po-graymain pl-1 mb-1 text-lg">
                    Please note that once this has been completed no
                    reactivation of your account will be possible.
                  </p>
                  {/*
                  <div className="mt-4 flex justify-center">
                    <Button
                      variant="contained"
                      color="secondary"
                      className={clsx(classes.root, "h-full w-full md:w-auto")}
                      onClick={this.handleOpenAccountDeleteModal}
                    >
                      Delete account
                    </Button>
                  </div>
                  */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto pt-8">
          <Footer />
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
        <PODeleteModal
          modalVisible={accountDeleteModalVisible}
          handleCloseModal={this.handleCloseAccountDeleteModal}
          renderContent={() => (
            <DeactivateAccount
              handleCloseModal={this.handleCloseAccountDeleteModal}
            />
          )}
        />
        <POAlert
          alertInfo={alertInfo}
          handleClose={() => this.setState({ alertInfo: { open: false } })}
        />
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
)(withStyles(useStyles)(PersonalDetails));
