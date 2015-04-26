

Template.home.events


  "click #logout": (event) ->
    event.preventDefault()
    Meteor.logout()
    return
