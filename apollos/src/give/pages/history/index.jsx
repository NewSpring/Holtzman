import { Component, PropTypes} from "react"
import { connect } from "react-apollo"
import gql from "graphql-tag";

import Authorized from "../../../core/blocks/authorzied"
import { nav as navActions } from "../../../core/store"

import Layout from "./Layout"
import Details from "./Details"

const mapQueriesToProps = () => ({
  data: {
    query: gql`
      query GetTransactions($limit: Int, $skip: Int) {
        transactions(limit: $limit, skip: $skip) {
          id
          date
          status
          summary
          person { firstName, lastName, photo }
          details {
            id
            amount
            account { id, name }
          }
        }
      }
    `,
    variables: { limit: 20, skip: 0 }
  },
});
const defaultArray = [];
@connect({ mapQueriesToProps })
export default class Template extends Component {

  state = {
    offset: 0,
    shouldUpdate: true,
    done: false,
    loaded: false,
    transactions: [] // XXX remove after refetchMore has landed in apollo-client
  }

  paginate = () => {
    const { q, tags } = this.props;
    this.props.data.refetch({
      limit: 20,
      skip: this.state.offset + 20,
    })
      .then(({ data }) => {
        const { transactions } = data;
        let done = false;
        if (transactions.length < 20) done = true;
        this.setState({
          transactions: this.state.transactions.concat(transactions),
          offset: this.state.offset + 20,
          done,
        });
      });
  }

  componentWillMount(){
    // coming back to this page with data in the store
    if (!this.props.data.loading && this.props.data.transactions) {
      this.setState({ transactions: this.props.data.transactions })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.data.loading && !nextProps.data.loading && !this.state.transactions.length) {
      this.setState({ transactions: nextProps.data.transactions })
    }

  }

  render () {

    return (
      <Layout
        paginate={this.paginate}
        state={this.state}
        transactions={this.state.transactions}
        alive={true}
        ready={!this.props.data.loading}
        done={this.state.done}
      />
    )
  }
}


const Routes = [
  {
    path: "history",
    component: Authorized,
    indexRoute: { component: Template },
    childRoutes: [
      {
        path: ":id",
        component: Details
      }
    ]
  }
]

export default {
  Template,
  Routes
}
