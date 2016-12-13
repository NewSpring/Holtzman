
// @flow

import { graphql } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";

const baseData = [
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
];

export const formatGivingSummaryData = (data: Object): ?Object => {
  if (!data || !data.accounts) return null;
  const accountsData = data.accounts;

  if (!Array.isArray(accountsData)) return null;
  const summaryData = JSON.parse(JSON.stringify(baseData));
  let total = 0;
  const accounts = {};

  accountsData.map((account) => {
    accounts[account.name] = account.total;
    // iterate over every transaction, and sum up the months
    account.transactions.map((transaction) => {
      const month = moment(transaction.date).format("M");
      summaryData[month].amount += transaction.details[0].amount;
      total += transaction.details[0].amount;
      return transaction;
    });
    return null;
  });

  return ({
    ...data,
    total,
    chartData: summaryData,
    accounts,
  });
};

const YTD_QUERY = gql`
  query givingSummary($start: String!, $end: String!) {
    accounts{
      total(start: $start, end: $end)
      name
      transactions(limit: 0, start: $start, end: $end) {
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
export default graphql(YTD_QUERY, {
  options: {
    variables: {
      start: `01/${currentYear}`,
      end: `12/${currentYear}`,
    },
  },
  props: ({ data }) => ({ data: formatGivingSummaryData(data) }),
});
