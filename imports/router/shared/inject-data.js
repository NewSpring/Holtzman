/* eslint-disable no-underscore-dangle */

const InjectData = {};

InjectData._encode = function encode(ejson) {
  // var ejsonString = base64Encode(JSON.stringify(ejson));
  const ejsonString = JSON.stringify(ejson);
  return encodeURIComponent(ejsonString);
};

InjectData._decode = function decode(encodedEjson) {
  const decodedEjsonString = decodeURIComponent(encodedEjson);
  if (!decodedEjsonString) return null;

  // return JSON.parse(base64Decode(decodedEjsonString));
  return JSON.parse(decodedEjsonString);
};


export default InjectData;
