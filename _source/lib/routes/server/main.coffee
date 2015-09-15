# Register core collections
Apollos.api.addEndpoint "users", "user"
# TODO Make aliases a subdoc of people
Apollos.api.addEndpoint "people", "person"
Apollos.api.addEndpoint "people", "person",
  nameForUrl: "aliases"
  subDocName: "alias"
Apollos.api.addEndpoint "campuses", "campus"
Apollos.api.addEndpoint "groups", "group"
Apollos.api.addEndpoint "groupLocations", "groupLocation"
Apollos.api.addEndpoint "groupMembers", "groupMember"
Apollos.api.addEndpoint "groupTypes", "groupType"
Apollos.api.addEndpoint "locations", "location"
