

class Namespace
  constructor: (@namespace, @templateInstance) ->



###

  We extend the original dot operator to support {{> Foo.Bar}}. This
  goes through a getTemplateHelper path, but we want to redirect it to
  the getTemplate path. So we mark it in getTemplateHelper and then
  here call getTemplate.

###
originalDot = Spacebars.dot
Spacebars.dot = (value, args...) ->

  if value instanceof Namespace
    return Blaze._getTemplate(
      "#{value.namespace}.#{args.join('.')}",
      value.templateInstance
    )

  originalDot value, args...



###

  If Namespace gets all the way to the Spacebars.include it means that
  we are in the situation where there is both namespace and component
  with the same name, and user is including a component. But namespace
  reference is created instead (because we do not know in advance that
  there is no Spacebars.dot call around lookup call). So we dereference
  the reference and try to resolve a template. Of course,
  a component might not really exist.

###
originalInclude = Spacebars.include
Spacebars.include = (templateOrFunction, args...) ->


  if templateOrFunction instanceof Namespace
    templateOrFunction = Blaze._getTemplate(
      templateOrFunction.namespace,
      templateOrFunction.templateInstance
    )

  return originalInclude templateOrFunction, args...



###

  We override the original lookup method with a similar one,
  which supports components as well.

  Now the order of the lookup will be, in order:
    a helper of the current template
    a property of the current component
    the name of a component
    the name of a template
    global helper
    a property of the data context

  Returns a function, a non-function value, or null. If a function
  is found, it is bound appropriately.

  NOTE: This function must not establish any reactive dependencies itself.
  If there is any reactivity in the value, lookup should return a function.

  TODO: Should we also lookup for a property of the
  component-level data context (and template-level data context)?

###

Blaze._getTemplateHelper = (template, name, templateInstance) ->

  if template.__helpers.has name

    helper = template.__helpers.get name

    if helper?
      return wrapHelper bindDataContext(helper), templateInstance
    else
      return null


  if name of template

    if template[name]?
      return wrapHelper bindDataContext(template[name]), templateInstance
    else
      return null


  if not templateInstance
    return null

  ###

    Do not resolve component helpers if inside Template.dynamic.
    The reason is that Template.dynamic uses a data context value with
    name "template" internally. But when used inside a component the data
    context lookup is then resolved into a current component's template
    method and not the data context "template". To force the data
    context resolving Template.dynamic should use "this.template" in
    its templates, but it does not, so we have a special case here for it.

  ###
  if template.viewName in [
    "Template.__dynamicWithDataContext", "Template.__dynamic"
  ]
    return null

  ###

    TODO:
    - Blaze.View::lookup should not introduce any reactive dependencies.
    - Can we simply ignore reactivity here?
    - Can this template instance or parent template instances change
      without reconstructing the component as well? I don't think so.
    - Only data context is changing and this is why templateInstance
      or .get() are reactive and we do not care about data context here.

  ###
  component = Tracker.nonreactive ->
    return templateInstance().get "component"

  # Component
  if component
    if name of component
      return wrapHelper(
        bindComponent(component, component[name]), templateInstance
      )


  ###

    A special case to support {{> Foo.Bar}}. This goes through a
    getTemplateHelper path, but we want to redirect it to the
    getTemplate path. So we mark it and leave to Spacebars.dot
    to call getTemplate.

    TODO:
      - We should provide a Components.base.getNamespace method
        instead of accessing components directly.

  ###
  if name and name of Components.base.components
    return new Namespace name, templateInstance


  return null




bindComponent = (component, helper) ->

  if typeof helper is "function"
    _.bind helper, component
  else
    helper


bindDataContext = (helper) ->

  if typeof helper is "function"
    ->
      data = Blaze.getData()
      data ?= {}
      helper.apply data, arguments
  else
    helper


wrapHelper = (f, templateFunc) ->

  # XXX COMPAT WITH METEOR 1.0.3.2
  if not Blaze.Template._withTemplateInstanceFunc
    return Blaze._wrapCatchingExceptions f, "template helper"

  if typeof f isnt "function"
    return f

  ->
    self = @
    args = arguments

    Blaze.Template._withTemplateInstanceFunc templateFunc, ->
      Blaze._wrapCatchingExceptions(f, "template helper").apply self, args


