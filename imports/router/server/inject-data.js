/* eslint-disable no-underscore-dangle, no-param-reassign */
import InjectData from "../shared/inject-data";

// custome API
InjectData.pushData = function pushData(res, key, value) {
  if (!res._injectPayload) {
    res._injectPayload = {};
  }

  res._injectPayload[key] = value;
};

InjectData.getData = function getData(res, key) {
  if (res._injectPayload) {
    return _.clone(res._injectPayload[key]);
  }
  return null;
};

export default InjectData;
