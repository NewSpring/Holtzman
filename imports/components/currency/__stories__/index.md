## Currency component

### Usage

```js
import Currency from "../../components/currency";

<Currency
  amount="$420.00"
  baseHeadingSize="2"
  className="text-left"
  roundCurrency
  textColor="text-dark-primary"
/>
```

### Properties

* **amount** - a string that contains the monetary value.
* **baseHeadingSize** - the H size of the dollar value.  ex: H2 = "2"
* **className** - allows you to add classes to the wrapper
* **roundCurrency** - rounds the monetary value, and omits the cents
* **textColor** - default is "text-dark-primary", but allows you to use a different class

### Purpose

This component is the primary way that we display currency across our sites.
