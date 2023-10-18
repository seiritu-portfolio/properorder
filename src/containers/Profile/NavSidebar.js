import React from "react";
import "./styles.scss";
import UserIcon from "../../assets/user.svg";
import LocationIcon from "../../assets/pin.svg";
import CreditCardIcon from "../../assets/card.svg";
import ListIcon from "../../assets/list.svg";
import HeartIcon from "../../assets/my_favourite.svg";
import { ReactSVG } from "react-svg";
import history from "../../routes/history";
import * as userActions from "../../redux/UserSaga/actions";
import { connect } from "react-redux";

const Navigation = [
  {
    id: 1,
    icon: UserIcon,
    title: "Personal details",
    action: () => navigateTo("personal-details"),
  },
  {
    id: 2,
    icon: LocationIcon,
    title: "Delivery addresses",
    action: () => navigateTo("delivery-addresses"),
  },
  {
    id: 3,
    icon: CreditCardIcon,
    title: "Payment methods",
    action: () => navigateTo("payment-methods"),
  },
  {
    id: 4,
    icon: ListIcon,
    title: "My orders",
    action: () => navigateTo("my-orders"),
  },
  {
    id: 5,
    icon: HeartIcon,
    title: "My favourites",
    action: () => navigateTo("my-favourites"),
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigateTo = (path) => {
  history.push(`/${path}`);
};

function NavSidebar(props) {
  const { navIndex } = props;

  const renderItem = (item, onClick = () => {}, selected = false) => {
    if (item.title === "My orders" && props.userOrders.length === 0) {
      return null;
    }

    return (
      <button
        key={item.id}
        className={classNames(
          selected
            ? "bg-po-graylight border-po-yellowlight text-po-black font-bold"
            : "border-transparent text-po-graymain sm:hover:bg-po-graylight sm:hover:text-po-black",
          "group w-full flex items-center px-4 py-2.5 text-xl md:text-base  xl:text-lg 2xl:text-xl font-semibold border-l-4 lg:border-l-8"
        )}
        onClick={onClick}
        aria-current={selected ? "page" : undefined}
      >
        <ReactSVG
          src={item.icon}
          className={classNames(
            selected
              ? "text-po-black"
              : "text-po-graymain group-hover:text-po-black",
            "flex-shrink-0 -ml-1 mr-4 md:mr-2 xl:mr-4 h-6 w-6"
          )}
          aria-hidden="true"
        />
        <span className="truncate">{item.title}</span>
      </button>
    );
  };

  return (
    <div className="py-6 md:col-span-2 lg:col-span-1">
      <nav className="space-y-2">
        {Navigation.map((item) =>
          renderItem(item, item.action, navIndex === item.id)
        )}
      </nav>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userOrders: state.User.userOrders,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchOrders: () => {
      dispatch(userActions.fetchOrders());
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavSidebar);
