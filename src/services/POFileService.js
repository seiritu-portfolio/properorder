import { getTempUserToken } from "./HelperService";
import { base_url, router } from "../Network/URLProvider";

const storeFile = (logo) => {
  return window.Vapor.store(logo, {
    signedStorageUrl: base_url + router.signed_storage_url,
    visibility: "public-read",
    headers: {
      Authorization: `Bearer ${getTempUserToken().access_token}`,
    },
  });
};

export default {
  storeFile,
};
