import PropTypes from 'prop-types';
import { Component } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import SeriesVideoListItem from "./EntryListItem";
import { Spinner } from "../../components/@primitives/UI/loading";

class StudyEntryWithoutData extends Component {

  static propTypes = {
    studyEntries: PropTypes.object.isRequired,
    light: PropTypes.boolean,
    focus: PropTypes.string,
  }

  componentDidUpdate() {
    // no need to prefocus
    if (!this.props.focus) return;
    let index = 0;
    this.props.studyEntries.content.studyEntries.forEach(({ id }, i) => {
      if (this.props.focus === id) index = i + 2;
    });

    const element = this.slider;
    const windowWidth = window.innerWidth;
    const ratio = window.isTablet ? 0.375 : 0.8;
    const elementWidth = (window.innerWidth - 40) * ratio; // four-fifths
    const left = windowWidth - (elementWidth / 2);

    if (element.children[index] && index !== 0) {
      element.children[index].scrollIntoView({ block: "start", behavior: "smooth" });
      element.parentElement.scrollLeft += -(left - 10);
    } else if (index === element.children.length) {
      element.children[index - 1].scrollIntoView({ block: "start", behavior: "smooth" });
      element.parentElement.scrollLeft += (left - 10);
    } else if ((index - 1) === element.children.length) {
      element.children[0].scrollIntoView({ block: "start", behavior: "smooth" });
    }
    window.scroll(0, 0);
  }

  dynamicWidth = () => {
    if (typeof window !== "undefined" || window !== null) {
      const ratio = window.isTablet ? 0.375 : 0.8;
      let itemSize = (window.innerWidth - 40) * ratio; // four-fifths
      itemSize += 20; // account for margin
      const items = this.props.studyEntries.content.studyEntries.length;
      const width = (items * itemSize) + 40;
      return {
        width: `${width}px`,
      };
    }

    return {};
  }

  overflow = {
    overflowX: "scroll",
    overflowY: "hidden",
    paddingLeft: "20px",
    WebkitOverflowScrolling: "touch",
  }

  render() {
    const { content } = this.props.studyEntries;

    if (this.props.studyEntries.loading) {
      return (
        <div className="text-center soft-ends">
          <Spinner />
        </div>
      );
    }

    if (!content || content.studyEntries.length === 0) return null;

    const { studyEntries } = content;

    return (
      <div style={this.overflow}>
        <section
          className="soft-half-top"
          style={this.dynamicWidth()}
          ref={n => { this.slider = n; }}
        >
          {studyEntries.map((studyEntry, i) => (
            <SeriesVideoListItem
              studyEntry={studyEntry}
              order={i}
              key={i}
              light={this.props.light}
            />
          ))}
        </section>
      </div>
    );
  }
}

const STUDY_ENTRY_QUERY = gql`
  query GetEntriesFromStudy($id: ID!) {
    content: node(id: $id) {
      ... on Content {
        studyEntries: children(channels: ["study_entries"], showFutureEntries: true) {
          id
          entryId: id
          title
          status
          channelName
          parent {
            entryId: id
          }
          meta {
            urlTitle
            siteId
            date
            channelId
          }
          content {
            speaker
          }
        }
      }
    }
  }
`;

const withStudyEntries = graphql(STUDY_ENTRY_QUERY, {
  name: "studyEntries",
  options: ownProps => ({
    variables: { id: ownProps.id },
  }),
});

export default connect()(
  withStudyEntries(
    StudyEntryWithoutData
  )
);

export {
  StudyEntryWithoutData,
  STUDY_ENTRY_QUERY,
};
