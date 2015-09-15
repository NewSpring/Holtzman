###

  Apollos.person.getFamily

  @example take a person and return the primary family

    family = Apollos.person.getFamily(person)

###
Apollos.person.getFamily = (person) ->

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
