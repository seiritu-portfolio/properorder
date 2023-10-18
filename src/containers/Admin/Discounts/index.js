import React, { useEffect, useState } from "react";
import "./styles.scss";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Button, makeStyles } from "@material-ui/core";
import { PlusSmIcon } from "@heroicons/react/outline";
import MyTabs from "../../../components/MyTabs";
import { FiEdit3 } from "react-icons/fi";
import history from "../../../routes/history";
import Spinner from "react-spinkit";
import { useParams } from "react-router-dom";
import APIManager from "../../../Network/APIManager";
import * as adminActions from "../../../redux/AdminSaga/actions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  btn: {
    paddingLeft: "1.1rem",
    paddingRight: "1.1rem",
    minHeight: "2.4rem",
    fontWeight: "semibold",
    fontSize: "1.1rem",
    borderRadius: "0.4rem",
    marginLeft: "auto",
  },
}));

function Discounts(props) {
  const [discounts, setDiscounts] = React.useState([]);
  const [loadingDiscounts, setLoadingDiscounts] = useState(false);

  const [counts, setCounts] = useState({
    all: 0,
    active: 0,
    inactive: 0,
  });
  const [classification, setClassification] = useState("all");
  const [pageNumber, setPageNumber] = useState("1");

  const { orgId, sellerIndex } = useParams();
  const classes = useStyles();

  useEffect(() => {
    props.actions.updateSellerIndex({ id: sellerIndex, status: false });
  }, [sellerIndex]);

  useEffect(() => {
    if (props.sellerIndex.status) {
      history.push(`/admin/${orgId}/site/${props.sellerIndex.id}/discounts`);
    }
  }, [props.sellerIndex]);

  useEffect(() => {
    setDiscounts([]);
    loadDiscounts();
  }, [classification]);

  const loadDiscounts = (reset = false, pn = pageNumber) => {
    if (sellerIndex !== -1 && pn != null) {
      setLoadingDiscounts(true);
      APIManager.fetchAdminDiscounts(sellerIndex, pn)
        .then((res) => {
          console.log(res);
          setLoadingDiscounts(false);
          setDiscounts(
            res.discounts.filter(
              (discount) =>
                (discount.active === 1 && classification === "active") ||
                (discount.active === 0 && classification === "inactive") ||
                classification === "all"
            )
          );
          setCounts({
            all: res.discounts.length,
            active: res.discounts.filter((discount) => discount.active === 1)
              .length,
            inactive: res.discounts.filter((discount) => discount.active === 0)
              .length,
          });
        })
        .catch((err) => {
          console.log(err);
          setLoadingDiscounts(false);
        });
    }
  };

  return (
    <PerfectScrollbar
      className={"flex flex-1 flex-col p-4 sm:p-8 2xl:px-24 bg-gray-50"}
    >
      <header className={"flex flex-row justify-between"}>
        <h2 className="text-2xl font-bold px-3">Discounts</h2>
        <Button
          variant="contained"
          color="secondary"
          startIcon={
            <div className={"w-6 h-6"}>
              <PlusSmIcon />
            </div>
          }
          className={classes.btn}
          onClick={() =>
            history.push(`/admin/${orgId}/site/${sellerIndex}/discounts/-1`)
          }
        >
          Add discount
        </Button>
      </header>

      <div className="relative flex flex-col px-4 mt-4">
        <MyTabs
          setTabIndex={(tabIndex) => {
            setClassification(
              tabIndex === 0 ? "all" : tabIndex === 1 ? "active" : "inactive"
            );
          }}
          styles={{ tabFontSize: "1.1rem" }}
          borderBottom={""}
          tabs={[
            {
              label: `All (${counts.all})`,
              renderContent: () => null,
            },
            {
              label: `Active (${counts.active})`,
              renderContent: () => null,
            },
            {
              label: `Inactive (${counts.inactive})`,
              renderContent: () => null,
            },
          ]}
        />
      </div>

      <div className="flex flex-col mt-6">
        <div className="overflow-x-auto sm:-mx-4 lg:-mx-6">
          <div className="py-2 align-middle inline-block min-w-full sm:px-4 lg:px-8">
            <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-sm font-medium text-gray-600 tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-center text-sm font-medium text-gray-600 tracking-wider"
                    >
                      Code
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-center text-sm font-medium text-gray-600 tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-center text-sm font-medium text-gray-600 tracking-wider"
                    >
                      Max limit
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-center text-sm font-medium text-gray-600 tracking-wider"
                    >
                      Expiry
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-center text-sm font-medium text-gray-600 tracking-wider"
                    >
                      Active
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {discounts.map((discount, index) => {
                    return (
                      <tr key={`${index}`}>
                        <td className=" text-center px-4 py-4 whitespace-nowrap text-base text-po-blue truncate">
                          <a
                            onClick={() =>
                              history.push(
                                `/admin/${orgId}/site/${sellerIndex}/discounts/${discount.id}`
                              )
                            }
                            className="flex flex-row cursor-pointer"
                          >
                            <p className="hover:underline text-base font-bold ml-2 text-po-blue">
                              {discount.name}
                            </p>
                            <FiEdit3 className={"w-4 h-4 ml-3 text-po-blue"} />
                          </a>
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-base text-po-black font-semibold text-center">
                          {discount.code}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-base text-po-black font-semibold text-center">
                          {discount.type === "percent" ? (
                            <span>{discount.value}%</span>
                          ) : null}
                          {discount.type === "sum" ? (
                            <span>€{discount.value}</span>
                          ) : null}
                          {discount.type === "delivery_percent" ? (
                            <span>{discount.value}% delivery</span>
                          ) : null}
                          {discount.type === "delivery_sum" ? (
                            <span>€{discount.value} on delivery</span>
                          ) : null}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-base text-po-black font-semibold text-center">
                          {discount.max_limit === "" ? (
                            <span>-</span>
                          ) : (
                            <span>{discount.max}</span>
                          )}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-base text-po-black font-semibold text-center">
                          {discount.expires_at}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-base text-po-black font-semibold text-center">
                          <div className="relative flex items-start justify-center">
                            <div className="flex items-center justify-center h-5">
                              {discount.active ? (
                                <input
                                  id="active"
                                  name="active"
                                  type="checkbox"
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                  checked
                                />
                              ) : (
                                <input
                                  id="active"
                                  name="active"
                                  type="checkbox"
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                              )}
                            </div>
                          </div>
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

      {loadingDiscounts && (
        <div
          className={"flex flex-row items-center justify-center pb-12 pt-16"}
        >
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
  sellerIndex: state.Admin.sellerIndex,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateSellerIndex: (sellerId) => {
      dispatch(adminActions.updateSellerIndex(sellerId));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Discounts);
