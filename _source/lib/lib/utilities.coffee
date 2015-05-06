Apollos.utilities =

  base64Encode: (theString) ->
    return new Buffer(theString).toString "base64"
