
###

  Comparing arrays of components by reference. This might not be really
  necessary to do, because all operations we officially support modify
  length of the array (add a new component or remove an old one). But
  if somebody is modifying the reactive variable directly we want a sane
  behavior. The default ReactiveVar equality always returns false when
  comparing any non-primitive values. Because the order of components in
  the children array is arbitrary we could further improve this comparison
  to compare arrays as sets, ignoring the order. Or we could have some
  canonical order of components in the array.

###
arrayReferenceEquals = (a, b) ->
  if a.length isnt b.length
    return false

  for i in [0...a.length]
    if a[i] isnt b[i]
      return false

  return true




###

  Similar idea to https://github.com/awwx/meteor-isolate-value. We want
  to make sure that internal reactive dependency inside function fn really
  changes the result of function fn before we trigger an outside reactive
  computation invalidation. The downside is that function fn is called twice
  if the result changes (once to check if the outside reactive computation
  should be invalidated and the second time  when the outside reactive
  computation is rerun afterwards). Function fn should not have any
  side effects.

###
isolateValue = (fn) ->
  # If not called in a reactive computation, do nothing special.
  if not Tracker.active
    return fn()

  lastValue = null
  dependency = new Tracker.Dependency()

  # This autorun is nested in the outside autorun so it gets stopped
  # automatically when the outside autorun gets invalidated.
  Tracker.autorun (computation) ->
    value = fn()

    if computation.firstRun
      lastValue = value
    else
      # We use arrayReferenceEquals here for our use case, because
      # we are using it with a component children array.
      if not arrayReferenceEquals value, lastValue
        dependency.changed()

  dependency.depend()

  return lastValue


getPathAndName = (name) ->

  path = name.split "."
  name = path.pop()

  return {path, name}


getNamespace = (components, path) ->

  match = components

  while (segment = path.shift())?

    match = match[segment]

    if not _.isObject match
      return null

  if not _.isObject match
    return null

  return match or null


createNamespace = (components, path) ->

  match = components

  while (segment = path.shift())?

    if not (segment of match)
      match[segment] = new components.constructor()

    match = match[segment]


  return match


getComponent = (components, name) ->

  if not name
    return null

  {path, name} = getPathAndName name

  namespace = getNamespace components, path

  if not namespace
    return null

  return namespace[components.constructor.COMPONENT]?[name] or null


setComponent = (components, name, component) ->


  {path, name} = getPathAndName name

  namespace = createNamespace components, path

  namespace[components.constructor.COMPONENT] ?= new components.constructor()

  namespace[components.constructor.COMPONENT][name] = component



class ComponentNamespace

  ###

    We have a special field for components. This allows us to have the
    namespace with the same name as a component, without overriding
    anything in the component (we do not want to use component object
    as a namespace object).

  ###
  @COMPONENT: ""


# Apollos.state



addCardState = (storage, component, card) ->

  name = component.componentName()
  obj = {}
  obj[name] = new component()

  if not storage[card]
    storage[card] =
      components: {}
      states: obj

    return

  if storage[card] and not storage[card].states

    storage[card].states = obj

    return

  if storage[card].states[name]
    return


  storage[card].states[name] = new component()

  return


addCard = (storage, component, _default) ->
  name = component.componentName()

  if storage[name] and not storage[name]?.states

    console.error "Card #{component.componentName()} is already registed"
    return

  if storage[name]
    if not storage[name].default and _default
      storage[name].default = _default

    storage[name].component or= new component()

    return

  storage[name] =
    component: new component()
    components: {}
    default: _default


Apollos.states = {}


