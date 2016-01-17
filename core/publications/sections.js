
import { Sections } from "../collections"

if (Meteor.isServer) {
  /*global Meteor*/
  Meteor.publish("sections", () => {
    return Sections.find()
  })
}
