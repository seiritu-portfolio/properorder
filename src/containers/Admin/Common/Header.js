import { BellIcon, MenuAlt1Icon } from "@heroicons/react/outline";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import clsx from "clsx";
import { BiLinkExternal } from "react-icons/bi";
import POModal from "../../../components/POModal";
import PreviewSeller from "./PreviewSeller";
import { useHeader } from "../Provider/HeaderProvider";
import { connect } from "react-redux";
import history from "../../../routes/history";
import * as userActions from "../../../redux/UserSaga/actions";
import { useParams } from "react-router-dom";

function Header({ setSidebarOpen, user, actions }) {
  const { orgId } = useParams();
  const searchVisible =
    window.location.pathname.includes("/dashboard") ||
    window.location.pathname.includes("/delivery-map");

  const [previewModalVisible, setPreviewModalVisible] = useState(false);

  const { searchString, setSearchString } = useHeader();

  const onClickPreview = (e) => {
    e.preventDefault();

    setPreviewModalVisible(true);
  };

  const onClickSettings = (e) => {
    e.preventDefault();
    history.push(`/admin/${orgId}/settings`);
  };

  const onClickProfile = (e) => {
    e.preventDefault();
    history.push(`/admin/${orgId}/profile`);
  };

  const onClickLogout = (e) => {
    e.preventDefault();

    actions.logout();
  };

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      {/* Search bar */}
      <div className="flex-1 px-4 flex justify-between sm:px-6 lg:mx-auto lg:px-8">
        <div className="flex-1 flex justify-end">
          {searchVisible ? (
            <form
              className="w-full flex md:ml-0 items-center"
              action="#"
              method="GET"
            >
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <div className="flex w-full text-gray-400 focus-within:text-gray-600">
                <div
                  className="inset-y-0 left-0 flex items-center pointer-events-none"
                  aria-hidden="true"
                >
                  <SearchIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="search-field"
                  name="search-field"
                  placeholder="Search by region or postcode"
                  value={searchString}
                  onChange={(e) => setSearchString(e.target.value)}
                  style={{ borderRadius: "inherit", height: 50 }}
                  className="flex-1 py-2 px-2 focus:outline-none text-base"
                />
              </div>
            </form>
          ) : null}
          {/*
            <a
              rel="noreferrer"
              target="_blank"
              className={
                "flex flex-row items-center font-semibold text-lg mx-2 tracking-tightest leading-extra-tight text-po-yellowmedium self-center"
              }
              href={"/"}
              onClick={(e) => onClickPreview(e)}
            >
              <span>Preview your shop page</span>
              <BiLinkExternal className={"ml-1 mt-0.5"} />
            </a>
            */}
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <button
            type="button"
            className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Profile dropdown */}
          <Menu as="div" className="ml-3 relative">
            <div>
              <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                {/*
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                */}
                <span className="ml-3 text-gray-700 text-sm font-medium block">
                  {`${user?.first_name ?? ""} ${user?.last_name ?? ""}`}
                </span>
                <ChevronDownIcon
                  className="flex-shrink-0 ml-1 h-5 w-5 text-gray-400 block"
                  aria-hidden="true"
                />
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
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={(e) => onClickProfile(e)}
                      className={clsx(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Your Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={(e) => onClickSettings(e)}
                      className={clsx(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={(e) => onClickLogout(e)}
                      className={clsx(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Logout
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      <POModal
        modalVisible={previewModalVisible}
        handleCloseModal={() => setPreviewModalVisible(false)}
        renderContent={() => (
          <PreviewSeller
            item={previewModalVisible}
            handleCloseModal={() => setPreviewModalVisible(false)}
          />
        )}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.User.user,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    logout: () => {
      dispatch(userActions.logout());
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
