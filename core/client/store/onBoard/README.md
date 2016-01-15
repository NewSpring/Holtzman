<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

On Board Reducer
=======================

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

> developing..
