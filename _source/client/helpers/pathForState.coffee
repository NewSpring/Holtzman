

Template.registerHelper "pathForState", (state) ->

  # always return something that is clickable
  path = "#"

  for card, internals of Apollos.states
    if not internals.states
      continue

    if internals.states[state]
      hasPath = Apollos.Router.path(state).indexOf("/") > -1
      if hasPath
        path = Apollos.Router.path(state)
        break


  return path
