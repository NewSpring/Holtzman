import { Component, PropTypes} from "react"


export default class FeedItemSkeleton extends Component {
  render () {
    return (
      <div className="push-left push-half-bottom">
        <div className="rounded-top load-item ratio--square background--light-tertiary"></div>
        <div className="outlined--light soft card__item rounded-bottom">
          <div className="one-whole push-half-bottom background--light-tertiary fake-text" ></div>
          <div className="two-thirds push-bottom background--light-tertiary fake-text" ></div>
          <div className="one-fifth background--light-tertiary fake-text-small"></div>
        </div>
      </div>

    )

  }
}
