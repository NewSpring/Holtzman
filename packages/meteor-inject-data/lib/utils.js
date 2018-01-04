InjectData._encode = function(ejson) {
  var ejsonString = EJSON.stringify(ejson);
  return encodeURIComponent(ejsonString);
};

const isJSON = (decodedEjsonString) => {
    // console.log("decodedEjsonString = ", decodedEjsonString);
    try {
      JSON.parse(decodedEjsonString);
    }
    catch (e) {
      console.log("errorrrrrrrrrr", e);
      return false;
    }
    return true;
}

InjectData._decode = function(encodedEjson) {
  var decodedEjsonString = decodeURIComponent(encodedEjson);
  if(!decodedEjsonString) return null;

  return isJSON(decodedEjsonString) ? EJSON.parse(decodedEjsonString) : {};
};
