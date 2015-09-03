Apollos.schemas = {}

Apollos.generateSchema = (name, excludeTrackingFields, schema) ->

  if typeof(name) is "object"
    schema = name
    name = false
    excludeTrackingFields = false

  else if typeof(name) is "boolean"
    schema = excludeTrackingFields
    excludeTrackingFields = name
    name = false

  else if typeof(excludeTrackingFields) is "object"
    schema = excludeTrackingFields
    excludeTrackingFields = false

  if not excludeTrackingFields

    schema.observationHash or=
      type: Number
      optional: true

    schema.createdDate or=
      type: Date
      autoValue: ->
        if @.isInsert
          return new Date
        else if @.isUpsert
          return $setOnInsert: new Date
        else
          @.unset()

    schema.updatedDate or=
      type: Date
      autoValue: ->
        return new Date

    schema.updatedBy or=
      type: String
      optional: true


  if name and not Apollos.schemas[name]
    Apollos.schemas[name] = schema

  return new SimpleSchema schema
