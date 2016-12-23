# Layout

### Usage

```js
import { Layout } from "/imports/blocks/add-schedule/Layout";

<Layout
  accounts={[{value: "General Fund"}]}
  existing={{
    amount: 10,
    details: [{
      account: { name: "Step Up", id: 180}
    }],
    next: new Date("2025", "01", "01"),
    schedule: {value: "Monthly"},
  }}
  onSubmitSchedule={() => { alert("clicked"); }}
  ready={true}
  state={{}}
  text="Make Schedule Now!"
  total={10}
/>
```

### Properties

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

