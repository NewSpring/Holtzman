
###

  Apollos.debug

###
Apollos.debug = ->
  console.log.apply console, Array.prototype.slice.call(arguments)
