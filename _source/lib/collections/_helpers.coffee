Apollos.schemas = {}

Apollos.generateSchema = (name, schema, excludeTrackingFields) ->

  if not excludeTrackingFields and typeof schema is "boolean"
    excludeTrackingFields = schema
    schema = name
    name = false

  else if not schema and typeof name isnt "string"
    schema = name
    name = false

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
