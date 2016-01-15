
import { Sections } from "../collections"

/*global Meteor*/
Meteor.publish("sections", () => {
  return Sections.find()
})
