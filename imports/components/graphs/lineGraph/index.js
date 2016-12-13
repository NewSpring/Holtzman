// @flow
import {
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryScatter,
} from "victory";

type ILineGraph = {
  axisStyles: Object,
  data: Object[],
  dotColor: string,
  dotSize: string,
  lineColor: string,
  lineWidth: string,
};

const getTickFormat = (data: Object[]) => {
  const ticks = data.map((x) => (x.tick));
  return ticks;
};

const LineGraph = ({
  axisStyles,
  data,
  dotColor,
  dotSize,
  lineColor,
  lineWidth,
}: ILineGraph) => (
  <div className="">
    <VictoryChart
      padding={{ top: 5, left: 10, right: 10, bottom: 50 }}
      height={160}
      animate={{ duration: 2000 }}
    >
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
        size={dotSize}
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
