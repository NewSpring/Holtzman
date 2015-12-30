
import { Sections } from "../../lib/collections"

Meteor.publish("sections", () => {
  return Sections.find()
})
