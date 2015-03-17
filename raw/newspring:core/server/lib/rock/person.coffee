###

  Rock.people

  @example return all people synced to Rock

    Rock.people()

  @todo write lookup

###
Rock.people = ->

  throw new Meteor.Error "Unimplemented", "This method is unimplemented!"


###

  Rock.person

  @example return empty person

    rockPerson = Rock.person()

###
Rock.person = ->

  Rock.person.translate()


###

  Rock.person.create

  @example create a person on Rock

    Rock.person.update()

  @param person [Object] Person to create

###
Rock.person.create = (person) ->

  mongoId = person._id
  person = Rock.person.translate person

  delete person.Id
  person.Guid or= Rock.utilities.makeNewGuid()

  Apollos.people.update
    _id: mongoId
  ,
    $set:
      guid: person.Guid
      updatedBy: Rock.name

  Rock.apiRequest "POST", "api/People", person, (error, result) ->
    if error
      debug "Rock create failed:"
      debug error
      return

    # Need to get the Id - hopefully this can be avoided by using immediate post
    # save triggers in Rock
    query = "api/PersonAlias
      ?$filter=
        AliasPersonGuid eq guid'#{person.Guid}'
      &$select=
        PersonId,
        AliasPersonId"

    Meteor.setTimeout ->
      Rock.apiRequest "GET", query, (error, result) ->
        if error
          debug "Rock get failed:"
          debug error
          return

        if result.data and result.data.length

          aliasIds = result.data.map (a) ->
            a.AliasPersonId

          Apollos.people.update
            _id: mongoId
          ,
            $set:
              personId: result.data[0].PersonId
              personAliasIds: aliasIds
              updatedBy: Rock.name
    , 250


###

  Rock.person.translate

  @example take data from a service and format it for Rock

    Rock.person.translate([obj, platform])

  @param person [Object] existing object to be translated
  @param platform [String] platform to be translated to

###
Rock.person.translate = (person, platform) ->

  if not platform
    platform = Apollos.name

  # forced uppercase to make case insensitive strings
  switch platform.toUpperCase()
    when Apollos.name.toUpperCase()
      person or=
        recordStatusValueId: 3

      if person.weddingYear and person.weddingMonth and person.weddingDay
        twoDigitMonth = "#{person.weddingMonth}"

        if twoDigitMonth.length is 1
          twoDigitMonth = "0#{twoDigitMonth}"

        twoDigitDay = "#{person.weddingDay}"

        if twoDigitDay.length is 1
          twoDigitDay = "0#{twoDigitDay}"

        anniversary = "#{person.weddingYear}-#{twoDigitMonth}-#{twoDigitDay}T00:00:00"

      rockPerson =
        IsSystem: false
        RecordTypeValueId: 1
        RecordStatusValueId: person.recordStatusValueId or 3
        RecordStatusReasonValueId: null
        ConnectionStatusValueId: 65
        ReviewReasonValueId: null
        IsDeceased: false
        TitleValueId: person.titleValueId or null
        FirstName: person.firstName or null
        NickName: person.nickName or null
        MiddleName: person.middleName or null
        LastName: person.lastName or null
        SuffixValueId: person.suffixValueId or null
        PhotoId: person.photoId or null
        BirthDay: person.birthDay or null
        BirthMonth: person.birthMonth or null
        BirthYear: person.birthYear or null
        Gender: person.gender or 0
        MaritalStatusValueId: person.maritalStatusValueId or null
        AnniversaryDate: anniversary or null
        GraduationYear: null
        GivingGroupId: person.givingGroupId or null
        Email: person.preferredEmail or null
        IsEmailActive: true
        EmailNote: null
        EmailPreference: person.emailPreference or 0
        ReviewReasonNote: null
        InactiveReasonNote: null
        SystemNote: null
        ViewedCount: null
        PrimaryAliasId: null
        Id: person.personId or null
        Guid: person.guid or null
        ForeignId: null

      return rockPerson


###

  Rock.person.update

  @example update a person on Rock

    Rock.person.update(personDoc)

  @param person [Object] person to update

###
Rock.person.update = (person) ->

  rockPerson = Rock.person.translate person

  if not rockPerson.Id or not rockPerson.Guid
    Rock.user.create user
    return

  else if not rockPerson.Id
    # TODO: What here??!?
    return

  Rock.apiRequest "PUT", "api/People/#{rockPerson.Id}", rockPerson,
    (error, result) ->
      if error
        debug "Rock update failed:"
        debug error
        return


###

  Rock.people.refreshAliases

  @example refesh all people from Rock

    Rock.people.refresh()

  @param throwErrors [Boolean] switch to silence error throwing

###
Rock.people.refreshAliases = (throwErrors, wait) ->

  if wait
    ###
      Rock pre-save trigger means that if the id is 0, it was a create. We need
      to get the id and the aliases though.  What is a better way to do this?
    ###
    Meteor.setTimeout ->
      Rock.people.refreshAliases throwErrors
    , 2500
    return

  aliasQuery = "api/PersonAlias
    ?$select=
      PersonId,
      AliasPersonId,
      AliasPersonGuid"

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
      currentGroup = grouped[personId]

      if currentGroup.length is 0
        continue

      id = Number personId
      guid = currentGroup[0].AliasPersonGuid
      personAliasIds = currentGroup.map (element) ->
        element.AliasPersonId

      Apollos.people.update
        guid: RegExp(guid, "i")
      ,
        $set:
          personId: id
          personAliasIds: personAliasIds
          updatedBy: Rock.name

      debug "Synced aliases from Rock: #{id}"

###

  Rock.people.refreshDetails

  @example refesh a person's details from Rock

    Rock.people.refreshDetails person, throwErrors

  @param person [Object|Number|String] exisiting person document, rock.personId,
    or person._id
  @param throwErrors [Boolean] switch to silence error throwing

###
Rock.people.refresh = (throwErrors) ->

  peopleQuery = "api/People
    ?$expand=
      PhoneNumbers,
      PhoneNumbers/NumberTypeValue,
      Photo,
      RecordTypeValue
    &$select=
      AnniversaryDate,
      PhoneNumbers/Number,
      PhoneNumbers/NumberTypeValue/Value,
      BirthDay,
      BirthMonth,
      BirthYear,
      RecordStatusValueId,
      EmailPreference,
      Email,
      SuffixValueId,
      TitleValueId,
      MaritalStatusValueId,
      Gender,
      Photo/Path,
      Photo/Id,
      GivingGroupId,
      Id,
      FirstName,
      LastName,
      MiddleName,
      NickName,
      Guid
    &$filter=
      IsSystem eq false
    and
      RecordTypeValue/Value eq 'Person'"

  Rock.refreshEntity peopleQuery, "person", "people", throwErrors

  Rock.people.refreshAliases true, true
