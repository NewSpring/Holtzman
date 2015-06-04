
Apollos.Router = FlowRouter

# Fastest method to reverse array
# http://jsperf.com/js-array-reverse-vs-while-loop/5
reverse = (array) ->

  left = null
  right = null
  length = array.length
  left = 0

  while left < length / 2
    right = length - 1 - left
    temporary = array[left]
    array[left] = array[right]
    array[right] = temporary
    left += 1

  return array

if Meteor.isClient
  ###

    We make a few modifications to Flow router to better support
    dyamic paths

  ###
  FlowRouter.Router::path = (pathDef, fields, queryParams) ->

    self = @

    if self._routesMap[pathDef]
      pathDef = self._routesMap[pathDef].path


    fields or= {}

    regExp = /(:[\w\(\)\\\+\*\.\?]+)+/g

    path = pathDef.replace(regExp, (key) ->

      firstRegexpChar = key.indexOf("(")

      # get the content behind : and (\\d+/)
      key = key.substring(
        1,
        if firstRegexpChar > 0 then firstRegexpChar else undefined
      )

      # remove +?*
      key = key.replace(/[\+\*\?]+/g, "")
      fields[key] or ""

    )

    strQueryParams = self._qs.stringify(queryParams or {})

    if strQueryParams
      path += "?" + strQueryParams


    # all Flow router paths must start with / so if our path
    # doesn't have / at the start it doesn't exist so return false
    # instead of the string passed in
    if path[0] isnt "/"
      return false

    path


  # See if route has been registered
  FlowRouter.Router::isPath = (path) ->

    routes = FlowRouter._routes.slice()

    index = routes.length

    path = FlowRouter.path(path)

    if not path
      return false
    # remove trailing slash if it is the last character
    if (path.length > 1) and (path[path.length - 1] is "/")
      path = path.substring(0, path.length - 1)

    while index--
      route = routes[index]

      if route.path is path
        return true

    return false


  FlowRouter.Router::redirect = (path, bubble) ->

    if bubble
      @._page.redirect path
    else
      @._page.replace(path, null, null, false)









  FlowRouter.Router::_notfoundRoute = (context) ->

    self = @

    self._current =
      path: context.path
      context: context
      params: []
      queryParams: context.params.query


    if not self.notFound

      # make a copy to reduce resources and not setup a handler if we modify
      existingRoutes = Apollos.Router._routes.slice()

      tailingSegments = []

      checkSegments = (segments, last) ->

        if not segments?.length
          return

        localSegments = segments.slice()

        ###

          We can assume the last route was incorrect for the first lookup
          it may not be the issue though so as we yank pieces off we need to
          store them to build the string back up to re-apply it

        ###
        lastSegment = localSegments.pop()
        index = existingRoutes.length

        while index--
          route = existingRoutes[index]

          # build out url including rare root level case
          if localSegments.length > 1
            path = localSegments.join "/"
          else path = "/"


          if route.path is path

            # rebuild full string with hash to go to to render component
            if tailingSegments.length is 1
              tail = tailingSegments.join("/")
              tail = "#{lastSegment}/#{tail}"
            else if tailingSegments.length > 1
              reversed = reverse(tailingSegments.slice())
              tail = reversed.join("/")
            else
              tail = lastSegment


            if context.querystring
              tail += "?#{context.querystring}"

            FlowRouter.redirect "#{route.path}#!/#{tail}", true

            return

        tailingSegments.push lastSegment

        checkSegments localSegments



      checkSegments context.pathname.split("/")

      return

    console.error "There is no route for the path: #{context.path}"
    self._current.route = new FlowRouter.Route(@, "*", self.notFound)
    self._invalidateTracker()
    return


  Apollos.Layout = FlowLayout


if Meteor.isServer
  Apollos.Layout = -> return
