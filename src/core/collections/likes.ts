// Likes
//
// TODO: fix apollos import

// import Apollos from "apollos/core/lib";

export interface Like {
  userId: String;
  entryId: String;
  title: String;
  image: String;
  link: String;
  icon: String;
  category: String;
  date: Date;
  status: String;
  dateLiked: Date;
};

const likes = new Mongo.Collection("likes") as Mongo.Collection<Like>;

// Apollos.addSchema("likes", Likes.schema);

likes.allow({
  "insert": (userId, doc) => {
    return userId === doc.userId;
  },
  "remove": (userId, doc) => {
    return userId === doc.userId;
  },
});

export default likes;
