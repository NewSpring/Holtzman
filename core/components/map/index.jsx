import { Component, PropTypes} from "react"
import controllable from "react-controllables"
import shouldPureComponentUpdate from "react-pure-render/function"

let GoogleMap
if (Meteor.isClient) {
  GoogleMap = require("google-map-react")
}

import { fitBounds } from "google-map-react/utils";


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
    hoveredRowIndex: -1,
    options: {
      minZoom: 4,
      maxZoom: 18,
      panControl: false,
      mapTypeControl: false,
      scrollwheel: false,
    }
  }

  shouldComponentUpdate = shouldPureComponentUpdate;


  _onBoundsChange = (center, zoom, bounds, marginBounds) => {
    if (this.props.onBoundsChange) {
      this.props.onBoundsChange({center, zoom, bounds, marginBounds});
    } else {
      this.props.onCenterChange(center);
      this.props.onZoomChange(zoom);
    }
  }

  _onChildClick = (key, childProps) => {
    const { markers } = this.props

    let marker;
    for (let _marker of markers) {
      if (`${_marker.id}` === `${key}`) {
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
      if (`${_marker.id}` === `${key}`) {
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

  componentWillUpdate(nextProps){

    if (this.props.active === nextProps.active && this.props.hover === nextProps.hover ) {
      if (nextProps.autoCenter && this.map) {

        let markers = this.props.markers.filter((x) => {
          return x.latitude && x.longitude
        }).map((marker) => (
          new google.maps.LatLng(marker.latitude,marker.longitude)
        ))

        if (markers.length) {
          this.map.fitBounds(markers.reduce(function(bounds, marker) {
            return bounds.extend(marker);
          }, new google.maps.LatLngBounds()));
        }

      }
    }

  }


  render () {
    let center = [34.595413, -82.6241234],
        zoom = this.props.zoom;

    // console.log(center)
    // if (!center[0]) {
    //   center = [34.595413, -82.6241234]
    // }

    if (typeof window != "undefined" && window != null ) {
      return (
        <GoogleMap
          defaultCenter={center}
          zoom={zoom}
          options={this.props.options}
          onChange={this._onBoundsChange}
          onChildClick={this._onChildClick}
          onChildMouseEnter={this._onChildMouseEnter}
          onChildMouseLeave={this._onChildMouseLeave}
          distanceToMouse={this._distanceToMouse}
          margin={[K_MARGIN_TOP, K_MARGIN_RIGHT, K_MARGIN_BOTTOM, K_MARGIN_LEFT]}
          hoverDistance={K_HOVER_DISTANCE}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({map, maps}) => {
            this.map = map
            let markers = this.props.markers.filter((x) => {
              return x.latitude && x.longitude
            }).map((marker) => (
              new google.maps.LatLng(marker.latitude,marker.longitude)
            ))

            this.map.fitBounds(markers.reduce(function(bounds, marker) {
              return bounds.extend(marker);
            }, new google.maps.LatLngBounds()));
          }}
        >
          {this.props.markers.map((marker) => {

            return <Marker
              lat={marker.latitude}
              lng={marker.longitude}
              key={marker.id}
              // active={Number(this.props.active) === Number(marker.id)}
              hover={Number(this.props.hover) === Number(marker.id)}
              popUp={this.props.popUp}
            />

          })}
        </GoogleMap>
      )
    }

    return null
  }

}
