# check for subscription to be ready
isSubReady = (sub) ->
  if sub
    return Apollos.router.subsReady(sub)

  return Apollos.router.subsReady()


# return path
pathFor = (path, view) ->

  if not path
    throw new Apollos.Error('no path defined')
    return

  if path.hash?.route?
    view = path
    path = view.hash.route
    delete view.hash.route

  if view.hash.query
    query = Apollos.router._qs.parse(view.hash.query)
  else
    query = {}

  return Apollos.router.path(path, view.hash, query)

# return absolute url
urlFor = (path, view) ->
  relativePath = pathFor(path, view)
  Meteor.absoluteUrl(relativePath.substr(1))

# get query parameter
queryParam = (key) ->
  Apollos.router.getQueryParam(key);

helpers =
  isSubReady: isSubReady
  pathFor: pathFor
  urlFor: urlFor
  queryParam: queryParam

Template.registerHelper name, func for own name, func of helpers

# really simple page to page middleware
Apollos.router.middleware (path, next) ->
  window.scrollTo 0,0
  next()
