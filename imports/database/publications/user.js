import { Meteor } from "meteor/meteor";

if (Meteor.isServer) {
  // must use function because arrow version doesn't like 'this'
  Meteor.publish("userData", function userPublish() {
    return Meteor.users.find(this.userId,
      {
        fields: {
          topics: 1,
          profile: 1,
        },
      }
    );
  });
}
