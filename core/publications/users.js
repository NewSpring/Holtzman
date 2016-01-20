
if (Meteor.isServer) {
  Meteor.publish("userData", function() {
    return Meteor.users.find(this.userId,
      {
        fields: {
          topics: 1
        }
      }
    )
  })
}
