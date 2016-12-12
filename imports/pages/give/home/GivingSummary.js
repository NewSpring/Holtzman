
import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";
import moment from "moment";
import YearToDate from "../../../components/cards/cards.YearToDate";

const graphSettings = {
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
        date
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

  constructor() {
    super();

    this.state = {
      accounts: {},
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
  }

  componentWillReceiveProps(nextProps) {
    let graphData;
    if (nextProps.summaryData.loading === false) {
      graphData = {
        ...this.formatGivingSummaryData(nextProps.summaryData.accounts),
        ...graphSettings,
      };
    }
    console.log(nextProps);
    console.log("state", this.state);
  }

  formatGivingSummaryData(data):Object {
    data.map((account) => {
      let accountTotal = account.total;
      let monthTotals = [];
      // add this account's total to state
      // this.setState(
      //   (prevState) => {
      //     const newState = prevState;
      //     newState.accounts[account.name] = account.total;
      //     return newState;
      //   }
      // );
      account.transactions.map((transaction) => {

      });
    });

    return this.state.data;
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

    return (
      <div>
        { /*graphData ? this.renderGivingSummary(graphData) : null*/ }
        hello
      </div>
    );
  }

}

export default withSummaryData(
  connect((state) => ({ breakpoints: state.responsive.breakpoints }))(GivingSummary)
);
