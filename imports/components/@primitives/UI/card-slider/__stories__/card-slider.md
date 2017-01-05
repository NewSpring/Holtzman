## Card Slider

### Usage

```js
import List from "/imports/pages/celebrate/components/list";

<CardSlider items={someList} />
```

### Properties

* **items** - an array that contains the information that should display on the cards. For example:

```js
const someList = [
  { count: "11,130", label: "Total Salvations" },
  { count: "3,982", label: "Student Salvations at Fuse and Gauntlet" },
];

```

### Purpose

This is currently designed to be used to show informational content on cards in a minimal space. It's great on desktop, but even better on mobile.
