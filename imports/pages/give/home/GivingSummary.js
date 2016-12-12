
import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";
import moment from "moment";
import YearToDate from "../../../components/cards/cards.YearToDate";
import withYTDData from "./givingSummaryEnhancer";

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

// const SUMMARY_QUERY = gql`
//   query givingSummary($start: String!, $end: String!) {
//     accounts{
//       total(start: $start, end: $end)
//       name
//       transactions(start: $start, end: $end) {
//         id
//         date
//         details {
//           amount
//         }
//       }
//     }
//   }
// `;

// const currentYear = moment().format("YY");
// const withSummaryData = graphql(SUMMARY_QUERY, {
//   name: "summaryData",
//   options: {
//     variables: {
//       start: `01/${currentYear}`,
//       end: `12/${currentYear}`,
//     },
//   },
// });

type IGivingSummary = {
  feed: Object,
  summaryData: Object,
};

export class GivingSummary extends Component {
  props: IGivingSummary;

  // constructor() {
  //   super();

  //   this.state = {
  //     total: 0,
  //     accounts: {
  //       "Step Up": 100,
  //       "General Fund": 1234,
  //     },
  //     data: [
  //       { month: "January", amount: 0, tick: "J" },
  //       { month: "February", amount: 0, tick: "F" },
  //       { month: "March", amount: 0, tick: "M" },
  //       { month: "April", amount: 0, tick: "A" },
  //       { month: "May", amount: 0, tick: "M" },
  //       { month: "June", amount: 0, tick: "J" },
  //       { month: "July", amount: 0, tick: "J" },
  //       { month: "August", amount: 0, tick: "A" },
  //       { month: "September", amount: 0, tick: "S" },
  //       { month: "October", amount: 0, tick: "O" },
  //       { month: "November", amount: 0, tick: "N" },
  //       { month: "December", amount: 0, tick: "D" },
  //     ],
  //   };
  // }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
  // componentWillReceiveProps(nextProps) {
  //   let graphData;
  //   if (nextProps.summaryData.loading === false) {
  //     graphData = {
  //       ...this.formatGivingSummaryData(nextProps.summaryData.accounts),
  //       ...graphSettings,
  //     };
  //   }
  //   // console.log(nextProps);
  //   // console.log("state", this.state);
  // }

  // formatGivingSummaryData(data):null {
  //   if (!Array.isArray(data)) return null;
  //   let total = 0;
  //   const monthTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  //   const accounts = {};

  //   data.map((account) => {
  //     accounts[account.name] = account.total;
  //     // iterate over every transaction, and sum up the months
  //     account.transactions.map((transaction) => {
  //       const month = moment(transaction.date).format("M");
  //       monthTotals[month] += transaction.details[0].amount;
  //       total += transaction.details[0].amount;
  //     });
  //     return null;
  //   });

  //   // set the state
  //   this.setState(prevState => {
  //     const newState = prevState;
  //     newState.total = total;
  //     newState.accounts = accounts;
  //     for (let i: number = 0; i < 12; i += 1) {
  //       newState.data[i].amount = monthTotals[i];
  //     }
  //     return newState;
  //   });
  // }

  // renderGivingSummary = (data) => {
  //   const { breakpoints } = this.props;
  //   // if (breakpoints.length && breakpoints.indexOf("lap-and-up") === -1) {
  //   return (
  //     <YearToDate
  //       amount={`${this.props.summaryData.total}`}
  //       graphData={data}
  //       linkUrl={"/give/history"}
  //     />
  //   );
  //   // }
  //   // return null;
  // }


  render() {
    // if (
    //   !this.props.summaryData
    //   || !this.props.summaryData.accounts
    //   || this.props.summaryData.accounts.length === 0
    // ) return null;

    // console.log("state in render", this.state);

    console.log("data", this.props);

    return (
      <div>
        {`${this.props}`}
      </div>
    );
  }

}

export default withYTDData(
  connect((state) => ({ breakpoints: state.responsive.breakpoints }))(GivingSummary)
);
