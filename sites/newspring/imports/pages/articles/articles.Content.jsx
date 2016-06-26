import { Component, PropTypes } from "react";

import Helpers from "/imports/helpers"
import Components from "/imports/components"

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
        <h2 className="capitalize">{article.title}</h2>
        {this.getAuthor()}
        <div dangerouslySetInnerHTML={Helpers.react.markup(article)}></div>
      </section>
    );

  }

}
