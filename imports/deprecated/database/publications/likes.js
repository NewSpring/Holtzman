import { Meteor } from "meteor/meteor";
import Likes from "../collections/likes";

if (Meteor.isServer) {
  // must use function because arrow version doesn't like 'this'
  Meteor.publish("likes", function publishLikes() {
    return Likes.find(
      {
        userId: this.userId,
      },
      {
        sort: {
          dateLiked: -1,
        },
      },
    );
  });

  Meteor.publish("recently-liked", () => Likes.find(
    {}, { sort: { dateLiked: -1 }, limit: 15 },
  ));
}
