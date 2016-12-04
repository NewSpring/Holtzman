import { Component, PropTypes } from "react";
import { Link } from "react-router";
import { css } from "aphrodite";
import styled from "styled-components";

import { ImageLoader } from "../../components/loading";
import LoadingStyles from "../../components/loading/FeedItemSkeleton-css";

import inAppLink from "../../util/inAppLink";

import Styles from "./styles-css";

export default class SearchItem extends Component {

  static propTypes = {
    item: PropTypes.object, // eslint-disable-line
  }

  cardClasses = `
    background--light-primary
    push-half-bottom@palm
    push-bottom@palm-wide-and-up
    card
    rounded
    text-dark-secondary
    display-block
    plain
  `;

  gridItemClasses = `
    grid__item
    three-fifths
    soft-half
    floating--left
    one-whole
  `;

  // css(Styles["height-100"]),
  bgClasses = `
    grid__item
    two-fifths
    hard
    soft-half-left
    background--cover
  `;

  // context from ImageLoader
  preloader() {
    return (
      <div className={`${this.imageclasses} ${css(LoadingStyles["load-item"])}`}>
        <div className="ratio--square" />
      </div>
    );
  }

  // context from ImageLoader
  renderElement() {
    return (
      <div
        className={this.imageclasses}
        style={this.style}
      />
    );
  }

  render() {
    const StyledLink = styled(Link)`
      height: 144px;
      transition: all 250ms cubic-bezier(0.250, 0.250, 0.750, 0.750);
      &:hover {
        opacity: 0.8;
      }
    `;

    const StyledP = styled.p`
      height: 1.75em;
      overflow: hidden;
      textOverflow: ellipsis;
      wordBreak: break-word;
      whiteSpace: nowrap;
      marginBottom: 0;
    `;

    const StyledGrid = styled.div`
      height: 100%;
    `;

    const StyledGridItem = styled.div`
      height: 100%;
    `;

    const StyledImageLoader = styled(ImageLoader)`
      background-image: url('${this.props.item.image}');
    `;

    return (
      <StyledLink to={this.props.item.link} className={this.cardClasses} onClick={inAppLink}>
        <StyledGrid className="grid flush">

          <StyledGridItem className={this.gridItemClasses}>
            <div className="floating__item one-whole soft-half-sides">
              <h6>{this.props.item.title}</h6>
              <StyledP className="small">
                {this.props.item.description}
              </StyledP>
            </div>
          </StyledGridItem>

          {(() => {
            if (this.props.item.image === "null") {
              const classes = this.bgClasses;
              classes.push(css(Styles["placeholder-img"]));
              return (
                <div className={classes.join(" ")} />
              );
            }
            return (
              <StyledImageLoader
                src={this.props.item.image}
                force
                preloader={this.preloader}
                renderElement={this.renderElement}
                imageclasses={this.bgClasses}
              />
            );
          })()}
        </StyledGrid>
      </StyledLink>
    );
  }

}
