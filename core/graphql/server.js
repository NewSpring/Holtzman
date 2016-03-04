const Future = Npm.require("fibers/future");


Meteor.methods({
  'graphql.transport': function(query, variables, operationName) {
    check(query, String);
    check(variables, Match.OneOf(Object, undefined, null));
    check(operationName, Match.OneOf(String, undefined, null));

    variables = {...variables, ...{
      mongoId: this.userId
    }}

    const payload = { query, variables, operationName };
    const f = new Future();

    console.log(`Making request to ${Meteor.settings.heighliner}`, query, variables)
    fetch(Meteor.settings.heighliner, {
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
        console.error(error)
        f.throw(error);
      });

    return f.wait()

  }
});
