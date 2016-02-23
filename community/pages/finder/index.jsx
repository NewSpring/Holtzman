import { Component, PropTypes, Children, cloneElement} from "react"
import { connect } from "react-redux"

import { GraphQL } from "../../../core/graphql"
import { base64Encode } from "../../../core/util/encode"
import { routeActions } from  "../../../core/store/routing"
// import { Map } from "../../../core/components"

import Search from "./Search"
import Results from "./Results"
import List from "./Results/List"
import Profile from "./Results/Profile"


// const map = (state) => ({ person: state.onBoard.person })
@connect()
class Template extends Component {

  state = {
    mapsReady: false,
  }

  mapsLoadedCallbacks = []

  componentDidMount(){

    // restrict actions to client side loading only
    if (typeof window === "undefined" || window === null){
      return
    }

    // if google is already loaded
    if (window.google && window.google.maps) {
      return
    }

    window.__mapsLoaded__ = () => {
      delete window.__mapsLoaded__

      this.service = new window.google.maps.DistanceMatrixService()
      this.geocoder = new window.google.maps.Geocoder()
      this.setState({ mapsReady: true })
      for (let method of this.mapsLoadedCallbacks) {
        method(window.google.maps)
      }

    }

    const script = document.createElement("script")
    script.src = "https://maps.googleapis.com/maps/api/js?callback=__mapsLoaded__"
    document.body.appendChild(script)


  }

  onGoogleLoaded = (method) => {

    // restrict actions to client side loading only
    if (typeof window === "undefined" || window === null){
      return
    }

    // if google is already loaded
    if (window.google && window.google.maps) {
      return method(window.google.maps)
    }

    this.mapsLoadedCallbacks.push(method)

  }

  search = ({ lat, lng }) => {

    let hash = encodeURI(base64Encode(JSON.stringify({ lat, lng })))
    this.props.dispatch(routeActions.push(`/community/finder/list/${hash}`))

  }

  render() {
    
    let sugaredChildren = React.Children.map(this.props.children, (x) => {
      return React.cloneElement(x, {
        onLoaded: this.onGoogleLoaded,
        geocoder: this.geocoder,
        service: this.service,
        search: this.search,
      })
    });

    return <div>{sugaredChildren}</div>

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
      {
        path: "list/:hash",
        component: Results,
        indexRoute: {
          component: List
        },
        childRoutes: [
          { path: ":groupId", component: Profile }
        ]
      },

    ]
  }
]

export default {
  Template,
  Routes
}
