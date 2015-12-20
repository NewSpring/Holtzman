<p align="center" >
  <a href="http://newspring.cc">
    <img src="https://s3.amazonaws.com/ns.images/newspring/icons/newspring-church-logo-black.png" alt="NewSpring Church" title="NewSpring Church" />
  </a>
</p>

Core Actions
=======================

Currently Supported Actions
- [Navigation](./nav)
- [On Board](./on-board)

### Navigation
The navigation actions are used to update and change the state of the side and bottom navigation panel for Apollos sites and applications.

It currently supports the following actions:
- [setLevel](./nav/README.md#setLevel)
- [reset](./nav/README.md#reset)
- [setLinks](./nav/README.md#setLinks) // unstable
- [hide](./nav/README.md#hide)
- [show](./nav/README.md#show)

#### Usage

```javascript
import { nav as navActions } from "apollos/core/client/actions"

// some component with @connect called or access to dispatch to the store
dispatch(navActions.setLevel("TOP"))

```

### On Board

The on-boarding actions are used to update and change the state of the on-boarding process. This API is unstable and may eventually merge with `Account` actions.

It currently supports the following actions:
- [setAccount](./on-board/README.md#setaccount)
- [save](./on-board/README.md#save)
- [clear](./on-board/README.md#clear)
- [setState](./on-board/README.md#setState)
- [submit](./on-board/README.md#submit)
- [loading](./on-board/README.md#loading)
- [error](./on-board/README.md#error)
- [fix](./on-board/README.md#fix)
- [reset](./on-board/README.md#reset)
- [setErrors](./on-board/README.md#setErrors)
- [success](./on-board/README.md#success)
- [fail](./on-board/README.md#fail)
- [forgot](./on-board/README.md#forgot)
- [remember](./on-board/README.md#remember)
- [authorize](./on-board/README.md#authorize)


#### Usage

```javascript
import { onBoard as onBoardActions } from "apollos/core/client/actions"

// some component with @connect called or access to dispatch to the store
dispatch(onBoardActions.save({email: "test@example.com"}))
```
