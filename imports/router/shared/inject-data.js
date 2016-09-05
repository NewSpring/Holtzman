
const InjectData = {};

import { base64Encode, base64Decode } from "../../util/encode";

InjectData._encode = function(ejson) {
  // var ejsonString = base64Encode(JSON.stringify(ejson));
  var ejsonString = JSON.stringify(ejson);
  return encodeURIComponent(ejsonString);
};

InjectData._decode = function(encodedEjson) {
  var decodedEjsonString = decodeURIComponent(encodedEjson);
  if(!decodedEjsonString) return null;

  // return JSON.parse(base64Decode(decodedEjsonString));
  return JSON.parse(decodedEjsonString);
};


export default InjectData;
