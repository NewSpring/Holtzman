
import { Sections, Likes } from "../../lib/collections"

/*global Meteor*/
Meteor.publish("sections", () => {
  return Sections.find()
})

Meteor.publish("likes", () => {
  console.log("userrssssssssssssss", Meteor.userId());
  return Likes.find({
    userId: Meteor.userId()
  })
})
