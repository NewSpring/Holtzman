import React, { Component } from "react";
import { VictoryChart, VictoryGroup, VictoryAxis, VictoryLine, VictoryVoronoi, VictoryLabel, VictoryScatter } from "victory";

const data = [
  {
    month: "January",
    value: 100,
  },
  {
    month: "Febuary",
    value: 200,
  },
  {
    month: "March",
    value: 100,
  },
  {
    month: "April",
    value: 0,
  },
  {
    month: "May",
    value: 150,
  },
  {
    month: "June",
    value: 100,
  },
  {
    month: "July",
    value: 200,
  },
  {
    month: "August",
    value: 100,
  },
  {
    month: "September",
    value: 300,
  },
  {
    month: "October",
    value: 100,
  },
  {
    month: "November",
    value: 100,
  },
  {
    month: "December",
    value: 500,
  },
];

const styles = {
  line: {
    data: { stroke: "#6bac43", strokeWidth: "3" },
  },
  scatter: {
    data: { fill: "#6bac43" },
  },
  axis: {
    axis: { stroke: "blue", strokeWidth: "0" },
    grid: { stroke: "blue", strokeWidth: "0" },
    ticks: { stroke: "blue", strokeWidth: "0" },
    tickLabel: { fontSize: 4 },
    tickLabels: { fontSize: 10, padding: 5 },
  },
};

class LineGraph extends Component {
  render() {
    return(
      <VictoryGroup
        data={data}
        x="month"
        y="value"
      >
        <VictoryAxis
          style={styles.axis}
          scale="time"
          tickValues={["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]}
          standalone={false}
        />
        <VictoryScatter
          style={styles.scatter}
          standalone={false}
        />
        <VictoryLine
          style={styles.line}
          standalone={false}
        />
      </VictoryGroup>
    );
  }
}

export default LineGraph;
