<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

Core Reducers
=======================

Reducers are used to set and maintain the state of the application. For more information, read [this](http://redux.js.org/docs/basics/Reducers.html) or watch [this](https://egghead.io/series/getting-started-with-redux) (or both!).

## Reducers
- [Navigation](./nav/README.md)
- [On Board](./on-board/README.md)

#### Navigation

> Stability: Medium

The navigation store is used to set the visibility, level, and links of the global navigation in NewSpring apps and sites. Its store can be described by the following object:

```javascript
{
  level: "TOP", // TOP, CONTENT, MODAL
  visible: true, // should the nav be rendered
  // links to be rendered in nav panel
  links: [
    { id: 1, label:"Home", link:"/", icon:"icon-logo" },
    { id: 2, label:"Sections", link:"/sections", icon:"icon-sections" },
    { id: 3, label:"Discover", link:"/discover", icon:"icon-search" },
    { id: 4, label:"Profile", link:"/profile", icon:"icon-profile" }
  ]
}

```
> developing...


#### On Board

> Stability: Low

The on board store is used to manage the [on boarding process](../blocks/on-board/README.md) of users. Its store can be described by the following object:

```javascript
{
  account: true, // if data matches existing user
  authorized: false, // if the user is authorized
  forgot: false, // if the user is resetting their password
  success: false, // if their action was successful

  data: {
    email: null, // String
    password: null, // String (encrypted before launch!)
    terms: true, // String
  },

  state: "default", // "submit", "loading"

  attempts: 0, // number of attempts of form actions
  errors: {
    // <id>: {
    //   message: "Email is required"
    // }
  }
}

```

> develping...
