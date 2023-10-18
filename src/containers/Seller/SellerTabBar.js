import React from "react";

export default function SellerTabBar({ tabBarIndex, setTabBarIndex }) {
  const renderTab = (index, title) => {
    const isActive = index === tabBarIndex;
    return (
      <button
        className={"flex flex-col mr-8 ml-1 mb-1"}
        onClick={() => setTabBarIndex(index)}
      >
        <div>
          <div className="flex flex-row items-center">
            <h4
              className={`text-2xl ${
                isActive
                  ? "text-po-black font-bold"
                  : "text-po-graymain font-bold"
              }`}
            >{`${title}`}</h4>
          </div>
        </div>
        <span
          className={`w-full bg-po-yellowlight ${
            isActive ? "tab-underline rounded-full" : null
          }`}
        />
      </button>
    );
  };

  return (
    <div className={"flex flex-row mt-2"}>
      <div className={"flex flex-row"}>
        {renderTab(0, "Products")}
        {renderTab(1, "About")}
        {renderTab(2, "Reviews")}
      </div>
    </div>
  );
}
