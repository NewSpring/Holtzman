import { Component, PropTypes} from "react"
import { Link } from "react-router"

export default class Card extends Component {

  static propTypes = {
    classes: PropTypes.array,
    theme: PropTypes.string,
    link: PropTypes.string,
    background: PropTypes.object,
    styles: PropTypes.object
  }

  layoutClasses = () => {
    let classes = [
      "card__item",
      "outlined--light",
      "soft",
      "rounded-bottom",
      "text-center"
    ];

    if (this.props.classes) {
      classes = classes.concat(this.props.classes);
    }

    return classes.join(" ");
  }

  styles = () => {
    return {}
  }

  createImage = () => {

    const { image } = this.props

    if (image && image.url) {
      let imageclasses = [
        "rounded-top",
        "background--fill",
        "card__image"
      ]
      if (image.ratio) {
        imageclasses.push(image.ratio)
      } else {
        imageclasses.push("ratio--landscape")
      }

      return (
        <div className={imageclasses.join(" ")} style={{backgroundImage: `url(${image.url})` }}>
          <div className="ratio__item"></div>
        </div>
      )
    }
  }

  render () {

    const { link, image, theme, styles } = this.props

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
      <div className="card">

        <Wrapper className="plain" to={link}>
          {this.createImage()}
        </Wrapper>
        <div
          className={ theme || this.layoutClasses() }
          style={ styles || this.styles() }
        >
          {this.props.children}
        </div>

      </div>

    )
  }

}
