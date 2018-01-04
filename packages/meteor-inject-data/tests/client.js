Tinytest.addAsync('Clinet - get data', function(test, done) {
  InjectData.getData('hello', function(data) {
    test.equal(data, {meteorhacks: "rocks"});
    done();
  });
});