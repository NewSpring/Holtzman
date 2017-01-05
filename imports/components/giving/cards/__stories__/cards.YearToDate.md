## Year To Date

### Usage

```js
<YearToDate
  amount={amount}
  graphData={graphData}
  linkUrl={linkUrl}
/>
```

### Properties

* **amount** - the amount of the year to date contributions.
* **graphData** - all of the data needed to show the graph. This includes:

```js
const graphData = {
  data: [
    {
      month: "January",
      amount: 300,
      tick: "J",
    },
    {
      month: "Febuary",
      amount: 275,
      tick: "F",
    },
    ...
  ],
  lineColor: "#6BAC43",
  lineWidth: "3",
  dotColor: "#6BAC43",
  dotSize: "5",
  axisStyles: {
    axis: {
      lineColor: "transparent",
      lineWidth: "0",
    },
    tickLabels: {
      fontSize: "20",
      padding: "8",
      fill: "#858585",
    },
  },
};
```

* **linkUrl** - the url the link should go to.

### Purpose

This is currently designed to show the logged in user their year to date contributions.
