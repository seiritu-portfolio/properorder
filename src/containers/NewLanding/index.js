import React from "react";
import "./styles.scss";
import LandingSellerList from "./LandingSellerList";
import Footer from "../../components/POFooter";
import LandingNormal from "./LandingNormal";
import LandingNewUser from "./LandingNewUser";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import SearchQueries from "../../utils/SearchQueries";
import LandingFindOutMore from "./LandingFindOutMore";

function NewLanding({ userToken }) {
  const isNewUser = userToken == null;

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search);

  const isFindOutMore = searchQuery.get(SearchQueries.findOutMore);

  return (
    <div className="flex w-full flex-col h-screen">
      {isFindOutMore ? (
        <LandingFindOutMore />
      ) : isNewUser ? (
        <LandingNewUser />
      ) : (
        <LandingNormal />
      )}

      <div className={"px-6 md:px-8"}>
        <h2 className={"text-2xl text-po-black mt-10"}>Our sellers</h2>
        <LandingSellerList />
      </div>
      <div className="mt-auto pt-6">
        <Footer />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userToken: state.User.userToken,
});

export default connect(mapStateToProps, null)(NewLanding);
