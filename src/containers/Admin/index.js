import React, { useEffect, useState } from "react";
import { Redirect, Switch, useParams } from "react-router-dom";
import RoutePublic from "../../routes/RoutePublic";
import Dashboard from "./Dashboard";
import LSideBar from "./Common/LSideBar";
import ProductList from "./ProductList";
import Header from "./Common/Header";
import CreateProduct from "./CreateProduct";
import OrgSettings from "./OrgSettings";
import SiteSettings from "./SiteSettings";
import Orders from "./Orders";
import Users from "./Users";
import Discounts from "./Discounts";
import CreateDiscount from "./CreateDiscount";
import CreateUser from "./CreateUser";
import OrderDetails from "./OrderDetails";
import Profile from "./Profile";
import ProductHeaders from "./ProductHeaders";
import DeliveryCoverageMap from "./DeliveryCoverageMap";
import { HeaderProvider } from "./Provider/HeaderProvider";
import { connect } from "react-redux";
import * as adminActions from "../../redux/AdminSaga/actions";

function Admin({ match: { path }, user, sellerIndex, actions }) {
  let { orgId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    if (user?.sites?.length > 0 && sellerIndex.id === -1) {
      actions.updateSellerIndex({
        id: user.sites[0].id,
        status: sellerIndex.status,
      });
      actions.fetchAdminProducts({
        sellerIndex: user.sites[0].id,
      });
      actions.fetchAdminOrders({
        sellerIndex: user.sites[0].id,
      });
    }
  }, [user]);

  if (sellerIndex.id === -1) {
    return null;
  }

  const sitePath = `${path}/site/:sellerIndex`;

  return (
    <HeaderProvider>
      <div className="relative w-screen min-h-screen flex bg-gray-100">
        <LSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className={"flex flex-1 flex-col"}>
          <Header setSidebarOpen={setSidebarOpen} />
          <Switch>
            {/*<RoutePublic*/}
            {/*  exact*/}
            {/*  path={`${sitePath}/dashboard`}*/}
            {/*  component={Dashboard}*/}
            {/*/>*/}
            <RoutePublic
              exact
              path={`${sitePath}/delivery-map`}
              component={DeliveryCoverageMap}
            />
            <RoutePublic
              exact
              path={`${sitePath}/products`}
              component={ProductList}
            />
            <RoutePublic
              exact
              path={`${sitePath}/create-product`}
              component={CreateProduct}
            />
            <RoutePublic
              exact
              path={`${sitePath}/products/:productId`}
              component={CreateProduct}
            />
            <RoutePublic
              exact
              path={`${sitePath}/orders/:orderId`}
              component={OrderDetails}
            />
            <RoutePublic
              exact
              path={`${path}/settings`}
              component={OrgSettings}
            />
            <RoutePublic
              exact
              path={`${sitePath}/settings`}
              component={SiteSettings}
            />
            <RoutePublic exact path={`${sitePath}/orders`} component={Orders} />
            <RoutePublic exact path={`${path}/users`} component={Users} />
            <RoutePublic
              exact
              path={`${path}/users/:userId`}
              component={CreateUser}
            />
            <RoutePublic
              exact
              path={`${sitePath}/discounts`}
              component={Discounts}
            />
            <RoutePublic
              exact
              path={`${sitePath}/discounts/:discountId`}
              component={CreateDiscount}
            />
            <RoutePublic
              exact
              path={`${sitePath}/product-headers`}
              component={ProductHeaders}
            />
            <RoutePublic exact path={`${path}/profile`} component={Profile} />
            <Redirect
              to={`${sitePath
                .replace(":orgId", orgId)
                .replace(":sellerIndex", sellerIndex.id)}/orders`}
            />
          </Switch>
        </div>
      </div>
    </HeaderProvider>
  );
}

const mapStateToProps = (state) => ({
  userToken: state.User.userToken,
  user: state.User.user,
  sellerIndex: state.Admin.sellerIndex,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateSellerIndex: (sellerId) => {
      dispatch(adminActions.updateSellerIndex(sellerId));
    },
    fetchAdminProducts: (request) => {
      dispatch(adminActions.fetchAdminProducts(request));
    },
    fetchAdminOrders: (request) => {
      dispatch(adminActions.fetchAdminOrders(request));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
