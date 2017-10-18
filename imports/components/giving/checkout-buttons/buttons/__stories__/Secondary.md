## Secondary

### Usage

```js
import { SecondaryButton } from "/imports/components/giving/checkout-buttons/buttons";

<SecondaryButton
  disable={false}
  onClick={() => { alert("clicked"); }}
/>
```

### Properties

* **disabled**:boolean? - disables the button
* **onClick**:Function! - function to be run on click of button

### Purpose

This is currently designed to be used as the secondary action on Give related forms, such as "Register".
