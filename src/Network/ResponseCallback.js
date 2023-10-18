import {
  removeTempUserToken,
  removeUserToken,
} from "../services/HelperService";

const successStatusCodes = [200, 201, 202, 203, 204, 205, 206, 207, 208, 209];

function onResponse503() {
  return Promise.reject("Undergoing Maintenance");
}

function onResponse(response) {
  return response
    .then((result) => {
      if (successStatusCodes.includes(result.status)) {
        return Promise.resolve(result.data);
      } else if (result.status === 503) {
        return onResponse503();
      } else {
        console.log(result);
        return Promise.reject(
          result.data?.errors
            ? Object.values(result.data?.errors)[0]
            : result.data?.message ?? "SERVER_ERROR"
        );
      }
    })
    .catch(onResponseFailure);
}

function onResponseFailure(error) {
  console.log("onResponseFailure", error);
  if (error === "Unauthenticated.") {
    removeUserToken();
    removeTempUserToken();
  }
  return Promise.reject(error);
}

export default {
  onResponse,
  onResponseFailure,
};
