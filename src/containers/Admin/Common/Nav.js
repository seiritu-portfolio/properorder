import clsx from "clsx";
import React, { Fragment, useEffect, useState } from "react";
import history from "../../../routes/history";
import {
  CogIcon,
  CollectionIcon,
  MapIcon,
  TableIcon,
  UserGroupIcon,
  GiftIcon,
  ClipboardListIcon,
} from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import * as adminActions from "../../../redux/AdminSaga/actions";
import { connect } from "react-redux";
import { POSeller } from "../../../models";
import LocationService from "../../../services/LocationService";
import { useLocation, useParams } from "react-router-dom";
import { isDev } from "../../../utils/DevDetect";

function Nav({ className, setSidebarOpen, sellerIndex, user, actions }) {
  const location = useLocation();
  const pathName = location.pathname;

  const { orgId } = useParams();

  const navigation = [
    {
      name: "Orders",
      href: `/admin/${orgId}/site/${sellerIndex.id}/orders`,
      icon: () => <CollectionIcon />,
      action: (e) => {
        navigateTo(e, `site/${sellerIndex.id}/orders`);
        actions.fetchAdminOrders({
          sellerIndex: sellerIndex.id,
        });
      },
    },
    {
      name: "Products",
      href: `/admin/${orgId}/site/${sellerIndex.id}/products`,
      icon: () => <TableIcon />,
      action: (e) => {
        navigateTo(e, `site/${sellerIndex.id}/products`);
        actions.fetchAdminProducts({
          sellerIndex: sellerIndex.id,
        });
      },
    },
    {
      name: "Product headers",
      href: `/admin/${orgId}/site/${sellerIndex.id}/product-headers`,
      icon: () => <ClipboardListIcon />,
      action: (e) => navigateTo(e, `site/${sellerIndex.id}/product-headers`),
    },
    // {
    //   name: "Delivery map",
    //   href: `/admin/${orgId}/site/${sellerIndex.id}/dashboard`,
    //   icon: MapIcon,
    //   action: (e) => navigateTo(e, `site/${sellerIndex.id}/dashboard`),
    // },
    {
      name: "Delivery map",
      href: `/admin/${orgId}/site/${sellerIndex.id}/delivery-map`,
      icon: () => <MapIcon />,
      action: (e) => navigateTo(e, `site/${sellerIndex.id}/delivery-map`),
    },
    {
      name: "Site settings",
      href: `/admin/${orgId}/site/${sellerIndex.id}/settings`,
      icon: () => <CogIcon />,
      action: (e) => navigateTo(e, `site/${sellerIndex.id}/settings`),
    },
    /* {
       name: "Users",
       href: `/admin/${orgId}/users`,
       icon: UserGroupIcon,
       action: (e) => navigateTo(e, "users"),
     },
     {
       name: "Discounts",
       href: `/admin/${orgId}/site/${sellerIndex.id}/discounts`,
       icon: GiftIcon,
       action: (e) => navigateTo(e, `site/${sellerIndex.id}/discounts`),
     },*/
  ];

  // const secondaryNavigation = [
  //   {name: 'Coupons', href: '/admin/coupons', icon: collectionIcon, action: (e) => navigateTo(e, "dashboard")},
  //   {name: 'Financials', href: '/admin/financials', icon: collectionIcon, action: (e) => navigateTo(e, "dashboard")},
  //   {name: 'Users', href: '/admin/users', icon: collectionIcon, action: (e) => navigateTo(e, "dashboard")},
  //   {name: 'Settings', href: '/admin/settings', icon: collectionIcon, action: (e) => navigateTo(e, "dashboard")},
  // ]

  const navigateTo = (e, path) => {
    e.preventDefault();
    history.push(`/admin/${orgId}/${path}`);
    setSidebarOpen(false);
  };

  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState();

  useEffect(() => {
    if (user != null && user.sites != null) {
      const sites = POSeller.fromStateArray(user.sites);
      setSellers(sites);
      setSelectedSeller(sites.find((s) => s.id === Number(sellerIndex.id)));
    }
  }, [sellerIndex, user]);

  return (
    <nav className={className} aria-label="Sidebar">
      <Menu
        as="div"
        className="px-3 mt-2 mb-4 relative inline-block text-left w-full"
      >
        <div>
          <Menu.Button className="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-200">
            <span className="flex w-full justify-between items-center">
              <span className="flex min-w-0 items-center justify-between space-x-3">
                <span className="flex-1 flex flex-col min-w-0">
                  <span className="text-gray-900 text-base font-semibold truncate">
                    {selectedSeller?.name}
                  </span>
                  <span className="text-gray-500 text-sm truncate">
                    {selectedSeller
                      ? LocationService.getFormattedAddress(selectedSeller)
                      : ""}
                  </span>
                </span>
              </span>
              <SelectorIcon
                className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
            {sellers.map((seller, index) => (
              <div
                key={`${index}`}
                className="py-1 flex flex-col min-w-0 cursor-pointer"
                onClick={() => {
                  actions.updateSellerIndex({ id: seller.id, status: true });
                }}
              >
                <Menu.Item>
                  <a
                    className={clsx(
                      Number(sellerIndex.id) === seller.id
                        ? "bg-gray-100"
                        : "bg-gray-50",
                      "block px-4 py-2 text-sm flex flex-col"
                    )}
                  >
                    <span className="text-gray-900 text-sm font-semibold truncate">
                      {seller.name},
                    </span>
                    <span className="text-gray-500 text-xs truncate">
                      {LocationService.getFormattedAddress(seller)}
                    </span>
                  </a>
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
      <div className="px-4 space-y-1 pt-1">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={clsx(
              pathName.includes(item.href)
                ? "bg-gray-200 text-po-black font-semibold"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 transform transition duration-200 ease-out",
              "group flex items-center px-2 py-2 text-lg leading-6 font-medium rounded-md "
            )}
            aria-current={pathName.includes(item.href) ? "page" : undefined}
            onClick={item.action}
          >
            <div
              className={clsx(
                pathName.includes(item.href)
                  ? "text-po-black"
                  : "text-gray-400 group-hover:text-gray-500",
                "mr-4 flex-shrink-0 h-6 w-6"
              )}
              aria-hidden="true"
            >
              {item.icon()}
            </div>
            {item.name}
          </a>
        ))}
      </div>
      {/*  Comment out secondary navigation as it's not needed for V1
      <div className="mt-6 pt-6">
        <h2 className="text-xl font-bold mb-4 ml-3 text-white">ADMIN</h2>
        <div className="px-4 space-y-1">
          {secondaryNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={clsx(pathName.includes(item.href) ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
              )}
              aria-current={pathName.includes(item.href) ? 'page' : undefined}
              onClick={item.action}
            >
              <div className={"mr-4 h-6 w-6 text-cyan-200"}>
                {item.icon('white')}
              </div>
              {item.name}
            </a>
          ))}
        </div>
      </div>
    */}
    </nav>
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
    fetchAdminProducts: (request) => {
      dispatch(adminActions.fetchAdminProducts(request));
    },
    fetchAdminOrders: (request) => {
      dispatch(adminActions.fetchAdminOrders(request));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
