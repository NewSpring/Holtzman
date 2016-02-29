import { Component, PropTypes } from "react";

export default class DiscoverItem extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired
  }

  backgroundStyles = {
    backgroundImage: `url('${this.props.item.image}')`
  }

  render() {
    return (
      <div className="one-whole grid__item push-half-bottom">
        <a href={this.props.item.link}>
          <div
            className="overlay rounded background--fill ratio---landscape
                       floating--bottom floating--left"
            style={this.backgroundStyles}
            >
            <div className="overlay__item floating__item soft-left soft-ends text-light-primary">
              <h5 className="flush">{this.props.item.topicName}</h5>
              <h7 className="soft-top">{this.props.item.tags.join(", ")}</h7>
            </div>
          </div>
        </a>
      </div>
    );
  }

}
