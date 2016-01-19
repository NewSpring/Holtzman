import { Component, PropTypes } from "react"

export default class Toggle extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    toggle: PropTypes.func.isRequired
  }

  state = {
    active: 0
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
        this.props.toggle(active);
      }

      this.setState({active: active});
    }
  }

  toggleClasses = (main) => {
    let classes = [
      "transition",
      "text-center",
      "toggle__item"
    ]

    if (this.state.active === main) {
      classes.push("toggle__item--active")
    }
    return classes.join(" ")
  }

  toggleWidth = () => {
    return 100 / this.props.items.length
  }

  toggleStyle = { width: `${this.toggleWidth()}%` }

  arrowStyle = () => {
    return {
      marginLeft: `${this.toggleWidth() * this.state.active}%`
    }
  }

  render () {

    return (
      <div className="toggle push-bottom soft-sides">
        {this.props.items.map((item, i) => {
          return(
            <div
              data-toggle={i}
              className={this.toggleClasses(i)}
              style={this.toggleStyle}
              onClick={this.toggle}
              key={i}
              >
              {item}
            </div>
          );
        })}

        <div className="grid text-left toggle-arrow soft-sides">

          <div className="transition grid__item hard one-half toggle-arrow__item" style={this.arrowStyle()}>
          </div>

        </div>

      </div>
    )
  }
}