viewToTemplateInstance = (view) ->

  ###

    We skip contentBlock views which are injected by Meteor when
    using block helpers (in addition to block helper view). This
    matches more the visual structure of templates and not
    the internal implementation.

  ###
  isContent = view.name is "(contentBlock)"
  isElse = view.name is "(elseBlock)"

  while view and (not view.template or isContent or isElse)
    view = view.originalParentView or view.parentView

  # Body view has template field, but not templateInstance.
  # We return null in that case.
  if not view?.templateInstance
    return null

  _.bind view.templateInstance, view


addEvents = (view, component) ->

  eventsList = component.events()

  if not _.isArray eventsList
    console.error(
      "`events` methods from the component
      `#{ component.componentName() or 'unnamed' }`
      did not return an array of event maps"
    )
    return

  for events in eventsList

    eventMap = {}

    for event, action of events

      do (event, action) ->

        eventMap[event] = (args...) ->
  
          _event = args[0]

          currentView = Blaze.getView _event.currentTarget
          templateInstance = viewToTemplateInstance currentView

          withTemplateInstanceFunc = Template._withTemplateInstanceFunc

          ###

            We set template instance based on the current target so
            that inside event handlers Component.currentComponent()
            returns the component of event target.

          ###
          withTemplateInstanceFunc templateInstance, ->

            ###

              We set view based on the current target so that
              inside event handlers Component.currentData()
              (and Blaze.getData() and Template.currentData())
              returns data context of event target and not component/template.

            ###
            Blaze._withCurrentView currentView, ->
              action.apply component, args

          # Make sure CoffeeScript does not return anything.
          # Returning from event handlers is deprecated.
          return

    # bind them to the views events
    Blaze._addEventMap view, eventMap

    return



# store original Blaze._getTemplate
originalGetTemplate = Blaze._getTemplate
Blaze._getTemplate = (name, templateInstance) ->


  # Blaze.View::lookup should not introduce any reactive
  # dependencies, so we are making sure it is so.
  template = Tracker.nonreactive ->
    componentParent = templateInstance?().get "component"
    Component
      .getComponent(name)?.renderComponent componentParent


  isFunction = typeof template is "function"

  if template and (template instanceof Blaze.Template or isFunction)
    return template

  return originalGetTemplate name


createUIHooks = (component, parentNode) ->

  insertElement: (node, before) ->
    node._uihooks ?= createUIHooks component, node
    component.insertDOMElement parentNode, node, before

  moveElement: (node, before) ->
    node._uihooks ?= createUIHooks component, node
    component.moveDOMElement parentNode, node, before

  removeElement: (node) ->
    node._uihooks ?= createUIHooks component, node
    component.removeDOMElement node.parentNode, node



# store originalDOMAttach
originalDOMRangeAttach = Blaze._DOMRange::attach
# overwrite to new one
Blaze._DOMRange::attach = (parentElement, nextNode, _isMove, _isReplace) ->

  if component = @.view._templateInstance?.component

    oldUIHooks = parentElement._uihooks

    try
      parentElement._uihooks = createUIHooks component, parentElement
      return originalDOMRangeAttach.apply @, arguments

    catch

      parentElement._uihooks = oldUIHooks if oldUIHooks

  originalDOMRangeAttach.apply @, arguments



registerHooks = (template, hooks) ->

  if not template.onCreated
    return

  template.onCreated hooks.onCreated
  template.onRendered hooks.onRendered
  template.onDestroyed hooks.onDestroyed

  return


registerFirstCreatedHook = (template, onCreated) ->

  if not template._callbacks
    return

  template._callbacks.created.unshift onCreated

  return



# Apollos.component
#
# - reactive vars (✓)
# - subscriptions (✓)
#
# - helpers (✓)
# - events (✓)
# - animations
#
# - routing (✓)
#
# - onCreated (✓)
# - onRendered (✓)
# - onDestroyed (✓)
#
# - junction selection binding
#
# - parent (✓)
# - children (✓)


