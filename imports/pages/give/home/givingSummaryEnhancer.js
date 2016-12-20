
// @flow
// $FlowMeteor
import { Meteor } from "meteor/meteor";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";
import createContainer from "../../../blocks/meteor/react-meteor-data";

export const formatGivingSummaryData = (data: Object): ?Object => {
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

  if (!data || !data.accounts) return null;
  const accountsData = data.accounts;

  if (!Array.isArray(accountsData)) return null;
  const summaryData = [...baseData];

  let total = 0;
  const accounts = {};

  accountsData.map((account) => {
    accounts[account.name] = account.total;
    if (!account.transactions) return null;

    // iterate over every transaction, and sum up the months
    account.transactions.map((transaction) => {
      const month = moment(new Date(transaction.date)).format("M");
      if (!transaction.details || !transaction.details.length) return transaction;
      summaryData[Number(month) - 1].amount += transaction.details
        .reduce((prev, { amount }) => prev + amount, 0);
      total += transaction.details.reduce((prev, { amount }) => prev + amount, 0);
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
    accounts(allFunds: true) {
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

const withData = graphql(YTD_QUERY, {
  options: ({ authorized }) => ({
    variables: {
      start: moment().startOf("year").format(),
      end: moment().endOf("year").format(),
    },
    skip: !authorized,
    ssr: false,
  }),
  props: ({ data }) => ({
    changeYear: (year) => {
      const start = moment(`${year}`, "YYYY").startOf("year").format();
      const end = moment(`${year}`, "YYYY").endOf("year").format();
      return data.refetch({ start, end });
    },
    loading: data.loading,
    data: formatGivingSummaryData(data),
  }),
});


const authorized = () => ({ authorized: Meteor.userId() });
// eslint-disable-next-line
export default (component: React$Component<any, any, any>) => (
  createContainer(authorized, withData(component))
);
