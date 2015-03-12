Rock.tokenName = Meteor.settings.rock.tokenName
Rock.baseURL = Meteor.settings.rock.baseURL
Rock.token = Meteor.settings.rock.token

# If Rock is being watched (aka old states), remove watching
if serverWatch.getKeys().indexOf(Rock.name) isnt -1
  serverWatch.stopWatching Rock.name

# Start watching again
serverWatch.watch Rock.name, Rock.baseURL, 30 * 1000

###

  Rock.apiRequest

  @example make an API call to Rock

    Rock.apiRequest "DELETE", "api/UserLogins/#{user.Id}", (error, data) ->
      throw err if err

      console.log data

  @param method [String] CRUD Method desired
  @param resource [String] Url to hit on rock
  @param data [Object, String, Array] data to send to Rock
  @param callback [Function] callback to run on response

###
Rock.apiRequest = (method, resource, data, callback) ->

  if not Rock.isAlive()
    # build queue system herenot
    return

  if typeof data is "function"
    callback = data
    data = undefined

  headers = {}

  if Rock.tokenName and Rock.token
    headers[Rock.tokenName] = Rock.token

  HTTP.call method, "#{Rock.baseURL}#{resource}",
    timeout: 2500
    headers: headers
    data: data
  , callback

###

  Rock.user

  @example return current logged in user in Rock format

    rockUser = Rock.user()

###
Rock.user = ->

  Rock.user.translate()

###

  Rock.user.translate

  @example take data from a service and format it for Rock

    Rock.user.translate([obj, platform])

  @param user [Object] existing object to be translated
  @param platform [String] platform to be translated to

###
Rock.user.translate = (user, platform) ->

  if not platform
    platform = Apollos.name

  # forced uppercase to make case insensitive strings
  switch platform.toUpperCase()
    when Apollos.name.toUpperCase()
      if not user
        user = {
          emails: [
            address: null
          ]
          services:
            password:
              bcrypt: null
        }

      rockUser =
        UserName: user.emails[0].address
        ApollosHash: user.services.password.bcrypt

      if user.rock
        rockUser.PersonId = user.rock.personId
        rockUser.Guid = user.rock.guid
        rockUser.Id = user.rock.userLoginId

      return rockUser

###

  Rock.user.delete

  @example delete a user from Rock

    Rock.user.delete Apollos.users.findOne()

  @param user [Object] an existing user document to be deleted

###
Rock.user.delete = (user) ->

  user = Rock.user.translate(user)

  if not user.Id
    return

  debug user, "id for delete is #{user.Id}"

  Rock.apiRequest "DELETE", "api/UserLogins/#{user.Id}", (error, result) ->
    if error
      debug "Rock delete failed:"
      debug error
      return

###

  Rock.user.update

  @example update a user on Rock

    Rock.user.update(userDoc)

  @param user [Object] User to update

###
Rock.user.update = (user) ->

  rockUser = Rock.user.translate(user)

  if not rockUser.Id or not rockUser.Guid
    Rock.user.create user
    return

  Rock.apiRequest "POST", "api/UserLogins/#{rockUser.Id}", rockUser,
    (error, result) ->
      if error
        debug "Rock update failed:"
        debug error
        return

      Apollos.user.update result.data

###

  Rock.user.create

  @example create a user on Rock

    Rock.user.update()

  @param user [Object] User to create

###
Rock.user.create = (user) ->

  user = Rock.user.translate user

  Rock.apiRequest "POST", "api/UserLogins", user, (error, result) ->
    if error
      debug "Rock create failed:"
      debug error
      return

    Apollos.user.update result.data

###

  Rock.users

  @example return all users synced to Rock

    Rock.users()

  @todo write lookup

###
Rock.users = ->

  throw new Meteor.Error "Unimplemented", "This method is unimplemented!"

###

  Rock.people

  @example return all people synced to Rock

    Rock.people()

  @todo write lookup

###
Rock.people = ->

  throw new Meteor.Error "Unimplemented", "This method is unimplemented!"

