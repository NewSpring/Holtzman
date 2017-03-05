import { Meteor } from "meteor/meteor";

if (Meteor.isServer) {
  // must use function because arrow version doesn't like 'this'
  Meteor.publish("userData", function userPublish() {
    // only publish if logged in
    if (this.userId) {
      return Meteor.users.find(this.userId,
        {
          fields: {
            topics: 1,
            profile: 1,
          },
        }
      );
    }
    // otherwise respond ready
    this.ready();
    return;
  });
}
