import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { GraphQL } from "../../../../core/graphql"
import {
  campuses as campusActions,
  collections as collectionActions,
  nav as navActions,
} from "../../../../core/store"

import Layout from "./Layout"

const map = (state) => ({
  person: state.onBoard.person,
  campuses: state.campuses.campuses,
  states: state.collections.states,
  map: state.map,
})

@connect(map)
export default class Search extends Component {

  state = {
    streetAddress: null,
    streetAddress2: null,
    city: null,
    zip: null,
    state: null,
    status: "default",
    campus: null
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"))
  }

  componentDidMount() {

    const { dispatch } = this.props

    let query = `
      {
        states: allDefinedValues(id: 28) {
          name: description
          value
          id
        }
      }
    `

    GraphQL.query(query)
      .then(({ states }) => {
        let stateObj = {}

        for (let state of states) {
          stateObj[state.id] = state
        }

        dispatch(collectionActions.insert("states", stateObj))

      })
  }

  geocodeAddress = (e) => {
    e.preventDefault()

    const { currentTarget } = e
    let {
      streetAddress,
      streetAddress2,
      city,
      zip,
      state,
      campus,
    } = this.state

    // the select component doesn't fire a blur when prefilled from start
    // so we mannualy check to see if it has a value
    state || (state = document.querySelectorAll("[name=\"state\"]")[0].value)

    this.props.onLoaded((maps) => {
      const { service, geocoder } = this.props
      this.setState({ status: "default" })

      if (streetAddress || streetAddress2 || city || zip || state ) {
        geocoder.geocode({
          address: `${streetAddress}${' ' + streetAddress2}, ${city}, ${state}, ${zip}`
        }, (results, status) => {

          let query = {}
          if (status === "OK") {

            query.lat = results[0].geometry.location.lat(),
            query.lng = results[0].geometry.location.lng()

          }


          if (campus) {
            query.campus = campus
          }

          // clean our previous search results
          this.props.dispatch(collectionActions.clear("groups"))
          this.props.search(query)

        })
      } else {

        let query = {}
        if (campus) {
          query.campus = campus
        }

        // clean our previous search results
        this.props.dispatch(collectionActions.clear("groups"))

        this.props.search(query)
      }


    })

  }

  save = (value, target) => {
    const { name } = target

    this.setState({
      [name]: value
    })

  }

  render() {

    let campuses = []
    for (let campus in this.props.campuses) {
      campuses.push(this.props.campuses[campus])
    }

    campuses = campuses.map((x) => ({
      label: x.name,
      value: x.id
    }))

    let states = []
    for (let state in this.props.states) {
      states.push(this.props.states[state])
    }

    states = states.map((x) => ({
      label: x.name,
      value: x.value
    }))

    // let ready = true
    // for (let key in this.state) {
    //   if (key === "streetAddress2" || key === "status") {
    //     continue
    //   }
    //   if (!this.state[key]) {
    //     ready = false
    //     break
    //   }
    //
    // }

    return (
      <Layout
        geocode={this.geocodeAddress}
        home={this.props.person.home}
        ready={true}
        campuses={campuses}
        states={states}
        save={this.save}
        showError={this.state.status === "error"}
      />
    )
  }
}
