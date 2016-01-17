import { Component, PropTypes } from "react"

export default class Toggle extends Component {

  state = {
    active: true
  }

  componentWillMount() {
    if (this.props.state != null || this.props.state != undefined) {
      this.setState({active: this.props.state})
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state != null || this.props.state != undefined) {
      this.setState({active: nextProps.state})
    }
  }

  toggle = (event) => {
    const active = event.target.dataset.toggle;
    if (active != this.state.active) {
      if (typeof(this.props.toggle) === "function") {
        this.props.toggle(!this.state.active);
      }

      this.setState({active: !this.state.active});
    }
  }

  toggleClasses = (main) => {
    let classes = [
      "transition",
      "one-half",
      "text-center",
      "toggle__item"
    ]

    if (this.state.active === main) {
      classes.push("toggle__item--active")
    }
    return classes.join(" ")
  }

  arrowStyle = () => {
    if (!this.state.active) {
      return {
        marginLeft: "50%"
      }
    }

    return {}
  }

  render () {

    return (
      <div className="toggle push-bottom soft-sides">
        <div data-toggle="true" className={this.toggleClasses(true)} onClick={this.toggle}>
          {this.props.items[0].label}
        </div>

        <div data-toggle="false" className={this.toggleClasses(false)} onClick={this.toggle}>
          {this.props.items[1].label}
        </div>

        <div className="grid text-left toggle-arrow soft-sides">

          <div className="transition grid__item hard one-half toggle-arrow__item" style={this.arrowStyle()}>
          </div>

        </div>

      </div>
    )
  }
}
