# Guest

### Usage

```js
import { Guest } from "/imports/blocks/checkout-buttons/buttons";

<Guest
  disable={false}
  onClick={() => { alert("clicked"); }}
  text="Give as guest"
/>
```

### Properties

* **disabled** - disables the button
* **onClick** - function to be run on click of button
* **text** - text to be displayed in button

### Purpose

This is currently designed to be used as a tertiary button on Give related forms, such as "Give As Guest" and "Change Payment Options".
