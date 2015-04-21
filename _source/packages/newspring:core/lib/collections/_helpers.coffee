Apollos.generateSchema = (schema) ->

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

  return new SimpleSchema schema
