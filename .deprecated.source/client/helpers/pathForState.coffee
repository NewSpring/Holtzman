

setUpClickEvent = (path) ->

  lookupTag = ->
    state = path.replace("#=", "")

    targets = document.querySelectorAll("a[href='#{path}']")

    if targets.length
      clearInterval checkForTag


    for target in targets
      target.href = "#"

      $(target).on("click", (event) ->

        event.preventDefault()

        for card, internals of Apollos.states

          if not internals.states
            continue

          if internals.states[state]

            internals.component?.state.set(state)
            break

      )


  # this may not be reliable :(
  checkForTag = setInterval lookupTag, 100







Template.registerHelper "pathForState", (state, id) ->

  # always return something that is clickable
  path = "#"

  for card, internals of Apollos.states
    if not internals.states
      continue

    if id and internals.components[id]

      if not internals.components[id].states[state]
        continue

      if Apollos.Router.isPath("#{id}-#{state}")
        path = Apollos.Router.path("#{id}-#{state}")
        break



    if internals.states[state]

      if Apollos.Router.isPath(state)
        path = Apollos.Router.path(state)
        break
      else
        path = "#=#{state}"
        setUpClickEvent path


  return path
