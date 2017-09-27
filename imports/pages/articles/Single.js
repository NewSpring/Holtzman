
// @flow
// ignore mixin until we can remove it entirely
// $FlowMeteor
import ReactMixin from "react-mixin";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Meta from "../../components/shared/meta";

// loading state
import Split, { Left, Right } from "../../components/@primitives/layout/split";
import Headerable from "../../deprecated/mixins/mixins.Header";
import Shareable from "../../deprecated/mixins/mixins.Shareable";
import canLike from "../../components/@enhancers/likes/toggle";

import Loading from "../../components/@primitives/UI/loading";

// import editorial collection for lookup
import backgrounds from "../../util/backgrounds";
import RelatedContent from "../../components/content/related-content";

import SingleVideoPlayer from "../../components/@primitives/players/video/Player";

// import content component
import Content from "./Content";

const defaultArray = [];

type IArticlesSingle = {
  article: Object,
};

const ArticlesSingle = (props: IArticlesSingle) => {
  const { content } = props.article;

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
};

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
  options: ownProps => ({
    variables: { id: ownProps.params.id },
  }),
});

export default connect()(
  withArticle(
    ReactMixin.decorate(Shareable)(
      ReactMixin.decorate(Headerable)(
        canLike(
          props => (props.article.loading ? null : props.article.content.id)
        )(ArticlesSingle)
      )
    )
  )
);

export {
  ArticlesSingle as ArticlesSingleWithoutData,
};
