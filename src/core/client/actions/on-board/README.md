<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

On Board Actions
=======================

> Stability: **Low**

The on-boarding actions are used to update and change the state of the on-boarding process. This API is unstable and may eventually merge with `Account` actions.

It currently supports the following actions:
- [setAccount](#setaccount)
- [save](#save)
- [clear](#clear)
- [setState](#setState)
- [submit](#submit)
- [loading](#loading)
- [error](#error)
- [fix](#fix)
- [reset](#reset)
- [setErrors](#setErrors)
- [success](#success)
- [fail](#fail)
- [forgot](#forgot)
- [remember](#remember)
- [authorize](#authorize)

#### Usage

```javascript
import { onBoard as onBoardActions } from "apollos/core/client/actions"

// some component with @connect called or access to dispatch to the store
dispatch(onBoardActions.save({email: "test@example.com"}))
```

### Types

The onboard actions also contain the types of action handlers as part of the export. The types are as follow:

```javascript
const types = {
  SET_ACCOUNT_STATUS: "ONBOARD.SET_ACCOUNT_STATUS",
  SET_DATA: "ONBOARD.SET_DATA",
  REMOVE_DATA: "ONBOARD.REMOVE_DATA",
  SET_FORGOT: "ONBOARD.SET_FORGOT",
  SET_STATE: "ONBOARD.SET_STATE",
  SET_ERROR: "ONBOARD.SET_ERROR",
  REMOVE_ERROR: "ONBOARD.REMOVE_ERROR",
  SET_ERRORS: "ONBOARD.SET_ERRORS",
  SET_SUCCESS: "ONBOARD.SET_SUCCESS",
  IS_AUTHORIZED: "ONBOARD.IS_AUTHORIZED"
}
```
To use the types, you can
```javascript
import { types } from "apollos/core/client/actions/on-board"
```

### Actions

##### setAccount
* **type:** "ONBOARD.SET_ACCOUNT_STATUS"
* **param:** account // Boolean value

The setAccount method is used to update the store to show if the credentials in the store (typically just the email) already has an account in the system. It is used by the Rock package to lookup accounts in Rock to determine if a user should sign-in or sign-up

Sample dispatch event:
```json
{
  "type": "ONBOARD.SET_ACCOUNT_STATUS",
  "account": true
}
```

> developing...
