// @flow
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import Activity from "./Activity";
import Schedules from "./Schedules";
import SavedPayments from "./SavedPayments";

const ACTIVITY_QUERY = gql`
  query userFeed($filters: [String]!) {
    scheduledTransactions {
      id
      start
      details {
        account {
          name
        }
        amount
      }
      transactions {
        date
      }
      schedule {
        description
      }
    }
    savedPayments{
      id
      name
      payment {
        accountNumber
        paymentType
      }
    }
    userFeed(filters: $filters) {
      ... on Transaction {
        id
        date
        summary
        status
        statusMessage
        schedule {
          id
        }
        details {
          amount
          account {
            name
          }
        }
      }
      ... on SavedPayment {
        name
        expirationYear
        expirationMonth
      }
    }
  }
`;

const withData = graphql(ACTIVITY_QUERY, {
  options: {
    variables: { filters: ["GIVING_DASHBOARD"] },
    ssr: false,
  },
});


const Layout = withData(({ data }) => (
  <div className="soft-double-bottom@lap-and-up soft-bottom">
    <Activity feed={data} />
    <Schedules schedules={data} />
    <SavedPayments payments={data} />
  </div>
));

export default Layout;
