import { Component } from "react"
import ReactMixin from "react-mixin"
import { connect, gql } from "apollos/core/graphql/apollo";
import { Likeable, Shareable } from "app/client/mixins"
import Meta from "react-helmet"
import { VelocityComponent } from "velocity-react"

// loading state
import Split, { Left, Right } from "apollos/core/blocks/split"
import { Loading } from "apollos/core/components"

// import editorial collection for lookup
import Helpers from "app/client/helpers"

import {
  nav as navActions
} from "apollos/core/store"

// import content component
import Content from "./articles.Content";

import ArticleQuery from "./queries/single"

const mapQueriesToProps = ({ ownProps, state }) => {
  const pathParts = state.routing.location.pathname.split("/");
  return {
    article: {
      query: gql`${ArticleQuery}`,
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
export default class ArticlesSingle extends Component {

  componentWillMount(){
    this.props.dispatch(navActions.setLevel("CONTENT"))
    this.props.dispatch(navActions.setAction("CONTENT", {
      id: 2,
      action: this.likeableAction
    }));
  }

  render() {
    const { content } = this.props.article;

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

    const article = content;

    let photo = Helpers.backgrounds.image(article)

    return (
      <VelocityComponent
        animation={"transition.fadeIn"}
        duration={1000}
        runOnMount={true}
      >
        <Split nav={true} classes={["background--light-primary"]}>
          <Right
            mobile={true}
            background={photo}
            classes={["floating--bottom", "overlay--gradient@lap-and-up"]}
            ratioClasses={["floating__item", "overlay__item", "one-whole", "soft@lap-and-up"]}
            aspect="square"
          ></Right>

          <Left scroll={true} >
            <section className="soft@handheld soft@lap soft-double@lap-wide-and-up push-top push-double-top@lap-and-up">
              <Content article={article} />
            </section>
          </Left>
        </Split>
      </VelocityComponent>


    );

  }

}
