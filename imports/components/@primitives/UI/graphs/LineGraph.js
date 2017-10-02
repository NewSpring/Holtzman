// @flow
import {
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryScatter,
  VictoryArea,
} from "victory";
import React, { Component } from "react";

type ILineGraph = {
  axisStyles: Object,
  data: Object[],
  dotColor: string,
  dotSize: string,
  lineColor: string,
  lineWidth: string,
};

const getTickFormat = (data: Object[]) => {
  const ticks = data.map(x => (x.tick));
  return ticks;
};


type IGradientGroup = {
  style?: Object,
  events?: Object,
  transform?: Object,
  children?: any,
  gradientColor: string,
};

const GradientGroup = ({ style, events, transform, children, gradientColor }: IGradientGroup) => (
  <g
    style={style}
    {...events}
    transform={transform}
  >
    <defs>
      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset=".5" stopOpacity="1" stopColor={gradientColor} />
        <stop offset="1" stopOpacity="0" stopColor={gradientColor} />
      </linearGradient>
    </defs>
    {children}
  </g>
);

class LineGraph extends Component {
  props: ILineGraph;
  graphContainer: Element;

  componentDidMount() {
    const renderedChart = this.graphContainer.querySelectorAll("[aria-labelledby='title desc']");
    if (renderedChart && renderedChart.length) renderedChart[0].removeAttribute("height");
  }

  render() {
    const {
      axisStyles,
      data,
      dotColor,
      dotSize,
      lineColor,
      lineWidth,
    } = this.props;
    return (
      <div
        className=""
        ref={el => (this.graphContainer = el)}
      >
        <VictoryChart
          height={160}
          padding={{ top: 5, left: 10, right: 10, bottom: 20 }}
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
                fill: `${axisStyles.tickLabels.fill}`,
              },
            }}
            tickFormat={getTickFormat(data)}
          />
          <VictoryArea
            data={data}
            x="month"
            y="amount"
            groupComponent={<GradientGroup gradientColor={lineColor} />}
            style={{
              data: { fill: "url(#gradient)", stroke: "none", opacity: 0.5 },
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
          <VictoryScatter
            data={data}
            x="month"
            y="amount"
            size={dotSize}
            style={{
              data: { fill: dotColor },
            }}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default LineGraph;
