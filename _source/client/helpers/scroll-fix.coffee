
Apollos.Router.middleware (path, next) ->
  window.scrollTo 0,0
  next()
