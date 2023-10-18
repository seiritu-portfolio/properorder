import React, { useEffect } from "react";
import SearchBy from "../../../components/SearchBy";
import clsx from "clsx";
import { InputBase, makeStyles, MenuItem, Select } from "@material-ui/core";
import { POOrderStatus } from "../../../models";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import APIManager from "../../../Network/APIManager";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import history from "../../../routes/history";
import SearchQueries from "../../../utils/SearchQueries";

const useStyles = makeStyles({
  root: {
    width: "100%",
    paddingRight: 0,
    fontSize: "0.9rem",
    fontWeight: "semibold",
  },
  inputRoot: {
    width: "100%",
    height: "2.5rem",
  },
  menuList: {
    paddingLeft: "0.5rem",
    fontSize: "1rem",
  },
});

function Filters({ user, loadOrders }) {
  const { orgId } = useParams();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search);

  const classes = useStyles();

  const [customers, setCustomers] = React.useState([]);

  useEffect(() => {
    APIManager.fetchAdminUsers(orgId, "")
      .then((res) => {
        setCustomers(res.users);
      })
      .catch((error) => {
        console.log("fetchAdminUsers", error);
      });
  }, [user, orgId]);

  const handleChangeQuery = (key, value) => {
    searchQuery.set(key, value);
    history.replace({
      pathname: location.pathname,
      search: searchQuery.toString(),
    });
    loadOrders(true);
  };

  return (
    <div className="grid grid-cols-5 gap-4 mt-2 px-4">
      <div className="flex flex-col col-span-2 justify-end">
        <SearchBy
          className={clsx("flex rounded-r-lg h-10")}
          placeholder="Search by order id, status or customer"
          searchInputProps={{
            value: searchQuery.get(SearchQueries.search) ?? "",
            onChange: (e) =>
              handleChangeQuery(SearchQueries.search, e.target.value),
          }}
        />
      </div>
      <div className="flex flex-col">
        <p className={"db-order-filter-label"}>Customer</p>
        <div className={"db-order-select-container"}>
          <Select
            displayEmpty
            classes={{ root: classes.root }}
            input={<InputBase classes={{ root: classes.inputRoot }} />}
            labelId="select-customer"
            id="select-customer"
            value={searchQuery.get(SearchQueries.customer) ?? ""}
            IconComponent={ExpandMoreIcon}
            onChange={(event) =>
              handleChangeQuery(SearchQueries.customer, event.target.value)
            }
          >
            <MenuItem value={""} classes={{ gutters: classes.menuList }}>
              All
            </MenuItem>
            {customers.map((item, index) => (
              <MenuItem
                key={index}
                value={item.id}
                classes={{ gutters: classes.menuList }}
              >
                {`${item.first_name} ${item.last_name}`}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex flex-col">
        <p className={"db-order-filter-label"}>Show orders for:</p>
        <div className={"db-order-select-container"}>
          <Select
            displayEmpty
            classes={{ root: classes.root }}
            input={<InputBase classes={{ root: classes.inputRoot }} />}
            labelId="select-period"
            id="select-period"
            value={searchQuery.get(SearchQueries.period) ?? ""}
            IconComponent={ExpandMoreIcon}
            onChange={(event) =>
              handleChangeQuery(SearchQueries.period, event.target.value)
            }
          >
            <MenuItem value={""} classes={{ gutters: classes.menuList }}>
              All time
            </MenuItem>
            {["Last 7 days", "Last 30 days", "Last 90 days"].map(
              (item, index) => (
                <MenuItem
                  key={index}
                  value={item}
                  classes={{ gutters: classes.menuList }}
                >
                  {item}
                </MenuItem>
              )
            )}
          </Select>
        </div>
      </div>
      <div className={"flex flex-col"}>
        <p className={"db-order-filter-label"}>Status</p>
        <div className={"db-order-select-container"}>
          <Select
            displayEmpty
            classes={{ root: classes.root }}
            input={<InputBase classes={{ root: classes.inputRoot }} />}
            labelId="select-status"
            id="select-status"
            value={searchQuery.get(SearchQueries.status) ?? ""}
            IconComponent={ExpandMoreIcon}
            onChange={(event) =>
              handleChangeQuery(SearchQueries.status, event.target.value)
            }
          >
            <MenuItem value={""} classes={{ gutters: classes.menuList }}>
              All
            </MenuItem>
            {Object.keys(POOrderStatus).map((key) => (
              <MenuItem
                key={key}
                value={key}
                classes={{ gutters: classes.menuList }}
              >
                {POOrderStatus[key].charAt(0).toUpperCase() +
                  POOrderStatus[key].slice(1)}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.User.user,
});

export default connect(mapStateToProps, null)(Filters);
