<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>


Apollos Router
=======================

*Apollos.router uses [Meteorhacks](https://github.com/meteorhacks) FlowRouter as its backbone. For the original library go [here](https://github.com/meteorhacks/flow-router).
Much thanks to [Arunoda ](https://github.com/arunoda) and his team for their excellent work moving forward routing in Meteor.*


Apollos.router is a minimalistic router which only handles routing and subscriptions. You can't have any kind of reactive code inside the router, but there is a rich reactive API to watch for changes in the routes.

## TOC

* [Getting Started](#getting-started)
* [Routes Definition](#routes-definition)
* [Subscription Management](#subscription-management)
* [Rendering and Layout Management](#rendering-and-layout-management)
* [Triggers](#triggers)
* [Middlewares](#middlewares)
* [Not Found Routes](#not-found-routes)
* [API](#api)

## Getting Started

Add Apollos Router to your app:

~~~shell
meteor add newspring:apollos-core
~~~

Let's write our first route (add this file to `lib/router.js`):

~~~coffeescript
Apollos.router.route '/blog/:postId',
  subscriptions: (params) ->
    console.log 'subscribe and register this subscription as \'myPost\''
    @register 'myPost', Meteor.subscribe('blogPost', params.postId)
    return
  action: (params) ->
    console.log 'Yeah! We are on the post:', params.postId
    return
~~~

Then visit `/blog/my-post-id` from the browser or invoke the following command from the browser console:

~~~js
Apollos.router.go('/blog/my-post-id');
~~~

Then you can see some messages printed in the console.

## Routes Definition

Apollos.router routes are very simple and based on the syntax of [path-to-regexp](https://github.com/pillarjs/path-to-regexp) which is used in both [Express](http://expressjs.com/) and `iron:router`.

Here's the syntax for a simple route:

~~~coffeescript
Apollos.router.route '/blog/:postId',

  middlewares: []

  subscriptions: (params, queryParams) ->

  action: (params, queryParams) ->
    console.log 'Params:', params
    console.log 'Query Params:', queryParams
    return

  name: '<name for the route>'
~~~

So, this route will be activated when you visit a url like below:

~~~js
Apollos.router.go('/blog/my-post?comments=on&color=dark');
~~~

After you've visit the route, this will be printed in the console:

~~~
Params: {postId: "my-post"}
Query Params: {comments: "on", color: "dark"}
~~~

For a single interaction, the router only runs once. That means, after you've visit a route, first it will call `middlewares`, then `subscriptions` and finally `action`. After that happens, none of those methods will be called again for that route visit.

You can define routes anywhere in the `client` directory. But, we recommend to add them in the `lib` directory. Then `fast-render` can detect subscriptions and send them for you (we'll talk about this is a moment).

### Group Routes

You can group routes for better route organization. Here's an example:

~~~coffeescript
adminRoutes = Apollos.router.group(
  prefix: '/admin'

  subscriptions: ->
    @register 'adminSettings', Meteor.subscribe('settings', admin: true)
    return

  middlewares: [ (path, next) ->
    console.log 'running group middleware'
    next()
    return
])

# handling /admin route
adminRoutes.route '/',

  action: ->
    Apollos.layout.render 'componentLayout', content: 'admin'
    return

  middlewares: [ (path, next) ->
    console.log 'running /admin middleware'
    next()
    return

]


# handling /admin/posts
adminRoutes.route '/posts', action: ->
  Apollos.layout.render 'componentLayout', content: 'posts'
  return

~~~

**All of the options for the `Apollos.router.group()` are optional.**

You can even have nested group routes as shown below:

~~~coffeescript

adminRoutes = Apollos.router.group({
  prefix: '/admin'
})

superAdminRoutes = adminRoutes.group({
  prefix: '/super'
})

# handling /admin/super/post
superAdminRoutes.route('/post', {
  action: ->
})

~~~

## Subscription Management

Apollos.router only provides the registration of subscriptions. It does not wait until subscriptions are ready. This is how to register a subscription:

~~~coffeescript
FlowRouter.route('/blog/:postId', {
  subscriptions: (params, queryParams) ->
    @register 'myPost', Meteor.subscribe('blogPost', params.postId)
    return
})

~~~

We can also register global subscriptions like this:

~~~coffeescript
Apollos.router.subscriptions = ->
  @.register('myCourses', Meteor.subscribe('courses'))

~~~

All global subscriptions run on every route. So, pay special attention to names when registering subscriptions.

After you've registered your subscriptions, you can reactively check for the status of those subscriptions like this:

~~~coffeescript
Tracker.autorun ->
  console.log 'Is myPost ready?:', Apollos.router.subsReady('myPost')
  console.log 'Are all subscriptions ready?:', Apollos.router.subsReady()
  return
~~~

So, you can use `Apollos.router.subsReady` inside template helpers to show the loading status and act accordingly.

### Apollos.router.subsReady() with a callback

Sometimes, we need to use `Apollos.router.subsReady()` in places where an autorun is not available. One such example is inside an event handler. For such places, we can use the callback API of `Apollos.router.subsReady()`.

~~~coffeescript
Template.myTemplate.events({
  'click #id': ->
    FlowRouter.subsReady 'myPost', ->
      # do something
      return
    return
})
~~~

> Arunoda has discussed more about Subscription Management in Flow Router in [this](https://meteorhacks.com/flow-router-and-subscription-management.html#subscription-management) blog post about [Flow Router and Subscription Management](https://meteorhacks.com/flow-router-and-subscription-management.html).

> He's showing how to build an app like this:

>![FlowRouter's Subscription Management](https://cldup.com/esLzM8cjEL.gif)

#### Fast Render
Apollos.router has built in support for [Fast Render](https://github.com/meteorhacks/fast-render).

- `meteor add meteorhacks:fast-render`
- Put `router.js` in a shared location.

You can exclude Fast Render support by wrapping the subscription registration in an `isClient` block:

~~~coffeescript
Apollos.router.route('/blog/:postId', {
  subscriptions: (params, queryParams) ->
    # using Fast Render
    @register 'myPost', Meteor.subscribe('blogPost', params.postId)
    # not using Fast Render
    if Meteor.isClient
      @register 'data', Meteor.subscribe('bootstrap-data')
    return
})
~~~

#### Subscription Caching

You can also use [Subs Manager](https://github.com/meteorhacks/subs-manager) for caching subscriptions on the client. We haven't done anything special to make it work. It should work as it works with other routers.

## Rendering and Layout Management

Apollos.router does not handle rendering or layout management. For that, you can use [Apollos Layout](https://github.com/NewSpring/apollos-core/blob/refactor-package/layout/README.md).

Then you can invoke the layout manager inside the `action` method in the router.

~~~coffeescript
Apollos.router.route('/blog/:postId', {
  action: (params) ->
    Apollos.layout.render 'mainLayout', area: 'blog'
    return
})
~~~

## Triggers

Triggers are the way apollos.router allows you to perform tasks before **enter** into a route and after **exit** from a route.

#### Defining triggers for a route

Here's how you can define triggers for a route:

~~~coffeescript
trackRouteEntry = (context) ->
  # context is the output of `FlowRouter.current()`
  console.log 'visit-to-home', context.queryParams
  return

trackRouteClose = (context) ->
  console.log 'move-from-home', context.queryParams
  return

Apollos.router.route '/home',
  triggersEnter: [ trackRouteEntry ]
  action: ->
    # do something
    return
  triggersExit: [ trackRouteClose ]
~~~

#### Defining triggers for a group route

This is how you can define triggers to a group definition.

~~~coffeescript
adminRoutes = Apollos.router.group({
  prefix: '/admin'
  subscriptions: ->
    @register 'adminSettings', Meteor.subscribe('settings', admin: true)
    return
  triggersEnter: [ trackRouteEntry ]
  triggersExit: [ trackRouteEntry ]
})
~~~

> You can add triggers to individual routes in the group too.

#### Defining Trigges Globally

You can also define triggers globally. Here's how to do it:

~~~coffeescript
Apollos.router.triggers.enter [
  callback1
  callback2
]
Apollos.router.triggers.exit [
  callback3
  callback4
]
# filtering
Apollos.router.triggers.enter [ trackRouteEntry ], only: [ 'home' ]
Apollos.router.triggers.exit [ trackRouteExit ], except: [ 'home' ]
~~~

As you can see from the last two examples, you can filter routes using the `only` or `except` keywords. But, you can't use both `only` and `except` at once.

> If you'd like to learn more about triggers and design decisions, visit [here](https://github.com/meteorhacks/flow-router/pull/59).

#### Redirecting With Triggers

You can redirect to a different route using triggers. You can do it from both enter and exit triggers.

~~~coffeescript
Apollos.router.route('/', {
  triggersEnter: [ (context, redirect) ->
    redirect '/some-other-path'
    return
 ]
  action: (_params) ->
    throw new Error('this should not get called')
    return
})
~~~

Every trigger callback comes with a second argument. It's a function that you can used to redirect to a different route. Redirect also has few properties to make sure it's not blocking the router.

* redirect must be called with an URL
* redirect must be called within the same eventloop cycle (no async or called from inside a Tracker)
* redirect cannot be called multiple times

Check this [PR](https://github.com/meteorhacks/flow-router/pull/172) to learn more about the redirect API.


## Not Found Route

Details on our implementation with Apollos.components coming soon!


## API

Apollos.router has a rich API to help you to navigate the router and reactively get information from the router.

#### Apollos.router.getParam(paramName)

Reactive function which you can use to get a parameter from the URL.

~~~coffeescript
# route def: /apps/:appId
# url: /apps/this-is-my-app

appId = Apollos.router.getParam "appId"
console.log appId # prints "this-is-my-app"
~~~

#### Apollos.router.getQueryParam(queryStringKey)

Reactive function which you can use to get a value from the queryString.

~~~coffeescript
# route def: /apps/:appId
# url: /apps/this-is-my-app?show=yes&color=red

color = FlowRouter.getQueryParam "color"
console.log color # prints "red"
~~~

#### Apollos.router.path(pathDef, params, queryParams)

Generate a path from a path definition. Both `params` and `queryParams` are optional.

Special characters in `params` and `queryParams` will be url-encoded.

~~~coffeescript
pathDef = '/blog/:cat/:id'

params =
  cat: 'met eor'
  id: 'abc'

queryParams =
  show: 'y+e=s'
  color: 'black'

path = Apollos.router.path(pathDef, params, queryParams)
console.log path # prints "/blog/met%20eor/abc?show=y%2Be%3Ds&color=black"
~~~

If there are no params or queryParams, this will simply return the pathDef as it is.

##### Using Route name instead of the pathDef

You can also use the route's name instead of the pathDef. Then, Apollos.router will pick the pathDef from the given route. See the following example:

~~~coffeescript
FlowRouter.route '/blog/:cat/:id', {
  name: 'blogPostRoute'
  action: (params) ->
    #...
    return
}

params =
  cat: 'meteor'
  id: 'abc'

queryParams =
  show: 'yes'
  color: 'black'

path = Apollos.router.path('blogPostRoute', params, queryParams)
console.log path # prints "/blog/meteor/abc?show=yes&color=black"
~~~

#### Apollos.router.isPath(pathDef, params, queryParams)

This will return a path object or false if the path does not exist.
~~~coffeescript
FlowRouter.route '/blog/:cat/:id', {
  name: 'blogPostRoute'
  action: (params) ->
    #...
    return
}

params =
  cat: 'meteor'
  id: 'abc'

queryParams =
  show: 'yes'
  color: 'black'

path = Apollos.router.isPath('blogPostRoute', params, queryParams)
console.log path # prints "/blog/meteor/abc?show=yes&color=black"

path = Apollos.router.isPath('notPostRoute', params, queryParams)
console.log path # prints false
~~~

#### Apollos.router.go(pathDef, params, queryParams)

This will get the path via `Apollos.router.path` based on the arguments and re-route to that path.

You can call `Apollos.router.go` like this as well:

~~~js
Apollos.router.go("/blog");
~~~

#### Apollos.router.setParams(newParams)

This will change the current params with the newParams and re-route to the new path.

~~~coffeescript
# route def: /apps/:appId
# url: /apps/this-is-my-app?show=yes&color=red

Apollos.router.setParams({appId: "new-id"})
# Then the user will be redirected to the following path
#      /apps/new-id?show=yes&color=red
~~~

#### Apollos.router.setQueryParams(newQueryParams)

Just like `Apollos.router.setParams`, but for queryString params.

To remove a query param set it to `null` like below:

~~~coffeescript
Apollos.router.setQueryParams({paramToRemove: null})
~~~

#### Apollos.router.getRouteName()

To get the name of the route reactively.

~~~coffeescript
Tracker.autorun ->
  routeName = Apollos.router.getRouteName()
  console.log 'Current route name is: ', routeName
  return
~~~

#### Apollos.router.current()

Get the current state of the router. **This API is not reactive**.
If you need to watch the changes in the path simply use `Apollos.router.watchPathChange()`.

This gives an object like this:

~~~coffeescript
# route def: /apps/:appId
# url: /apps/this-is-my-app?show=yes&color=red

current = Apollos.router.current()
console.log(current)

###
  prints following object:

  {
    path: "/apps/this-is-my-app?show=yes&color=red",
    params: {
      appId: "this-is-my-app"
    },
    queryParams: {
      show: "yes",
      color: "red"
    }
    route: {
      name: "name-of-the-route"
    }
  }

###
~~~

#### Apollos.router.watchPathChange()

Reactively watch the changes in the path. If you need to simply get the params or queryParams use dedicated APIs like `Apollos.router.getQueryParam()`.

~~~coffeescript
Tracker.autorun ->
  Apollos.router.watchPathChange()
  currentContext = Apollos.router.current()
  # do anything with the current context
  return
~~~


#### Apollos.router.withReplaceState(fn)
Normally, all the route changes made via APIs like `Apollos.router.go` and `Apollos.router.setParams()` add a URL item to the browser history. For example, run the following code:

~~~coffeescript
Apollos.router.setParams({id: "the-id-1"})
Apollos.router.setParams({id: "the-id-2"})
Apollos.router.setParams({id: "the-id-3"})
~~~

Now you can hit the back button of your browser two times. This is normal behaviour since users may click the back button and expect to see the previous state of the app.

But sometimes, this is not something you want. If you don't want to pollute the browser history, then you can use the following syntax.

~~~coffeescript
Apollos.router.withReplaceState ->
  Apollos.router.setParams({id: "the-id-1"})
  Apollos.router.setParams({id: "the-id-2"})
  Apollos.router.setParams({id: "the-id-3"})

~~~

Now, there is no item in the browser history. Just like `Apollos.router.setParams`, you can use any Apollos.router API inside `Apollos.router.withReplaceState`.

> We named this function as `withReplaceState` because, replaceState is the underline API used for this functionality. Read more about [replace state & the history API](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history).

#### Apollos.router.withTrailingSlash(fn)

By default, Apollos.router removes trailing slash because it's nice. We only do it when generating path via `Apollos.router.path()`. Some other functions like `.setParams(), .go()` which changes the URL also use `Apollos.router.path()`. So, this behaviour is applied to them as well.

But, sometimes we [want](https://github.com/meteorhacks/flow-router/issues/192) trailing slashes. For those cases, you can use this API.

~~~coffeescript
Apollos.router.withTrailingSlash( ->
  Apollos.router.go('/mypath/')
)
~~~

#### Apollos.router.reload()

Apollos.router routes are idempotent. That means, even if you call `Apollos.router.go()` to the same URL multiple times, it only activates in the first run. This is also true for directly clicking on paths.

So, if you really need to reload the route, this is the API you want.

#### Apollos.router.wait() and Apollos.router.initialize()

By default, Apollos.router initilizes the routing process in a `Meteor.startup()` callback. This works for most of the apps. But, some apps have custom initializations and Apollos.router needs to initialize after that.

So, that's where `Apollos.router.wait()` comes to save you. You need to call it directly inside your JavaScript file. After that, whenever your app is ready call `Apollos.router.initialize()`.

eg:-

~~~coffeescript
# file: app.js
Apollos.router.wait()
WhenEverYourAppIsReady( ->
  Apollos.router.initialize();
)
~~~

For more information visit [issue #180](https://github.com/meteorhacks/flow-router/issues/180).


### Built in Fast Render Support

Apollos.router has built in [Fast Render](https://github.com/meteorhacks/fast-render) support. Just add Fast Render to your app and it'll work. Nothing to change in the router.

For more information check [docs](#fast-render).

### Server Side Routing

Apollos.router is a client side router and it **does not** support sever side routing at all. But `subscriptions` can be run on the server to enable Fast Render support.

#### Reason behind that

Meteor is not a traditional framework where you can send HTML directly from the server. Meteor needs to send a special set of HTML to the client initially. So, you can't directly send something to the client your self.

Also, in the server we need look for different things compared with the client. For example:

* In server we've got to deal with headers.
* In server we've got to deal with methods like `GET`, `POST`, etc.
* In server we've got cookies

So, it's better to use a dedicated server-side router like [`meteorhacks:picker`](https://github.com/meteorhacks/picker). It supports connect and express middlewares and has a very easy to use route syntax.
