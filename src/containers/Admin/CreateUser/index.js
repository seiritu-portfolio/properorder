import React, { useEffect, useState } from "react";
import "./styles.scss";
import GoBack from "../Common/GoBack";
import history from "../../../routes/history";
import "react-perfect-scrollbar/dist/css/styles.css";
import UserDetails from "./UserDetails";
import SitesList from "./SitesList";
import { Button, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import deleteIcon from "../../../utils/customSVG/deleteIcon";
import APIManager from "../../../Network/APIManager";
import { connect } from "react-redux";
import POSpinner from "../../../components/POSpinner";
import POAlert from "../../../components/POAlert";
import PODeleteModal from "../../../components/PODeleteModal";
import DeleteOrgUser from "./DeleteOrgUser";
import { useParams } from "react-router-dom";
import Spinner from "react-spinkit";

const useStyle = makeStyles((_) => ({
  btn: {
    flex: "1 1 0",
    paddingLeft: "3rem",
    paddingRight: "3rem",
    margin: "0 0.5rem",
    height: "3.5rem",
    fontSize: "1.2rem",
    minHeight: "3rem",
  },
  mainButton: {
    marginLeft: "0.5rem",
    ["@media (min-width:640px)"]: {
      marginLeft: "2rem",
    },
  },
  cancelButton: {
    backgroundColor: "#BFBFC6",
    marginRight: "0.5rem",
    "&:hover": {
      opacity: 1,
      backgroundColor: "#BFBFC6",
    },
    display: "flex",
    marginBottom: "0.5rem",
    ["@media (min-width:640px)"]: {
      marginBottom: 0,
      marginRight: "2rem",
    },
  },
}));

function CreateUser() {
  const { orgId, userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState({});

  const [sites, setSites] = useState([]);
  const [role, setRole] = useState("");

  const classesButtons = useStyle();

  const isEditMode = userId !== "-1";
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [alertInfo, setAlertInfo] = React.useState({ open: false });
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    setLoadingUsers(true);
    APIManager.fetchAdminUsers(orgId, "")
      .then((res) => {
        console.log(res);
        setLoadingUsers(false);
        const user = res.users.find((u) => u.id === Number(userId));
        if (user != null) {
          setNewUser(user);
          setSites(user.sites ?? []);
          setRole(
            user.roles != null && user.roles?.length !== 0
              ? user.roles[0].name
              : ""
          );
        }
      })
      .catch((error) => {
        console.log("fetchAdminUsers", error);
        setLoadingUsers(false);
      });
  }, [userId]);

  const handleSubmit = () => {
    let message = "";
    const { first_name, last_name, phone, email } = newUser;

    if (sites.length === 0) {
      message = "You need to select one site at least";
    }

    if (role === "") {
      message = "You need to select the role";
    }

    if (first_name == null || first_name === "") {
      message = "The first name field is required";
    }

    if (last_name == null || last_name === "") {
      message = "The last name field is required";
    }

    if (email == null || email === "") {
      message = "The email field is required";
    }

    if (phone == null || phone === "") {
      message = "The phone number field is required";
    }

    if (message !== "") {
      setAlertInfo({
        open: true,
        message,
        severity: "warning",
      });
      return;
    }

    const request = {
      first_name,
      last_name,
      phone,
      email,
      role,
      sites: sites.map((s) => s.id),
    };

    setIsLoading(true);
    APIManager.updateAdminUser(orgId, newUser?.id, request)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setAlertInfo({
          open: true,
          message: `${isEditMode ? "Updated" : "Created"} successfully!`,
        });
        setTimeout(() => {
          gotoUsers();
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setAlertInfo({
          open: true,
          message: error,
          severity: "warning",
        });
      });
  };

  const onDeleteUser = () => {
    setIsLoading(true);
    APIManager.deleteOrgUser(orgId, newUser?.id)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setDeleteModalVisible(false);
        setAlertInfo({
          open: true,
          message: "Deleted successfully!",
        });
        setTimeout(() => {
          gotoUsers();
        }, 1500);
      })
      .catch((error) => {
        setIsLoading(false);
        setAlertInfo({
          open: true,
          message: error,
          severity: "warning",
        });
      });
  };

  const gotoUsers = () => {
    history.push(`/admin/${orgId}/users`);
  };

  if (loadingUsers) {
    return (
      <div className={"ad-create-user-loader-container"}>
        <Spinner name="ball-spin-fade-loader" fadeIn="none" color={"#E27F03"} />
      </div>
    );
  }

  return (
    <div className={"flex flex-1 flex-col p-3 sm:p-8  2xl:px-24 bg-gray-100"}>
      <GoBack title={"Back to all users"} onClick={() => gotoUsers()} />
      <div
        className={
          "flex flex-col sm:flex-row sm:items-center justify-between mt-4"
        }
      >
        <div className={"flex flex-row items-center"}>
          <h2 className="text-2xl font-bold">
            {isEditMode ? "Edit" : "Create new"} user
          </h2>
        </div>
        {isEditMode && (
          <button
            id={"remove"}
            className={"flex flex-row items-center space-x-1"}
            onClick={() => setDeleteModalVisible(true)}
          >
            {deleteIcon()}
            <p className={"text-sm font-bold text-po-reddark mt-0.5"}>
              Delete <span className="hidden md:inline">this user</span>
            </p>
          </button>
        )}
      </div>

      <UserDetails
        newUser={newUser}
        setNewUser={setNewUser}
        role={role}
        setRole={setRole}
      />
      <SitesList sites={sites} setSites={setSites} />

      <div
        className={"my-4 sm:my-10 flex flex-col sm:flex-row justify-between"}
      >
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classesButtons.btn, classesButtons.cancelButton)}
          onClick={() => gotoUsers()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={clsx(classesButtons.btn, classesButtons.mainButton)}
          onClick={() => handleSubmit()}
        >
          Save
        </Button>
      </div>
      <POSpinner isLoading={isLoading} />
      <POAlert
        alertInfo={alertInfo}
        handleClose={() => setAlertInfo({ open: false })}
      />
      <PODeleteModal
        modalVisible={deleteModalVisible}
        handleCloseModal={() => setDeleteModalVisible(false)}
        renderContent={() => (
          <DeleteOrgUser
            handleCloseModal={() => setDeleteModalVisible(false)}
            handleContinue={() => onDeleteUser()}
          />
        )}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.User.user,
});

export default connect(mapStateToProps, null)(CreateUser);
