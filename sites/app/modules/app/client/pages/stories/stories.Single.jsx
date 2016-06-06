import { Component } from "react"
import ReactMixin from "react-mixin"
import { Likeable, Shareable, Headerable } from "app/client/mixins"
import { connect, gql } from "apollos/core/graphql/apollo";
import { VelocityComponent } from "velocity-react"

// loading state
import { Loading } from "apollos/core/components"
import { nav as navActions } from "apollos/core/store"

// import content component
import StoriesContent from "./stories.Content";

import StoryQuery from "./queries/single"

const mapQueriesToProps = ({ ownProps, state }) => {
  const pathParts = state.routing.location.pathname.split("/");
  return {
    story: {
      query: gql`${StoryQuery}`,
      variables: {
        entryId: Number(pathParts[2]),
      },
      forceFetch: false,
      returnPartialData: false,
    },
  };
};
@connect({ mapQueriesToProps })
@ReactMixin.decorate(Likeable)
@ReactMixin.decorate(Shareable)
@ReactMixin.decorate(Headerable)
export default class StoriesSingle extends Component {

  componentWillMount() {
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

    return (
      <VelocityComponent
        animation={"transition.fadeIn"}
        duration={1000}
        runOnMount={true}
      >
        <StoriesContent story={story} />
      </VelocityComponent>
    );

  }

}
