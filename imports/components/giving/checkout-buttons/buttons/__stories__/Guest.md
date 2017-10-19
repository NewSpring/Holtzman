## Guest

### Usage

```js
import { Guest } from "/imports/components/giving/checkout-buttons/buttons";

<Guest
  disabled={false}
  onClick={() => { alert("clicked"); }}
  text="Give as Guest"
/>
```

### Properties

* **disabled**:boolean? - Toggles the disabled state of the button (doesn't need a value)
* **onClick**:Function! - The function to be run on click of the button
* **text**:string? - The text to be displayed in the button

### Purpose

This is currently designed to be used as a tertiary button on Give related forms, such as "Give As Guest" and "Change Payment Options".
