## ScheduleOverview component

### Usage

```js
import ScheduleOverview from "../../components/cards/cards.ScheduleOverview";

<ScheduleOverview
  amount="$420.00"
  fund="Super Magical Tesla Fund"
  frequency="Once a Month"
  started="Nov 1, 2015"
  latest="Sep 15,2106"
  onEditClick={() => alert("42")}
/>
```

### Properties

* **amount** - a string that contains the amount of the scheduled gift.
* **fund** - a string that contains the name of the fund.
* **frequency** - a string that contains the frequency of the given schedule.
* **started** - a string that contains the date the schedule was started.
* **latest** - a string that contains the last date the scheduled gift was given.
* **onEditClick** - an onClick event that fires when the edit button is clicked.

### Purpose

This is currently designed to be used to show recurring giving on the giving dashboard.
