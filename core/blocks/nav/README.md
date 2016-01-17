<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>


Apollos Nav
=======================

This component makes up the universal navigation component for all NewSpring applications built on Apollos.

```javascript

import React from "react"
import { Nav } from "apollos.core/client/components"

const Global = React.createClass({
  render () {
    return (
      <div>
        {this.props.children}
        <Nav />
      </div>
    )
  }
})

export default Global

```

### Options and configuration

This navigation component is highly configurable and scaleable. It can even be themed by passing classes or a class object (using css modules) in the `theme` prop.
