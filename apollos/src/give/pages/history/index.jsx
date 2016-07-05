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
          details {
            id
            amount
            account {
              id
              name
            }
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
    page: 0,
    pageSize: 20,
    shouldUpdate: true,
    done: false,
    loaded: false
  }

  componentDidUpdate(prevProps, prevState){
    const { page, shouldUpdate } = this.state

    if (prevState.page === page || prevState.shouldUpdate === shouldUpdate) {
      return
    }

    let limit = this.state.pageSize,
        skip = this.state.page * limit;

    console.log(limit, skip, "refetching...");
    this.props.data.refetch({ limit, skip });
  }

  // @TODO fix scroll loading
  onScroll = (e) => {
    if (this.state.done) return

    const { scrollHeight, clientHeight, scrollTop, offsetTop } = e.currentTarget

    let percentage;
    if (scrollTop && scrollHeight) {
      percentage = scrollTop / scrollHeight
    } else if (window.scrollY && document.body.clientHeight) {
      percentage = window.scrollY / document.body.clientHeight
    }

    if ( percentage > 0.5 && this.state.shouldUpdate) {
      let nextPage = this.state.page + 1

      const { transactions } = this.props.data;
      if ((transactions && transactions.length) === ((nextPage + 1) * this.state.pageSize)) {
        return;
      }

      this.setState({
        page: nextPage,
        shouldUpdate: false
      });

      // wait a bit to prevent paging multiple times
      setTimeout(() => {
        const { transactions } = this.props.data;
        if (nextPage * this.state.pageSize > (transactions && transactions.length)) {
          this.setState({ done: true, shouldUpdate: false });
        } else {
          this.setState({ shouldUpdate: true });
        }
      }, 250);
    }
  }


  render () {

    return (
      <Layout
        onScroll={this.onScroll}
        state={this.state}
        transactions={this.props.data.transactions || defaultArray}
        alive={true}
        ready={!this.props.data.loading}
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
