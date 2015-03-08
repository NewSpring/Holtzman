###

  Apollos.person.update

  @example update a person in apollos with data from Rock

    Apollos.person.update([obj, platform])

  @param person [Object] existing person from other service to be updated
  @param platform [String] platform to be update from

###
Apollos.person.update = (person, platform) ->

  if platform and platform.toUpperCase() is Rock.name.toUpperCase()
    person.updatedBy = Rock.name
  else
    person.updatedBy = Apollos.name

  people = Apollos.people.find(personId: person.personId).fetch()

  if people.length > 1
    ids = []

    people.forEach (p) ->
      ids.push p._id

    throw new Meteor.Error "Rock sync issue", "People doc ids #{ids.join ", "}
      need investigated because they seem to be duplicates"

  else if people.length is 1
    personId = people[0]._id

    Apollos.people.update
      _id: personId
    ,
      $set: person

  else
    personId = Apollos.people.insert person

  return personId


###

  Update bindings

##
initializing = true

Apollos.people.find().observe

  added: (doc) ->
    if initializing
      return

    if doc.updatedBy isnt Rock.name and doc.updatedBy
        Rock.person.create doc


  changed: (newDoc, oldDoc) ->

    if newDoc.updatedBy isnt Rock.name
      Rock.person.update newDoc


  removed: (doc) ->

    if doc.updatedBy isnt Rock.name
      Rock.person.delete doc, Rock.name


initializing = false
###
