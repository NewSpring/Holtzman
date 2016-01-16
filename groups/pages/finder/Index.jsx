import { Component, PropTypes, Children, cloneElement} from "react"
import { connect } from "react-redux"

import Search from "./Search"
import List from "./List"

const map = (state) => ({ person: state.onBoard.person })

let sampleData = [
  {
    "Description": "We will start off with a Rick Warren Study. Come Join us every Friday at 7pm!!!",
    "Name": "Corey and Heather Hayward's Group",
    "Id": 336971,
    "GroupLocations": [
      {
        "Location": {
          "PostalCode": "29621",
          "City": "Anderson",
          "Street2": null,
          "Street1": "610 Pinehollow Dr",
          "Latitude": 34.554029,
          "Longitude": -82.621706
        }
      }
    ]
  },
  {
    "Description": "We are a Mens Group meeting every Thursday at 7:30pm. We will decide course of study in the first fe",
    "Name": "Dalton Oakes' Group (NEW)",
    "Id": 336974,
    "GroupLocations": []
  },
  {
    "Description": "Wednesday Nights 7pm--Married & Single People of all ages\r\n\r\nThursday Nights 7pm--Women of all ages",
    "Name": "Daniel and Brittany Maio's Rock Hill & Online Group",
    "Id": 336976,
    "GroupLocations": []
  },
  {
    "Description": "We're a Men's Group ages 20 to 30. We meet every Wednesday at 7:30 pm. If you think this would be a",
    "Name": "Daniel Loggins and Christian Sawyer's Group",
    "Id": 336977,
    "GroupLocations": [
      {
        "Location": {
          "PostalCode": "29621",
          "City": "Anderson",
          "Street2": "Apt. A-3",
          "Street1": "320 E Beltline Blvd",
          "Latitude": 34.551668,
          "Longitude": -82.670323
        }
      }
    ]
  },
  {
    "Description": "We are a group of 36 to 46 year old Married Couples that meet on Thursdays at 6:30 PM. We do not off",
    "Name": "Dawson and Kristy Edwards' Group",
    "Id": 336984,
    "GroupLocations": [
      {
        "Location": {
          "PostalCode": "29625",
          "City": "Anderson",
          "Street2": null,
          "Street1": "921 Old Green Pond Rd",
          "Latitude": 34.528713,
          "Longitude": -82.753604
        }
      }
    ]
  },
  {
    "Description": "We are a coed group of ages 35 to 70 that meets every Thursday at 6:00 pm. We enjoy fellowship as we",
    "Name": "Denny and Amy Hansen's Group",
    "Id": 336988,
    "GroupLocations": [
      {
        "Location": {
          "PostalCode": "29621",
          "City": "Anderson",
          "Street2": null,
          "Street1": "313 Five Forks Rd",
          "Latitude": 34.612351,
          "Longitude": -82.682594
        }
      }
    ]
  }
]

@connect(map)
class Template extends Component {

  static defaultProps = {
    markers: sampleData
  }

  state = {
    active: null,
    hover: null
  }

  componentWillMount() {
    Meteor.subscribe("groups")
  }

  onMarkerHover = (marker) => {

    this.setState({hover: marker.Id})
  }

  onChildClick = (marker) => {
    if (marker.Id === this.state.active) {
      return this.setState({active: null})
    }
    this.setState({active: marker.Id})
  }


  render () {
    let passedProps = {...this.props, ...{
      active: this.state.active,
      hover: this.state.hover,
      onClick: this.onChildClick,
      onHover: this.onMarkerHover
    }}

    let Child = Children.map(this.props.children, (child) => {
        return cloneElement(child, passedProps);
    })

    const markers = this.props.markers.filter((marker) => {
      return marker.GroupLocations.length
    })

    let photo = "https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/fpo/fpo.groups-flipped_1700_850_90_c1.jpg"

    let overlayClasses = ["floating"]
    let overlayChildClasses = []

    const { hash } = this.props.params

    if (hash) {
      overlayClasses.push("overlay--solid-light")
      overlayChildClasses = overlayChildClasses.concat(["locked-ends", "locked-sides"])
      photo = null
    } else {
      overlayClasses.push("overlay--solid-dark")
      overlayChildClasses = overlayChildClasses.concat(["floating__item", "overlay__item", "one-whole", "text-center"])
    }

    return (
      <Layout
        classes={overlayClasses}
        childClasses={overlayChildClasses}
        photo={photo}
        hash={hash}
        markers={markers}
      />
        <Child />
      </Layout>
    )
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
      { path: "list/:hash", component: List }
    ]
  }
]

export default {
  Template,
  Routes
}
