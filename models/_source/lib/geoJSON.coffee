###

  @property [GeoJSON] A MapBox object's defined coordinates
  @see http://geojson.org/geojson-spec.html for official spec

###
Apollos._generateSchema "geoJson",
  "type":
    type: String
    optional: true
    defaultValue: "Point"
  coordinates:
    type: [Number]
    decimal: true
    optional: true
    minCount: 2
    maxCount: 2
  isValid:
    type: Boolean
    optional: true
    defaultValue: true
