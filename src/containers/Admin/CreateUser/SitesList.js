import React, { useEffect, useState } from "react";
import "./styles.scss";
import { classNames } from "../CreateProduct/classes";
import clsx from "clsx";
import { connect } from "react-redux";

function SitesList({ user, sites, setSites }) {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    if (user?.sites != null) {
      setSellers(user?.sites ?? []);
    }
  }, [user]);

  return (
    <div className="mt-6 px-3">
      <div className={"flex flex-col w-1/2"}>
        <fieldset>
          <legend className={clsx(classNames.inputLabel, "mt-0.5")}>
            Site access*
          </legend>
          <div className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
            {sellers.map((site, siteIdx) => (
              <div key={siteIdx} className="relative flex items-start py-4">
                <div className="min-w-0 flex-1 text-sm">
                  <label
                    htmlFor={`site-${site.id}`}
                    className="font-medium text-gray-700 select-none"
                  >
                    {site.name}
                  </label>
                </div>
                <div className="ml-3 flex items-center h-5">
                  <input
                    id={`site-${site.id}`}
                    name={`site-${site.id}`}
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    checked={sites.some((s) => s.id === site.id)}
                    onChange={(e) => {
                      if (sites.some((s) => s.id === site.id)) {
                        setSites(sites.filter((s) => s.id !== site.id));
                      } else {
                        setSites([...sites, site]);
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.User.user,
});

export default connect(mapStateToProps, null)(SitesList);
