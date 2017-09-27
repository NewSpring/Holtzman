/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';

import { Component } from "react";

import react from "../../util/react";

export default class ArticlesContent extends Component {

  static propTypes = {
    article: PropTypes.object.isRequired,
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
            <h6 className="capitalize soft-double-bottom flush">
              By: {authors.filter(x => x).join(", ")}
            </h6>
          );
        })()}
        <div dangerouslySetInnerHTML={react.markup(article)} />
      </section>
    );
  }
}
