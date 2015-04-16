Rock.utilities =

  pad: (number, chars, padding) ->
    padding or= "0"
    str = String number

    if str.length >= chars
      return str

    return new Array(chars - str.length + 1).join(padding) + str


  getRockDate: (jsDate) ->
    if typeof jsDate isnt "date"
      return null

    year = @.pad jsDate.getFullYear()
    month = @.pad(jsDate.getMonth() + 1)
    day = @.pad jsDate.getDate()
    return "#{year}-#{month}-#{day}T00:00:00"


  getJavaScriptDate: (rockDate) ->
    if typeof rockDate isnt "string"
      return null

    # parse date parts from something like "2015-04-01T01:00:00"
    year = Number(rockDate.substring 0, 4)
    month = Number(rockDate.substring 5, 7) - 1
    day = Number(rockDate.substring 8, 10)
    return new Date year, month, day


  base64Encode: (theString) ->
    return new Buffer(theString).toString "base64"


  makeNewGuid: ->
    s4 = ->
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)

    guid = "#{s4()}#{s4()}-#{s4()}-#{s4()}-#{s4()}-#{s4()}#{s4()}#{s4()}"
    return guid.toUpperCase()
