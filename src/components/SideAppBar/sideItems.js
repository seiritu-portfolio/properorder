import homeIcon from "../../assets/home.svg";
import settingIcon from "../../assets/Setting.svg";
import profileIcon from "../../assets/Profile.svg";
import deliveryAddressIcon from "../../assets/delivery_addresses.svg";
import cardIcon from "../../assets/credit_card.svg";
import paperIcon from "../../assets/Paper.svg";
import heartIcon from "../../assets/heart.svg";
import infoIcon from "../../assets/info.svg";
import history from "../../routes/history";

const navigateTo = (path) => {
  history.push(`/${path}`);
};

export default [
  {
    icon: homeIcon,
    title: "Home",
    action: () => navigateTo("home"),
  },
  {
    icon: settingIcon,
    title: "Account settings",
    child: [
      {
        icon: profileIcon,
        title: "Personal details",
        action: () => navigateTo("personal-details"),
      },
      {
        icon: deliveryAddressIcon,
        title: "Delivery addresses",
        action: () => navigateTo("delivery-addresses"),
      },
      {
        icon: cardIcon,
        title: "Payment methods",
        action: () => navigateTo("payment-methods"),
      },
      {
        icon: paperIcon,
        title: "My orders",
        action: () => navigateTo("my-orders"),
      },
      {
        icon: heartIcon,
        title: "My favourites",
        action: () => navigateTo("my-favourites"),
      },
    ],
  },
  {
    icon: infoIcon,
    title: "Help & support",
    action: () => navigateTo("about-proper-order"),
  },
];

{
  /* To be back when it's fixed:*/
}
