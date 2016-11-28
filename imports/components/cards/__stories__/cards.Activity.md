## Activity Card

### Usage

```js
import Activity from "../../components/cards/cards.Activity";

<Activity
  status={status}
  date={date}
  amount={amount}
  fundName={fundName}
  savedAccount={savedAccount}
  onClick={() => { alert("clicked"); }}
/>
```

### Properties

* **status** - the status of the activity that we want to notify the user of. Failed, Success, and Warning are the current options.
* **date** - the transaction date.
* **amount** - the amount of the transaction.
* **fundName** - the fund that the transaction is tied to.
* **savedAccount** - the saved account that is tied to this particular user.
* **onClick** - a function that decides what happens when the user clicks the call to action.

### Purpose

This is currently designed to be used as an alert on the users giving dashboard.
