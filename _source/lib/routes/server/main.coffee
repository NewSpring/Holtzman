# Register core collections
Apollos.api.addEndpoint "users", "user"
Apollos.api.addEndpoint "people", "person"
Apollos.api.addEndpoint "campuses", "campus"
Apollos.api.addEndpoint "groups", "group"
Apollos.api.addEndpoint "groupLocations", "groupLocation"
Apollos.api.addEndpoint "groupMembers", "groupMember"
Apollos.api.addEndpoint "locations", "location"

# Register platforms
Apollos.api.addPlatform "localhost", "127.0.0.1", "all"
