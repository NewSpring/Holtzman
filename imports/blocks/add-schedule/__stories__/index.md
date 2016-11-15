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

<!--accounts: Object,
addTransactions: Function,
alive: boolean,
clearAllSchedulesExcept: Function,
clearSchedules: Function,
clearTransactions: Function,
existing: Object,
onClick: Function,
removeSchedule: Function,
saveSchedule: Function,
setTransactionType: Function,
text: string,-->

* **accounts** - list of accounts for the user to choose from
* **existing** - an existing schedule to render on the form
* **format** - formats the user inputted amount
* **onSubmitSchedule** - function to be run on click of submit
* **ready** - sets whether checkout is ready
* **save** - validates and saves the user inputted amount
* **saveDate**  - validates and saves the user inputted date
* **schedules** - provides a way to override the default/predefined schedules
* **setFrequency** - saves the user selected schedule
* **setFund** - saves the user selected fund
* **state** - the user's current app state
* **text** - text to be displayed on checkout
* **total** - the total of all items in the cart


### Purpose

This will display UI for creating or editing scheduled giving, i.e. ["Schedule Your Giving"](/give/schedules).

Due to limitations on editing schedules, an "Edit Your Giving" form does not currently exist.

