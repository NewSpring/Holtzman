<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

Container Components
=======================

From Jason Bonta's talk about high performance components at Facebook:

> A container does data fetching and then renders its corresponding sub-component. That’s it.

“Corresponding” meaning a component that shares the same name:

```javascript
StockWidgetContainer => StockWidget
TagCloudContainer => TagCloud
PartyPooperListContainer => PartyPooperList
```

Container components are a critical layer of our front end structure. They should NEVER render HTML, only orchestrate the rendering of sub-components. They typically pair well with layout components (used to structure HTML + state / stateless components)


## Anatomy of a container component

```javascript
import { Component, PropTypes } from "react"
import ReactMixin from "react-mixin"

// subcomponents
import FooLayout from "./FooLayout"

// decorated with reactivity with Meteor
@ReactMixin.decorate(ReactMeteorData)
class FooContainer extends Component {

  // setup reactive data action (like a Tracker wrapper)
  getMeteorData() {
    let alive = true;

    try {
      alive = serverWatch.isAlive("ROCK")
    } catch (e) {}

    return { alive }
  }

  // orchestrate the rendering of subcomponents
  render() {
    if (!alive) {
      return null
    }
    // render sub component
    return <FooLayout {...this.props} />
  }

}

```

## Data types

Data that can / should be used in conjunction with container components are as follows:

- [ ] external data using `fetch`
- [ ] redux store data using `@connect((store) => ({ prop: key }))`
- [ ] meteor data using `@ReactMixin.decorate(ReactMeteorData)`
- [ ] external / cached data using `query` / `gql` / `lokka`

If you find yourself using the above data actions in a component, it should be a container. Remove your HTML and handle yo business.


## Data stores

Containers are also the ideal place to store data that doesn't need to be global / added to the store, as well as set overarching actions regarding events (i.e. form submissions and local data storage)
