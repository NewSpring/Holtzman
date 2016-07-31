import { Component, PropTypes } from "react";
import Helpers from "/imports/helpers"

export default class ArticlesContent extends Component {

  static propTypes = {
    article: PropTypes.object.isRequired
  }

  render() {
    const article = this.props.article;
    const authors = this.props.article.authors;
    return (
      <section className="hard-sides hard-top">
        <h2 className="capitalize">{article.title}</h2>
        {(() => {
          if (!authors || !authors.length) return null;
          return (
            <p className="capitalize">
              By: {authors.filter(x => x).join(", ")}
            </p>
          );
        })()}
        <div dangerouslySetInnerHTML={Helpers.react.markup(article)}></div>
      </section>
    );
  }
}
