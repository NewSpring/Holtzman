import { Likes } from "../collections"

if (Meteor.isServer) {
  // must use function because arrow version doesn't like 'this'
  Meteor.publish("likes", function() {
    return Likes.find(
      {
        userId: this.userId
      },
      {
        sort: {
          dateLiked: -1
        }
      }
    )
  })

}
