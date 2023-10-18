import React, { useEffect, useState } from "react";
import "./styles.scss";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Button, makeStyles } from "@material-ui/core";
import { ReactSVG } from "react-svg";
import UserAddIcon from "../../../assets/user_add.svg";
import { FiEdit3 } from "react-icons/fi";
import history from "../../../routes/history";
import APIManager from "../../../Network/APIManager";
import { connect } from "react-redux";
import Spinner from "react-spinkit";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((_) => ({
  userBtn: {
    paddingLeft: "1.1rem",
    paddingRight: "1.1rem",
    minHeight: "2.4rem",
    fontWeight: "semibold",
    fontSize: "1.1rem",
    borderRadius: "0.4rem",
    marginLeft: "auto",
  },
}));

function Users({ user }) {
  const { orgId } = useParams();
  const [users, setUsers] = React.useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    setLoadingUsers(true);
    APIManager.fetchAdminUsers(orgId, "")
      .then((res) => {
        console.log(res);
        setLoadingUsers(false);
        setUsers(res.users);
      })
      .catch((error) => {
        console.log("fetchAdminUsers", error);
        setLoadingUsers(false);
      });
  }, [user, orgId]);

  if (user?.sites == null) {
    return null;
  }

  return (
    <PerfectScrollbar
      className={"flex flex-1 flex-col p-4 sm:p-8 2xl:px-24 bg-gray-50"}
    >
      <header className={"flex flex-row justify-between"}>
        <h2 className="text-2xl font-bold px-3">Users</h2>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ReactSVG src={UserAddIcon} className={"w-6 h-6"} />}
          className={classes.userBtn}
          onClick={() => history.push(`/admin/${orgId}/users/-1`)}
        >
          Create new user
        </Button>
      </header>

      <div className="flex flex-col mt-6">
        <div className="overflow-x-auto sm:-mx-4 lg:-mx-6">
          <div className="py-2 align-middle inline-block min-w-full sm:px-4 lg:px-8">
            <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-center text-sm font-medium text-gray-600 tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider"
                    >
                      User details
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-center text-sm font-medium text-gray-600 tracking-wider"
                    >
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {users.map((item, index) => {
                    return (
                      <tr key={`${index}`}>
                        <td className=" text-center px-4 py-4 whitespace-nowrap text-base text-po-blue truncate">
                          <span
                            className={"text-base font-semibold text-po-black"}
                          >
                            {item.id}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-po-black font-bold text-center">
                          <div className={"flex flex-col text-center"}>
                            <div className="flex flex-row">
                              {/*  Add state to the onClick() after API integration: */}
                              <a
                                onClick={() =>
                                  history.push(
                                    `/admin/${orgId}/users/${item.id}`
                                  )
                                }
                                className="flex flex-row cursor-pointer"
                              >
                                <p className="underline text-sm font-bold ml-2 text-po-blue">
                                  {item.getFullName()}
                                </p>
                                <FiEdit3
                                  className={"w-4 h-4 ml-3 text-po-blue"}
                                />
                              </a>
                            </div>
                            <div className="flex flex-row">
                              <p className="text-sm font-semibold ml-2 text-po-graymain">
                                {item.email}
                              </p>
                            </div>
                            <div className="flex flex-row">
                              <p className="text-sm font-semibold ml-2 text-po-graymain">
                                {item.phoneNumber}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-base text-po-black font-semibold text-center">
                          {item.isAdmin() ? "Admin" : "User"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {loadingUsers && (
        <div className={"db-user-loader-container"}>
          <Spinner
            name="ball-spin-fade-loader"
            fadeIn="none"
            color={"#E27F03"}
          />
        </div>
      )}
    </PerfectScrollbar>
  );
}

const mapStateToProps = (state) => ({
  user: state.User.user,
});

export default connect(mapStateToProps, null)(Users);
