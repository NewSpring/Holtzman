
import React from "react";
import { connect } from "react-redux";
import YearToDate from "../../../components/giving/cards/YearToDateCard";
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
  breakpoints: String[],
};

export const Display = ({ data }: { data: Object }) => {
  if (!data || data.loading || !data.chartData) return null;
  return (
    <YearToDate
      graphData={{ ...{ data: data.chartData }, ...graphSettings }}
      amount={data.total.toFixed(2)}
      linkUrl="/give/history"
    />
  );
};

const DisplayWithData = withYTDData(Display);

export const GivingSummary = (props: IGivingSummary) => {
  if (props.breakpoints.includes("lap-and-up")) return null;
  return <DisplayWithData />;
};


export default connect(state => ({ breakpoints: state.responsive.breakpoints }))(
  GivingSummary,
);
