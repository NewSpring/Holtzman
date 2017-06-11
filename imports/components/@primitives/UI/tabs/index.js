import PropTypes from "prop-types";
import { Component } from "react";

export default class Tabs extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired, // eslint-disable-line
    toggle: PropTypes.func.isRequired,
    state: PropTypes.oneOfType([PropTypes.number, PropTypes.boolean]),
    style: PropTypes.obj,
    toggleClass: PropTypes.string,
    activeClass: PropTypes.string,
    arrowClass: PropTypes.string,
    arrowStyle: PropTypes.obj,
    flush: PropTypes.boolean,
  }

  state = {
    active: 0,
  }

  componentWillMount() {
    if (this.props.state !== null && this.props.state !== undefined) {
      this.setState({ active: this.props.state });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state !== null && this.props.state !== undefined) {
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
      if (this.props.activeClass) classes.push(this.props.activeClass);
    } else if (this.props.toggleClass) {
      classes.push(this.props.toggleClass);
    }

    return classes.join(" ");
  }

  toggleWidth = () =>
    100 / this.props.items.length;


  toggleStyle = { width: `${this.toggleWidth()}%` }

  arrowStyle = () => ({
    ...this.props.arrowStyle,
    ...{ marginLeft: `${this.toggleWidth() * this.state.active}%` },
  })

  render() {
    const { flush } = this.props;
    return (
      <div
        className={`toggle ${flush ? "" : "push-bottom"} soft-sides`}
        style={{ ...{ backgroundColor: "#fff" }, ...this.props.style }}
      >
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

          <div
            className={`transition grid__item hard one-half toggle-arrow__item ${this.props.arrowClass || ""}`}
            style={this.arrowStyle()}
          />

        </div>

      </div>
    );
  }
}
