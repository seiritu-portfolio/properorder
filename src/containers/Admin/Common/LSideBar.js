import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CogIcon, XIcon } from "@heroicons/react/outline";
import Nav from "./Nav";
import history from "../../../routes/history";
import { connect } from "react-redux";
import APIManager from "../../../Network/APIManager";
import { useHeader } from "../Provider/HeaderProvider";
import { useParams } from "react-router-dom";

function LSideBar({ sidebarOpen, setSidebarOpen, user }) {
  const { orgId } = useParams();
  const navigateToOrgSettings = (e) => {
    e.preventDefault();
    history.push(`/admin/${orgId}/settings`);
    setSidebarOpen(false);
  };

  const { updatedOrg } = useHeader();
  const [org, setOrg] = useState({});

  useEffect(() => {
    APIManager.fetchOrganisation(orgId).then((res) => {
      setOrg(res);
    });
  }, [user, updatedOrg, orgId]);

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-po-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2  focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <img
                  className={"h-10 w-10 object-scale-down"}
                  src={org.logo}
                  alt={""}
                />
                <h2 className="text-xl font-bold px-3 text-po-black">
                  {org.name ?? ""}
                </h2>
                <a
                  className="cursor-pointer"
                  onClick={(e) => navigateToOrgSettings(e)}
                >
                  <CogIcon
                    className="h-5 w-5 text-po-black"
                    aria-hidden="true"
                  />
                </a>
              </div>
              {/* active site */}
              <Nav
                className="mt-5 flex-shrink-0 h-full divide-y divide-po-black overflow-y-auto"
                setSidebarOpen={setSidebarOpen}
              />
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow border-r border-gray-200 bg-po-white pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              {org.logo != null && (
                <img
                  className={"h-10 w-10 object-scale-down"}
                  src={org.logo}
                  alt={""}
                />
              )}
              <div className="flex">
                <h2 className="text-xl font-bold pl-3 pr-1 text-po-black">
                  {org.name ?? ""}
                </h2>
                <a
                  className="cursor-pointer"
                  onClick={(e) => navigateToOrgSettings(e)}
                >
                  <CogIcon
                    className="h-5 w-5 text-po-black"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>

            <Nav
              className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto"
              setSidebarOpen={setSidebarOpen}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.User.user,
});

export default connect(mapStateToProps, null)(LSideBar);
