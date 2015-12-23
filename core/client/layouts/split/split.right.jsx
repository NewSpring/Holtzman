import { Component, PropTypes} from "react"

export default class Right extends Component {

  static propTypes = {
    classes: PropTypes.array,
    theme: PropTypes.string,
    scroll: PropTypes.bool,
    width: PropTypes.string,
    background: PropTypes.string,
    styles: PropTypes.object
  }

  layoutClasses = () => {
    let classes = [
      "panel__item--right",
      "hard",
      "flush"
    ];

    if (this.props.mobile) {
      classes.push("ratio--landscape@handheld")
    } else {
      classes.push("visuallyhidden@handheld")
    }

    if (this.props.scroll) {
      classes.push("scrollable")
    }

    if (this.props.width) {
      classes.push(this.props.width)
    } else {
      classes.push("five-twelfths@lap-and-up")
    }

    if (this.props.background) {
      classes.push("background--fill")
    }

    if (this.props.classes) {
      classes = classes.concat(this.props.classes);
    }

    return classes.join(" ");
  }

  styles = () => {
    if (this.props.background) {
      return {
        backgroundImage: `url(${this.props.background})`
      }
    }

    return {}
  }

  render () {
    return (
      <section
        className={ this.props.theme || this.layoutClasses() }
        style={ this.props.styles || this.styles() }
      >
      <div className="ratio__item">
        {this.props.children}
      </div>

      </section>
    )
  }

}
