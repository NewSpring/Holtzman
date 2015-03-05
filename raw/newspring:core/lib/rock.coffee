###

  The theme of this file is to provide methods that make Rock do something or
  get something from Rock

###


###
  Client and Server Code Starts Here
###

Rock.name = "Rock"


###

  Rock.isAlive

  @example See if Rock is online
    if (Rock.isAlive())
      debug "its alive!"


###
Rock.isAlive = ->

  serverWatch.isAlive(Rock.name)
