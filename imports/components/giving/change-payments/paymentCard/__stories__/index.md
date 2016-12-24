# Change Payment

### Usage

```js
import ChangePayments from "../../index";

<ChangePayments
  dispatch: () => {},
  savedAccounts: {},
  currentAccount: {},
/>
```

### Properties

* **dispatch** - a function that calls actions to change the state of the component
* **savedAccounts** - an array of objects containing saved accounts to display
* **currentAccount** - an object containing the currently selected account to use in giving.

### Purpose

This is currently designed to show the saved payment accounts and allow the user to choose which payment account should be the primary.
