###
Apollos.locations = new Mongo.Collection "locations"

location = Apollos.generateSchema
  locationId:
    type: Number
  campusId:
    type: Number
  locationType:
    type: String
    regEx: /^(Work|Home|Temporary|Fuse|Service|Office|Mailing)$/
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
    regEx: /^(A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$/
  zip:
    type: String
    regEx: /^(\d{5}(-\d{4})?)$/
    optional: true
  geometry:
    type: GeoJSON

Apollos.locations.attachSchema location
###
