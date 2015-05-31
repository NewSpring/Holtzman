# Apollos States

Applications built on Apollos can expose two types of client side views: pages and cards.

Pages exists only via hitting a specific route and are meant to be the more traditional style view (think server side rendered). The subscription of data for pages happens entirely within the Apollos.Router route for the given page. Ideally these are set or configured) only on the top level application view (i.e. the site or app that is using the Apollos framework). The template for the page includes markup, components and cards (among other things).

Cards are patterned usages of components and subscription of data to supply components with cached data. This is important because when a component is destroyed, the client side data is jettisoned prior to the next template render. In order to cache the dataset between components, a card should specify what data will / can be shared by components to prevent over subscription. The goal of a card is it can be included (and optionally configured) on any page in an apollos application. Cards can also change the url of the application and read from the url to set the state of the card. This is useful for page reload or sharing links.

In order for cards to be used as pages (so that state can be bubbled up to the router and visited at a url), the state management of cards should be extendable to routes. For example:

  1. A user starts filling out data for a form
  2. Halfway through they lose internet connection or encounter an error
  3. The user reloads the page as learned behavior from the web
  4. User should right where they were with as much data
    preserved as possible

The form is a card that can be used inline on any page. The top level application (view) should be able to configure routes of cards to customize the application. (e.g. all giving shouldn't have to be at /give/<account>/add-to-fund).

State management is helpful to preserve temporary data between components as well without a write to the minimongo or server side db. This can be done with card level reactive variables that all child components can read from or write to.

Setting a state should be done within each card component and should relate to a top level card.

In order to best explain this API and structuring, lets look at a sample card and its corresponding components and pages. For this example we will look at a card representing an account / item that money can be given towards.

Below are the files we will be working with for the sample fund card.
_Note that the file system shown below is abbreviated and is not meant for large scale projects_

```
- client
  - components
    - fund.add-to-fund.coffee
    - fund.add-to-fund.html
    - fund.summary.coffee
    - fund.summary.html
    - fund.vision.coffee
    - fund.vision.html
  - give.fund.coffee
  - give.fund.html
  - give.html
- lib
  - collections.coffee
  - router.coffee
- server
  - publications.coffee
```

The first thing we will need to do is set up a collection and publish it to
the client

```coffeescript
# lib/collections.coffee
Apollos.Funds = new Mongo.Collection "funds"

fund = Apollos.generateSchema
  name:
    type: String
  imageUrl:
    type: String
    optional: true
  description:
    type: String
    optional: true

Apollos.Funds.attachSchema fund

```

```coffeescript
# server/publications.coffee

# all funds, all fields
Meteor.publish "funds", ->
  Apollos.Funds.find()

# one fund, all fields
Meteor.publish "fund", (fundId) ->
  Apollos.Funds.find(fundId)

```

Now that we have our collection and publications setup we can start to look at the client side application. The first thing to do is set up a layout template to render our page into. Then we will set up the give page.

```html
<!-- client/give.html -->
<template name="layout">
  {{! simple layout to include templates using Apollos.Layout}}
  {{> Template.dynamic template=layout data=currentData}}
</template>

<template name="give">

  {{#each funds}}
    {{> give.fund name=name}}
  {{/each}}

  {{! Any other presentation data here}}

</template>

```

This template includes a head and body which would normally be abstracted to layouts. It also loops through all funds `{{funds}}` and includes a give card for each using the name as the identifier `{{> give.fund name=name}}`

In order to get the data to /give we have two choices. One is to create a give component and subscribe to the data that way. The other is to use Apollos.Router to set up a route at /give and subscribe to the data there.

__For pages it is preferable if the data is managed in the router that way the data can be server side loaded.__

```coffeescript
# lib/router.coffee
Give = Apollos.Router.group({
  prefix: "/give"
  subscriptions: ->
    # subscribe to all funds for any page within /give
    @.register("funds", Meteor.subscribe("funds"))
})

# /give
Give.route("/", {
  action: ->
    # render home page of give
    Apollos.Layout.render("layout", {template: "give"})
})

Give.route("/:fund", {
  action: (params, queryParams)->
    # render page of a single fund
    Apollos.Layout.render("layout", {
      template: "give.fund"
      name: params.fund
    })
})

```

Alright, at this point we have our data published to the client,  a route set up at /give to show all funds, and the client has subscribed to the data for funds so we shouldn't have to worry about missing data. Now time to set up the actual fund card. This is the part that could be used on any page and should just __work__.

First thing we will do is make the template to show a simple card.

```html
<!-- client/give.fund.html -->
<template name="give.fund">
  {{#if subscriptionsReady}}
    {{#with fund}}
      <img src="{{imageUrl}}"/>
      <h1>{{name}}</h1>

      <a href="#">
        Information
      </a>

      <a href="#">
        Give now
      </a>

    {{/with}}
  {{else}}

    {{! show loading state here}}

  {{/if}}
</template>
```

The only problem at this point is our `{{#with fund}}` doesn't have any  data for `{{fund}}`. We could have handled this in our /give page by wrapping each render in `{{#with}} {{/with}}` blocks BUT then in order to use the card elsewhere, we would have to do the subscription and lookup instead of the fund card handling its own data. In order to get data to the card we create an give.fund component and can populate the fund loading here. _because of our router, if a fund is used within a /give/* page, all data that it needs will already be stored client side_

```coffeescript
# give.fund.coffee
class give.fund extends Apollos.component
  @register "give.fund"


  # subscribe to fund publication with filter on fund specified
  subscriptions: -> [

    "fund":
      args: [
        @.data()?.name
      ]

  ]

  # populate helpers within template to show fund data
  fund: ->

    name = @.data()?.name
    return Apollos.Funds.findOne({name: name})

```

Now we should have pictures and names for any funds in our database! With a little setup, you can render pages with Apollos.Router and Apollos.Layout. Now we need to setup the internal workings of the `give.fund` card.


The makeup of this card is as follows:

1. Summary (default)
2. Vision
3. Add to Fund


# Still in progress

Things we need to figure out:

1. should a template be registered as a card? (✓)
  - as of right now I don't think that it should need to be registered. The data settings on it + documentation should highlight it as a card

2. how do you set defaults for templates? required? (✓)
  - the first element to register a card is the default
  - a card can specify a default at the card level

3. should siblings know about each other? (✓)
  - ideally no (seperation of concerns ftw)

4. how is data shared between elements of a card? (✓)
  - I think we can use reactive var although the list may get long in some applications, we need to test reactive var objects. So we could use the card level component as the storage provider. Within nested components how could you easily do <card>.<var>.get() instead of traversing parent components to find the card? Could all children inherit the reactive vars of the card or their parent? Can we persist this info between hot-code reloads if use use reactive dict? Right now reactive-dict has memory leaks which will prevent us from using it :(
  - the best solution for right now will be on a per template level decision  to copy vars from the parent card to itself for the child card to use. In a way this will be setting up a reactive var tree

5. how are cards within cards maintained?
  - it should be registered like a regular component. Access to states could be tricky for sure. The component that registered or included the child card should handle the life-cycleing of it and the state relationships
  - however card states will need to be change state of the parent card

6. how can a card express its state in the url? (✓)
  - this one will be really tricky. Although urls are becoming less prevalent and have no meaning (kindof) in the app world. it still is a reality in the web one and can be helpful to load a specific state of an app. The state management system could allow for hooks to update the url schema.
  - I think that reading from the url on load is going to be the harder part to set. We have a few options with this. If each component state updates the url (via state change) then double loading of the url and app logic could be avoided. The loading of state should be done by the card level component which would make since that it would also handle the reading of the url.
  - in short:
    - card handles state maintenance
    - card handles reading of the url to render
    - card handles setting of the url
    - components can update the state of the card and thus the url
    - pages can configure the segments leading up to the card
    - pages can configure if a card updates the url
  - any component that registers as a card `@card true` will try to bind urls if the @.data().bindUrls is true (should this be default?)

7. what are conventions for template types (pages, cards, components, etc) (✓)
  - this one will take a little more time to figure out. We are nearing  thing point of confusion between the components as well as when are items capitalized and when are they not?
  - I lean towards libraries and collections being Cap case
  - templates and methods being camelCase
  - private items prefixed with _
  - no snake case
  - Globals being all caps?

8. how can links be set in template for states? (✓)
  - this should be as simple as IR's {{pathFor 'name' data=foo}} if at all possible
  - this should read through the cards state settings to create a url that is either a normal url or a param / query string based url.
  - either way, these should create valid links for seo following and semantic markup. href="#" is to be avoided at all costs
  - {{Apollos.stateFor 'fund.vision' name=name}} (if in the parent card)
  - {{Apollos.stateFor 'fund.vision' from 'Apollos.give.fund' name=name}} (if outside the card)

9. where are states managed? (✓)
  - on the card level component



A card has a 1 to many relation ship with its card elements. Each element has the option to register a state and url of the parent card. An element can only register with ONE card. Cards are the outer bounds of card elements and they act as the controller and data storage for the elements. When a component is registered they set what card they belong to and their stateful name. Unless specified on the card, the first to register is the default state. Pages are ultimately responsible for the initial rendering of cards. A card will parse the url onRender to decide which state to render. Cards also have no knowledge about what page they are on or what layout they are using.

Card elements can sometimes become pages? How do they do this? Sermon entry, give fund, sign-in page, etc...


### Possible state getters
```html

<a href="{{Apollos.state 'fund.summary'}}"></a>
<a href="{{Apollos.state 'fund.summary' from 'give.fund'}}"></a>

```

### Possible registration methods for cards / card components

```coffeescript

# give.fund.coffee
class give.fund extends Apollos.component
  @register "give.fund"
  @card true # sets this component as a card


  vars: -> [
    state: "fund.summary"
  ]

  # subscribe to fund publication with filter on fund specified
  subscriptions: -> [

    "fund":
      args: [
        @.data()?.name
      ]

  ]

  # populate helpers within template to show fund data
  fund: ->

    name = @.data()?.named
    return Apollos.Funds.findOne({name: name})


```

```coffeescript
# fund.summary.coffee
class fund.summary extends Apollos.component
  @register "fund.summary"
  @card "give.fund" # set this component to belong to "give.fund" card

```

```coffeescript
# fund.vision.coffee
class fund.vision extends Apollos.component
  @register "fund.vision"
  @card "give.fund" # set this component to belong to "give.fund" card
  url: "#{@.data()?.name}" # set url to update on render / read


```

```coffeescript
# fund.addToFund.coffee
class fund.addToFund extends Apollos.component
  @register "fund.addToFund"
  @card "give.fund" # set this component to belong to "give.fund" card
  url: "#{@.data()?.name}/add-to-fund" # set url to update on render / read

```



```html
<!-- client/give.fund.html -->
<!--

  What a normal card would look out just from a data standpoint

-->
<template name="give.fund">
  {{#if subscriptionsReady}}
    {{#with fund}}
      {{> Template.dynamic template=state.get data=currentData}}
    {{/with}}
  {{else}}

    {{! show loading state here}}

  {{/if}}
</template>
```


### Existing `card` implementation (markup)

```html
<!-- from this -->
<template name="Apollos.profile.onBoard">


  {{!-- Spacebars does not have else if statements :( --}}
  {{! Need to extend so we can have else if statements}}
  {{#if resetPasswordToken}}
    {{> resetPassword
      email=email.get
    }}
  {{else}}
    {{#if passwordForget.get}}
      {{> forgotPassword
        email=email.get
      }}
    {{else}}

      {{#if Template.contentBlock}}

        {{#signin
          email=email.get
        }}
          {{> Template.contentBlock}}

        {{/signin}}

      {{else}}

        {{>signin
          email=email.get
        }}

      {{/if}}
    {{/if}}
  {{/if}}

</template>

<!-- to this -->
<template name="Apollos.profile.onBoard">

  {{> Template.dynamic template=state.get data=currentData}}

</template>
```
