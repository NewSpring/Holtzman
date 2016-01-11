import { Component, PropTypes} from "react"
import controllable from "react-controllables"
import shouldPureComponentUpdate from "react-pure-render/function"

let GoogleMap
if (Meteor.isClient) {
  GoogleMap = require("google-map-react")
}

// import {getScale, getRealFromTo} from "./components/calc_markers_visibility"
import Marker from "./components/Marker"

const K_MARGIN_TOP = 30;
const K_MARGIN_RIGHT = 30;
const K_MARGIN_BOTTOM = 30;
const K_MARGIN_LEFT = 30;

const K_HOVER_DISTANCE = 30;

@controllable(["center", "zoom", "markers"])
export default class Map extends Component {

  static propTypes = {
    onCenterChange: PropTypes.func, // @controllable generated fn
    onZoomChange: PropTypes.func, // @controllable generated fn
    onBoundsChange: PropTypes.func,
    onMarkerHover: PropTypes.func,
    onChildClick: PropTypes.func,
    center: PropTypes.any,
    zoom: PropTypes.number,
    markers: PropTypes.any,
    visibleRowFirst: PropTypes.number,
    visibleRowLast: PropTypes.number,
    maxVisibleRows: PropTypes.number,
    hoveredRowIndex: PropTypes.number,
    openBallonIndex: PropTypes.number
  }

  static defaultProps = {
    center: [34.595413, -82.6241234],
    zoom: 10,
    visibleRowFirst: -1,
    visibleRowLast: -1,
    hoveredRowIndex: -1
  }

  shouldComponentUpdate = shouldPureComponentUpdate;


  _onBoundsChange = (center, zoom, bounds, marginBounds) => {
    // if (this.props.onBoundsChange) {
    //   this.props.onBoundsChange({center, zoom, bounds, marginBounds});
    // } else {
    //   this.props.onCenterChange(center);
    //   this.props.onZoomChange(zoom);
    // }
  }

  _onChildClick = (key, childProps) => {
    const { markers } = this.props

    let marker;
    for (let _marker of markers) {
      if (`${_marker.Id}` === `${key}`) {
        marker = _marker
        break
      }
    }

    if (this.props.onChildClick) {
      this.props.onChildClick(marker);
    }
  }

  _onChildMouseEnter = (key, childProps) => {
    const { markers } = this.props

    let marker;
    for (let _marker of markers) {
      if (`${_marker.Id}` === `${key}`) {
        marker = _marker
        break
      }
    }

    if (this.props.onMarkerHover) {
      this.props.onMarkerHover(marker);
    }
  }

  _onChildMouseLeave = (/* key, childProps */) => {
    if (this.props.onMarkerHover) {
      this.props.onMarkerHover(-1);
    }
  }

  _onBalloonCloseClick = () => {
    if (this.props.onChildClick) {
      this.props.onChildClick(-1);
    }
  }



  render () {

    if (typeof window != undefined && window != null ) {
      return (
        <GoogleMap
          center={this.props.center}
          zoom={this.props.zoom}
          onBoundsChange={this._onBoundsChange}
          onChildClick={this._onChildClick}
          onChildMouseEnter={this._onChildMouseEnter}
          onChildMouseLeave={this._onChildMouseLeave}
          distanceToMouse={this._distanceToMouse}
          margin={[K_MARGIN_TOP, K_MARGIN_RIGHT, K_MARGIN_BOTTOM, K_MARGIN_LEFT]}
          hoverDistance={K_HOVER_DISTANCE}
        >
          {this.props.markers.map((marker) => {
            let loc = marker.GroupLocations[0].Location

            return <Marker
              lat={loc.Latitude}
              lng={loc.Longitude}
              key={marker.Id}
              active={this.props.active === marker.Id}
              hover={this.props.hover === marker.Id}
            />

          })}
        </GoogleMap>
      )
    }

    return null
  }

}
