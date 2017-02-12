// @flow
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import Meta from "../../../components/shared/meta";
import Activity from "./Activity";
import Schedules from "./Schedules";
import SavedPayments from "./SavedPayments";

export const ACTIVITY_QUERY = gql`
  query GivingDashboard($filters: [String]!) {
    scheduledTransactions(cache: false) {
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
    savedPayments(cache: false){
      id: entityId
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
    <Meta title="Giving Dashboard" />
    <Activity feed={data} />
    <Schedules schedules={data} />
    <SavedPayments payments={data} />
  </div>
));

export default Layout;
