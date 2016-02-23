import { Component, PropTypes} from "react"
import { Link } from "react-router"

import { ImageLoader } from "../loading"

import Styles from "../loading/FeedItemSkeleton.css"

let Wrapper = (props) => (
  <div {...props}>
    {props.children}
  </div>
)

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
      "soft",
      "text-center",
      "soft-double-ends"
    ];

    if (this.props.itemClasses) {
      classes = classes.concat(this.props.itemClasses);
    }

    if (this.props.linkAll) {
      classes.push("background--light-primary")
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
      overflow: "hidden",
      display: "block"
    }

    if (this.props.image && this.props.image.full) {
      defaultStyles.backgroundImage = `url(${this.props.image.url})`
    }

    if (this.props.linkAll) {
      defaultStyles.color = "inherit"
      defaultStyles.textDecoration = "none"
    }

    return defaultStyles
  }

  // context from ImageLoader
  preloader() {
    return (
      <div className={`${this.imageclasses.join(" ")} ${Styles["load-item"]}`}>
        <div className="ratio__item"></div>
      </div>
    );
  }

  // context from ImageLoader
  renderElement() {
    return (
      <div className={this.imageclasses.join(" ")} style={this.style}>
        <div className="ratio__item"></div>
      </div>
    );
  }

  createImage = () => {

    const { image } = this.props

    if (image) {
      let imageclasses = [
        "background--fill",
        "card__image",
        "background-light-tertiary"

      ]

      if (image.ratio) {
        imageclasses.push(`ratio--${image.ratio}`)
      } else {
        imageclasses.push("ratio--landscape")
      }

      if (this.props.imageclasses) {
        imageclasses = [...imageclasses, ...this.props.imageclasses]
      }

      let style
      if (image.full != true) {
        style = {
          backgroundImage: `url(${image.url})`
        }
      }

      return (
        <ImageLoader
          src={image.url}
          preloader={this.preloader}
          renderElement={this.renderElement}
          imageclasses={imageclasses}
          style={style}
        />
      )
    }
  }

  render () {

    const { link, image, theme, styles, itemTheme, itemStyles } = this.props

    let wrapperClasses = "plain"
    if (this.props.mobile ===  false) {
      wrapperClasses += " visuallyhidden@handheld"
    }

    if (this.props.linkAll) {
      return (
        <Link
          className={theme || this.cardClasses()}
          style={styles || this.styles() }
          to={link}
        >
          <div className={wrapperClasses} >
            {this.createImage()}
          </div>
          <div
            className={ itemTheme || this.itemClasses() }
            style={itemStyles}
          >
            {this.props.children}
          </div>
        </Link>
      )
    }

    return (
      <div
        className={theme || this.cardClasses()}
        style={styles || this.styles() }
        >
        {() => {
          if (link) {
            return (
              <Link className={wrapperClasses} to={link}>
                {this.createImage()}
              </Link>
            )
          }
          return (
            <Wrapper className={wrapperClasses}>
              {this.createImage()}
            </Wrapper>
          )
        }()}
        
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
