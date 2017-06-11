import PropTypes from "prop-types";
/* eslint-disable react/no-danger */
import { Component } from "react";
import ReactMixin from "react-mixin";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Meta from "../../components/shared/meta";

// loading state
import Loading from "../../components/@primitives/UI/loading";
import headerActions from "../../data/store/header";

import Headerable from "../../deprecated/mixins/mixins.Header";
import canLike from "../../components/@enhancers/likes/toggle";
import Shareable from "../../deprecated/mixins/mixins.Shareable";


import RelatedContent from "../../components/content/related-content";

import collections from "../../util/collections";
import contentHelpers from "../../util/content";
import styles from "../../util/styles";
import react from "../../util/react";
import inAppLink from "../../util/inAppLink";


import StudyHero from "./Hero";
import StudyEntryList from "./EntryList";

class StudiesSingleWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    study: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  }

  componentWillMount() {
    if (process.env.WEB) return;

    // needed for cached data
    this.handleHeaderStyle(this.props);
  }

  componentWillUpdate(nextProps) {
    this.handleHeaderStyle(nextProps);
  }

  handleHeaderStyle = (nextProps) => {
    const content = nextProps.study.content;
    if (!content) return;
    const { isLight } = nextProps.study.content.content;
    const color = collections.color(content);
    this.props.dispatch(headerActions.set({
      title: nextProps.study.content.title,
      color,
      light: !isLight,
    }));
  }

  hackBackgroundStyles() {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -1,
    };
  }

  render() {
    const { content } = this.props.study;

    if (!content) {
      // loading
      return (
        <div className="locked-ends locked-sides floating">
          <div className="floating__item">
            <Loading />
          </div>
        </div>
      );
    }

    const study = content;
    const { isLight } = study.content;
    return (
      <div>
        <Meta
          title={study.title}
          description={study.content.description}
          image={
            study.content.images && study.content.images.length > 0
              ? study.content.images[0].url
              : null
          }
          id={study.id}
        />
        <div className={`${collections.classes(study)} background--light-primary`}>
          <div className={collections.classes(study)} style={this.hackBackgroundStyles()} />
          <style>{styles.overlay(study)}</style>
          <style>{collections.backgroundStyles(study)}</style>
          <StudyHero study={study} />
          <section className={`${study.content.isLight ? "text-dark-primary" : "text-light-primary"} hard-ends soft-double-sides@palm-wide`}>
            <div dangerouslySetInnerHTML={react.markup(study, "description")} />
          </section>
          {!study.children.length && (
            <div className="one-whole text-center soft-bottom">
              <a
                href={contentHelpers.siteLink(study)}
                onClick={inAppLink}
                className={`${isLight ? "btn--dark-secondary" : "btn--light"} plain`}
              >
                View Study
              </a>
            </div>
          )}
          <StudyEntryList id={this.props.params.id} />
        </div>
        <RelatedContent excludedIds={[study.id]} tags={study.content.tags} />
      </div>

    );
  }
}

const STUDY_SINGLE_QUERY = gql`
  query GetSingleStudy($id: ID!) {
    content: node(id: $id) {
      id
      ... on Content {
        entryId: id
        title
        status
        channelName
        children {
          id
        }
        meta {
          urlTitle
          siteId
          date
          channelId
        }
        content {
          description
          tags
          isLight
          images(sizes: ["large"]) {
            fileName
            fileType
            fileLabel
            url
          }
          ooyalaId
          colors {
            id
            value
            description
          }
        }
      }
    }
  }
`;

const withStudySingle = graphql(STUDY_SINGLE_QUERY, {
  name: "study",
  options: (ownProps) => ({
    variables: { id: ownProps.params.id },
  }),
});

export default connect()(
  withStudySingle(
    ReactMixin.decorate(Shareable)(
      ReactMixin.decorate(Headerable)(
        canLike(
          (props) => (props.study.loading ? null : props.study.content.id)
        )(StudiesSingleWithoutData)
      )
    )
  )
);

export {
  StudiesSingleWithoutData,
  STUDY_SINGLE_QUERY,
};
