import { Component, PropTypes } from "react"
import { connect } from "react-apollo";
import gql from "apollo-client/gql"; // XXX update to graphql-tag

import Loading from "apollos-core/dist/core/components/loading"
import MiniCard from "/imports/components/cards/cards.MiniCard";

// XXX add skip if no tags
let defaultArray = [];
const mapQueriesToProps = ({ ownProps }) => ({
  content: {
    query: gql`
      query GetRelatedContent($tags: [String], $includeChannels: [String], $limit: Int, $excludedIds: [String]) {
        taggedContent(tags: $tags, limit: $limit, includeChannels: $includeChannels, excludedIds: $excludedIds) {
          entryId: id
          id
          title
          channelName
          parent {
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
    `,
    variables: {
      tags: ownProps.tags || defaultArray,
      includeChannels: ownProps.includeChannels || defaultArray,
      limit: ownProps.limit || 3,
      excludedIds: ownProps.excludedIds || defaultArray,
    }
  }
});

@connect({ mapQueriesToProps })
export default class RelatedContent extends Component {

  static defaultProps = {
    title: "More Like This"
  }

  render () {
    const { taggedContent, loading } = this.props.content;
    if (!loading && (taggedContent && !taggedContent.length)) return null;
    return (
      <section className="soft-half-sides@palm soft-double@palm-wide soft-top soft-half-bottom background--light-secondary">
        <div className="one-whole text-center">
          <h5 className="flush soft-bottom">{this.props.title}</h5>
        </div>
        <div>
          {(() => {
            if (this.props.content.loading) {
              return (
                <div className="one-whole text-center soft">
                  <Loading />
                </div>
              )
            }
          })()}
          {taggedContent && taggedContent.map((content, key) => (
            <div key={key} className="soft-half-bottom@palm-wide">
            <MiniCard
              title={content.title}
              images={content.content.images}
              type={content.channel}
              content={content}
            />
            </div>
          ))}
        </div>
      </section>
    )
  }
}
