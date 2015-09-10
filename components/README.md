<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>


Apollos Components
=======================

*This is a port with increasingly heavy modifications from the awesome BlazeComponents by [Peerlibrary](https://github.com/peerlibrary). For the original library go [here](https://github.com/peerlibrary/meteor-blaze-components).
Much thanks to [Mitar](https://github.com/mitar) for his excellent work moving forward large scale UI applications in Meteor.*


Apollos Components for [Meteor](https://meteor.com/) are a system for easily developing complex UI elements
that need to be reused around your Meteor app.

Client side only.

* [Installation](#installation)
* [Components](#components)
* [Accessing data context](#accessing-data-context)
* [Passing arguments](#passing-arguments)
* [Life-cycle hooks](#life-cycle-hooks)
* [Component-based block helpers](#component-based-block-helpers)
* [Animations](#animations)
* [Namespaces](#namespaces)
* [Reference](#reference)
  * [Class methods](#class-methods)
  * [Instance methods](#instance-methods)
    * [Event handlers](#event-handlers)
    * [DOM content](#dom-content)
    * [Access to rendered content](#access-to-rendered-content)
    * [Access to data context and components](#access-to-data-context-and-components)
    * [Life-cycle hooks](#life-cycle-hooks-1)
    * [Utilities](#utilities)
    * [Low-level DOM manipulation hooks](#low-level-dom-manipulation-hooks)


Installation
------------

```
meteor add newspring:apollos-components
```


Components
----------

While Apollos Components are build on top of [Blaze](https://www.meteor.com/blaze), Meteor"s a powerful library
for creating live-updating user interfaces, its public API and semantics are different with the goal of providing
extensible and composable components through unified and consistent interface.

This documentation assumes familiarity with Blaze and its concepts of
[templates, template helpers, data contexts](http://docs.meteor.com/#/full/livehtmltemplates), and
[reactivity](http://docs.meteor.com/#/full/reactivity), but we will also turn some of those concepts around.


An Apollos Component is defined as a class providing few methods Apollos Components system will call to render a
component and few methods which will be called through a lifetime of a component. See the [reference](#reference)
for the list of all methods used and/or provided by Apollos Components.

A basic component might look like the following.

```coffee
class ExampleComponent extends Component
  # Register a component so that it can be included in templates. It also
  # gives the component the name. The convention is to use the class name.
  @register "ExampleComponent"

  # Which template to use for this component.
  template: "ExampleComponent"


  # Create reactivevar and expose them to the template as a helper
  vars: -> [

    counter: 0

  ]

  # Mapping between events and their handlers.
  events: -> [
    # You could inline the handler, but the best is to make
    # it a method so that it can be extended later on.
    "click .increment": (event) ->

      @.counter.set @.counter.get() + 1


  ]


  # Any component"s method is available as a template helper in the template.
  customHelper: ->
    if @.counter.get() > 10
      "Too many times"
    else if @.counter.get() is 10
      "Just enough"
    else
      "Click more"
```

```handlebars
<template name="ExampleComponent">
  <button class="increment">Click me</button>
  {{! You can include subtemplates to structure your templates.}}
  {{> subTemplate}}
</template>

<!--We use camelCase to distinguish it from the component"s template.-->
<template name="subTemplate">
  {{! You can access component"s properties.}}
  <p>Counter: {{counter.get}}</p>
  {{! And component"s methods.}}
  <p>Message: {{customHelper}}</p>  
</template>
```

You can see how to [register a component](#user-content-reference_class_register), define a
[template](#user-content-reference_instance_template), define a [life-cycle hook](#life-cycle-hooks),
[event handlers](#user-content-reference_instance_events), and a custom helper as a component method.

All template helpers, methods, event handlers, life-cycle hooks have `@`/`this` bound to the component.



Accessing data context
----------------------

Apollos Components are designed around the separation of concerns known as
[model–view–controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) (MVC).
Controller and its logic is implemented through a component. View is described through a template. And model is provided
as a data context to a controller, a component.

Data context is often reactive. It often comes from a database using Meteor"s reactive stack. Often as data context
changes, components stays rendered and just how it is rendered changes.

When accessing values in a template, first component methods are searched for a property, then global template helpers, and lastly the data context.

You can provide a data context to a component when you are including it in the template.

Examples:

```handlebars
{{> MyComponent}}

{{#with dataContext}}
  {{> MyComponent}}
{{/with}}

{{#each documents}}
  {{> MyComponent}}
{{/each}}

{{> MyComponent dataContext}}

{{> MyComponent a="foo" b=helper}}
```

`dataContext`, `documents` and `helper` are template helpers, component"s methods. If they are reactive, the data
context is reactive.

You can access provided data context in your component"s code through reactive
[`data`](#user-content-reference_instance_data) and [`currentData`](#user-content-reference_instance_currentData)
methods. There is slight difference between those two. The former always returns component"s data context, while
the latter returns the data context from where it was called. It can be different in template helpers and event
handlers.

Example:

```handlebars
<template name="Buttons">
  <button>Red</button>
  {{color1}}
  {{#with color="blue"}}
    <button>Blue</button>
    {{color2}}
  {{/with}}
</template>
```

If top-level data context is `{color: "red"}`, then `currentData` inside a `color1` component method (template helper)
will return `{color: "red"}`, but inside a `color2` it will return `{color: "blue"}`. Similarly, click event handler on
buttons will by calling `currentData` get `{color: "red"}` as the data context for red button, and `{color: "blue"}` for
blue button. In all cases `data` will return `{color: "red"}`.

Because [`data`](#user-content-reference_instance_data) and [`currentData`](#user-content-reference_instance_currentData)
are both component"s methods you can access them in a template as well. This is useful when you want to access
a data context property which is shadowed by a component"s method.

Example:

```handlebars
<template name="Colors">
  {{color}}
  {{#with color="blue"}}
    {{color}}
    {{! To access component"s data context from an inner data context, use "data".}}
    {{data.color}}
    {{! To access the data context over the component method.}}
    {{currentData.color}}
    {{! Alternatively, you can also use keyword "this".}}
    {{this.color}}
  {{/with}}
</template>
```

*See [Spacebars documentation](https://github.com/meteor/meteor/blob/devel/packages/spacebars/README.md) for more
information how to specify and work with the data context in templates.*

*Specifying a data context to a component in the code will be provided through the `renderComponent` method
which is not yet public.*

Passing arguments
-----------------

Apollos Components automatically instantiate an instance of a component when needed. In most cases you pass data to
a component as its data context, but sometimes you want to pass arguments to component"s constructor. You can do
that as well with the special `args` syntax:

```handlebars
{{> MyComponent args "foo" key="bar"}}
```

Apollos Components will call `MyComponent`"s constructor with arguments `foo` and `Spacebars.kw({key: "bar"})`
when instantiating the component"s class. Keyword arguments are wrapped into
[`Spacebars.kw`](https://github.com/meteor/meteor/blob/devel/packages/spacebars/README.md#helper-arguments).

Compare:

```handlebars
{{> MyComponent key="bar"}}
```

`MyComponent`"s constructor is called without any arguments, but the data context of a component is set to
`{key: "bar"}`.

```handlebars
{{> MyComponent}}
```

`MyComponent`"s constructor is called without any arguments and the data context is kept as it is.

When you want to use a data context and when arguments depends on your use case and code structure. Sometimes your class
is not used only as a component and requires some arguments to the constructor.

A general rule of thumb is that if you want the component to persist while data used to render the component is changing,
use a data context. But if you want to reinitialize the component itself if your data changes, then pass that data
through arguments. Component is always recreated when any argument changes. In some way arguments configure the
life-long properties of a component, which then uses data context reactively when rendering.

Another look at it is from the MVC perspective. Arguments configure the controller (component), while data
context is the model. If data is coming from the database, it should probably be a data context.

*Passing arguments to a component method which returns a component to be included, something like
`{{> getComponent args "foo" key="bar"}}` is
[not yet possible](https://github.com/peerlibrary/meteor-blaze-components/issues/12).*

Life-cycle hooks
----------------

There are multiple stages in the life of a component. In the common case it starts with a class which is
instantiated, rendered, and destroyed.

Life-cycle hooks are called in order:

1. Class [`constructor`](#user-content-reference_instance_constructor)
3. [`onCreated`](#user-content-reference_instance_onCreated) – called once a component is being created before being
inserted into DOM
4. [`onRendered`](#user-content-reference_instance_onRendered) – called once a rendered component is inserted into DOM
5. [`onDestroyed`](#user-content-reference_instance_onDestroyed) – called once a component was removed from DOM and is
being destroyed

The suggested use is that most of the component related initialization should be in
[`onCreated`](#user-content-reference_instance_onCreated) and [`constructor`](#user-content-reference_instance_constructor)
should be used for possible other uses of the same class. [`constructor`](#user-content-reference_instance_constructor)
does receive [optional arguments](#passing-arguments) though.


*Life-cycle of a component is is the common case linked with its life in the DOM. But you can create an instance of
a component which you can keep a reference to and reuse it multiple times, thus keeping its state between multiple
renderings. You can do this using the `renderComponent` method which is not yet public.*

Component-based block helpers
-----------------------------

You can use Apollos Components to define block helpers as well.

Example:

```handlebars
<template name="TableWrapperBlockComponent">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {{> Template.contentBlock}}
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2">
          {{> Template.elseBlock}}
        </td>
      </tr>
    </tfoot>
  </table>
</template>
```

```handlebars
{{#TableWrapperBlockComponent}}
  {{#each customers}}
    <td>{{name}}</td>
    <td>{{email}}</td>
  {{/each}}
{{else}}
  <p class="copyright">Content available under the CC0 license.</p>
{{/TableWrapperBlockComponent}}
```

You can use [`Template.contentBlock` and `Template.elseBlock`](https://github.com/meteor/meteor/blob/devel/packages/spacebars/README.md#custom-block-helpers)
to define "content" and "else" inclusion points.

You can modify just block helpers data context by passing it in the tag:

```handlebars
<template name="TableWrapperBlockComponent">
  <table class="{{color}}">
...
```

```handlebars
{{#TableWrapperBlockComponent color="red"}}
...
```

Notice that block helper"s data context is available only inside a block helper"s template, but data context where
it is used (one with `customers`) stays the same.

You can also [pass arguments](#passing-arguments) to a component:

```handlebars
{{#TableWrapperBlockComponent args displayCopyright=false}}
...
```

For when to use a data context and when arguments the same rule of thumb from the [Passing arguments](#passing-arguments)
section applies.

Blaze provides up to two inclusion points in block helpers. If you need more you should probably not use a component
as a block helper but move the logic to the component"s method, returning a rendered Blaze Component instance or template
which provides any content you want. You can provide content (possibly as Apollos Components themselves) to the component
through your component arguments or data context.

Example:

```handlebars
<template name="CaseComponent">
  {{> renderCase}}
</template>

<template name="useCaseTemplate">
  {{> CaseComponent args left="LeftComponent" middle="MiddleComponent" right="RightComponent"}}
</template>
```

```coffee
class CaseComponent extends Component
  @register "CaseComponent"

  template: "CaseComponent"

  constructor: (kwargs) ->
    @.cases = kwargs.hash

  renderCase: ->
    caseComponent = @.cases[@data().case]
    if caseComponent
      return null
    Component.getComponent(caseComponent).renderComponent @.currentComponent()
```

If you use `CaseComponent` now in the `{case: "left"}` data context, a `LeftComponent`
component will be rendered. If you want to control in which data context `LeftComponent`
is rendered, you can specify data context as `{{> renderCase dataContext}}`.

*Example above is using `renderComponent` method which is not yet public.*

Animations
----------

Apollos Components provide [low-level DOM manipulation hooks](#low-level-dom-manipulation-hooks) you can use to
hook into insertion, move, or removal of DOM elements. Primarily you can use this to animate manipulation of
DOM elements, but at the end you have to make sure you do the requested DOM manipulation correctly because Blaze
will expect it done.

Hooks are called only when DOM elements themselves are manipulated and not when their attributes change.

A common pattern of using the hooks is to do the DOM manipulation as requested immediately, to the final state, and
then only visually instantaneously revert to the initial state and then animate back to the final state. For example,
to animate move of a DOM element you can first move the DOM element to the new position, and then use CSS translation
to visually move it back to the previous position and then animate it slowly to the new position. The DOM element itself
stays in the new position all the time in the DOM, only visually is being translated to the old position and animated.

One way for animating is to modify CSS, like toggling a CSS class which enables animations. Another common way
is to use a library like [Velocity](http://julian.com/research/velocity/).

*See [Momentum Meteor package](https://github.com/percolatestudio/meteor-momentum) for more information on how to
use these hooks to animate DOM elements.*


Namespaces
----------

As your project grows and you are using more and more components, especially from 3rd party packages, flat
structure of components (and templates) might lead to interference. To address this issue Blaze Components
provide multi-level namespacing, with `.` character as a separator.

Example:

```coffee
class Buttons

class Buttons.Red extends Component
  @register "Buttons.Red"

  template: "Buttons.Red"

class Buttons.Blue extends BComponent
  @register "Buttons.Blue"

  template: "Buttons.Blue"
```

```handlebars
{{> Buttons.Red}}
```

You do not have to export `Buttons` from your package for components to be available in templates throughout your
project. The registry of components is shared between all packages and the project. Even if you need to access a
component"s class in your code, you can use `Component.getComponent("Buttons.Red")` to access it.

Sometimes you want some non-component logic to be available together with your components. You can export
one symbol and nest components under it like in the example above, having access to both non-component logic
through that symbol, and components through Apollos Components registry.


Let"s imagine thar your package exports `Buttons` class above. Then you could do:

```handlebars
<template name="OtherComponent">
  {{> renderButton}}
</template>
```

```coffee
class OtherComponent extends Component
  @register "OtherComponent"

  template: "OtherComponent"

  renderButton: ->
    Buttons.Red.renderComponent @.currentComponent()
```

If you would leave your components registered, you could still do:

```coffee
renderButton: ->
  Component.getComponent("Buttons.Red").renderComponent @,currentComponent()
```

You do not even have to create a namespacing class in your code like we did in the example above. It does make the
code more readable and uniform, though.

How exactly you structure your code and components depends on various factors. Apollos Components provide multiple
ways to keep your components structured, tidy, and reusable.

*Example above is using `renderComponent` method which is not yet public.*


Reference
---------

### Class methods ###

<a name="reference_class_register"></a>
```coffee
@register: (componentName, [componentClass]) ->
```

Registers a new component with the name `componentName`. This makes it available in templates and elsewhere
in the component system under that name, and assigns the name to the component. If `componentClass`
argument is omitted, class on which `@register` is called is used.

<a name="reference_class_getComponent"></a>
```coffee
@getComponent: (componentName) ->
```


Returns a component instance used to render a particular DOM element, if it was rendered using Blaze Components.
Otherwise `null`.

<a name="reference_class_componentName"></a>
```coffee
@componentName: ([componentName]) ->
```

When called without a `componentName` argument it returns the component name.

When called with a `componentName` argument it sets the component name.

*Setting the component name yourself is needed and required only for unregistered classes because
[`@register`](#user-content-reference_class_register) sets the component name automatically otherwise. All component
should have a component name associated with them.*


```

### Instance methods ###

#### Event handlers ####

<a name="reference_instance_events"></a>
```coffee
events: -> []
```

Extend this method and return event hooks for the component"s DOM content. Method should return an array of event maps,
where an event map is an object where the properties specify a set of events to handle, and the values are the
handlers for those events. The property can be in one of several forms:

* `eventtype` – Matches a particular type of event, such as `click`.
* `eventtype selector` – Matches a particular type of event, but only when it appears on an element that matches a
certain CSS selector.
* `event1, event2` – To handle more than one type of event with the same function, use a comma-separated list.

The handler function receives one argument, a [jQuery event object](https://api.jquery.com/category/events/event-object/),
and optional extra arguments for custom events.

Example:

```coffee
events: ->
  super.concat
    "click": @onClick
    "click .accept": @onAccept
    "click .accept, focus .accept, keypress": @onMultiple

# Fires when any element is clicked.
onClick: (event) ->

# Fires when any element with the "accept" class is clicked.
onAccept: (event) ->

# Fires when "accept" is clicked or focused, or a key is pressed.
onMultiple: (event) ->
```

Apollos Components make sure that event handlers are called bound with the component itself in `@`/`this`.
This means you can [normally access data context and the component itself](#access-to-data-context-and-components)
in the event handler.


Returned values from event handlers are ignored. To control how events are propagated you can use `event` object
methods like [`stopPropagation`](https://api.jquery.com/event.stopPropagation/) and
[`stopImmediatePropagation`](https://api.jquery.com/event.stopImmediatePropagation/).

*For more information about event maps, event handling, and `event` object, see [Blaze documentation](http://docs.meteor.com/#/full/eventmaps)
and [jQuery documentation](https://api.jquery.com/category/events/event-object/).*


#### ReactiveVars ####

<a name="reference_instance_vars"></a>
```coffee
vars: -> []
```

Extend this method and return new reactive vars for the compoent. Method should return an array of var maps,
where a var map is an object where the properties specify a reactive var name, and the default value of the var.
Example:

```coffee
vars: ->

  super.concat

    "counter": 0

    "color": "Blue"

```



*For more information about reactive vars see [Reactive Var documentation](http://docs.meteor.com/#/full/reactivevar)*


#### Subscriptions ####

<a name="reference_instance_subscriptions"></a>
```coffee
subscriptions: -> []
```

Extend this method and return subscriptions watched during the lifecycle of the component. Method should return an array of subscription maps or subscription names,
where a subscription name is an string that is the name of the subscription to watch. Alternatively, you can pass and object instead of a string where the key of the object is the handle name, an `args` value is pased to `Meteor.subscribe(name, [args])`, and a callback function under a callback key.

Example:

```coffee
subscriptions: ->

  super.concat

    "people"

    "users":
      args: [
        "who", "are", "you"
      ]
      callback: (err) ->
        console.log "subscription `users` is ready"

```



*For more information about subscriptions see [Meteor.subscribe documentation](http://docs.meteor.com/#/full/meteor_subscribe)*




#### DOM content ####

<a name="reference_instance_template"></a>
```coffee
template: "Template"
```

Return the name of a [Blaze template](http://docs.meteor.com/#/full/templates_api) or template
object itself. Template content will be used to render component"s DOM content, but all preexisting template helpers,
event handlers and life-cycle hooks will be ignored.

All component methods are available in the template as template helpers. Template helpers are bound to the component
itself in `@`/`this`.

You can include other templates (to keep individual templates manageable) and components.

Convention is to name component templates the same as components, which are named the same as their classes.

*See [Spacebars documentation](http://docs.meteor.com/#/full/templates_api) for more information about the template
language.*

#### Access to rendered content ####

<!-- <a name="reference_instance_$"></a>
```coffee
$: (selector) ->
```

Finds all DOM elements matching the `selector` in the rendered content of the component, and returns them
as a [JQuery object](https://api.jquery.com/Types/#jQuery).

The component serves as the document root for the selector. Only elements inside the component and its
sub-components can match parts of the selector.

*Wrapper around [Blaze"s `$`](http://docs.meteor.com/#/full/template_$).* -->

<a name="reference_instance_find"></a>
```coffee
find: (selector) ->
```

Finds one DOM element matching the `selector` in the rendered content of the component, or returns `null`
if there are no such elements.

The component serves as the document root for the selector. Only elements inside the component and its
sub-components can match parts of the selector.

*Wrapper around [Blaze"s `find`](http://docs.meteor.com/#/full/template_find).*

<a name="reference_instance_findAll"></a>
```coffee
findAll: (selector) ->
```

Finds all DOM element matching the `selector` in the rendered content of the component. Returns an array.

The component serves as the document root for the selector. Only elements inside the component and its
sub-components can match parts of the selector.

*Wrapper around [Blaze"s `findAll`](http://docs.meteor.com/#/full/template_findAll).*

<a name="reference_instance_firstNode"></a>
```coffee
firstNode: ->
```

Returns the first top-level DOM node in the rendered content of the component.

The two nodes `firstNode` and `lastNode` indicate the extent of the rendered component in the DOM. The rendered
component includes these nodes, their intervening siblings, and their descendents. These two nodes are siblings
(they have the same parent), and `lastNode` comes after `firstNode`, or else they are the same node.

*Wrapper around [Blaze"s `firstNode`](http://docs.meteor.com/#/full/template_firstNode).*

<a name="reference_instance_lastNode"></a>
```coffee
lastNode: ->
```

Returns the last top-level DOM node in the rendered content of the component.

*Wrapper around [Blaze"s `lastNode`](http://docs.meteor.com/#/full/template_lastNode).*

#### Access to data context and components ####

<a name="reference_instance_data"></a>
```coffee
data: ->
```

Returns current component-level data context. A reactive data source.

Use this to always get the top-level data context used to render the component.

<a name="reference_instance_currentData"></a>
```coffee
currentData: ->
```

Returns current caller-level data context. A reactive data source.

In [event handlers](#event-handlers) use `currentData` to get the data context at the place where the event originated (target context).
In template helpers `currentData` returns the data context where a template helper was called. In life-cycle
hooks [`onCreated`](#user-content-reference_instance_onCreated), [`onRendered`](#user-content-reference_instance_onRendered),
and [`onDestroyed`](#user-content-reference_instance_onDestroyed), it is the same as [`data`](#user-content-reference_instance_data).
Inside a template accessing the method as a template helper `currentData` is the same as `@`/`this`.

<a name="reference_instance_component"></a>
```coffee
component: ->
```

Returns the component. Useful in templates to get a reference to the component.

<a name="reference_instance_currentComponent"></a>
```coffee
currentComponent: ->
```

Similar to [`currentData`](#user-content-reference_instance_currentData), `currentComponent` returns current
caller-level component.

In most cases the same as `@`/`this`, but in event handlers it returns the component at the place where
event originated (target component).

<a name="reference_instance_componentName"></a>
```coffee
componentName: ->
```

This is a complementary instance method which calls [`@componentName`](#user-content-reference_class_componentName)
class method.

<a name="reference_instance_componentParent"></a>
```coffee
parent: ->
```

Returns the component"s parent component, if it exists, or `null`. A reactive data source.

The parent component is available only after the component has been [created](#user-content-reference_instance_onCreated),
and until is [destroyed](#user-content-reference_instance_onDestroyed).

<a name="reference_instance_componentChildren"></a>
```coffee
children: ([nameOrComponent]) ->
```

Returns an array of component"s children components. A reactive data source. The order of children components in the
array is arbitrary.

You can specify a component name, class, or instance to limit the resulting children to.

The children components are in the array only after they have been [created](#user-content-reference_instance_onCreated),
and until they are [destroyed](#user-content-reference_instance_onDestroyed).

<a name="reference_instance_componentChildrenWith"></a>
```coffee
childrenWith: (propertyOrMatcherOrFunction) ->
```

Returns an array of component"s children components which match a `propertyOrMatcherOrFunction` predicate. A reactive
data source. The order of children components in the array is arbitrary.

A `propertyOrMatcherOrFunction` predicate can be:
* a property name string, in this case all children components which have a property with the given name are matched
* a matcher object specifying mapping between property names and their values, in this case all children components
which have all properties fom the matcher object equal to given values are matched (if a property is a function, it
is called and its return value is compared instead)
* a function which receives `(child, parent)` with `@`/`this` bound to `parent`, in this case all children components
for which the function returns a true value are matched

Examples:

```coffee
component.childrenWith "propertyName"
component.childrenWith propertyName: 42
component.childrenWith (child, parent) ->
  child.propertyName is 42
```

The children components are in the array only after they have been [created](#user-content-reference_instance_onCreated),
and until they are [destroyed](#user-content-reference_instance_onDestroyed).

#### Life-cycle hooks ####

<a name="reference_instance_constructor"></a>
```coffee
constructor: (args...) ->
```

When a component is created, its constructor is first called. There are no restrictions on component"s constructor
and Apollos Components are designed to [coexist with classes](#use-with-existing-classes) which require their own
arguments when instantiated. To facilitate this, Apollos Components operate equally well with classes (which are
automatically instantiated as needed) or already made instances. The real life-cycle of a Apollos Component starts
after its instantiation.

When including a component in a template, you can pass arguments to a constructor by using the `args` keyword.

Example:

```handlebars
{{> ButtonComponent args 12 color="red"}}
```

Apollos Components will call `ButtonComponent`"s constructor with arguments `12` and `Spacebars.kw({color: "red"})`
when instantiating the component"s class. Keyword arguments are wrapped into
[`Spacebars.kw`](https://github.com/meteor/meteor/blob/devel/packages/spacebars/README.md#helper-arguments).

After the component is instantiated, all its [mixins](#user-content-reference_instance_mixins) are instantiated as well.

<a name="reference_instance_onCreated"></a>
```coffee
onCreated: ->
```

Extend this method to do any initialization of the component before it is rendered for the first time. This is a better
place to do so than a class constructor because it does not depend on the component nature,
[mixins](#user-content-reference_instance_mixins) are already initialized, and most Apollos Components methods
work as expected (component was not yet rendered, so [DOM related methods](#access-to-rendered-content) do not yet work).

A recommended use is to initialize any reactive variables and subscriptions internal to the component.

Example:

```coffee
class ButtonComponent extends Component
  @register "ButtonComponent"

  template: "ButtonComponent"

  onCreated: ->

    $(window).on "message.buttonComponent", (event) =>
      if color = event.originalEvent.data?.color
        @.color.set color


  vars: -> {

    color: "Red"

  }

  onDestroyed: ->
    $(window).off ".buttonComponent"
```

```handlebars
<template name="ButtonComponent">
  <button>{{color.get}}</button>
</template>
```

You can now use [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) to send messages
like `{color: "Blue"}` which would reactively change the label of the button.


<a name="reference_instance_onRendered"></a>
```coffee
onRendered: ->
```

This method is called once when a component is rendered into DOM nodes and put into the document for the first time.

Because your component has been rendered, you can use [DOM related methods](#access-to-rendered-content) to access
component"s DOM nodes.

This is the place where you can initialize 3rd party libraries to work with the DOM content as well. Keep in
mind that interactions of a 3rd party library with Blaze controlled content might bring unintentional consequences
so consider reimplementing the 3rd party library as a Apollos Component instead.


<a name="reference_instance_onDestroyed"></a>
```coffee
onDestroyed: ->
```

This method is called when an occurrence of a component is taken off the page for any reason and not replaced
with a re-rendering.

Here you can clean up or undo any external effects of [`onCreated`](#user-content-reference_instance_onCreated)
or [`onRendered`](#user-content-reference_instance_onRendered) methods. See the example above.


<a name="reference_instance_isCreated"></a>
```coffee
isCreated: ->
```

Returns `true` if the component is created, possibly rendered, but not (yet) destroyed. Otherwise `false`. A reactive
data source.

<a name="reference_instance_isRendered"></a>
```coffee
isRendered: ->
```

Returns `true` if the component is rendered, but not (yet) destroyed. Otherwise `false`. A reactive data source.

<a name="reference_instance_isDestroyed"></a>
```coffee
isDestroyed: ->
```

Returns `true` if the component is destroyed. Otherwise `false`. If component was never created, it was also never
destroyed so initially the value is `false`. A reactive data source.

#### Utilities ####

<a name="reference_instance_autorun"></a>
```coffee
autorun: (runFunc) ->
```

A version of [`Tracker.autorun`](http://docs.meteor.com/#/full/tracker_autorun) that is stopped when the component is
destroyed. You can use `autorun` from an [`onCreated`](#user-content-reference_instance_onCreated) or
[`onRendered`](#user-content-reference_instance_onRendered) life-cycle hooks to reactively update the DOM or the component.

<a name="reference_instance_subscribe"></a>
```coffee
subscribe: (name, args..., [callbacks]) ->
```

A version of [`Meteor.subscribe`](http://docs.meteor.com/#meteor_subscribe) that is stopped when the component is
destroyed. You can use `subscribe` from an [`onCreated`](#user-content-reference_instance_onCreated) life-cycle hook to
specify which data publications this component depends on.

<a name="reference_instance_subscriptionsReady"></a>
```coffee
subscriptionsReady: ->
```

This method returns `true` when all of the subscriptions called with [`subscribe`](#user-content-reference_instance_subscribe)
are ready. Same as with all other methods, you can use it as a template helper in the component"s template.

#### Low-level DOM manipulation hooks ####

<a name="reference_instance_insertDOMElement"></a>
```coffee
insertDOMElement: (parent, node, before) ->
```

Every time Blaze wants to insert a new DOM element into the component"s DOM content it calls this method. The default
implementation is that if `node` has not yet been inserted, it simply inserts the `node` DOM element under the
`parent` DOM element, as a sibling before the `before` DOM element, or as the last element if `before` is `null`.

You can extend this method if you want to insert the new DOM element in a different way, for example, by animating
it. Make sure you do insert it correctly because Blaze will expect it to be there afterwards.



<a name="reference_instance_moveDOMElement"></a>
```coffee
moveDOMElement: (parent, node, before) ->
```

Every time Blaze wants to move a DOM element to a new position between siblings it calls this method. The default
implementation is that if `node` has not yet been moved, it simply moves the `node` DOM element before the `before`
DOM element, or as the last element if `before` is `null`.

You can extend this method if you want to move the DOM element in a different way, for example, by animating
it. Make sure you do move it correctly because Blaze will expect it to be there afterwards.


<a name="reference_instance_removeDOMElement"></a>
```coffee
removeDOMElement: (parent, node) ->
```

Every time Blaze wants to remove a DOM element it calls this method. The default implementation is that
if `node` has not yet been removed, it simply removes the `node` DOM element.

You can extend this method if you want to remove the DOM element in a different way, for example, by animating
it. Make sure you do remove it correctly because Blaze will expect it to be removed afterwards.
