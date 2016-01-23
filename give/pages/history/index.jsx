import { Component, PropTypes} from "react"

import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { Authorized } from "../../../core/blocks"
import { nav as navActions } from "../../../core/store"

import { Transactions } from "../../collections"

import Layout from "./Layout"
import Details from "./Details"

@connect()
@ReactMixin.decorate(ReactMeteorData)
export default class Template extends Component {

  state = {
    page: 1,
    pageSize: 20,
    shouldUpdate: true,
    done: false,
    loaded: false
  }

  static fetchData(getStore, dispatch) {
    let mongoId = Meteor.userId(),
        size = 20,
        skip = 0 * size;

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
      this.setState({
        page: this.state.page + 1,
        shouldUpdate: false
      });

      // wait a bit to prevent paging multiple times
      setTimeout(() => {
        if (this.state.page * this.state.pageSize > this.data.transactions.length) {
          this.setState({ done: true, shouldUpdate: false });
        } else {
          this.setState({ shouldUpdate: true });
        }
      }, 1000);
    }
  }

  getMeteorData() {
    let subscription = Meteor.subscribe("transactions")
    const transactions = Transactions.find({}, {
      limit: this.state.page * this.state.pageSize,
      sort: { CreatedDateTime: -1 }
    }).fetch();

    let ready = subscription.ready()
    let alive = true;

    try {
      alive = serverWatch.isAlive("ROCK")
    } catch (e) {}

    return {
      transactions,
      ready,
      alive
    };

  }


  render () {

    return (
      <Layout
        onScroll={this.onScroll}
        state={this.state}
        data={this.data}
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
