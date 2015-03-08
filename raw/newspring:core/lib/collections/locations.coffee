Apollos.locations = new Mongo.Collection "locations"

###

  @property [Location] All the fields for a location
  Mapped to Rock:Location
  LocationType:
      Person - Work, Home, Temporary
      Campus - Fuse, Service, Office, Mailing

 ###

location = new SimpleSchema(
  locationId:
    type: Number
  campusId:
    type: Number
  locationType:
    type: String
  shortCode:
    type: String
    max: 3
  street:
    type: String
  street2:
    type: String
  city:
    type: String
  state:
    type: String
    regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
  zip:
    type: String
    regEx: /^$|\d{5}(-\d{4})?$/
    optional: true
  geometry:
    type: GeoJSON
  createdDate:
    type: Date
    autoValue: ->
      if @.isInsert
        return new Date
      else if @.isUpsert
        return $setOnInsert: new Date
      else
        @.unset()
  updatedDate:
    type: Date
    autoValue: ->
      return new Date
)

Apollos.locations.attachSchema location
