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
    return userId === doc.userId
  },
  "remove": (userId, doc) => {
    return userId === doc.userId
  }
})

export default Likes;
