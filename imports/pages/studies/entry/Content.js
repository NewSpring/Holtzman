import PropTypes from "prop-types";
/* eslint-disable react/no-danger */
import { Component } from "react";

import Video from "../../../components/@primitives/players/video";

import scriptures from "../../../util/scriptures";
import react from "../../../util/react";
import backgrounds from "../../../util/backgrounds";

import RelatedContent from "../../../components/content/related-content";

const defaultArray = [];
export default class Content extends Component {

  static propTypes = {
    studyEntry: PropTypes.object.isRequired,
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
    const studyEntry = this.props.studyEntry;

    return (
      <section
        className={this.getClasses()}
        style={{ transition: "0.7s margin" }}
      >
        {!studyEntry.content.ooyalaId && (studyEntry.content.images.length > 0) && (
          <div
            className="one-whole ratio--landscape background--fill"
            style={backgrounds.styles(studyEntry, "2:1")}
          />
        )}

        {studyEntry.content.ooyalaId && (
          <Video id={studyEntry.content.ooyalaId} />
        )}

        <div className="soft soft-double@palm-wide-and-up push-top">
          <h2 className="capitalize">{studyEntry.title}</h2>

          {studyEntry.content.scripture && (
            <a
              href=""
              className="h4 soft-bottom display-block text-center"
              onClick={this.props.onClickLink}
            >{scriptures.list(studyEntry)}</a>
          )}

          <div dangerouslySetInnerHTML={react.markup(studyEntry)} />

        </div>

        {(studyEntry.content.tags > 0) && (
          <RelatedContent
            excludedIds={[studyEntry.id]}
            tags={studyEntry.content.tags || defaultArray}
          />
        )}

      </section>
    );
  }

}
