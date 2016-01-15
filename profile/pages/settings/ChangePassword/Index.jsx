import { Component, PropTypes} from "react"
import { Link } from "react-router"
import { connect } from "react-redux"

import { nav } from "../../../core/store"
import { reset } from "../../../core/methods/auth/client"

import { Error, Loading } from "../../../core/components/states"
import Success from "../Success"
import Layout from "./Layout"

@connect()
export default class ChangePassword extends Component {

  state = {
    current: null,
    newP: null,
    newPDup: null,
    state: "default"
  }

  componentWillMount(){
    this.props.dispatch(nav.setLevel("CONTENT"))
  }

  componentWillUnmount(){
    this.props.dispatch(nav.setLevel("TOP"))
  }

  submit = (e) => {
    e.preventDefault()
    this.setState({ state: "loading" })

    reset(this.state.current, this.state.newP, (err, result) => {
      if (err) {
        this.setState({ state: "error", err: err })
        setTimeout(() => {
          this.setState({ state: "default"})
        }, 5000)
        return
      }


      this.setState({ state: "success" })

      setTimeout(() => {
        this.setState({ state: "default"})
      }, 5000)

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
    const { state, error } = this.state

    switch (state) {
      case "error":
        return <Err msg="Looks like there was a problem" error={error} />
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
