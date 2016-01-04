
import { Sections } from '../../lib/collections'

/*global Meteor*/
Meteor.publish('sections', () => {
  return Sections.find()
})
