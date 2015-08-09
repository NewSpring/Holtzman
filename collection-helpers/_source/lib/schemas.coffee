

###

  Schemas data store

###
Apollos.schemas = {}



###

  Apollos._generateSchema

###
Apollos._generateSchema = (name, schema, schemaOnly) ->

  if not schema and typeof name isnt "string"
    schema = name
    name = false


  if not schemaOnly

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

# backwards compat
Apollos.generateSchema = Apollos._generateSchema
