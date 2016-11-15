import { Component, PropTypes } from "react";
import ReactMixin from "react-mixin";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Meta from "../../components/meta";

// loading state
import Split, { Left, Right } from "../../blocks/split";
import Headerable from "../../mixins/mixins.Header";
import Likeable from "../../mixins/mixins.Likeable";
import Shareable from "../../mixins/mixins.Shareable";

import Loading from "../../components/loading";

// import editorial collection for lookup
import backgrounds from "../../util/backgrounds";
import RelatedContent from "../../blocks/related-content";

import SingleVideoPlayer from "../../components/players/video/Player";

import {
  nav as navActions,
} from "../../store";

// import content component
import Content from "./articles.Content";

const defaultArray = [];

class ArticlesSingle extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired,
  }

  componentWillMount() {
    if (process.env.WEB) return;
    this.props.dispatch(navActions.setLevel("CONTENT"));
    this.props.dispatch(navActions.setAction("CONTENT", {
      id: 2,
      action: this.likeableAction,
    }));
  }

  render() {
    const { content } = this.props.article;

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

    const article = content;
    const photo = backgrounds.image(article);
    return (
      <div>
        <Meta
          title={article.title}
          image={photo}
          id={article.id}
          meta={[
            { property: "og:type", content: "article" },
          ]}
        />
        <Split nav classes={["background--light-primary"]}>
          {(() => {
            if (article.content.ooyalaId.length === 0) {
              return (
                <Right
                  mobile
                  background={photo}
                  classes={["floating--bottom", "overlay--gradient@lap-and-up"]}
                  ratioClasses={["floating__item", "overlay__item", "one-whole", "soft@lap-and-up"]}
                  aspect="square"
                />
              );
            }
            return <SingleVideoPlayer ooyalaId={article.content.ooyalaId} />;
          })()}
        </Split>
        <Left scroll >
          <div className="one-whole">
            <section
              className={
                "soft@palm soft-double-sides@palm-wide-and-up soft@lap " +
                "soft-double@lap-wide-and-up push-top push-double-top@lap-and-up"
              }
            >
              <Content article={article} />
            </section>
            <RelatedContent
              excludedIds={[article.id]}
              tags={article.content.tags || defaultArray}
            />
          </div>
        </Left>
      </div>
    );
  }
}

const ARTICLE_QUERY = gql`
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
`;

const withArticle = graphql(ARTICLE_QUERY, {
  name: "article",
  options: (ownProps) => ({
    variables: { id: ownProps.params.id },
  }),
});

export default connect()(
  withArticle(
    ReactMixin.decorate(Likeable)(
      ReactMixin.decorate(Shareable)(
        ReactMixin.decorate(Headerable)(
          ArticlesSingle
        )
      )
    )
  )
);

export {
  ArticlesSingle as ArticlesSingleWithoutData,
};
