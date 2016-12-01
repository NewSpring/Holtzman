// @flow
import {
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryScatter,
} from "victory";

// const styles = {
//   axis: {
//     axis: { stroke: "transparent", strokeWidth: "0" },
//     tickLabels: {
//       fontFamily: "colfax-web, sans-serif",
//       fontSize: 10,
//       padding: 20,
//       fill: "#858585",
//     },
//   },
// };

type ILineGraph = {
  data: Object,
  lineColor: string,
  lineWidth: string,
  dotColor: string,
  axisStyles: Object,
};

const getTickFormat = (data: Object) => {
  const ticks = data.map((x) => (x.tick));
  return ticks;
};

const LineGraph = ({
  data,
  lineColor,
  dotColor,
  lineWidth,
  axisStyles,
}: ILineGraph) => (
  <div className="push soft-half">
    <VictoryChart>
      <VictoryAxis
        style={{
          axis: {
            stroke: `${axisStyles.axis.lineColor}`,
            strokeWidth: `${axisStyles.axis.lineWidth}`,
          },
          tickLabels: {
            fontFamily: "colfax-web, sans-serif",
            fontSize: `${axisStyles.tickLabels.fontSize}`,
            padding: `${axisStyles.tickLabels.padding}`,
            fill: `${axisStyles.tickLabels.fill}`,
          },
        }}
        tickFormat={getTickFormat(data)}
      />
      <VictoryScatter
        data={data}
        x="month"
        y="amount"
        style={{
          data: { fill: `${dotColor}` },
        }}
      />
      <VictoryLine
        data={data}
        x="month"
        y="amount"
        style={{
          data: { stroke: `${lineColor}`, strokeWidth: `${lineWidth}` },
        }}
      />
    </VictoryChart>
  </div>
);

export default LineGraph;
