## ScheduleOverview component

### Usage

```js
<ScheduleOverview
  baseHeadingSize="2"
  amount="$420.00"
  frequency="Once a Month"
  started="Nov 1, 2015"
  latest="Sep 15,2106"
  onEditClick={() => alert("42")}
  onDetailClick={() => alert("Schedule Detail Clicked")}
/>
```

### Properties

* **baseHeadingSize** - a string to set the base heading size for the currency component.
* **amount** - a string that contains the amount of the scheduled gift.
* **frequency** - a string that contains the frequency of the given schedule.
* **started** - a string that contains the date the schedule was started.
* **latest** - a string that contains the last date the scheduled gift was given.
* **onEditClick** - an onClick event that fires when the edit button is clicked.
* **onDetailClick** - an onClick event that fires when view schedule details is clicked.

### Purpose

This is currently designed to be used to show recurring giving on the giving dashboard.
