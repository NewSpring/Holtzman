

describe('Example test suite', function () {
  var server = meteor();
  it('execute should work', function () {
    // return a promise
    return server.execute(function () {
      expect(Meteor.release).not.to.be.empty;
    });
  });
});


describe('You can also use browser in your tests', function () {
  var server = meteor();
  var client = browser(server);

  it('should work for both client and server', function () {
    return client.execute(function () {
      // some code to execute
    }).then(function () {
      return server.execute(function () {
        // some code to execute on server
      });
    });
  });
});
