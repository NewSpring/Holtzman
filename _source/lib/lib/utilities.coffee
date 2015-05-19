Apollos.utilities =

  base64Encode: (theString) ->
    return new Buffer(theString).toString "base64"

  makeNewGuid: ->
    s4 = ->
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)

    guid = "#{s4()}#{s4()}-#{s4()}-#{s4()}-#{s4()}-#{s4()}#{s4()}#{s4()}"
    return guid.toUpperCase()