class Base

  @components: new ComponentNamespace()

  @cards: Apollos.states

  @register: (componentName, componentClass) ->

    if not componentName
      console.error "Component name is required for registration."
      return

    # To allow calling @register 'name' from inside a class body.
    componentClass ?= @

    if getComponent @components, componentName
      console.error "Component '#{ componentName }' already registered."
      return


    ###

      The last condition is to make sure we do not throw the exception
      when registering a subclass. Subclassed components have at this
      stage the same component as the parent component, so we have to
      check if they are the same class. If not, this is not an error,
      it is a subclass.

    ###
    if componentClass.componentName() and
    componentClass.componentName() isnt componentName and
    getComponent(@components, componentClass.componentName()) is componentClass


      console.error "Component '#{ componentName }' already registered under
        the name '#{ componentClass.componentName() }'."
      return



    componentClass.componentName componentName

    setComponent @.components, componentName, componentClass

    # To allow chaining.
    return @


  ###

    From a card state
    1. Check to see if the card is registered
    2. If it isn't, register the name
    3. See if state is registered
    3. Attach the name of the component to the card


    From a card
    1. See if card is registered
    2. If it is attach class?
    3. If not register and attach class?
    4. Map states to card for use

  ###

  @card: (cardName, _default) ->

    if not cardName
      debug "Card name or `true` is required for registration."
      return

    # To allow calling @card 'name' from inside a class body.
    cardClass = @

    isCard = typeof cardName is "boolean"

    if isCard
      @isCard true
      addCard Apollos.states, cardClass, _default
      return @


    addCardState(Apollos.states, cardClass, cardName)

    return @


  @isCard: (card) ->

    # setter
    if card
      @._isCard = true

      # chain chain chain
      return @

    # getter
    return @._isCard or false


  isCard: ->

    @.constructor.isCard()


  getCard: (name) ->

    return @.constructor.cards[name] or null


  @getComponent: (componentsNamespace, componentName) ->

    if not componentName
      componentName = componentsNamespace
      componentsNamespace = @.components

    if not componentName
      return null

    return getComponent componentsNamespace, componentName



  ###

    Component name is set in the register class method. If not using a
    registered component and a component name is wanted, component name
    has to be set manually or this class method should be overridden
    with a custom implementation. Care should be taken that unregistered
    components have their own name and not the name of their parent
    class, which they would have by default. Probably component name
    should be set in the constructor for such classes, or by calling
    componentName class method manually on the new class of
    this new component.

  ###
  @componentName: (componentName) ->

    # setter
    if componentName
      @._componentName = componentName

      # chain chain chain
      return @

    # getter
    return @._componentName or null



  # We allow access to the component name through a method so that it
  # can be accessed in templates in an easy way.
  componentName: ->

    # Instance method is just a getter, not a setter as well.
    @.constructor.componentName()


  ###

    The order of components is arbitrary and does not necessary match
    siblings relations in DOM. nameOrComponent is optional and it
    limits the returned children only to those.

  ###
  children: (nameOrComponent) ->

    @._internals ?= {}
    @._internals.children ?= new ReactiveVar [], arrayReferenceEquals

    # Quick path.
    if not nameOrComponent
      return (child for child in @._internals.children.get())

    if _.isString nameOrComponent
      return @.childrenWith (child, parent) =>
        child.componentName() is nameOrComponent

    @.childrenWith (child, parent) =>
      # nameOrComponent is a class.
      if child.constructor is nameOrComponent
        return true

      # nameOrComponent is an instance, or something else.
      if child is nameOrComponent
        return true

      return false

  ###

    The order of components is arbitrary and does not necessary match
    siblings relations in DOM. Returns children which pass a mapping function.

  ###
  childrenWith: (propertyOrMatcherOrFunction) ->

    if typeof propertyOrMatcherOrFunction is "string"

      property = propertyOrMatcherOrFunction

      propertyOrMatcherOrFunction = (child, parent) =>
        property of child


    else if not typeof propertyOrMatcherOrFunction is "function"

      matcher = propertyOrMatcherOrFunction

      propertyOrMatcherOrFunction = (child, parent) =>
        for property, value of matcher
          if not property of child
            return false

          if typeof child[property] is "function"
            if not child[property]() is value
              return false
          else
            if not child[property] is value
              return false

        return true

    isolateValue =>
      child for child in @.children() when propertyOrMatcherOrFunction.call(
        @, child, @
      )


  addChild: (child) ->

    @._internals ?= {}
    @._internals.children ?= new ReactiveVar [], arrayReferenceEquals

    @._internals.children.set Tracker.nonreactive =>
      @._internals.children.get().concat [child]

    # To allow chaining.
    return @


  removeChild: (child) ->

    @._internals ?= {}
    @._internals.children ?= new ReactiveVar [], arrayReferenceEquals


    @._internals.children.set Tracker.nonreactive =>
      _.without @._internals.children.get(), child

    # To allow chaining.
    return @


  parent: (parent) ->

    @._internals ?= {}
    ###

      We use reference equality here. This makes reactivity not
      invalidate the computation if the same component instance
      (by reference) is set as a parent.

    ###
    @._internals.parent ?= new ReactiveVar null, (a, b) -> a is b

    # setter
    if not _.isUndefined parent
      @._internals.parent.set parent
      # To allow chaining.
      return @

    # getter
    @._internals.parent.get()




_components.base = Base
