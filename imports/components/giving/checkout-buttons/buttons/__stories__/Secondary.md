## Secondary

### Usage

```js
import { SecondaryButton } from "/imports/components/giving/checkout-buttons/buttons";

<SecondaryButton
  disabled={false}
  onClick={() => { alert("clicked"); }}
/>
```

### Properties

- **disabled**:boolean? - Toggles the disabled state of the button (doesn't need a value)
- **onClick**:Function! - The function to be run on click of the button

### Purpose

This is currently designed to be used as the secondary action on Give related forms, such as "Register".
