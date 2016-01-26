import { Component, PropTypes} from "react"
import { Link } from "react-router"

export default class Card extends Component {

  static propTypes = {
    classes: PropTypes.array,
    theme: PropTypes.string,
    link: PropTypes.string,
    image: PropTypes.object,
    styles: PropTypes.object
  }

  itemClasses = () => {
    let classes = [
      "card__item",
      "outlined--light",
      "soft",
      "rounded-bottom",
      "text-center"
    ];

    if (this.props.itemClasses) {
      classes = classes.concat(this.props.itemClasses);
    }

    return classes.join(" ");
  }

  cardClasses = () => {
    let classes = [
      "card",
    ];

    if (this.props.classes) {
      classes = classes.concat(this.props.classes);
    }

    return classes.join(" ");
  }

  styles = () => {
    let defaultStyles = {
      overflow: "hidden"
    }

    if (this.props.image && this.props.image.full) {
      defaultStyles.backgroundImage = `url(${this.props.image.url})`
    }

    return defaultStyles
  }

  createImage = () => {

    const { image } = this.props

    if (image) {
      let imageclasses = [
        "rounded-top",
        "background--fill",
        "card__image",
        "background-light-tertiary"

      ]

      if (image.ratio) {
        imageclasses.push(`ratio--${image.ratio}`)
      } else {
        imageclasses.push("ratio--landscape")
      }

      let style
      if (image.full != true) {
        style = {
          backgroundImage: `url(${image.url})`
        }
      }

      return (
        <div className={imageclasses.join(" ")} style={style}>
          <div className="ratio__item"></div>
        </div>
      )
    }
  }

  render () {

    const { link, image, theme, styles, itemTheme, itemStyles } = this.props

    let Wrapper = Link

    if (!link) {
      Wrapper = class ALink extends Component {
        render() {
          return (
            <div {...this.props}>
              {this.props.children}
            </div>
          )
        }
      }
    }

    return (
      <div
        className={theme || this.cardClasses()}
        style={styles || this.styles() }
        >

        <Wrapper className="plain" to={link}>
          {this.createImage()}
        </Wrapper>
        <div
          className={ itemTheme || this.itemClasses() }
          style={itemStyles}
        >
          {this.props.children}
        </div>

      </div>

    )
  }

}
