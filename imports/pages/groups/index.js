import Profile from "./profile/index";
import Finder from "./finder/index";
import Result from "./finder/Result";

// const TRANSACTIONS_QUERY = gql`
//   query GetTransactions($limit: Int, $skip: Int) {
//     transactions(limit: $limit, skip: $skip) {
//       id
//       date
//       status
//       summary
//       details {
//         id
//         amount
//         account {
//           id
//           name
//         }
//       }
//     }
//   }
// `;

// const withTransactions(TRANSACTIONS_QUERY, {
//   options: {
//     variables: { limit: 20, skip: 0 }
//   },
// });

// const defaultArray = [];
// withTransactions
// @connect()
const Template = () => <h1>Lets find some groups!</h1>;

const Routes = [
  { path: "groups", component: Template },
  { path: "groups/home", component: Finder },
  { path: "groups/finder", component: Result },
  { path: "groups/:id", component: Profile },
];

export default {
  Template,
  Routes,
};
