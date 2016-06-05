<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

File conventions
=======================

Across the applications, we have a few file conventions used to make a uniform developer experience.

## .js vs .jsx

Only use .jsx when creating a react component. It is a clear distinction between component and scripts.

## index files

Every folder should have an index.js / .jsx depending on what it is exporting. Two common patterns here:

```javascript
// index.jx
import foo from "./foo"

export default {
  foo
}

// index.jsx
import { Component, PropTypes} from "react"

export default class Foo extends Component {
  render () {

  }
}
```

## README.md

Each folder should contain a readme file with the following intro:

```md
<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

Foobar
=======================

```

It should go into detail about what the folder is used for and how to interact with the contents

## Subcomponents

Files should be not be named `folder.File.ext`. This was an early pattern and is overkill. If you see it, remove and remap it.
