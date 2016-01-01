import { Component } from "react"
import { Link } from "react-router"
import { connect } from "react-redux"

import { Split, Left, Right } from "../../../../core/client/layouts/split"
import { onBoard as onBoardActions } from "../../../../core/client/actions"

import Menu from "./settings.menu"
import ChangePassword from "./settings.change-password"
import PersonalDetails from "./settings.personal-details"
import HomeAddress from "./settings.home-address"
import PaymentDetails from "./settings.payments"
import PP from "./settings.privacy-policy"


const map = (state) => ({ person: state.onBoard.person })

@connect(map)
class Template extends Component {


  close = () => {
    return (
      <Link to="/profile" className="text-light-primary plain soft overlay__item locked-top locked-right">
        <i className="icon-close h4"></i>
      </Link>
    )
  }


  render() {
    const { person } = this.props
    const { PhotoUrl } = person
    let photo = PhotoUrl ? `//stock-rock.newspring.cc/${PhotoUrl}` : null
    return (
      <Split nav={true}>

        <Right
          mobile={false}
          classes={["floating", "overlay--solid-dark"]}
          ratioClasses={["floating__item", "overlay__item", "one-whole", "text-center"]}
          background={photo}
          blur={true}
          outsideRatio={this.close}
        >
          <div className="soft one-whole">
            <div
              className="background--fill ratio--square round two-fifths display-inline-block"
              style={{ backgroundImage: `url(${photo})`}}
            ></div>
            <h4 className="text-light-primary soft-half-top flush-bottom">{person.FirstName} {person.LastName}</h4>
            <p className="text-light-primary flush"><em>{person.Home.City}</em></p>
          </div>

        </Right>

        <Left scroll={true}>
          {this.props.children}
        </Left>

      </Split>

    )

  }
}


const Routes = [
  {
    path: "settings",
    component: Template,
    indexRoute: {
      component: Menu
    },
    childRoutes: [
      { path: "change-password", component: ChangePassword },
      { path: "personal-details", component: PersonalDetails },
      { path: "home-address", component: HomeAddress },
      { path: "saved-accounts", component: PaymentDetails },
      { path: "privacy-policy", component: PP },
    ]
  }
]

export default {
  Template,
  Routes
}
