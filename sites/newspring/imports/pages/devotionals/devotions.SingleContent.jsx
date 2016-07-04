import { Component, PropTypes } from "react";


import Helpers from "/imports/helpers"
import Components from "/imports/components"


export default class DevotionsSingleContent extends Component {

  static propTypes = {
    devotion: PropTypes.object.isRequired
  }

  render() {

    const devotion = this.props.devotion;

    // `data-status-scroll-container` is set in the react-swipe-views module
    return (
      <section
        className="hard-sides hard-top background--light-primary"
        data-status-scroll-item={true}
      >
          <div
            className="one-whole ratio--square background--fill"
            style={Helpers.backgrounds.styles(devotion)}>
          </div>
          <div className="soft push-top">
            <h2 className="capitalize">{devotion.title}</h2>
            {/* XXX update scripture formatting */}
            {(() => {
              if (!devotion.content.scripture) return null;
              return (
                <a
                  href="#"
                  className="h4 soft-bottom display-block text-center"
                  onClick={this.props.onClickLink}
                  >{Helpers.scriptures.list(devotion)}</a>
              );
            })()}

            <div dangerouslySetInnerHTML={Helpers.react.markup(devotion)}></div>

          </div>
        </section>
      );
    }

}
