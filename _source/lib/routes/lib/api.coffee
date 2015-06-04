
Apollos.Router = FlowRouter

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

      checkSegments = (segments) ->

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
          if localSegments[0]
            path = localSegments.join "/"
          else path = "/"



          if route.path is path

            if context.querystring
              lastSegment += "?#{context.querystring}"
            FlowRouter.go "#{route.path}#/#{lastSegment}"

            break


      checkSegments context.pathname.split("/")

      return

    console.error "There is no route for the path: #{context.path}"
    self._current.route = new FlowRouter.Route(@, "*", self.notFound)
    self._invalidateTracker()
    return


  Apollos.Layout = FlowLayout


if Meteor.isServer
  Apollos.Layout = -> return
