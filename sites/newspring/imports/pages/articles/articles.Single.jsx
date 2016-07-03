import { Component } from "react"
import ReactMixin from "react-mixin"
import { connect } from "react-apollo";
import { Likeable, Shareable } from "/imports/mixins"
import Meta from "react-helmet"
import { VelocityComponent } from "velocity-react"
import gql from "apollo-client/gql";

// loading state
import Split, { Left, Right } from "apollos/dist/core/blocks/split"
import { Headerable } from "apollos/dist/core/mixins"
import { Loading } from "apollos/dist/core/components"

// import editorial collection for lookup
import Helpers from "/imports/helpers"

import {
  nav as navActions
} from "apollos/dist/core/store"

// import content component
import Content from "./articles.Content";

const mapQueriesToProps = ({ ownProps, state }) => ({
  article: {
    query: gql`
      query getArticle($id: ID!) {
        content: node(id: $id) {
          id
          ... on Content {
            title
            status
            channelName
            authors
            meta {
              urlTitle
              siteId
              date
              channelId
            }
            content {
              body
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
    returnPartialData: false, // XXX can this be true?
  },
})
@connect({ mapQueriesToProps })
@ReactMixin.decorate(Likeable)
@ReactMixin.decorate(Shareable)
@ReactMixin.decorate(Headerable)
export default class ArticlesSingle extends Component {

  componentWillMount(){
    if (process.env.WEB) return;
    this.props.dispatch(navActions.setLevel("CONTENT"));
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
        <div>
          <Split nav={true} classes={["background--light-primary"]}>
            <Right
              mobile={true}
              background={photo}
              classes={["floating--bottom", "overlay--gradient@lap-and-up"]}
              ratioClasses={["floating__item", "overlay__item", "one-whole", "soft@lap-and-up"]}
              aspect="square"
            ></Right>
          </Split>
          <Left scroll={true} >
            <section className="soft@handheld soft@lap soft-double@lap-wide-and-up push-top push-double-top@lap-and-up">
              <Content article={article} />
            </section>
          </Left>
        </div>
      </VelocityComponent>
    );

  }
}
