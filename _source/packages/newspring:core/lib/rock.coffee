###

  Rock.name

  @example get a string with the name of Rock

    console.log Rock.name

###
Rock.name = "Rock"

###

  Rock.isAlive

  @example See if Rock is online

    if (Rock.isAlive())
      debug "its alive!"

###
Rock.isAlive = ->

  serverWatch.isAlive Rock.name
