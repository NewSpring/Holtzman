
/*global Meteor, check */

import { api, parseEndpoint } from "../../../util/rock"

Meteor.methods({
  "file/upload/avatar": function(id){

    if (!this.userId) {
      throw new Meteor.Error("Must be logged in to upload an avatar")
    }

    let user = Meteor.user()
    user || (user = { services: { rock: {} }})
    const { PersonId } = user.services.rock

    const Person = api.get.sync(`People/${PersonId}`)
    if (Person.statusText) {
      throw new Meteor.Error(Person.statusText)
    }

    const { PhotoId } = Person

    let upload = api.patch.sync(`People/${PersonId}`, {
      PhotoId: id
    })

    if (upload.statusText) {
      throw new Meteor.Error(upload.statusText)
    }

    api.delete.sync(`BinaryFiles/${PhotoId}`)

    return true
  }
})