###

  Rock.users.refresh

  @example refesh all users from Rock

    Rock.user.refresh()

  @param throwErrors [Boolean] switch to silence error throwing

###
Rock.users.refresh = (throwErrors) ->

  Rock.apiRequest "GET", "api/UserLogins", (error, result) ->
    if error and throwErrors
      throw new Meteor.Error "Rock sync issue", "api/UserLogins: #{error}"
    else if error
      debug "Rock sync failed:"
      debug error
      return

    users = result.data
    userIdsSynced = []

    for user in users
      userDocId = Apollos.user.update user, Rock.name
      debug "Synced user from Rock: #{user.Id}"

      if userDocId
        userIdsSynced.push userDocId

    usersRockDoesNotHave = Apollos.users.find
      _id:
        $nin: userIdsSynced

    for userDoc in usersRockDoesNotHave.fetch()
      Rock.user.create userDoc

###

  Rock.people.refresh

  @example refesh all people from Rock

    Rock.people.refresh()

  @param throwErrors [Boolean] switch to silence error throwing

###
Rock.people.refresh = (throwErrors) ->

  aliasQuery = "api/PersonAlias
    ?$select=
      PersonId,
      AliasPersonId"

  Rock.apiRequest "GET", aliasQuery, (error, result) ->
    if error and throwErrors
      throw new Meteor.Error "Rock sync issue", error
    else if error
      debug "Rock sync failed:"
      debug error
      return

    grouped = _.groupBy result.data, "PersonId"
    people = []

    for personId of grouped
      people.push
        personId: Number personId
        personAliasIds: _.map grouped[personId], (alias) ->
          return alias.AliasPersonId

    for person in people
      Rock.people.refreshDetails person, throwErrors

###

  Rock.people.refreshDetails

  @example refesh a person's details from Rock

    Rock.people.refreshDetails person, throwErrors

  @param person [Object|Number|String] exisiting person document, rock.personId,
    or person._id
  @param throwErrors [Boolean] switch to silence error throwing

###
Rock.people.refreshDetails = (person, throwErrors) ->

  if typeof person is "number"
    person =
      personId: personId

  if typeof person.personId isnt "number"
    return

  familyQuery = "api/Groups/GetFamilies/#{person.personId}
    ?$expand=
      GroupLocations,
      Members,
      Members/GroupRole,
      Members/Person,
      Members/Person/PhoneNumbers,
      Members/Person/PhoneNumbers/NumberTypeValue
    &$select=
      CampusId,
      Id,
      GroupLocations/LocationId,
      Members/GroupRole/Name,
      Members/Person/PhoneNumbers/Number,
      Members/Person/PhoneNumbers/NumberTypeValue/Value,
      Members/Person/Id,
      Members/Person/FirstName,
      Members/Person/LastName,
      Members/Person/NickName,
      Members/Person/Email"

  Rock.apiRequest "GET", familyQuery, (error, result) ->
    if error and throwErrors
      throw new Meteor.Error "Rock sync issue", error
    else if error
      debug "Rock sync failed:"
      debug error
      return

    families = result.data

    if families.length
      family = families[0]

      person.familyGroupId = family.Id
      person.campusId = family.CampusId
      person.locationIds = []

      for location in family.GroupLocations
        person.locationIds.push location.LocationId

      for member in family.Members

        if member.Person.Id is person.personId
          person.groupRole = member.GroupRole.Name
          person.firstName = member.Person.FirstName
          person.nickName = member.Person.NickName
          person.lastName = member.Person.LastName
          person.email = member.Person.Email

          for phone in member.Person.PhoneNumbers

            if phone.NumberTypeValue.Value is "Home"
              person.homePhone = Number(phone.Number).toFixed 0

            else if phone.NumberTypeValue.Value is "Mobile"
              person.cellPhone = Number(phone.Number).toFixed 0

      Apollos.person.update person, Rock.name
      debug "Synced person from Rock: #{person.personId}"
