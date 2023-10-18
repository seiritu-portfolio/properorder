import React, { useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import Constants from "../../config/Constants";
import { getAppLink } from "../../utils/DevDetect";

export default function FirebaseTokenProvider({ children }) {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search);

  useEffect(() => {
    const appLink = getAppLink();
    if (location.pathname === "/downloadapp" && appLink) {
      window.location.replace(appLink, '_blank');
    }
  }, [location]);

  useEffect(() => {
    const firebasePushId = searchQuery.get("firebase_push_id");
    if (firebasePushId) {
      localStorage.setItem(Constants.AS_FIREBASE_PUSH_TOKEN, firebasePushId);
    }
  }, [searchQuery.toString()]);
  return <>{children}</>;
}
