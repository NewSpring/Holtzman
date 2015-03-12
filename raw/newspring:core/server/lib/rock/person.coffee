###

  Rock.people

  @example return all people synced to Rock

    Rock.people()

  @todo write lookup

###
Rock.people = ->

  throw new Meteor.Error "Unimplemented", "This method is unimplemented!"

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
        guid: guid
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
      RecordStatusValue,
      SuffixValue,
      TitleValue,
      MaritalStatusValue,
      Photo,
      RecordTypeValue
    &$select=
      AnniversaryDate,
      PhoneNumbers/Number,
      PhoneNumbers/NumberTypeValue/Value,
      BirthDay,
      BirthMonth,
      BirthYear,
      RecordStatusValue/Value,
      EmailPreference,
      Email,
      SuffixValue/Value,
      TitleValue/Value,
      MaritalStatusValue/Value,
      Gender,
      Photo/Path,
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
