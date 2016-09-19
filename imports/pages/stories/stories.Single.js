import { Component } from "react";
import ReactMixin from "react-mixin";
import { connect } from "react-apollo";
import gql from "graphql-tag";

// loading state
import Loading from "../../components/loading";
import { nav as navActions } from "../../store";

import Headerable from "../../mixins/mixins.Header";
import Likeable from "../../mixins/mixins.Likeable";
import Shareable from "../../mixins/mixins.Shareable";

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
              tags
              images(sizes: ["large"]) {
                fileName
                fileType
                fileLabel
                url
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
    this.props.dispatch(navActions.setLevel("CONTENT"));
    this.props.dispatch(navActions.setAction("CONTENT", {
      id: 2,
      action: this.likeableAction,
    }));
  }

  render() {
    const { content } = this.props.story;

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

    const story = content;
    return <StoriesContent story={story} />;
  }
}
