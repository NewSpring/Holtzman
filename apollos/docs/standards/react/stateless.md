<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

Stateless Components
=======================

Since introduced in React 0.14, stateless components have become a great tool for reusable, predicable DOM generation without the performance cost associated with full `class` generation.

> Sometimes these are called pure or dumb components but I prefer stateless

Stateless components are like functional programming with the DOM. Same input => same output always. They have no internal state and can/should make up a large part of an application.  

## Anatomy of a stateless component

```javascript
import { Component, PropTypes } form "react"

// create the component. This is a great place to use destructuring of props
// stateless components should have an implied return via the `()`
const Foo = ({ children }) => (
  <div>{ children }</div>
)

// defined propTypes for the component
Foo.propTypes = {
  children: PropTypes.string
}

// set default props
Foo.defaultProps = {
  children: "Hello World!"
}

export default Foo
```

## When to use

Whenever possible. In the upcoming versions of React, stateless components will be given performance optimizations making the app faster and a better experience for our users.

Stateless components are also incredibly easy to test
