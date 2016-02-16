
/*global Meteor, check */

import { api, parseEndpoint } from "../../../util/rock"

Meteor.methods({
  "file/upload/avatar": function(base64File){

    console.log(base64File)
    if (!this.userId) {
      throw new Meteor.Error("Must be logged in to upload an avatar")
    }

    let user = Meteor.user()

    user || (user = { services: { rock: {} }})

    const { PersonId } = user.services.rock
    const person = api.get.sync(`People/{PersonId}`)
    const { PhotoId } = person

    console.log(person, user)

    let id = Meteor.call("file/upload", base64File, PhotoId)

    console.log(id, id.text(), id.json())

    // promise.then((response) => {
    //   console.log(response)
    // })
    // let user = Meteor.user()
    //
    // user || (user = { services: { rock: {} }})
    //
    // const { PersonId } = user.services.rock
    //
    // if (!PersonId) {
    //   throw new Meteor.Error("No rock user found for upload")
    // }
    //
    // let upload = api.patch.sync(`Person/${PersonId}`, {
    //   PhotoId: id
    // })
    //
    // if (upload.statusText) {
    //   throw new Meteor.Error(upload.statusText)
    // }

    return true
  }
})
