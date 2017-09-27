import PropTypes from 'prop-types';
import { Component } from "react";
import ReactMixin from "react-mixin";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import Meta from "../../../components/shared/meta";
import Loading from "../../../components/@primitives/UI/loading";

import canLike from "../../../components/@enhancers/likes/toggle";
import Shareable from "../../../deprecated/mixins/mixins.Shareable";

// import contentHelpers from "../../../util/content";
import collections from "../../../util/collections";

import {
  header as headerActions,
  live as liveActions,
} from "../../../data/store";

import StudyEntryList from "../EntryList";
import Content from "./Content";
import Slider from "./Slider";

class StudyEntrySingle extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    live: PropTypes.object.isRequired,
    studyEntry: PropTypes.object.isRequired,
    study: PropTypes.object.isRequired,
    params: PropTypes.object.isRequried,
  }

  state = {};

  componentWillMount() {
    if (process.env.WEB) return;

    // needed for client cache
    this.handleHeader(this.props);

    // hide the live bar and then bring it back
    // after the view has faded in. this prevents
    // an issue with the z-index and the arrow
    // from the header.
    this.props.dispatch(liveActions.hide());
    // for cached data
    this.handleLiveBar(this.props, this.state);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) return true;
    if (
      nextProps.studyEntry.content &&
      this.props.studyEntry.content &&
      this.props.study.content &&
      nextProps.study.content
      ) {
      if (
        nextProps.studyEntry.content.id === this.props.studyEntry.content.id &&
        this.props.study.content.id === nextProps.studyEntry.content.id
      ) {
        return false;
      }
      return true;
    }
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    this.handleLiveBar(nextProps, nextState);
    this.handleHeader(nextProps);
  }

  componentWillUnmount() {
    if (process.env.WEB) return;
    this.props.dispatch(headerActions.set({ fontWeight: null }));
    this.props.dispatch(liveActions.unfloat());
  }

  onClickLink = event => {
    event.preventDefault();
    this.setState({ liveSet: false, livePush: false });
  }

  getLiveClasses = () => {
    const classes = [];
    if (this.props.live.live && this.state.livePush) {
      classes.push("push-double-top");
    }

    return classes;
  }

  // if has scripture and live re-enabled
  // the live bar
  // else apply float styles to the bar so it
  // will display below the fixed header
  handleLiveBar = (props, state) => {
    const { liveSet } = state;
    const { content } = props.studyEntry;
    const { live } = props.live;

    if (liveSet || !live || !content) return;

    this.setState({ liveSet: true });

    if (content.content.scripture) {
      this.props.dispatch(liveActions.floatDouble());
      setTimeout(() => {
        this.setState({ livePush: true });
        this.props.dispatch(liveActions.show());
      }, 1000);
    } else {
      setTimeout(() => {
        this.props.dispatch(liveActions.show());
      }, 1000);
    }
  }

  handleHeader = nextProps => {
    const content = nextProps.study.content;
    if (!content || this.headerSet) return;

    const { isLight } = nextProps.study.content.content;
    const color = collections.color(content);

    const options = {
      title: content.title,
      color,
      light: !isLight,
      fontWeight: 400,
    };

    this.headerSet = true;
    this.props.dispatch(headerActions.set(options));
  }

  renderContent = (studyEntry, study) => {
    if (!studyEntry.content.scripture) {
      return (
        <div title="Devotional">
          <Content
            studyEntry={studyEntry}
            onClickLink={this.onClickLink}
            classes={this.getLiveClasses()}
          />
        </div>
      );
    }

    return (
      <Slider
        studyEntry={studyEntry}
        onClickLink={this.onClickLink}
        classes={this.getLiveClasses()}
        toggleColor={study.content && collections.color(study.content)}
        isLight={study.content && study.content.content.isLight}
        flush
      />
    );
  }

  render() {
    const { loading, content } = this.props.studyEntry;
    if (loading || !content || !this.props.study.content) {
      return (
        <div className="locked-ends locked-sides floating">
          <div className="floating__item">
            <Loading />
          </div>
        </div>
      );
    }

    const studyEntry = content;
    return (
      <div>
        <Meta
          title={studyEntry.title}
          id={studyEntry.id}
          image={
              studyEntry.content.images && studyEntry.content.images.length > 0
                ? studyEntry.content.images[0].url
                : null
          }
          meta={[
            { property: "og:type", content: "article" },
          ]}
        />
        {this.renderContent(studyEntry, this.props.study)}
        <div className="one-whole background--light-secondary text-center">
          <h4 className="text-dark-secondary soft-ends flush-bottm push-half-top">
            Next in this study
          </h4>
          <StudyEntryList
            id={this.props.params.id}
            focus={this.props.params.studyEntryId}
            light
          />
        </div>
      </div>
    );
  }

}

const CURRENT_STUDY_ENTRY_QUERY = gql`
  query GetStudyEntry($studyEntryId: ID!) {
    content: node(id: $studyEntryId) {
      ... on Content {
        entryId: id
        title
        status
        channelName
        meta {
          urlTitle
          siteId
          date
          actualDate
          channelId
        }
        content {
          audio {
            duration
            file: s3
          }
          images(sizes: ["large", "medium", "small"]) {
            fileName
            fileType
            fileLabel
            url
            size
          }
          scripture {
            book
            passage
          }
          body
          tags
          speaker
          ooyalaId
        }
      }
    }
  }
`;
const withCurrentStudyEntry = graphql(CURRENT_STUDY_ENTRY_QUERY, {
  name: "studyEntry",
  options: ownProps => ({
    variables: { studyEntryId: ownProps.params.studyEntryId },
  }),
});

const STUDY_QUERY = gql`
  query GetSingleStudy($id: ID!) {
    content: node(id: $id) {
      id
      ... on Content {
        entryId: id
        title
        status
        channelName
        meta {
          urlTitle
          siteId
          date
          channelId
        }
        content {
          description
          images(sizes: ["large", "medium", "small"]) {
            fileName
            fileType
            fileLabel
            url
            size
          }
          ooyalaId
          colors {
            id
            value
            description
          }
          isLight
        }
      }
    }
  }
`;

const withStudy = graphql(STUDY_QUERY, {
  name: "study",
  options: ownProps => ({
    variables: { id: ownProps.params.id },
  }),
});

const mapStateToProps = state => ({
  modal: { visible: state.modal.visible },
  live: state.live,
});

export default connect(mapStateToProps)(
  withCurrentStudyEntry(
    withStudy(
      ReactMixin.decorate(Shareable)(
        canLike(
          props => (props.studyEntry.loading ? null : props.studyEntry.content.entryId)
        )(StudyEntrySingle)
      )
    )
  )
);

export {
  StudyEntrySingle as StudyEntrySingleWithoutData,
};
