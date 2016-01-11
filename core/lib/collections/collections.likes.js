// Likes
//
// TODO: fix apollos import

// import Apollos from "apollos/core/lib";

const Likes = new Mongo.Collection("likes");

// Likes.schema = {
//   entryId: String,
//   userId: String,
//   channelName: String,
//   status: String,
//   date: Date
// }

// Apollos.addSchema("likes", Likes.schema);

Likes.allow({
  "insert": (userId, doc) => {
    return true
  },
  "remove": (userId, doc) => {
    return true
  }
})

export default Likes;
