import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { Link } from "react-router"

import { Split, Left, Right } from "../../../../core/client/layouts/split"

import Search from "./finder.search"

const map = (state) => ({ person: state.onBoard.person })

@connect(map)
class Template extends Component {

  componentWillMount() {
    Meteor.subscribe("groups")
  }


  render () {

    let photo = "https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/fpo/fpo.groups-flipped_1700_850_90_c1.jpg"

    return (
      <Split nav={true}>

        <Right
          mobile={true}
          classes={["floating", "overlay--solid-dark"]}
          ratioClasses={["floating__item", "overlay__item", "one-whole", "text-center"]}
          background={photo}
        >

          <div className="soft one-whole">
            <h4 className="text-light-primary soft-half-top flush-bottom">Group Finder</h4>
            <p className="text-light-primary flush"><em>Find a community</em></p>
          </div>

        </Right>

        <Left scroll={true} >
          {this.props.children}
        </Left>

      </Split>

    )
  }
}


const Routes = [
  {
    path: "finder",
    component: Template,
    indexRoute: {
      component: Search
    },
    childRoutes: [
      // { path: "change-password", component: ChangePassword },
      // { path: "personal-details", component: PersonalDetails },
      // { path: "home-address", component: HomeAddress },
      // { path: "saved-accounts", component: PaymentDetails },
      // { path: "privacy-policy", component: PP },
    ]
  }
]

export default {
  Template,
  Routes
}
