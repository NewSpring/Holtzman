Rock.definedValues = {}

###

  Apollos.definedValues.refresh

  @example refesh defined values from Rock

    Apollos.definedValues.refresh throwErrors

  @param throwErrors [Boolean] switch to silence error throwing

###
Rock.definedValues.refresh = (throwErrors) ->

  oldCount = Apollos.definedValues.find().count()
  debug "Removing #{oldCount} defined values in anticipation of sync"
  Apollos.definedValues.remove {}
  filters = []

  for typeName, typeGuid of Rock.constants.definedTypeGuids
    filters.push "Guid eq guid'#{typeGuid}'"

  query = "api/DefinedTypes
    ?$expand=
      DefinedValues
    &$select=
      Id,
      Guid,
      DefinedValues/Id,
      DefinedValues/Guid,
      DefinedValues/Value,
      DefinedValues/Description
    &$filter=#{filters.join(' or ')}"

  Rock.apiRequest "GET", query, (error, result) ->
    if error
      message = "#{query.substring(0, 25)}...: #{error}"
      errorType = "Rock sync issue"

      if throwErrors
        throw new Meteor.Error errorType, message
      else
        debug errorType
        debug message

      return

    definedTypes = result.data

    for definedType in definedTypes
      for definedValue in definedType.DefinedValues
        Apollos.definedValues.insert
          definedTypeGuid: definedType.Guid
          definedTypeId: definedType.Id
          definedValueId: definedValue.Id
          value: definedValue.Value
          description: definedValue.Description
          definedValueGuid: definedValue.Guid

    newCount = Apollos.definedValues.find().count()
    debug "Synced #{newCount} defined values from Rock"
