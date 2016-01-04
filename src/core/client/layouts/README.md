<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

Core Layouts
=======================

Layouts can represent a `dumb component` only used to configure the visual layout of the page, or they can be `smart components` used to configure the state and abilities of children components. The most complex layout is the [global](#global) as it is the uppermost layout in Apollos applications.

## Global

> Stability: Medium

The global template is used as the starting point of Apollos applications and sites. It configures the most critical state of the application, the store. Currently the global template also includes the [navigation component](../components/nav/README.md) component as part of the default layout.

### Usage

The intended usage of the `Global` template is a part of the uppermost component in the application or site. For example:

```javascript
// import libraries
import { Component, PropTypes} from "react"
import ReactMixin from "react-mixin"
import { connect } from "react-redux"

// import Global template and tie-ins to the store
import { Global } from "apollos/core/client/layouts"
import { storeRoutes } from "apollos/core/lib/store"

// import account packages for application
import { onBoard } from "apollos/rock/client/middlewares"
import { addMiddleware } from "apollos/core/client/middlewares"

// add onBoarding middlewares for communciation to Rock
addMiddleware(
  onBoard
)

// hook up component with store from Global and Meteor reactive data
@connect()
@ReactMixin.decorate(ReactMeteorData)
class Layout extends Component {

  getMeteorData() {

    const user = Meteor.user()
    this.setLoggedIn(user)

    return {
      user
    }
  }

  setLoggedIn = (user) => {
    const { dispatch } = this.props
    if (user) { dispatch(onBoardActions.authorize(true)) }
  }

  render() {
    // this component is purely used for data actions, no custom markup
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

// Wraping component for application to pass store to
// above component for every page
class App extends Component {
  render () {
    return (
      <Global>
        <Layout>
          {this.props.children}
        </Layout>
      </Global>
    )
  }
}

// load routes
import { Home } from "app/client/pages"

// export routes for react-router SSR (see entry file)
export default storeRoutes({
  path: "/",
  component: App,
  indexRoute: { component: Home }
  // childRoutes: Routes
})

```

> developing...
