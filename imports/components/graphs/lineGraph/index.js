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
  tickFormat: string[],
  lineColor: string,
  lineWidth: string,
  dotColor: string,
  axisStyles: Object,
};

const LineGraph = ({
  data,
  tickFormat,
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
        tickFormat={tickFormat}
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
