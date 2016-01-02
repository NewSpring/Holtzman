import { Component, PropTypes} from "react"
import { Link } from "react-router"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

// loading state
import { Loading } from "../../../../core/client/components"
import { nav as navActions } from "../../../../core/client/actions"
import { Split, Left, Right } from "../../../../core/client/layouts/split"

import { Accounts as Acc } from "../../../lib/collections"
import { AddToCart } from "../../blocks"


@connect()
@ReactMixin.decorate(ReactMeteorData)
export default class Template extends Component {

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("CONTENT"))
  }

  componentWillUnmount() {
    this.props.dispatch(navActions.setLevel("TOP"))
  }

  getMeteorData() {
    Meteor.subscribe("accounts")
    const Name = decodeURI(this.props.params.name);
    const account = Acc.findOne({ Name });

    return {
      account
    };

  }


  render () {

    const { account } = this.data

    if (!account) {
      // loading
      return (
        <Loading/>
      )
    }


    return (

      <Split nav={true}>
        <Right background={account.Url} mobile={true}>
        </Right>

        <Left scroll={true} >
          <div className="constrain-copy soft-double@lap-and-up">
            <div className="soft soft-double-bottom soft-double-top@lap-and-up">

              <h2>{account.PublicName}</h2>
              <div dangerouslySetInnerHTML={{__html: account.PublicDescription}}>

              </div>
            </div>
          </div>

          <div className="background--light-secondary">
            <div className="constrain-copy soft-double@lap-and-up">
              <div className="soft soft-double-bottom soft-double-top@lap-and-up">
                <AddToCart
                  accounts={[account]}
                />
              </div>
            </div>
          </div>

        </Left>
      </Split>
    );
  }
}


const Routes = [
  { path: "campaign/:name", component: Template }
]

export default {
  Template,
  Routes
}
