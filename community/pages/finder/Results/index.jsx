import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { GraphQL } from "../../../../core/graphql"
import { base64Encode, base64Decode } from "../../../../core/util/encode"
import { routeActions } from  "../../../../core/store/routing"
import Split, { Left, Right } from "../../../../core/blocks/split"
import { Error, Loading } from "../../../../core/components/states"
import Map from "../../../../core/components/map"

import PopUp from "./PopUp"

import {
  campuses as campusActions,
  collections as collectionActions
} from "../../../../core/store"


function getGroups({ lat, lng, offset = 0 }, dispatch ) {
  let query = `
    {
      topics: allDefinedValues(id: 52) {
        id
        description
        value
      }

      groups: allGroups(lat: ${lat}, lng: ${lng}, first: 10, after: ${offset}) {
        id
        name
        description
        photo
        childCare
        ageRange
        demographic
        maritalStatus
        locations {
          id
          location {
            latitude
            longitude
            city
            state
            distance
          }
        }
        schedule {
          id
          name
          time
          day
          description
          scheduleText
        }
        members {
          role
          person {
            firstName
            nickName
            lastName
            photo
          }
        }
      }
    }
  `


  return GraphQL.query(query)
    .then(({ groups, topics }) => {

      dispatch(collectionActions.upsertBatch("groups", groups, "id"))
      dispatch(collectionActions.upsertBatch("topics", topics, "id"))

      return { groups, topics }

    })

}

const map = (state) => ({
  groups: state.collections.groups,
  topics: state.collections.topics
})
@connect(map)
export default class ListContainer extends Component {

  state = {
    status: "default",
    active: null,
    hover: null,
    home: null,
    filters: {
      topic: -1,
      days: [1, 2, 3, 4, 5, 6, 7],
      childCare: 1
    }
  }

  // static fetchData(getState, dispatch, location) {
  //   const { pathname } = location
  //
  //   let loc = pathname.split("/").splice(-1)[0]
  //   loc = base64Decode(decodeURI(loc))
  //
  //   try {
  //     loc = JSON.parse(loc)
  //   } catch (e) {}
  //
  //   if (loc && loc.lat && loc.lng) {
  //     return getGroups(loc, dispatch)
  //   }
  //
  //   return
  // }

  componentWillMount(){

    const { dispatch } = this.props
    const { hash } = this.props.params

    let loc = hash
    loc = base64Decode(decodeURI(loc))

    try {
      loc = JSON.parse(loc)
    } catch (e) {}

    if (loc && loc.lat && loc.lng) {
      this.setState({status: "loading"})
      return getGroups(loc, dispatch)
        .then(() => {
          this.setState({
            status: "default",
            home: [loc.lat, loc.lng]
          })
        })
    }

  }

  onClick = (e) => {
    e.preventDefault()
    const { id } = e.currentTarget
    // const { groups } = this.props

    this.props.dispatch(routeActions.push(
      `/community/finder/list/${this.props.params.hash}/${id}`
    ))
    // for (let group in groups) {
    //   group = groups[group]
    //
    //   if (`${group.id}` === `${id}`) {
    //     this.setState({ active: id })
    //     break
    //   }
    // }

  }

  onHover = (e) => {
    const { id } = e.currentTarget
    const { groups } = this.props
    //
    // for (let group in groups) {
    //   group = groups[group]
    //
    //   if (`${group.id}` === `${id}`) {
    //     this.setState({ hover: id })
    //     break
    //   }
    // }

  }

  filter = (value, target) => {

    // special case for checkbox groups
    // @TODO, make this eaiser
    if (typeof value === "object") {
      target = value.target
      let { name } = target

      let day = Number(target.id.replace(/days_/gmi, ""))

      let days = this.state.filters.days

      // Array Remove - By John Resig (MIT Licensed)
      const remove = function(arr, from, to) {
        var rest = arr.slice((to || from) + 1 || arr.length);
        arr.length = from < 0 ? arr.length + from : from;
        return arr.push.apply(arr, rest);
      };

      if (days.indexOf(day) > -1) {
        remove(days, days.indexOf(day))
      } else {
        days.push(day)
      }

      value = days
    }

    const { name } = target

    let currentFilters = this.state.filters

    if (currentFilters[name]) {
      currentFilters[name] = value
    }

    this.setState({ filters: currentFilters })


  }

  render () {

    const groups = []
    const markers = []
    let groupData = []
    if (this.props.groups && this.props.groups.collection) {
      groupData = this.props.groups.collection.find().fetch()
    }

    for (let group of groupData) {

      const { filters } = this.state

      function convert(num) {
        if (Number(num)) {
          return true
        }
      }

      let filter = (
        convert(filters.childCare) === (group.childCare ? group.childCare : true) &&
        (Number(filters.topic) === -1 || filters.topic === group.demographic) &&
        filters.days.indexOf(Number(group.schedule.day)) > -1
      )

      if (!filter) {
        continue
      }

      groups.push(group)

      if (group.locations.length){
        for (let loc in group.locations) {
          loc = group.locations[loc]
          const { latitude, longitude } = loc.location
          markers.push({
            id: group.id,
            latitude,
            longitude
          })

        }
      }
    }

    const topics = [{
      value: -1,
      label: "All Topics"
    }]

    if (this.props.topics && this.props.topics.__raw) {
      for (let topic in this.props.topics.__raw) {
        topics.push({
          label: this.props.topics.__raw[topic].value
        })
      }
    }


    let children = React.Children.map(this.props.children, (x) => {
      return React.cloneElement(x, {
        topics: topics,
        filter: this.filter,
        groups: groups,
        hover: this.state.hover,
        onHover: this.onHover,
        actvie: this.state.active,
        onClick: this.onClick,
        hash: this.props.params.hash
      })
    });

    return (
      <Split nav={true}>

        <Right mobile={false}>
          <div className="locked-ends locked-sides">
            {() => {
              switch (this.state.status) {
                case "loading":
                  return null
              }

              // if (!markers.length) {
              //   return null
              // }

              return (
                <Map
                  markers={markers}
                  onMarkerHover={this.onMarkerHover}
                  onChildClick={this.onChildClick}
                  active={this.state.active}
                  hover={this.state.hover}
                  popUp={PopUp}
                  center={this.state.home}
                />
              )
            }()}

          </div>

        </Right>

        <Left scroll={true}>
          {() => {
            switch (this.state.status) {
              case "error":
                return <Err msg="Looks like there was a problem finding a group" />
              case "loading":
                return <Loading msg="Searching for nearby groups..." />
            }

            return (
              <div>{children}</div>
            )
          }()}

        </Left>

      </Split>

    )
  }
}
