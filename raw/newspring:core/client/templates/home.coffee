Template.home.rendered = ->

  Session.set "f1LoginSuccess", undefined


Template.home.events

  "submit #f1-signin-form": ->
    username = $("#f1-username").val()
    password = $("#f1-password").val()

    Apollos.checkF1Credentials username, password, (error, result) ->
      if error
        console.log error
        return
      Session.set "f1LoginSuccess", result

    return false

  "click .delete": ->

    Apollos.people.update
      _id: @._id
    ,
      $set:
        recordStatusValueId: 4
        updatedBy: Apollos.name


  "submit .person-form": (event) ->

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

  f1LoginStatus: ->
    success = Session.get "f1LoginSuccess"

    if success? and success
      color = "#5bb75b"
      message = "Success"
    else if success?
      color = "#da4f49"
      message = "Fail..."
    else
      color = "#49afcd"
      message = "Please enter your F1 credentials"

    html = "
      <div style=\"
        margin: 5px;
        color: #fff;
        background-color: #{color};
        padding: 5px;
        display: inline-block;
      \">
        #{message}
      </div>"

    return html

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
