const Future = Npm.require("fibers/future");


Meteor.methods({
  'graphql.transport': function(query, vars, operationName) {
    check(query, String);
    check(vars, Match.OneOf(Object, undefined, null));
    check(operationName, Match.OneOf(String, undefined, null));

    variables = {...variables, ...{
      mongoId: this.userId
    }}

    const payload = { query, variables, operationName };
    const f = new Future();

    fetch("http://localhost:8080/", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        f.return(data);
      })
      .catch(error => {
        f.throw(error);
      });

    return f.wait()

  }
});
