const Production = "Production";
const Staging = "Staging";
const Development = "Development";

export function getCurrentEnvironment() {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return Development;
  }
  if (process.env.REACT_APP_API_URL.includes("apidev.properorder.ie")) {
    return Staging;
  }
  return Production;
}

export function isDev() {
  return getCurrentEnvironment() === Development;
}

export function isStaging() {
  return getCurrentEnvironment() === Staging;
}

export function isProduction() {
  return getCurrentEnvironment() === Production;
}

export function EnableGA() {
  return isProduction();
}

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  return "unknown";
}

export function getAppLink() {
  const mobileOS = getMobileOperatingSystem();
  switch (mobileOS) {
    case "iOS":
      return "https://apps.apple.com/ie/app/proper-order/id1611038478";
    case "Android":
      return "https://play.google.com/store/apps/details?id=ie.properorder.app";
    default:
      return null;
  }
}

export function getRedirectLink() {
  const mobileOS = getMobileOperatingSystem();
  switch (mobileOS) {
    case "iOS":
      return "https://apps.apple.com/ie/app/proper-order/id1611038478";
    case "Android":
      return "https://play.google.com/store/apps/details?id=ie.properorder.app";
    default:
      return null;
  }
}
