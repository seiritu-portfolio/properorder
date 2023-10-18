import React from "react";
import history from "../../routes/history";
import "./styles.scss";

const navigation = [
  {
    id: 1,
    name: "About Proper Order",
    action: () => navigateTo("about-proper-order"),
  },
  {
    id: 2,
    name: "Sellers & fees",
    action: () => navigateTo("sellers-and-fees"),
  },
  {
    id: 3,
    name: "Delivery & collection",
    action: () => navigateTo("delivery-and-collection"),
  },
  {
    id: 4,
    name: "Questions, issues & refunds",
    action: () => navigateTo("questions-issues-refunds"),
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigateTo = (path) => {
  history.push(`/${path}`);
};

export default function NavbarHelpSupport(props) {
  const { navIndex } = props;

  const renderItem = (item, onClick = () => {}, selected = false) => {
    return (
      <button
        key={item.id}
        className={classNames(
          selected
            ? "bg-po-graylight border-po-yellowlight text-po-black font-bold"
            : "border-transparent text-po-graymain hover:bg-po-graylight hover:text-po-black",
          "group w-full flex  items-center px-3 py-2 text-base xl:text-lg font-semibold border-l-4"
        )}
        onClick={onClick}
        aria-current={selected ? "page" : undefined}
      >
        <span>{item.name}</span>
      </button>
    );
  };

  return (
    <div className="flex rectangle-container flex-col flex-initial py-4 bg-white overflow-y-auto">
      <div className="flex-grow flex flex-col">
        <nav className="flex-1 space-y-1" aria-label="Sidebar">
          {navigation.map((item) =>
            renderItem(item, item.action, navIndex === item.id)
          )}
        </nav>
      </div>
    </div>
  );
}
