<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

Split Layout
=======================

The split layout allows you to configure split panel layouts. It can be used as a top level component of a page or sub component

## Usage

```javascript
import { Component, PropTypes} from "react"

import Split, { Left, Right } from "apollos/blocks/split"

export default class Home extends Component {

  render () {
    return (
      <Split nav={true} >

        <Right styles={{backgroundColor: "mintcream"}}>
        </Right>

        <Left scroll={true} >
          <div className="soft-double@lap-and-up push-double-top@lap-and-up">
            <h1>Hello World</h1>
          </div>

        </Left>
      </Split>

    )
  }
}

```

## Included Components

##### Split

Used to create wrapping panel class

##### Left and Right

Used to pass children to corresponding left and right panels
