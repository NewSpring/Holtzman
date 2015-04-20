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
        date = Rock.utilities.getJavaScriptDate person.AnniversaryDate

        existingPerson.weddingYear = date.getFullYear()
        existingPerson.weddingMonth = date.getMonth() + 1
        existingPerson.weddingDay = date.getDate()
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
  return Apollos.entityHelpers.update "person", "people", person, platform

###

  Apollos.person.delete

  @example take a person and delete it

    Apollos.person.delete(user, [platform])

  @param person [Object|String|Number] existing document, _id, or rock.personId
  @param platform [String] platform initiating the delete

###
Apollos.person.delete = (person, platform) ->
  Apollos.entityHelpers.delete "person", "people", person, platform

###

  Update bindings

###
Meteor.startup ->
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
