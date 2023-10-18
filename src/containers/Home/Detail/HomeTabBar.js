import React from "react";

export default function HomeTabBar({
  sellers,
  totalProducts,
  tabBarNeeded,
  tabBarIndex,
  setTabBarIndex,
}) {
  if (!tabBarNeeded) {
    return null;
  }

  const renderTab = (index, title, count) => {
    const isActive = index === tabBarIndex;
    return (
      <button
        className={"flex flex-col mr-6 ml-1 mb-1 cursor-default	cursor-pointer"}
        onClick={() => setTabBarIndex(index)}
      >
        <div>
          <div className="flex flex-row items-center">
            <h4
              className={`text-sm ${
                isActive
                  ? "text-po-black font-bold"
                  : "text-po-graymain font-medium"
              }`}
            >{`${title} `}</h4>
            <h4
              className={`text-sm pl-1 ${
                isActive
                  ? "text-po-black font-bold"
                  : "text-po-graymain font-medium"
              }`}
            >{`(${count})`}</h4>
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
    <div className={"flex flex-row"}>
      <div className={"flex flex-row"}>
        {renderTab(1, "Products", totalProducts)}
        {renderTab(0, "Sellers", sellers.length)}
      </div>
    </div>
  );
}
