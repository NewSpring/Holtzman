# Recover

### Usage

```js
<Recover
  schedules={schedules}
  hide={hide}
  onClick={recoverOnClick}
/>
```

### Properties

* **schedules** - an object that contains the schedules this account has that can be recovered.
* **hide** - a function that will run when the primary button is clicked to hide the modal this component displays on and take you to the confirm schedule page.
* **onClick** - a function that will run when the secondary button is clicked to take you to the remind modal.

### Purpose

This is currently designed to alert the user to the fact that they have a previous schedule that they can recover.
