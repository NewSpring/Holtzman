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


###

  Rock.isAlive.onChange

  @example Calls the callback function immediately and then everytime Rock's
    status changes with a single boolean param of isAlive

    Rock.isAlive.onChange (isAlive) ->
      console.log isAlive

###
Rock.isAlive.onChange = (callback) ->

  serverWatch.onChange Rock.name, callback
