// Likes
//
// TODO: fix apollos import

// import Apollos from "apollos/core/lib";

const Likes = new Mongo.Collection("likes");

// Likes.schema = {
//   userId: String,
//   entryId: String,
//   title: String,
//   image: String,
//   link: String,
//   icon: String,
//   category: String,
//   date: Date
//   status: String,
//   dateLiked: Date
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
