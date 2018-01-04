Meteor.startup(function() {
  // var dom = $('script[type="text/inject-data"]', document);
  // var injectedDataString = $.trim(dom.text());
  const dom = document.querySelectorAll('script[type="text/inject-data"]')[0];
  const injectedDataString = dom && dom.innerText ? dom.innerText.trim() : "";
  console.log("meteor-inject-data injectedDataString = ", injectedDataString);
  InjectData._data = InjectData._decode(injectedDataString) || {};
});

InjectData.getData = function(key, callback) {
  Meteor.startup(function() {
    callback(InjectData._data[key]);
  });
};