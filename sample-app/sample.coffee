
Apollos.fs._generateCollection("images")

Apollos.fs.images.allow({
  insert: -> true
  update: -> true
  remove: -> true
  download: -> true
})

if Meteor.isClient

  Template.Dropzone.events({
    "dropped #dropzone": (event) ->

      Apollos.fs.upload("images", event, (err, fileObj) ->

        console.log err, fileObj

      )
  })

  class Images extends Apollos.Component

    @register "Images"


    subscriptions: -> [
      "images"
    ]

    images: ->
      return Apollos.fs.images.find()


if Meteor.isServer

  Meteor.publish("images", ->

    return Apollos.fs.images.find()

  )
