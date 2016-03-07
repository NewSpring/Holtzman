import { Component, PropTypes} from "react"

import { GraphQL } from "../../graphql"
import Split, { Left, Right } from "../../blocks/split"

import ResetPassword from "./reset-password"

const Template = (props) => {

  let photo = "https://s3.amazonaws.com/ns.assets/apollos/leaves.png"
  return (
    <div>
      <Split nav={true} classes={["background--light-primary"]}>

        <Right
          mobile={false}
          background={photo}
          backgroundFill={false}
          classes={["background--right", "background--bottom"]}
        />



      </Split>
      <Left scroll={true} classes={["background--light-primary"]}>
        {props.children}
      </Left>
    </div>

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
  },
  {
    path: "/$*",
    onEnter: (location, replaceState, callback) => {

      let url = location.params.splat
        .replace(/\s+/g, "")
        .toLowerCase()

      let [fund, amount] = url.split("/")

      let compare = (accounts) => {
        for (let account of accounts) {
          let smallname = account.name
            .replace(/\s+/g, "")
            .toLowerCase()

          let dest = `/give/campaign/${account.name}`

          if (amount) {
            dest += `?${account.name}=${amount}`
          }

          if (smallname === fund) {
            replaceState(null, dest)
            callback()
          }
        }
      }

      GraphQL.query(`
        {
          accounts: allFinancialAccounts(limit: 100, ttl: 8640) {
            description
            name
            id
            summary
            image
            order
          }
        }`).then(({ accounts }) => {
          if (accounts.length) {
            compare(accounts)
          }
        })

    }
  }
]

export default {
  Template,
  Routes
}
