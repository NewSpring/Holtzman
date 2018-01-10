import PropTypes from "prop-types";
import { Component } from "react";

export default class Left extends Component {
  static propTypes = {
    classes: PropTypes.array,
    theme: PropTypes.string,
    scroll: PropTypes.bool,
    width: PropTypes.string,
    background: PropTypes.string,
    image: PropTypes.string,
    styles: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };

  layoutClasses = () => {
    let classes = [
      // "panel__item--left",
      "relative",
      "hard",
      "flush",
    ];

    if (this.props.scroll) {
      classes.push("scrollable");
    }

    if (this.props.width) {
      classes.push(this.props.width);
    } else if (process.env.NATIVE) {
      classes.push("one-whole@lap-and-up");
    } else {
      classes.push("seven-twelfths@lap-and-up");
    }

    if (this.props.background) {
      classes.push("background--fill");
    }

    if (this.props.classes) {
      classes = classes.concat(this.props.classes);
    }

    return classes.join(" ");
  };

  styles = () => {
    const defaults = {
      // position: "relative"
    };
    if (this.props.background) {
      return {
        ...defaults,
        ...{
          backgroundImage: `url('${this.props.image}')`,
        },
      };
    }

    return defaults;
  };

  render() {
    return (
      <section
        className={this.props.theme || this.layoutClasses()}
        style={this.props.styles || this.styles()}
      >
        {this.props.children}
      </section>
    );
  }
}
