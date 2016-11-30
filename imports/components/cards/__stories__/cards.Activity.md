## Activity Card

### Usage

```js
import Activity from "../../components/cards/cards.Activity";

<Activity
  status={status}
  date={date}
  message={message}
  linkText={linkText}
  linkUrl={linkUrl}
/>
```

### Properties

* **status** - the status of the activity that we want to notify the user of. Failed, Success, and Warning are the current options.
* **date** - the transaction date.
* **message** - the message to display.
* **linkText** - the text of the link.
* **linkUrl** - the url the link should go to.

### Purpose

This is currently designed to be used as an alert on the users giving dashboard.
