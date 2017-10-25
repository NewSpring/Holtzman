// @flow
import { Component } from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import gql from "graphql-tag";

import Layout from "./Layout";

// XXX add skip if no tags

/* eslint-disable max-len */
export const RELATED_CONTENT_QUERY = gql`
  query GetRelatedContent($tags: [String], $includeChannels: [String], $limit: Int, $excludedIds: [String]) {
    taggedContent(tags: $tags, limit: $limit, includeChannels: $includeChannels, excludedIds: $excludedIds) {
      entryId: id
      id
      title
      channel: channelName
      channelName
      parent {
        id
        entryId: id
        content {
          images(sizes: ["medium"]) {
            url
            label
            fileLabel
            id
          }
        }
      }
      content {
        images(sizes: ["medium"]) {
          url
          label
          fileLabel
          id
        }
      }
    }
  }
`;

const defaultArray = [];
export const withRelatedContent = graphql(RELATED_CONTENT_QUERY, {
  name: "content",
  options: ownProps => ({
    variables: {
      tags: ownProps.tags || defaultArray,
      includeChannels: ownProps.includeChannels || defaultArray,
      limit: ownProps.limit || 3,
      excludedIds: ownProps.excludedIds || defaultArray,
    },
  }),
});

type ITemplate = {
  content: Object,
  title: string,
};

export class Template extends Component {
  props: ITemplate

  static defaultProps = {
    title: "More Like This",
  }

  render() {
    const { taggedContent, loading } = this.props.content;
    if (!loading && (taggedContent && !taggedContent.length)) return null;

    return (
      <Layout
        title={this.props.title}
        content={taggedContent}
        loading={loading}
      />
    );
  }
}

export default withRelatedContent(connect()(Template));
