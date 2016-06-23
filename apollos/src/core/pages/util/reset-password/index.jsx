import { Component, PropTypes} from "react"
import { Link } from "react-router"
import { connect } from "react-redux"

import { reset } from "../../../methods/accounts/client"
import { routeActions } from "../../../store/routing"
import { Error, Loading } from "../../../components/states"
import Success from "./Success"
import Layout from "./Layout"

@connect()
export default class ChangePassword extends Component {

  state = {
    newP: null,
    newPDup: null,
    state: "default"
  }

  submit = (e) => {
    e.preventDefault()
    this.setState({ state: "loading" })

    Accounts.resetPassword(this.props.params.token, this.state.newP, (err) => {
      if (err) {
        this.setState({ state: "error", err: err })
        setTimeout(() => {
          this.setState({ state: "default"})
        }, 5000)
        return
      }

      reset(false, this.state.newP, (err, result) => {
        if (err) {
          this.setState({ state: "error", err: err })
          setTimeout(() => {
            this.setState({ state: "default"})
          }, 5000)
          return
        }


        this.setState({ state: "success" })

        setTimeout(() => {
          // this.setState({ state: "default"})
          this.props.dispatch(routeActions.push("/profile"))
        }, 1000)

      })
    })


  }

  save = (value, input) => {
    const { id } = input

    if (id === "newPDup" && this.state.newP && this.state.newP != value) {
      return false
    }

    if (id === "newP" && this.state.newPDup && this.state.newPDup != value) {
      return false
    }

    this.setState({[id]: value})

    return true
  }


  render () {
    const { state, err } = this.state

    switch (state) {
      case "error":
        return <Error msg="Looks like there was a problem" error={err && err.message ? err.message : " "} />
      case "loading":
        return <Loading msg="Updating your password..." />
      case "success":
        return <Success msg="Your password has been updated!" />
      default:
        return  (
          <Layout
            submit={this.submit}
            save={this.save}
            state={this.state}
          />
        )
    }
  }
}
