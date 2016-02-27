import { Component, PropTypes} from "react"

import Split, { Left, Right } from "../../blocks/split"

import ResetPassword from "./reset-password"

const Template = (props) => {

  let photo = "https://s3.amazonaws.com/ns.assets/apollos/leaves.png"
  return (
    <Split nav={true} classes={["background--light-primary"]}>

      <Right
        mobile={false}
        background={photo}
        backgroundFill={false}
        classes={["background--right", "background--bottom"]}
      />

      <Left scroll={true}>
        {props.children}
      </Left>

    </Split>
  )

}

const Routes = [
  {
    path: "_",
    component: Template,
    childRoutes: [
      { path: "reset-password/:token", component: ResetPassword },
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
