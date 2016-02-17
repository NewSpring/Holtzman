import { Component, PropTypes} from "react"
import { Link } from "react-router"
import { ImageLoader } from "../../components/loading"
import Styles from "../../components/loading/FeedItemSkeleton.css"


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

    if (this.props.mobile && !this.props.aspect) {
      classes.push("ratio--landscape@handheld")
    } else if (this.props.mobile && this.props.aspect) {
      classes.push(`ratio--${this.props.aspect}@handheld`)
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

    return classes
  }

  styles = () => {
    if (this.props.background) {
      return {
        backgroundImage: `url(${this.props.background})`
      }
    }

    return {}
  }

  ratioClasses = () => {
    let classes = ["ratio__item"]

    if (this.props.ratioClasses) {
      classes = classes.concat(this.props.ratioClasses)
    }

    return classes.join(" ")
  }

  // context from ImageLoader
  preloader() {
    return (
      <section className={`${this.imageclasses.join(" ")} ${Styles["load-item"]}`}>
        { this.children ? this.children : null }
      </section>
    );
  }

  // context from ImageLoader
  renderElement() {
    return (
      <section className={this.imageclasses.join(" ")} style={this.style}>
        { this.children ? this.children : null }
      </section>
    );
  }

  render () {

    const { blur } = this.props

    let Wrapper = (props) => (
      <section {...props}>{props.children}</section>
    )

    if (this.props.background) {
      Wrapper = ImageLoader
    }

    if (this.props.link) {
      let OldWrapper = Wrapper
      Wrapper = (props) => (
        <Link
          to={this.props.link}
          className={this.props.theme || this.layoutClasses().join(" ")}
        >
          <OldWrapper {...props} imageclasses={[
            "background--fill",
            "locked-ends",
            "locked-sides",
            "hard",
            "floating"
          ]} />
        </Link>
      )
    }

    return (

      <Wrapper
        src={this.props.background}
        preloader={this.preloader}
        renderElement={this.renderElement}
        imageclasses={this.props.theme && this.props.theme.split(" ") || this.layoutClasses()}
        style={this.props.styles || this.styles()}
      >

        <div className={ this.props.ratioTheme || this.ratioClasses()}>
          {this.props.children}
        </div>

        {() => {
          if (this.props.outsideRatio) {
            return this.props.outsideRatio()
          }
        }()}
        {() => {
          let styles = this.styles()

          styles = {...styles, ...{
              WebkitFilter: "blur(10px)",
              filter: "blur(10px)"
          }}

          if (blur) {
            return (
              <div className="locked-sides locked-ends background--fill" style={styles}></div>
            )
          }
        }()}

      </Wrapper>
    )
  }

}
