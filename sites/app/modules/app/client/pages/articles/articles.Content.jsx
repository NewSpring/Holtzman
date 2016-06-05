import { Component, PropTypes } from "react";

import Helpers from "app/client/helpers"
import Components from "app/client/components"

export default class ArticlesContent extends Component {

  static propTypes = {
    article: PropTypes.object.isRequired
  }

  getAuthor = () => {
    const authors = this.props.article.authors;
    if (authors.length > 0 && authors[0] !== "") {
      return (
        <p className="capitalize">
          By: {authors.join(", ")}
        </p>
      );
    }
  }

  render() {

    const article = this.props.article;

    return (
      <section className="hard-sides hard-top">
        <h1>{article.title}</h1>
        {this.getAuthor()}
        <div dangerouslySetInnerHTML={Helpers.react.markup(article)}></div>
      </section>
    );

  }

}
