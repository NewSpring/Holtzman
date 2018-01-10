## MetricCard component

### Usage

```js
import MetricCard from "/imports/components/@primitives/UI/cards/MetricCard";

<MetricCard
  count={count}
  label={label}
/>
```

### Properties

- **count**:string! - the metric you want to display
- **label**:string! - the description of the metric you want to display

### Note

Width and height of this card is determined by the wrapping container.

### Purpose

This is currently designed to be used to show metric data in a clean, simplified manner. These types of cards are great to use with the card slider.
