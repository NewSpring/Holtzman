
###

  Apollos.person

  @example get the currently logged in user's person document

    console.log "Hello, #{Apollos.person().firstName}"

###
Apollos.person = (user) ->

  if Meteor.isServer
    if not user?._id
      throw new Meteor.Error ("user is requried for server lookup")
      return

  if Meteor.isClient
    user or= Apollos.user()

  if user.personGuid
    person = Apollos.people.findOne
      guid: new RegExp(user.personGuid, "i")


  # we shouldnt have any code for rock in the core package
  # this will probably need to adjust the rock package

  # if not person and user.rock and user.rock.personId
  #   person = Apollos.people.findOne
  #     personId: user.rock.personId

  return person or {}
