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

    // let token = "basic ";
    // if (this.userId) {
    //   const user = Meteor.users.findOne(this.userId);
    //   token += new Buffer(`${user._id}:${user.profile.token}`).toString("base64")
    // } else {
    //   token += new Buffer(`guest:guest`).toString("base64")
    // }

    console.log(Meteor.settings);
    fetch(Meteor.settings.public.heighliner, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "basic " + new Buffer(`apollos:${Meteor.settings.rock.token}`).toString("base64")
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
        console.error("@@GRAPHQL_ERROR", error, payload)
        f.throw(error);
      });

    return f.wait()

  }
});
