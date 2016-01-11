import { Component, PropTypes} from "react"
import { Link } from "react-router"

export default class List extends Component {

  handleClick = (e) => {
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

  hover = (e) => {
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
    let count = 0

    return (
      <div>
        <div className="constrain-copy soft-double-sides@lap-and-up soft-double-top@lap-and-up">
          <div className="soft soft-double-top hard-left@lap-and-up soft-half-bottom">
            <h2 className="flush hard">Found Groups</h2>
          </div>
        </div>

        {markers.map((marker, key) => {

          let classes = [
            "one-whole",
            "outlined--light",
            "outlined--bottom",
            "soft",
            "soft-double-sides@lap-and-up",
            "text-left"
          ]
          if (count % 2) {
            classes.push("background--light-secondary")
          }

          let icon
          if (marker.Id === this.props.hover) {
            icon = (
              <span
                className="locked-top locked-right push round background--secondary"
                style={{width: "20px", height: "20px"}}
              ></span>
            )
          }

          if (marker.Id === this.props.active) {
            icon = (
              <span
                className="locked-top locked-right push round background--primary"
                style={{width: "20px", height: "20px"}}
              ></span>
            )
          }

          count++
          return (
            <button id={marker.Id} onMouseOver={this.hover} onClick={this.handleClick} className={classes.join(" ")} key={key} style={{position:"relative"}}>
              {icon}
              <div className="soft-double-sides@lap-and-up">
                <h5><small>{marker.Name}</small></h5>
                <p className="flush">{marker.Description}</p>
              </div>

            </button>
          )
        })}
        <div className="text-center soft-double-ends">
          <Link to="/groups/finder" className="btn">Search Again</Link>

        </div>
      </div>
    )
  }
}
