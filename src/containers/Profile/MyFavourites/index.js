import React from "react";
import "./styles.scss";
import MyTabs from "../../../components/MyTabs";
import MyFavSellers from "./MyFavSellers";
import MyFavProducts from "./MyFavProducts";
import POHeader from "../../../components/POHeader";
import NavSidebar from "../NavSidebar";
import { connect } from "react-redux";
import Footer from "../../../components/POFooter";

function MyFavourites(props) {
  const renderSellers = () => (
    <div className={"mt-2"}>
      <MyFavSellers />
    </div>
  );

  const renderProducts = () => (
    <div className={"mt-2"}>
      <MyFavProducts />
    </div>
  );

  const { favSellers, favProducts } = props;

  return (
    <div className="flex flex-col w-full min-h-screen">
      <POHeader classNames={"absolute w-full"} />
      <div className="profile-header flex flex-col">
        <h1 className="profile-main-heading pl-2 pt-2 uppercase ml-5 mt-3 lg:mt-0 lg:ml-20 xl:ml-28 2xl:ml-48">
          Account settings
        </h1>
      </div>

      <div className="rectangle-container profile-container bg-white lg:mx-20 xl:mx-28 2xl:ml-48 z-10">
        <div className="divide-y divide-light md:grid md:grid-cols-7 lg:grid-cols-4 md:divide-y-0 md:divide-x">
          <NavSidebar navIndex={5} />
          <div className="py-8 px-3 md:px-6 lg:px-10 md:col-span-5 lg:col-span-3">
            <div className="w-full">
              <h3 className="text-bold text-3xl mb-3">My favourites</h3>
              {favSellers.length > 0 ? (
                <MyTabs
                  tabs={[
                    {
                      label: `Sellers (${favSellers.length})`,
                      renderContent: renderSellers,
                    },
                    {
                      label: `Products (${favProducts.length})`,
                      renderContent: renderProducts,
                    },
                  ]}
                  styles={{ tabFontSize: "1.375rem", tabBarWidth: "100%" }}
                />
              ) : (
                <div>
                  <p className="font-semibold text-po-black text-base ml-1">
                    Products ({favProducts.length})
                  </p>
                  {renderProducts()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-8">
        <Footer />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  favSellers: state.User.favSellers,
  favProducts: state.User.favProducts,
});

export default connect(mapStateToProps, null)(MyFavourites);
