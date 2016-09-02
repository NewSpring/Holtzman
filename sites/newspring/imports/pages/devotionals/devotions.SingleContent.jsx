import { Component, PropTypes } from "react";


import Helpers from "/imports/helpers"
import Components from "/imports/components"
import RelatedContent from "/imports/blocks/content/RelatedContent";
let defaultArray = [];
export default class DevotionsSingleContent extends Component {

  static propTypes = {
    devotion: PropTypes.object.isRequired
  }

  getClasses = () => {
    let classes = [
      "hard-sides",
      "hard-top",
      "background--light-primary",
    ];

    if (this.props.classes) {
      classes = classes.concat(this.props.classes);
    }

    return classes.join(" ");
  }

  render() {

    const devotion = this.props.devotion;

    // `data-status-scroll-container` is set in the react-swipe-views module
    return (
      <section
        className={this.getClasses()}
        style={{
          transition: "0.7s margin",
        }}
        data-status-scroll-item={true}
      >
        {(() => {
          if (!devotion.content.images.length) return null;
          return (
            <div
              className="one-whole ratio--square ratio--landscape@palm-wide background--fill"
              style={Helpers.backgrounds.styles(devotion)}>
            </div>
          )
        })()}
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
          <RelatedContent excludedIds={[devotion.id]} tags={devotion.content.tags || defaultArray} />

        </section>
      );
    }

}
