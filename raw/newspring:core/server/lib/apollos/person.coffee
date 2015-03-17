###

  Apollos.person.translate

  @example take data from a service and format it for Apollos

    Apollos.person.translate([obj, platform])

  @param person [Object] existing object to be translated
  @param platform [String] platform to be translated to

###
Apollos.person.translate = (person, platform) ->

  # Default to Rock
  if not platform
    platform = Rock.name

  # forced uppercase to make case insensitive strings
  switch platform.toUpperCase()
    when Rock.name.toUpperCase()
      # Grab existing person for merging if
      if person
        existingPerson = Apollos.people.findOne
          $or: [
            guid: RegExp(person.Guid, "i")
          ,
            personId: person.Id
          ]
      else
        person = Rock.person()

      existingPerson or=
        personId: person.Id

      existingPerson.guid = person.Guid
      existingPerson.firstName = person.FirstName
      existingPerson.middleName = person.MiddleName
      existingPerson.lastName = person.LastName
      existingPerson.nickName = person.NickName
      existingPerson.preferredEmail = person.Email
      existingPerson.birthDay = person.BirthDay
      existingPerson.birthMonth = person.BirthMonth
      existingPerson.birthYear = person.BirthYear
      existingPerson.gender = person.Gender
      existingPerson.recordStatusValueId = person.RecordStatusValueId
      existingPerson.titleValueId = person.TitleValueId
      existingPerson.suffixValueId = person.SuffixValueId
      existingPerson.maritalStatusValueId = person.MaritalStatusValueId
      existingPerson.givingGroupId = person.GivingGroupId
      existingPerson.emailPreference = person.EmailPreference

      if person.Photo
        photoPath = person.Photo.Path
        existingPerson.photoId = person.Photo.Id

        if photoPath.indexOf "~/" is 0
          photoPath = photoPath.substring 2

        existingPerson.photoURL = photoPath
      else
        existingPerson.photoURL = null
        existingPerson.photoId = null

      if person.AnniversaryDate
        # parse date parts from something like "2015-03-10T00:00:00"
        yearPart = person.AnniversaryDate.substring 0, 4
        monthPart = person.AnniversaryDate.substring 6, 7
        dayPart = person.AnniversaryDate.substring 9, 10

        existingPerson.weddingYear = Number yearPart
        existingPerson.weddingMonth = Number monthPart
        existingPerson.weddingDay = Number dayPart
      else
        existingPerson.weddingYear = null
        existingPerson.weddingMonth = null
        existingPerson.weddingDay = null

      existingPerson.cellPhone = null
      existingPerson.homePhone = null
      existingPerson.workPhone = null

      for phone in person.PhoneNumbers
        switch phone.NumberTypeValue.Value
          when "Mobile"
            existingPerson.cellPhone = phone.Number
          when "Home"
            existingPerson.homePhone = phone.Number
          when "Work"
            existingPerson.workPhone = phone.Number

      existingPerson.personAliasIds or= []
      return existingPerson

###

  Apollos.person.update

  @example update a person in apollos with data from Rock

    Apollos.person.update([obj, platform])

  @param person [Object] existing person from other service to be updated
  @param platform [String] platform to be update from

###
Apollos.person.update = (person, platform) ->

  person = Apollos.person.translate person

  if platform and platform.toUpperCase() is Rock.name.toUpperCase()
    person.updatedBy = Rock.name
  else
    person.updatedBy = Apollos.name

  query =
    $or: [
      personId: person.personId
    ,
      guid: RegExp(person.guid, "i")
    ]

  people = Apollos.people.find(
    query
  ,
    sort:
      updatedDate: 1
  ).fetch()

  if people.length > 1
    # Delete older documents, which are the first ones since they are sorted
    ids = []

    people.forEach (p) ->
      ids.push p._id

    ids.pop()

    Apollos.people.remove
      _id:
        $in: ids

    people = Apollos.people.find(query).fetch()

  if people.length is 1
    mongoId = people[0]._id

    Apollos.people.update
      _id: mongoId
    ,
      $set: person

  else
    mongoId = Apollos.people.insert person

  return mongoId

###

  Apollos.person.delete

  @example take a person and delete it

    Apollos.person.delete(user, [platform])

  @param person [Object|String|Number] existing document, _id, or rock.personId
  @param platform [String] platform initiating the delete

###
Apollos.person.delete = (person, platform) ->

  if typeof person is "number"
    person = Apollos.people.findOne
      "personId": person

  else if typeof person is "string"
    person = Apollos.people.findOne person

  if platform and platform.toUpperCase() is Rock.name.toUpperCase()
    person.updatedBy = Rock.name
  else
    person.updatedBy = Apollos.name

  # We have to update this first so the collection hooks know what to do
  Apollos.people.update
    _id: person._id
  ,
    $set:
      "updatedBy": person.updatedBy

  debug "Trying to remove person #{person._id} with a platform of
    #{person.updatedBy}"

  Apollos.people.remove person._id

###

  Update bindings

###
initializing = true

Apollos.people.find().observe

  added: (doc) ->
    if initializing
      return

    if doc.updatedBy isnt Rock.name
        Rock.person.create doc


  changed: (newDoc, oldDoc) ->

    if newDoc.updatedBy isnt Rock.name
      Rock.person.update newDoc


  removed: (doc) ->
    # This should not happen


initializing = false
