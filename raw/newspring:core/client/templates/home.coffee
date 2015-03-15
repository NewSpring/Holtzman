Template.home.events

  "click .delete": ->

    Apollos.people.update
      _id: @._id
    ,
      $set:
        recordStatusValueId: 4
        updatedBy: Apollos.name


  "submit form": (event) ->

    Apollos.people.update
      _id: @._id
    ,
      $set:
        firstName: event.target.first.value
        nickName: event.target.nick.value
        middleName: event.target.middle.value
        lastName: event.target.last.value
        updatedBy: Apollos.name

    return false


Template.home.helpers

  people: ->
    query = {}
    user = Meteor.user()

    if user and user.rock and user.rock.personId
      query.personId =
        $ne: user.rock.personId

    return Apollos.people.find query,
      sort:
        lastName: 1
        firstName: 1


  isMale: ->
    return @.gender is 1


  isCurrentUser: ->
    user = Meteor.user()

    if user and user.rock
      return @.personId is user.rock.personId
    else
      return false


  currentPerson: ->
    user = Meteor.user()

    if user and user.rock
      return Apollos.people.findOne
        personId: user.rock.personId
    else
      return null


  userIdentifier: ->
    user = Meteor.user()

    if user and user.emails and user.emails.length
      return user.emails[0].address
    else
      return "not logged in"
