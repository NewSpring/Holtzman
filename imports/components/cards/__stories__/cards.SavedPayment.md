## SavedPaymentCard component

### Usage

```js
import SavedPaymentCard from "../../components/cards/cards.SavedPayment";

<SavedPaymentCard
  payment={paymentAccount}
  onClick={() => alert("42")}
/>
```

### Properties

* **payment** - an object that contains the payment account information the card should display. For example:
* **onClick** - an onClick function that is fired when the card is clicked.

```js
const paymentAccount = {
  id: "1242",
  name: "Yule Brenner",
  payment: {
    accountNumber: "4111224499001256",
    paymentType: "Visa"
  }
};
```

### Purpose

This is currently designed to be used to show saved payment account information on the giving dashboard.
