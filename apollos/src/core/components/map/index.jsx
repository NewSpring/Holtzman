import { Component, PropTypes} from "react"
import controllable from "react-controllables"
import shouldPureComponentUpdate from "react-pure-render/function"

let GoogleMap
if (Meteor.isClient) {
  GoogleMap = require("google-map-react").default;
}

import { fitBounds } from "google-map-react/utils";


import Marker from "./components/Marker"

const K_MARGIN_TOP = 30;
const K_MARGIN_RIGHT = 30;
const K_MARGIN_BOTTOM = 30;
const K_MARGIN_LEFT = 30;

const K_HOVER_DISTANCE = 30;

let dynamicProps = {};
let defaultCenter = [34.595413, -82.6241234];
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
      disableDefaultUI: true
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

  componentDidUpdate(prevProps){
    const didChange = !_.isEqual(this.props.markers, prevProps.markers)
    if (didChange && prevProps.autoCenter && this.map) {

      let markers = this.props.markers.filter((x) => {
        return x.latitude && x.longitude
      }).map((marker) => (
        new google.maps.LatLng(marker.latitude,marker.longitude)
      ))

      if (markers.length && markers.length > 1) {
        this.map.fitBounds(markers.reduce(function(bounds, marker) {
          return bounds.extend(marker);
        }, new google.maps.LatLngBounds()));
      }

    }
  }


  render () {
    try {
      if (this.props.markers && this.props.markers.length === 1) {
        let center = this.props.markers[0]
        if (!center.latitude || !center.longitude) {
          dynamicProps.defaultCenter = defaultCenter;
        } else {
          dynamicProps.center = [center.latitude, center.longitude]
        }
      } else {
        dynamicProps.defaultCenter = defaultCenter;
      }
      if (typeof window != "undefined" && window != null ) {
        return (
          <GoogleMap
            {...dynamicProps}
            zoom={this.props.zoom}
            options={this.props.options}
            onChange={this._onBoundsChange}
            onChildClick={this._onChildClick}
            onChildMouseEnter={this._onChildMouseEnter}
            onChildMouseLeave={this._onChildMouseLeave}
            distanceToMouse={this._distanceToMouse}
            bootstrapURLKeys={{ key: "AIzaSyCntgrGdfBmzdMxACihPEutGBh_5xsFx8Y" }}
            margin={[K_MARGIN_TOP, K_MARGIN_RIGHT, K_MARGIN_BOTTOM, K_MARGIN_LEFT]}
            hoverDistance={K_HOVER_DISTANCE}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({map, maps}) => {
              this.map = map
              let markers = this.props.markers
                .filter((x) => x.latitude && x.longitude)
                .map((marker) => (
                  new google.maps.LatLng(marker.latitude,marker.longitude)
                ))

              if (markers.length > 1) {
                this.map.fitBounds(markers.reduce(function(bounds, marker) {
                  return bounds.extend(marker);
                }, new google.maps.LatLngBounds()));
              }

            }}
          >
            {this.props.markers && this.props.markers.map((marker) => (
              <Marker
                lat={marker.latitude}
                lng={marker.longitude}
                key={marker.id}
                active={this.props.active === marker.id}
                hover={this.props.hover === marker.id}
                popUp={this.props.popUp}
              >{marker.children || null}</Marker>
            ))}
          </GoogleMap>
        )
      }
    } catch (e) {
      console.log(e)
      return null
    }

  }

}
