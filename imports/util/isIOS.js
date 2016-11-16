// @flow
/* globals cordova */
const isIOS = () => (
  typeof cordova !== "undefined" && cordova.platformId === "ios"
);

export default isIOS;
