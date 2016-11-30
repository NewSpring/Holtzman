## Line Graph

### Usage

```js
import LineGraph from "../../components/graphs/lineGraph";

<LineGraph
  data={data}
/>
```

### Properties

* **data** - an object that contains the data to plot on the graph. For example:

```js
data = [
  {
    month: "January",
    amount: 100,
  },
  {
    month: "February",
    amount: 200,
  }
  ...
]
```

### Purpose

This is currently designed to display cumulative giving data by month for a signed in user.