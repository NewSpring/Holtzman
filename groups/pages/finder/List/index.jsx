import { Component, PropTypes} from "react"

import Layout from "./Layout"

export default class ListContainer extends Component {

  onClick = (e) => {
    e.preventDefault()
    const { id } = e.currentTarget
    const { markers } = this.props

    if (this.props.onClick) {
      let marker;
      for (let _marker of markers) {
        if (`${_marker.Id}` === `${id}`) {
          marker = _marker
          break
        }
      }

      this.props.onClick(marker)
    }

  }

  onHover = (e) => {
    const { id } = e.currentTarget
    const { markers } = this.props

    if (this.props.onClick) {
      let marker;
      for (let _marker of markers) {
        if (`${_marker.Id}` === `${id}`) {
          marker = _marker
          break
        }
      }

      this.props.onHover(marker)
    }

  }
  render () {
    const markers = this.props.markers.filter((marker) => {
      return marker.GroupLocations.length
    })

    return (
      <Layout
        markers={markers}
        hover={this.props.hover}
        onHover={this.onHover}
        actvie={this.props.active}
        onClick={this.onClick}
      />
    )
  }
}
