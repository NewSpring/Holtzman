# CartContainer

### Usage

```js
import { CartContainer } from "/imports/blocks/add-schedule/index";

<CartContainer
    accounts={[{ id: 180, name: "Step Up" }]}
    alive={true}
    addTransactions={() => { alert("added transaction"); }}
    clearAllSchedulesExcept={() => {}}
    clearSchedules={() => {}}
    clearTransactions={() => {}}
    onClick={() => { alert("clicked"); }}
    removeSchedule={() => { alert("removed schedule"); }}
    saveSchedule={() => { alert("saved schedule"); }}
    setTransactionType={() => { alert("set type"); }}
    text={"Give Now!"}
  />
```

### Properties

* **accounts** -
* **addTransactions** - adds a transaction to the cart
* **alive** - indicates whether the giving service is online
* **clearAllSchedulesExcept** - removes other schedules from the cart
* **clearSchedules** - removes all schedules from the cart
* **clearTransactions** - removes all transactions from the cart
* **existing** - an existing schedule to load in the cart
* **onClick** - function to be run on click of checkout
* **removeSchedule** - removes an existing schedule
* **saveSchedule** - saves the selected fund, frequency, and start date
* **setTransactionType** - sets the payment type (one-time/recurring)
* **text** - text to be displayed on checkout

### Purpose

This component wires up a cart for processing scheduled payments.

The cart will save schedules once the user checks out.