class Component extends Components.base

  # TODO: Figure out how to do at the Components.base level?
  @getComponentForElement: (domElement) ->

    if not domElement
      return null

    # This uses the same check if the argument is a DOM element
    # that Blaze._DOMRange.forElement does.
    if domElement.nodeType isnt Node.ELEMENT_NODE
      console.error "Expected DOM element."
      return

    template = Blaze.getView(domElement)?.templateInstance?()

    return template?.get('component') or null


  getFirstWith: (component, propertyName) ->

    return @ if propertyName of @

    return null
  ###

    This class method more or less just creates an instance of a
    component and calls its renderComponent method. But because we
    want to allow passing arguments to the component in templates,
    we have some complicated code around to extract and pass
    those arguments. It is similar to how data context is passed
    to block helpers. In a data context visible only to the
    block helper template.

    TODO: This could be made less hacky.
    See https://github.com/meteor/meteor/issues/3913

  ###
  @renderComponent: (componentParent) ->

    # setup non reactive lookup of data to prevent over rendering and execution
    Tracker.nonreactive =>
      componentClass = @

      try
        ###

          We check data context in a non-reactive way, because we
          want just to peek into it and determine if data context
          contains component arguments or not. And while component
          arguments might change through time, the fact that they are
          there at all or not ("args" template helper was used or not)
          does not change through time. So we can check that non-reactively.

        ###
        data = Template.currentData()

      catch error
        ###

          The exception can be thrown when there is no current view
          which happens when there is no data context yet, thus also
          no arguments were provided through"args" template helper,
          so we just continue normally.

        ###
        data = null

      if data?.constructor isnt argumentsConstructor
        component = new componentClass()
        return component.renderComponent componentParent

      # Arguments were provided through "args" template helper.

      ###

        We want to reactively depend on the data context for
        arguments, so we return a function instead of a template.
        Function will be run inside an autorun, a reactive context.

      ###

      ->
        ###

          We cannot use Template.getData() inside a normal autorun
          because current view is not defined inside a normal autorun.
          But we do not really have to depend reactively on the current
          view, only on the data context of a known
          (the closest Blaze.With) view. So we get this view by ourselves.

        ###
        currentWith = Blaze.getView "with"

        ###

          By default dataVar in the Blaze.With view uses ReactiveVar
          with default equality function which sees all objects
          as different. So invalidations are triggered for every
          data context assignments even if data has not really
          changed. This is why we use our own ReactiveVar with
          EJSON.equals which we keep updated inside an autorun.
          Because it uses EJSON.equals it will invalidate our function
          only if really changes.

          See https://github.com/meteor/meteor/issues/4073

        ###
        reactiveArguments = new ReactiveVar [], EJSON.equals


        ###

          This autorun is nested in the outside autorun so it gets
          stopped automatically when the outside autorun gets invalidated.

        ###
        Tracker.autorun (computation) ->
          data = currentWith.dataVar.get()

          reactiveArguments.set data._arguments

        ###

          Use arguments for the constructor. Here we register a
          reactive dependency on our own ReactiveVar.

        ###
        component = new componentClass reactiveArguments.get()...

        template = component.renderComponent componentParent

        ###

          It has to be the first callback so that other callbacks
          have a correct data context.

        ###
        registerFirstCreatedHook template, ->

          ###

            Arguments were passed in as a data context. Restore
            original (parent) data context. Same logic as in
            Blaze._InOuterTemplateScope.

          ###
          @.view.originalParentView = @.view.parentView
          @.view.parentView = @.view.parentView.parentView.parentView

        return template

  renderComponent: (componentParent) ->

    ###

      To make sure we do not introduce any reactive dependency.
      This is a conscious design decision. Reactivity should be
      changing data context, but components should be more stable,
      only changing when structure change in rendered DOM. You can change
      the component you are including (or pass different arguments)
      reactively though.

    ###
    Tracker.nonreactive =>
      component = @

      component._internals ?= {}

      componentTemplate = component.template()
      if _.isString componentTemplate
        templateBase = Template[componentTemplate]
        if not templateBase
          console.error "Template '#{componentTemplate}' cannot be found."
          return
      else
        # we have an actual template
        templateBase = componentTemplate

      ###

        Create a new component template based on the Blaze template.
        We want our own template  because the same Blaze template
        could be reused between multiple components.

        TODO:
          - Should we cache these templates based on
            (componentName, templateBase) pair?

          - We could use two levels of ES6 Maps,
            componentName -> templateBase -> template.

          - What about component arguments changing?

      ###

      template = new Blaze.Template(
        "Component.#{component.componentName() or 'unnamed'}",
        templateBase.renderFunction
      )


      # We on purpose do not reuse helpers, events, and hooks.
      # Templates are used only for HTML rendering.

      @.component._internals ?= {}

      registerHooks template,


        onCreated: ->

          if component.isCard()

            name = component.componentName()
            id = component.id()

            card = component.getCard(name)
            card.states or= {}

            # attach created component to Apollos.state
            Apollos.states[name].components[id] =
              component: component
              states: card.states


            ###

              Here we lookup and see if the card has established a default
              template to render. If it hasn't, we take the first template
              that registered it as a state on the card. This creates
              a state reactive var helper that can be used in templates
              as {{state.get}} and updated by children templates using
              `@.parent()?.state.set("new template")`

            ###
            if card.default
              _default = card.default
            else
              for name of card.states
                _default = name
                break

            component["state"] = new ReactiveVar _default
            if @.data?.state
              component["state"].set @.data.state



            if not @.data?.noUrls

              ###

                Here we parse the url on creation of the card.
                1. We split the pathname into segments
                2. We remove and save any querystring at the end of route
                3. We remove any #
                4. If the state.url is already in the pathname we set the
                  route to include all previous segments and the url
                5. If not we push the state.url to the end of the array
                6. We then rebuild the array and define a route for it with
                  the name of our card

              ###
              current = window.location.pathname

              neededUrls = []
              # loop through all cards states to see if they have urls
              # that we need to setup
              for name, state of card.states

                if state.url?()

                  parentUrls = []

                  ###

                    @TODO - need to climb the inheriting
                      tree to build long url stucture

                  ###
                  parentUrl = componentParent?.url?()
                  if parentUrl and not current.match(parentUrl)
                    url = "#{parentUrl}/#{state.url()}"
                  else
                    url = state.url()

                  obj =
                    name: name
                    url: url

                  if state.triggersEnter
                    obj.triggersEnter = state.triggersEnter()


                  if state.triggersExit
                    obj.triggersExit = state.triggersExit()

                  neededUrls.push obj



              paths = current.split("/")
              paths = paths.filter Boolean

              isAtState = false
              for state in neededUrls
                _url = encodeURI(state.url)
                if paths.indexOf(_url) > -1
                  isAtState = paths.indexOf(_url)


              # if the user is visiting the page that the state should be
              # active then we need to pick up the route prior and including
              # the state.url to form our route path
              if typeof isAtState is "number"
                if isAtState is 0
                  paths = []
                else
                  paths = paths.splice(0, isAtState)


              # build each route
              for state in neededUrls
                route = paths.slice()
                route.push state.url

                # rebuild the path array
                route = encodeURI(route.join("/"))


                # if there is not already a path for this url lets make one
                if Apollos.Router.isPath("#{id + '-'}#{state.name}")
                  continue


                routeObj =
                  name: "#{id + '-'}#{state.name}"

                if state.triggersEnter
                  routeObj.triggersEnter = state.triggersEnter


                if state.triggersExit
                  routeObj.triggersExit = state.triggersExit

                # make the route
                Apollos.Router.route("/#{route}", routeObj)

                ###

                  when we roll back to a known route we reapply the
                  url segments and query string with
                  <known-route>/#!/<component>
                  that get stored in the window.location.hash so we can
                  read from it to grab the state and update the router

                ###
                if window.location.hash?.indexOf("#!/") is -1
                  continue


                hash = window.location.hash.replace("#!/", "")
                if hash[hash.length - 1] is "/"
                  hash = hash.substring(0, hash.length - 1)

                if hash.indexOf("?") > -1
                  hash = hash.split("?")
                  querystring = hash[1]
                  hash = hash[0]

                if state.url is hash
                  component["state"].set state.name

                  if querystring
                    route += "?#{querystring}"

                  Apollos.Router.redirect("/#{route}")

                  continue





          # @ is a template instance.
          if componentParent

            ###

              This is a temporary solution for inheriting content blocks
              from dynamic templates. It relies on a hardcoded level up
              to find "Template.__dynamicWithDataContext" as a trigger
              to map contentBlock and elseBlock

            ###
            abbrParent = @.view.parentView?.parentView?.parentView?.parentView
            abbrParent = abbrParent?.parentView?.parentView
            if abbrParent?.name is "Template.__dynamicWithDataContext"

              view = componentParent._internals?.templateInstance?.view

              if view?.templateContentBlock
                @.view.templateContentBlock = view.templateContentBlock

              if view?.templateElseBlock
                @.view.templateElseBlock = view.templateElseBlock




            ###

              component.parent is reactive, so we use
              Tracker.nonreactive just to make sure we do not leak any
              reactivity here.

            ###
            Tracker.nonreactive ->

              ###

                TODO:
                  - Should we support that the same component can be
                    rendered multiple times in parallel?

                  - How could we do that?
                  - For different component parents or only the same one?

              ###

              # We set the parent only when the component is created,
              # not just constructed.
              component.parent componentParent
              componentParent.addChild component


          self = @
          # Blaze rendered callback
          self.view._onViewRendered ->

            # Attach events the first time template instance renders.
            if self.view.renderCount isnt 1
              return

            addEvents self.view, component



          ###

            Reactive vars are great, but registering them as template helpers
            and setting the default values isn't great yet. Here we attach
            each var to the component that way it can be gotten via .get
            and is available in the template as a tag. I'm a little bit
            worried about polluting the render namespace so should this
            be kept on the vars object?

          ###
          varList = component.vars()
          if _.isArray varList

            for vars in varList
              for _var, _default of vars

                if component[_var]
                  console.error(
                    "#{_var} is already a method
                    on #{component.componentName()}"
                  )
                  continue

                ###

                  @TODO:
                    - Need to add in way to add reactive comparators
                    - Need to be able to extend vars from parent components

                ###
                component[_var] = new ReactiveVar _default



          ###

            Since meteor 1.1 we can use this.subscribe within the on
            created function to subscribe to a publications for the
            lifecycle of the template instance. Here we auto bind
            them with support for arguments and callbacks

            @TODO:
              - Need to be able to extend subscribes from parent components

          ###
          subscriptionsList = component.subscriptions()

          if _.isArray subscriptionsList

            for subscriptions in subscriptionsList

              if typeof subscriptions is "string"
                @.subscribe subscriptions
                continue

              if _.isObject subscriptions

                for _name, method of subscriptions

                  # grab name of subscription
                  subHandle = [_name]

                  # futher args?
                  if method.args?.length
                    subHandle = subHandle.concat method.args

                  # callback?
                  if method.callback
                    subHandle.push method.callback

                  @.subscribe.apply @, subHandle

                  continue


          @.component = component

          ###

            TODO:
              - Should we support that the same component can be
                rendered multiple times in parallel?
              - How could we do that?
              - For different component parents or only the same one?

          ###
          @.component._internals.templateInstance = @

          # We need to run the onCreated of the child component
          @.component.onCreated()


          @.component._internals.isCreated or= new ReactiveVar true
          @.component._internals.isCreated.set true

          # Maybe we are re-rendering the component. So let's
          # initialize variables just to be sure.

          @.component._internals.isRendered or= new ReactiveVar false
          @.component._internals.isRendered.set false

          @.component._internals.isDestroyed or= new ReactiveVar false
          @.component._internals.isDestroyed.set false

          return


        onRendered: ->

          # self is a template instance
          self = @

          ###

            To support dynamic url binding through components
            we need to set up an autorun watcher on two variables.

            First, we need to watch for the state (self.component.state)
            to change on the card component. This can be changed from inside
            card states or by accessing the card from the Apollos.states object.

            Second, and more commonly, we need to watch for changes to the
            url of the application. The route can change by a number of
            different manners.

              1. User clicks on an internal link
              2. User clicks on back button of browser
              3. User go directly to route in url bar (this is mainly handled
              by the onCreated card bindings)

            State changes should update the route, and route changes should
            update the state. This get tricky and possibly circular so we
            put some checks in place.

            Not all states of cards have urls so we also have to map previous
            states to fallback if the route changes.

            We do all of this inside a Tracker.nonreactive so that we can
            carefully control the updating and rerunning of changing variables.

          ###

          # if this component being rendered is a card and binds urls
          if component.isCard() and not self.data?.noUrls

            # set up non reactive wrapper
            Tracker.nonreactive ->

              # here get get access to the card
              card = component.getCard(component.componentName())
              card.states or= {}

              ###

                We create storage vars for state, id, and the existing route.
                These will let us prevent a circular updating loop by checking
                for changes. (id should never change)

                * because we are in a tracker nonreactive we can safely get
                the state

              ###
              state = self.component.state.get()
              defaultState = card.default
              id = self.component.id()
              oldRoute = Apollos.Router.current()

              getState = (name) ->

                if not name
                  return false

                strings = name.split("-")
                _id = strings[0]
                _state = strings[1]

                return _state

              getId = (name) ->

                if not name
                  return false

                strings = name.split("-")
                _id = strings[0]

                return _id


              ###

                Here we setup a tracker to watch the status of the state
                of the card level component. The only action that comes out
                of a state change is to update the url to match the url
                provided by the state. This should only happen if the
                url needs to be updated.

                * If the route changes and that changes the state of a card
                then we don't need to update the url so we check that as well

              ###
              Tracker.autorun ->

                # current state of the app
                currentState = self.component.state.get()

                # update local var
                state = currentState

                # get intended url
                stateUrl = Apollos.Router.path("#{id}-#{state}")
                if not stateUrl
                  return

                if window.location.search
                  stateUrl += window.location.search

                # we are at the correct url already
                if oldRoute.path is stateUrl
                  return

                # update the route silently so we don't trigger a route rerun
                Apollos.Router.redirect stateUrl, true
                oldRoute = Apollos.Router.current()
                return



              ###

                Here we setup a tracker to watch the change of the url. The
                goal of this tracker is to lookup the intended state of the
                card and set it. Updating the url should happen within the
                state tracker


              ###
              Tracker.autorun ->

                # register reactive dependency for router
                Apollos.Router.watchPathChange()

                # current route
                currentRoute = Apollos.Router.current()

                ###

                  In order to support the same card being rendered
                  in two instances with different data on the same page,
                  we need to exit this caculation run through if the
                  id of the route doesn't match up with the id of this
                  card.

                  * Route ids can be looked up via the Apollos.Router._routesMap
                  object. Every named route is named with the convention
                  #{id}-#{state}. This is used so we can parse and get the
                  id from the route and the state.

                ###

                routeId = getId(currentRoute.route?.name)
                if id isnt routeId and currentRoute.route?.name
                  ###

                    If the new route id doesn' match this card. We need to
                    set this card back to its default state

                  ###
                  # self.component.state.set defaultState
                  return



                # map the state from the route to currentState for usage
                currentState = getState currentRoute.route?.name

                # if this state has no url, then we don't need to update
                # the url.
                if not Apollos.Router.isPath("#{id}-#{currentState}")
                  return

                # we are already at the right place
                if currentRoute.route?.name is "#{id}-#{state}"
                  return

                # update the state of the card if route is correct
                if card.states[currentState]
                  self.component.state.set(currentState)
                  return






          # @ is a template instance.

          # We need to run the onRendered of the child component
          @.component.onRendered()

          @.component._internals.isRendered ?= new ReactiveVar true
          @.component._internals.isRendered.set true


        onDestroyed: ->

          # @ is a template instance.
          @.autorun (computation) =>

            # We wait for all children components to be destroyed first.
            # See https://github.com/meteor/meteor/issues/4166
            if @.component.children().length
              return

            computation.stop()

            @component._internals.isCreated.set false

            @component._internals.isRendered ?= new ReactiveVar false
            @component._internals.isRendered.set false

            @component._internals.isDestroyed ?= new ReactiveVar true
            @component._internals.isDestroyed.set true



            # We need to run the onDestroyed of the child component
            @.component.onDestroyed()

            if componentParent
              # The component has been destroyed, clear up the parent.
              component.parent null
              componentParent.removeChild component

            # Remove the reference so that it is clear that template
            # instance is not available anymore.
            delete @.component._internals.templateInstance

            return


      return template

  template: ->

    template = @.constructor.componentName()


    if not template
      console.error("Component is missing a name and component's
        'template' method is not overridden."
      )
      return

    return template


  onCreated: ->

  onRendered: ->

  onDestroyed: ->

  isCreated: ->
    @._internals ?= {}
    @._internals.isCreated ?= new ReactiveVar false

    return @._internals.isCreated.get()

  isRendered: ->
    @._internals ?= {}
    @._internals.isRendered ?= new ReactiveVar false

    return @._internals.isRendered.get()

  isDestroyed: ->
    @._internals ?= {}
    @._internals.isDestroyed ?= new ReactiveVar false

    return @._internals.isDestroyed.get()


  insertDOMElement: (parent, node, before) ->
    before ?= null

    if parent and node and (
      node.parentNode isnt parent or node.nextSibling isnt before
    )

      parent.insertBefore node, before

    return


  moveDOMElement: (parent, node, before) ->
    before ?= null

    if parent and node and (
      node.parentNode isnt parent or node.nextSibling isnt before
    )

      parent.insertBefore node, before

    return


  removeDOMElement: (parent, node) ->

    if parent and node and node.parentNode is parent
      parent.removeChild node

    return


  url: -> ""

  id: ->

    if not @_id
      @_id = "#{Math.random()}"

    @_id

  triggersEnter: ->
    return []

  triggersExit: ->
    return []

  events: ->
    return []

  subscriptions: ->
    return []

  vars: ->
    return []

  # Component-level data context. Reactive. Use this to always get the
  # top-level data context used to render the component.
  # Same as Template.currentData
  data: ->
    return Blaze.getData(@._internals?.templateInstance?.view) or {}

  ###

    Caller-level data context. Reactive. Use this to get in event handlers
    the data context at the place where event originated (target context).
    In template helpers the data context where template helpers were called.
    In onCreated, onRendered, and onDestroyed, the same as @data().
    Inside a template this is the same as this.

  ###
  currentData: ->
    Blaze.getData() or null


  # Useful in templates to get a reference to the component.
  component: ->
    return @


  ###

    Caller-level component. In most cases the same as @, but in event
    handlers it returns the component at the place where event
    originated (target component).

  ###
  currentComponent: ->
    return Template.instance()?.get("component") or null


  firstNode: ->
    return @._internals.templateInstance.firstNode


  lastNode: ->
    return @._internals.templateInstance.lastNode



# We copy utility methods ($, findAll, autorun, subscribe, etc.)
# from the template instance prototype.
for methodName, method of Blaze.TemplateInstance::
  do (methodName, method) ->

    # shim for adding juction in
    # if methodName is "$"
    #   Component::[methodName] = junction
    #   return

    Component::[methodName] = (args...) ->
      @._internals.templateInstance[methodName] args...




argumentsConstructor = ->
  # This class should never really be created.
  return false


###

  TODO:
    - Find a way to pass arguments to the component without having
    to introduce one intermediary data context into the data context
    hierarchy (in fact two data contexts, because we add
    one more when restoring the original one)

###
Template.registerHelper "args", ->
  obj = {}
  # We use custom constructor to know that it is not a real data context.
  obj.constructor = argumentsConstructor
  obj._arguments = arguments
  return obj



Apollos.component = Component

# backwards COMPAT
Apollos.Component = Apollos.component
