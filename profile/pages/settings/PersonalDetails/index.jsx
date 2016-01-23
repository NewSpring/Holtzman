import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import Moment from "moment"

import { GraphQL } from "../../../../core/graphql"

import { Campuses, States } from "../../../../core/collections"
import { nav, campuses as campusActions } from "../../../../core/store"
import { update } from "../../../../core/methods/auth/client/"


import Success from "../Success"
import Layout from "./Layout"


function getCampuses(dispatch) {
  let query = `
    {
      campuses: allCampuses {
        name
        shortCode
        id
        locationId
      }
    }
  `

  return GraphQL.query(query)
    .then(({ campuses }) => {

      let mappedObj = {}
      for (let campus of campuses) {
        mappedObj[campus.id] = campus
      }

      dispatch(campusActions.add(mappedObj))

    })

}

const map = (state) => ({
  person: state.onBoard.person,
  campuses: state.campuses.campuses
})

@connect(map)
export default class PersonalDetails extends Component {

  state = {
    month: null,
    state: "default"
  }

  static fetchData(getStore, dispatch){
    return getCampuses(dispatch)
  }

  componentWillMount(){
    this.props.dispatch(nav.setLevel("CONTENT"))
  }

  componentDidMount(){
    const { dispatch } = this.props
    return getCampuses(dispatch)
  }

  componentWillUnmount(){
    this.props.dispatch(nav.setLevel("TOP"))
  }


  getDays = () => {

    let totalDays = Moment("1", "M").daysInMonth()
    if (this.state.month) {
      totalDays = Moment(this.state.month, "M").daysInMonth()
    }

    let arr = []
    for (let i = 0; i < totalDays; i++) {
      arr.push({ label: i + 1, value: i + 1})
    }
    return arr
  }

  getMonths = () => {
    return Moment.monthsShort().map((month, i) => {
      return { label: month, value: i + 1}
    })
  }

  getYears = () => {
    let now = new Date().getFullYear()

    let arr = []
    for (let i = 0; i < 150; i++) {
      arr.push({ label: (now - i), value: (now - i)})
    }

    return arr

  }

  saveMonth = (value) => {
    this.setState({month: value})

    return true
  }

  updatePerson = (e) => {
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
    update(data, (err, result) => {

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

    let campuses = []
    for (let campus in this.props.campuses) {
      campuses.push(this.props.campuses[campus])
    }

    campuses || (campuses = [])
    campuses = campuses.map((campus) => {
      return { label: campus.name, value: campus.id }
    })

    const { state } = this.state

    switch (state) {
      case "error":
        return <States.Err msg="Looks like there was a problem" error={error} />
      case "loading":
        return <States.Loading msg="Updating your information..." />
      case "success":
        return <Success msg="Your information has been updated!" />
      default:
        return  (
          <Layout
            submit={this.updatePerson}
            months={this.getMonths()}
            saveMonth={this.saveMonth}
            days={this.getDays()}
            years={this.getYears()}
            campuses={campuses}
            person={this.props.person}
          />
        )
    }

  }
}
