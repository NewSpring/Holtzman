import { Component, PropTypes} from "react"
import { connect } from "react-apollo"
import gql from "graphql-tag";

import Profile from "./profile/index";
import Finder from "./finder/index";
// import { nav as navActions } from "apollos-core/dist/core/store"

// const mapQueriesToProps = () => ({
//   data: {
//     query: gql`
//       query GetTransactions($limit: Int, $skip: Int) {
//         transactions(limit: $limit, skip: $skip) {
//           id
//           date
//           status
//           summary
//           details {
//             id
//             amount
//             account {
//               id
//               name
//             }
//           }
//         }
//       }
//     `,
//     variables: { limit: 20, skip: 0 }
//   },
// });
// const defaultArray = [];
// @connect({ mapQueriesToProps })
export default class Template extends Component {
  render () {
    return <h1>Lets find some groups!</h1>
  }
}

const Routes = [
  { path: "groups", component: Template },
  { path: "groups/finder", component: Finder },
  { path: "groups/:id", component: Profile }
]

export default {
  Template,
  Routes
}
