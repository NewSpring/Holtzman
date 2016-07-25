import { Component } from "react"
import ReactMixin from "react-mixin"
import { Likeable, Shareable } from "/imports/mixins"
import { connect } from "react-apollo";
import gql from "graphql-tag";

// loading state
import { Loading } from "apollos/dist/core/components"
import { nav as navActions } from "apollos/dist/core/store"
import { Headerable } from "apollos/dist/core/mixins"

// import content component
import StoriesContent from "./stories.Content";

const mapQueriesToProps = ({ ownProps, state }) => ({
  story: {
    query: gql`
      query getStory($id: ID!) {
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
              body
              ooyalaId
              images {
                fileName
                fileType
                fileLabel
                s3
                cloudfront
              }
            }
          }
        }
      }
    `,
    variables: { id: ownProps.params.id },
    forceFetch: false,
    returnPartialData: true,
  },
});
@connect({ mapQueriesToProps })
@ReactMixin.decorate(Likeable)
@ReactMixin.decorate(Shareable)
@ReactMixin.decorate(Headerable)
export default class StoriesSingle extends Component {

  componentWillMount() {
    if (process.env.WEB) return;
    this.props.dispatch(navActions.setLevel("CONTENT"))
    this.props.dispatch(navActions.setAction("CONTENT", {
      id: 2,
      action: this.likeableAction
    }));
  }

  render() {
    const { content } = this.props.story;

    if (!content) {
      // loading
      return (
        <div className="locked-ends locked-sides floating">
          <div className="floating__item">
            <Loading/>
          </div>
        </div>
      )
    }

    const story = content;
    return <StoriesContent story={story} />
  }
}
