import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { nav } from "../../../../core/store"
import { updateHome } from "../../../../core/auth/client"
import { Error, Loading } from "../../../core/components/states"

import Success from "../Success"

const map = (state) => ({ person: state.onBoard.person })
@connect(map)
export default class HomeAddress extends Component {

  state = {
    state: "default"
  }

  componentWillMount(){
    this.props.dispatch(nav.setLevel("CONTENT"))
  }

  componentWillUnmount(){
    this.props.dispatch(nav.setLevel("TOP"))
  }

  updateAddress = (e) => {
    e.preventDefault()

    let data = {}
    for (let ref in this.refs) {
      let value = this.refs[ref].getValue()
      let number = Number(value)
      if (number) {
        value = number
      }

      data[ref] = value
    }

    this.setState({ state: "loading" })

    let refs = this.refs
    updateHome(data, (err, result) => {

      if (err) {
        this.setState({ state: "error", err: err })
        setTimeout(() => {
          this.setState({ state: "default"})
        }, 3000)
        return
      }


      this.setState({ state: "success" })

      setTimeout(() => {
        this.setState({ state: "default"})
      }, 3000)

    })


  }

  render () {

    const { Home } = this.props.person
    const { state } = this.props.state

    switch (state) {
      case "error":
        return <Err msg="Looks like there was a problem" error={error} />
      case "loading":
        return <Loading msg="Updating your information..." />
      case "success":
        return <Success msg="Your information has been updated!" />
      default:
        return <Layout home={Home} update={this.updateAddress} />
    }

  }
}
