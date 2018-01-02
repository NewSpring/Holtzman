InjectData._encode = function(ejson) {
  var ejsonString = JSON.stringify(ejson);
  return encodeURIComponent(ejsonString);
};

InjectData._decode = function(encodedEjson) {
  var decodedEjsonString = decodeURIComponent(encodedEjson);
  if(!decodedEjsonString) return null;

  return JSON.parse(decodedEjsonString);
};
