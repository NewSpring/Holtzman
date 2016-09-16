
import InjectData from "../shared/inject-data";

FastRender._securityCheck = function(payload) {
  if(payload && payload.loginToken) {
    var localStorageLoginToken = Meteor._localStorage.getItem('Meteor.loginToken');
    if(localStorageLoginToken != payload.loginToken) {
      Meteor.logout();
    }
  }
};

Meteor.startup(function() {
  // var dom = $('script[type="text/inject-data"]', document);
  // var injectedDataString = $.trim(dom.text());
  var dom = document.querySelectorAll("script[type=\"text/inject-data\"]")[0];
  var injectedDataString = dom && dom.innerText ? dom.innerText.trim() : "";
  InjectData._data = InjectData._decode(injectedDataString) || {};
});

InjectData.getData = function(key, callback) {
  Meteor.startup(function() {
    callback(InjectData._data[key]);
  });
};


export default InjectData;
