import React from "react";

export default function OrdersTabBar({
  tabBarIndex,
  setTabBarIndex,
  orderCounts,
}) {
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
        {renderTab(0, `In progress (${orderCounts.inProgress})`)}
        {renderTab(1, `Completed (${orderCounts.completed})`)}
      </div>
    </div>
  );
}
