/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';

import { Component } from "react";

import scriptures from "../../util/scriptures";
import react from "../../util/react";
import backgrounds from "../../util/backgrounds";

import RelatedContent from "../../components/content/related-content";

const defaultArray = [];
export default class DevotionsSingleContent extends Component {

  static propTypes = {
    devotion: PropTypes.object.isRequired,
    classes: PropTypes.array,
    onClickLink: PropTypes.func.isRequired,
  }

  getClasses = () => {
    let classes = [
      "hard",
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
        data-status-scroll-item
      >
        {(() => {
          if (!devotion.content.images.length) return null;
          return (
            <div
              className="one-whole ratio--square ratio--landscape@palm-wide background--fill"
              style={backgrounds.styles(devotion)}
            />
          );
        })()}
        <div className="soft soft-double@palm-wide-and-up push-top">
          <h2 className="capitalize">{devotion.title}</h2>
          {/* XXX update scripture formatting */}
          {(() => {
            if (!devotion.content.scripture) return null;
            return (
              <a
                href=""
                className="h4 soft-bottom display-block text-center"
                onClick={this.props.onClickLink}
              >{scriptures.list(devotion)}</a>
            );
          })()}

          <div dangerouslySetInnerHTML={react.markup(devotion)} />

        </div>
        <RelatedContent excludedIds={[devotion.id]} tags={devotion.content.tags || defaultArray} />

      </section>
    );
  }

}
