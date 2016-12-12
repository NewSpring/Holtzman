
import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";
import moment from "moment";
import YearToDate from "../../../components/cards/cards.YearToDate";

const mockTotals = {
  data: [
    { month: "January", amount: 0, tick: "J" },
    { month: "February", amount: 0, tick: "F" },
    { month: "March", amount: 0, tick: "M" },
    { month: "April", amount: 0, tick: "A" },
    { month: "May", amount: 0, tick: "M" },
    { month: "June", amount: 0, tick: "J" },
    { month: "July", amount: 0, tick: "J" },
    { month: "August", amount: 0, tick: "A" },
    { month: "September", amount: 0, tick: "S" },
    { month: "October", amount: 0, tick: "O" },
    { month: "November", amount: 0, tick: "N" },
    { month: "December", amount: 0, tick: "D" },
  ],
};

const graphSettings = {
  ...mockTotals,
  lineColor: "#6bac43",
  lineWidth: "3",
  dotColor: "#6bac43",
  dotSize: "5",
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

const SUMMARY_QUERY = gql`
  query givingSummary($start: String!, $end: String!) {
    accounts{
      total(start: $start, end: $end)
      name
      transactions(start: $start, end: $end) {
        id
        details {
          amount
        }
      }
    }
  }
`;

const currentYear = moment().format("YY");
const withSummaryData = graphql(SUMMARY_QUERY, {
  name: "summaryData",
  options: {
    variables: {
      start: `01/${currentYear}`,
      end: `12/${currentYear}`,
    },
  },
});

type IGivingSummary = {
  feed: Object,
  summaryData: Object,
};

export class GivingSummary extends Component {
  props: IGivingSummary;

  formatGivingSummaryData():Object {
    if (!this.props.summaryData
      || !this.props.summaryData.accounts
      || !Array.isArray(this.props.summaryData.accounts)) return null;

    const accounts = this.props.summaryData.accounts;

    // this is the graphData object
    const totals = {
      data: [
        { month: "January", amount: 0, tick: "J" },
        { month: "February", amount: 0, tick: "F" },
        { month: "March", amount: 0, tick: "M" },
        { month: "April", amount: 0, tick: "A" },
        { month: "May", amount: 0, tick: "M" },
        { month: "June", amount: 0, tick: "J" },
        { month: "July", amount: 0, tick: "J" },
        { month: "August", amount: 0, tick: "A" },
        { month: "September", amount: 0, tick: "S" },
        { month: "October", amount: 0, tick: "O" },
        { month: "November", amount: 0, tick: "N" },
        { month: "December", amount: 0, tick: "D" },
      ],
    };

    return totals;
  }

  renderGivingSummary = (data) => {
    const { breakpoints } = this.props;
    // if (breakpoints.length && breakpoints.indexOf("lap-and-up") === -1) {
    return (
      <YearToDate
        amount={`${this.props.summaryData.total}`}
        graphData={data}
        linkUrl={"/give/history"}
      />
    );
    // }
    // return null;
  }


  render() {
    if (
      !this.props.summaryData
      || !this.props.summaryData.accounts
      || this.props.summaryData.accounts.length === 0
    ) return null;

    let graphData;
    if (this.props.summaryData.loading === false) {
      graphData = { ...this.formatGivingSummaryData(), ...graphSettings };
    }

    return (
      <div>
        {graphData ? this.renderGivingSummary(graphData) : null}
      </div>
    );
  }

}

export default withSummaryData(
  connect((state) => ({ breakpoints: state.responsive.breakpoints }))(GivingSummary)
);
