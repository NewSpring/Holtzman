
import React from "react";
import { connect } from "react-redux";
import YearToDate from "../../../components/cards/cards.YearToDate";
import withYTDData from "./givingSummaryEnhancer";

const graphSettings = {
  lineColor: "#6bac43",
  lineWidth: "3",
  dotColor: "#6bac43",
  dotSize: "3",
  axisStyles: {
    axis: {
      lineColor: "transparent",
      lineWidth: "0",
    },
    tickLabels: {
      fontSize: "10",
      padding: "5",
      fill: "#858585",
    },
  },
};

type IGivingSummary = {
  data: Object,
};

export const GivingSummary = (props: IGivingSummary) => {
  if (!props.data || props.data.loading || !props.data.chartData) return null;
  const data = { data: props.data.chartData, ...graphSettings };
  return (
    <div className="push-half-sides">
      <YearToDate
        graphData={data}
        amount={`${props.data.total}`}
        linkUrl="/give/history"
      />
    </div>
  );
};


export default withYTDData(
  connect((state) => ({ breakpoints: state.responsive.breakpoints }))(GivingSummary)
);
