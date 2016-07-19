import { Component, PropTypes} from "react"
import { connect } from "react-apollo"
import gql from "graphql-tag";

import Authorized from "../../../core/blocks/authorzied"
import { nav as navActions } from "../../../core/store"

import Layout from "./Layout"
import Details from "./Details"

const mapQueriesToProps = ({ ownProps }) => ({
  filter: {
    query: gql`
      query GetFilterContent {
        family: currentFamily {
          person { photo, firstName, lastName, id: entityId }
        }
      }
    `
  },
  data: {
    query: gql`
      query GetTransactions($limit: Int, $skip: Int, $people: [Int], $start: String, $end: String) {
        transactions(limit: $limit, skip: $skip, people: $people, start: $start, end: $end) {
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
    variables: { limit: 20, skip: 0, people: [], start: "", end: "" }
  },
});
const defaultArray = [];
@connect({ mapQueriesToProps })
export default class Template extends Component {

  state = {
    offset: 0,
    shouldUpdate: true,
    done: false,
    loaded: true,
    start: "",
    end: "",
    people: [],
    transactions: [] // XXX remove after refetchMore has landed in apollo-client
  }

  paginate = () => {
    const { q, tags } = this.props;
    this.props.data.refetch({
      limit: 20,
      skip: this.state.offset + 20,
      people: this.state.people,
      start: this.state.start,
      end: this.state.end
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
  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.data.loading && !nextProps.data.loading && !this.state.transactions.length) {
      this.setState({ transactions: nextProps.data.transactions })
    }

  }

  changeFamily = (people) => {
    this.setState({ loaded: false })
    this.props.data.refetch({
        start: this.state.start,
        end: this.state.end,
        limit: 20,
        skip: 0,
        people
      })
      .then((response) => {
        if (!response || !response.data) return;
        const { transactions } = response.data;
        this.setState({ offset: 0, done: false, loaded: true, transactions, people });
      });
  }

  changeDates = (start, end) => {
    this.setState({ loaded: false })
    this.props.data.refetch({
        people: this.state.people,
        limit: 20,
        skip: 0,
        start,
        end,
      })
      .then((response) => {
        if (!response || !response.data) return;
        const { transactions } = response.data;
        this.setState({
          offset: 0,
          done: false,
          loaded: true,
          transactions,
          start,
          end,
        });
      });
  }

  render () {
    return (
      <Layout
        paginate={this.paginate}
        state={this.state}
        transactions={this.state.transactions}
        family={this.props.filter.family || []}
        alive={true}
        ready={!this.props.data.loading}
        reloading={!this.state.loaded}
        done={this.state.done}
        changeFamily={this.changeFamily}
        changeDates={this.changeDates}
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
