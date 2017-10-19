## Card Slider

### Usage

```js
import CardSlider from "/imports/components/@primitives/UI/card-slider";

<CardSlider>
  {salvationList.map( ({ count, label }) => {
    return <SliderCard count={count} label={label} />
  })}
</CardSlider>
```

### Properties

- **data.map** - iterate over your data and pass a component for each entry.
Some example data:

```js
const salvationList = [
  { count: "11,130", label: "Total Salvations" },
  { count: "3,982", label: "Student Salvations at Fuse and Gauntlet" },
];

```

### Purpose

This is currently designed to be used to show informational content on cards in a minimal space. It's great on desktop, but even better on mobile.
