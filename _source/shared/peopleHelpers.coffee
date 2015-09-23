###

  Apollos.person.getFamily

  @example take a person and return the primary family

    family = Apollos.person.getFamily(person)

###
Apollos.person.getFamily = (person) ->

  if Meteor.isClient and not person
    person = Apollos.person()

  if not person?.personId
    return

  personId = person.personId
  familyTypeId = Apollos.groupTypes.findOne(name: "Family")?.groupTypeId

  if not familyTypeId
    return

  groupIds = Apollos.groupMembers.find(personId: personId).map (m) ->
    return m.groupId

  family = Apollos.groups.findOne
    groupId: $in: groupIds
    groupTypeId: familyTypeId

  return family

###

  Apollos.person.getCampus

  @example take a person and return the campus

    campus = Apollos.person.getCampus(person)

###
Apollos.person.getCampus = (person) ->
  family = Apollos.person.getFamily person

  if not family?.campusId
    return

  return Apollos.campuses.findOne campusId: family.campusId

###

  Apollos.person.getAddress

  @example take a person and return the address

    address = Apollos.person.getAddress(person)

###
Apollos.person.getAddress = (person) ->
  family = Apollos.person.getFamily person

  if not family?.groupId
    return

  groupLocation = Apollos.groupLocations.findOne
    groupId: family.groupId

  if not groupLocation
    return

  location = Apollos.locations.findOne
    locationId: groupLocation.locationId

  return location
