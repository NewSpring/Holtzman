## Side By Side Card

### Usage

```js
import SideBySide from "/imports/components/@primitives/UI/cards/SideBySideCard";

<SideBySide
  images={images}
>
  <h3>{title}</h3>
  <p>{summary}</p>
  <div className="btn--dark-tertiary btn--small">{button}</div>
</SideBySide>
```

### Properties

* **title** - card title
* **summary** - the content of the card.
* **button** - the call to action associated with the card.
* **image** - the background image with the card.

### Purpose

This is currently designed to be used to show the different giving funds available and to allow a user to learn more by clicking on the card.
