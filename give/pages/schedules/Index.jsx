import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { Authorized } from "../../../core/blocks"
import { nav as navActions } from "../../../core/store"

import { ScheduledTransactions, Accounts as Acc } from "../../collections"

import Details from "./Details"
import Layout from "./Layout"

@connect()
@ReactMixin.decorate(ReactMeteorData)
export default class Template extends Component {

  state = {
    page: 1,
    pageSize: 20,
    shouldUpdate: true,
    done: false
  }

  pageOnScroll = (e) => {
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
        if (this.state.page * this.state.pageSize > this.data.schedules.length) {
          this.setState({ done: true, shouldUpdate: false });
        } else {
          this.setState({ shouldUpdate: true });
        }
      }, 1000);
    }
  }

  getMeteorData() {
    let subscription = Meteor.subscribe("scheduledTransactions")
    const schedules = ScheduledTransactions.find({}, {
      limit: this.state.page * this.state.pageSize,
      sort: { CreatedDateTime: -1 }
    }).fetch();

    Meteor.subscribe("accounts")
    let accounts = Acc.find().fetch()

    let ready = subscription.ready()

    return {
      schedules,
      accounts,
      ready
    };

  }

  render () {
    return <Layout data={this.data} onScroll={this.pageOnScroll} />
  }
}


const Routes = [
  { path: "recurring", component: Template },
  {
    path: "recurring/:id",
    component: Authorized,
    indexRoute: { component: Details }
  }
]

export default {
  Template,
  Routes
}
