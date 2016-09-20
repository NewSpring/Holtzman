import { Component, PropTypes } from "react";

export default class Toggle extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired, // eslint-disable-line
    toggle: PropTypes.func.isRequired,
    state: PropTypes.number,

  }

  state = {
    active: 0,
  }

  componentWillMount() {
    if (this.props.state !== null || this.props.state !== undefined) {
      this.setState({ active: this.props.state });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state !== null || this.props.state !== undefined) {
      this.setState({ active: nextProps.state });
    }
  }

  toggle = (event) => {
    const active = Number(event.target.dataset.toggle);
    if (active !== this.state.active) {
      if (typeof (this.props.toggle) === "function") {
        this.props.toggle(active);
      }

      this.setState({ active });
    }
  }

  toggleClasses = (main) => {
    const classes = [
      "transition",
      "text-center",
      "toggle__item",
    ];

    if (this.state.active === main) {
      classes.push("toggle__item--active");
    }
    return classes.join(" ");
  }

  toggleWidth = () =>
    100 / this.props.items.length;


  toggleStyle = { width: `${this.toggleWidth()}%` }

  arrowStyle = () =>
    ({ marginLeft: `${this.toggleWidth() * this.state.active}%` });

  render() {
    return (
      <div className="toggle push-bottom soft-sides" style={{ backgroundColor: "#fff" }}>
        {this.props.items.map((item, i) =>
          /* eslint-disable */
          <div
            data-toggle={i}
            className={this.toggleClasses(i)}
            style={this.toggleStyle}
            onClick={this.toggle}
            key={i}
          >{item}</div>
          /* eslint-enable */
        )}

        <div className="grid text-left toggle-arrow soft-sides">

          <div className="transition grid__item hard one-half toggle-arrow__item" style={this.arrowStyle()} />

        </div>

      </div>
    );
  }
}
