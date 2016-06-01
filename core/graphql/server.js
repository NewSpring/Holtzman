const Future = Npm.require("fibers/future");

Meteor.methods({
  'graphql.transport': function(query, variables, operationName) {
    check(query, String);
    check(variables, Match.OneOf(Object, undefined, null));
    check(operationName, Match.OneOf(String, undefined, null));

    const payload = { query, variables, operationName };
    const f = new Future();

    let headers = {
      'Accept': 'appplication/json',
      'Content-Type': 'application/json',
    };

    if (this.userId) {
      if (this.connection) {
        headers['Authorization'] = Accounts._getLoginToken(this.connection.id);
      } else if (Meteor.loginToken) {
        // fake method for retrieving login token on fast render
        headers['Authorization'] = Meteor.loginToken();
      }
    }


    fetch(Meteor.settings.public.heighliner, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
      })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        f.return(data);
      })
      .catch(error => {
        console.error("@@GRAPHQL_ERROR", error, payload)
        f.throw(error);
      });

    return f.wait()

  }
});
