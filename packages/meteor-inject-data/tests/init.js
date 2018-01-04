Picker.route('/', function(params, req, res, next) {
  InjectData.pushData(res, "hello", {meteorhacks: "rocks"});
  next();
});
