## Line Graph

### Usage

```js
<LineGraph
  data={data}
  tickFormat={tickFormat}
  lineColor={lineColor}
  lineWidth={lineWidth}
  dotColor={dotColor}
  axisStyles={axisStyles}
/>
```

### Properties

* **data** - an object that contains the data to plot on the graph. For example:

```js
data = [
  {
    month: "January",
    amount: 100,
    tick: "J",
  },
  {
    month: "February",
    amount: 200,
    tick: "F",
  }
  ...
]
```

* **lineColor** - the color of the line in the graph.
* **lineWidth** - the width of the line in the graph.
* **dotColor** - the color of the dots on the graph.
* **axisStyles** - an object containing styles for the axis. An example:

```js
const axisStyles = {
  axis: {
    lineColor: "transparent",
    lineWidth: "0",
  },
  tickLabels: {
    fontSize: "10",
    padding: "5",
    fill: "#858585",
  },
};
```

### Purpose

This is currently designed to display cumulative giving data by month for a signed in user.