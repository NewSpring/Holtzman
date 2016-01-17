<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

Components
=======================

Components make up the life blood of our client layer. They handle the heavy lifting of binding actions to interaction points. User interaction functions live here, internal state controlled components live here, and complex DOM generation live here.

## Anatomy of a component

Components fill the gap between [container](./containers.md) and [stateless](./stateless) components. They handle the full suite of lifecycle events, have other functions, and most importantly set the requirements of usage through propTypes.

```javascript
import { Component, PropTypes } from "react"

// sub components
import NavLink from "./nav.link"
import styles from "./nav.css";

// create component
export default class NavLayout extends Component {

  // define typed model that parents can use
  // isRequired is your friend to prevent exceptions from being thrown
  // propTypes acts as a component's API in a lot of ways
  static propTypes = {
    classes: PropTypes.array,
    theme: PropTypes.string,
    style: PropTypes.object,
    links: PropTypes.array.isRequired
  }

  // when possible, defaults help to prototype quickly before data patterns are set
  static defaultProps = {
    style: {}
  }

  // creating internal methods is recommended instead of polluting the render function
  layoutClasses = () => {
    let classes = [
      "one-whole",
      "floating",
      "soft-half",
      "locked-left",
      "locked-bottom",
      "hard-sides@lap-and-up",
      "soft-half-top@lap-and-up"
    ];


    if (this.props.classes) {
      classes.concat(this.props.classes);
    } else {
      classes.push(styles["nav-bar"]);
    }

    return classes.join(" ");
  }

  // render actual HTML and sub components, huzzah
  // props should be reliable thanks to default and proptypes
  render () {

    return (
      <section
        className={ this.props.theme || this.layoutClasses() } style={this.props.style}
      >
        {this.props.links.map((item, i) => {
          return <NavLink navItem={item} key={i} />
        })}
      </section>
    )
  }
}

```

## Connect / Redux

Components should not interact with the store, that is the containers job
