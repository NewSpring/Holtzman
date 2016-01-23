import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { GraphQL } from "../../../core/graphql"
import { Authorized } from "../../../core/blocks"
import { nav as navActions } from "../../../core/store"

import { transactions as transactionActions } from "../../store"

import Layout from "./Layout"
import Details from "./Details"


function getTransactions(data, dispatch) {
  const { mongoId, size, skip } = data
  let query = `
    {
      transactions: allFinanicalTransactions(cache: false, mongoId: "${mongoId}", limit: ${size}, skip: ${skip}) {
        id
        date
        summary
        details {
          id
          amount
          account {
            id
            name
          }
          date
        }
      }
    }
  `
  return GraphQL.query(query)
    .then(({ transactions }) => {
      let mappedObj = {}

      for (const transaction of transactions) {
        mappedObj[transaction.id] = transaction
      }

      dispatch(transactionActions.add(mappedObj))

      return transactions
    })
}

const map = (state) => ({
  transactions: state.transactions.transactions
})

@connect(map)
export default class Template extends Component {

  state = {
    page: 0,
    pageSize: 20,
    shouldUpdate: true,
    done: false,
    loaded: false
  }

  static fetchData(getStore, dispatch) {
    let mongoId = Meteor.userId(),
        size = this.state.pageSize,
        skip = this.state.page * size;

    if (mongoId) {
      return getTransactions({ mongoId, skip, size }, dispatch)
    }
  }

  getData = () => {

    const { dispatch } = this.props

    let mongoId = Meteor.userId(),
        size = this.state.pageSize,
        skip = this.state.page * size;

    if (this.state.done) {
      return
    }

    if (Object.keys(this.props.transactions).length === ((size + 1) * this.state.pageSize)) {
      return
    }

    console.log("fetching...")
    if (mongoId) {
      getTransactions({ mongoId, skip, size }, dispatch)
        .then((transactions) => {
          let done = false
          if (transactions.length < size) {
            done = true
          }
          this.setState({ done, loaded: true })
        })
    }
  }

  // its probably safter to not SSR giving data right?
  componentDidMount(){
    const { dispatch } = this.props

    this.getData()

  }

  componentDidUpdate(prevProps, prevState){
    console.log(prevState, this.state)
    const { page, shouldUpdate } = this.state

    if (prevState.page === page || prevState.shouldUpdate === shouldUpdate) {
      return
    }

    this.getData()
  }

  // @TODO fix scroll loading
  onScroll = (e) => {
    if (this.state.done) return

    const { scrollHeight, clientHeight, scrollTop, offsetTop } = e.target

    let percentage;

    if (scrollTop && scrollHeight) {
      percentage = scrollTop / scrollHeight
    } else if (window.scrollY && document.body.clientHeight) {
      percentage = window.scrollY, document.body.clientHeight
    }

    if ( percentage > 0.5 && this.state.shouldUpdate) {
      let nextPage = this.state.page + 1

      // //
      if (Object.keys(this.props.transactions).length === ((nextPage + 1) * this.state.pageSize)) {
        return
      }

      this.setState({
        page: nextPage,
        shouldUpdate: false
      });

      // wait a bit to prevent paging multiple times
      setTimeout(() => {
        if (nextPage * this.state.pageSize > Object.keys(this.props.transactions).length) {
          this.setState({ done: true, shouldUpdate: false });
        } else {
          this.setState({ shouldUpdate: true });
        }
      }, 1000);
    }
  }


  render () {

    let transactions = []

    for (const transaction in this.props.transactions){
      transactions.push(this.props.transactions[transaction])
    }

    transactions = transactions.sort((a, b) => {
      a = new Date(a.date);
      b = new Date(b.date);
      return a>b ? -1 : a<b ? 1 : 0;
    })

    return (
      <Layout
        onScroll={this.onScroll}
        state={this.state}
        transactions={transactions}
        alive={true}
        ready={this.state.loaded}
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
        path: ":id/:account",
        component: Details
      }
    ]
  }
]

export default {
  Template,
  Routes
}
