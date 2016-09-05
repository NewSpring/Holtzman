import { Component, PropTypes } from "react";

import content from "../../util/content";

export default class Tags extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired
  }

  render() {

    const item = this.props.item;

    return (
      <p>
        <small>
          <em>
            {content.tags(item).map((tag, i) => {
              return (
                <a
                  href="#"
                  className="soft-half-right text-dark-tertiary plain"
                  key={i}>
                  {tag}
                </a>
              );
            })}
          </em>
        </small>
      </p>

    );

  }

}
