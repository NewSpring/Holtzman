import { Component, PropTypes} from "react"

export default class Left extends Component {

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
      "panel__item--left",
      "hard",
      "flush"
    ];

    if (this.props.scroll) {
      classes.push("scrollable")
    }

    if (this.props.width) {
      classes.push(this.props.width)
    } else {
      classes.push("seven-twelfths@lap-and-up")
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
        backgroundImage: `url($this.props.image)`
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
        {this.props.children}
      </section>
    )
  }

}
