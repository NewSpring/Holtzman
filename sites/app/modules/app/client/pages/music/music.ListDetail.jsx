
import { Component, PropTypes } from "react"
import { connect } from "react-redux"
import Album from "./music.Album"
import { Link } from "react-router"
import ReactMixin from "react-mixin"

import { Shareable } from "app/client/mixins"
import { audio as audioActions } from "app/client/actions"

import { Helpers } from "app/client"

// action helpers
import {
  modal,
  nav as navActions,
  liked as likedActions,
  share as shareActions
} from "apollos/core/store"

import { Music as MusicCollection } from "app/lib/collections"

const mapStateToProps = (state) => {
  return {
    audio: {
      visibility: state.audio.visibility
    }
  };
};

@connect(mapStateToProps)
//@ReactMixin.decorate(Shareable)
export default class ListDetail extends Component {

  sectionStyles = {
    position:"absolute",
    bottom:"60px"
  };

  closeModal = (e) => {
    if(this.props.audio.visibility === "expand") {
      this.props.dispatch(audioActions.setVisibility("dock"));
      setTimeout(() => {
        this.props.dispatch(modal.hide());
      }, 250);
    }
    else {
      this.props.dispatch(modal.hide());
    }
  }

  componentWillUnmount() {
    if(Meteor.isCordova) {
      this.props.dispatch(navActions.setLevel("CONTENT"));
    }
  }

  render () {

    let url = `/music/${this.props.album.entryId}`
    return (
        <div className="one-whole soft background--dark-primary" style={this.sectionStyles}>
          <div className="text-light-primary">
            <div className="grid floating push-bottom">
              <div className="grid__item background--fill floating__item text-left hard push-left ratio--square background--light-secondary one-eighth" style={{backgroundImage: `url(${this.props.album.content.images[0].cloudfront})`}}></div>
              <div className="floating__item text-left grid__item eight-tenths">
                <h5 className="flush">{this.props.album.tracks[this.props.trackNumber].title}</h5>
                <h7 className="text-light-tertiary">
                  <span>{this.props.album.title} – </span>
                  <span>{this.props.album.artist || "NewSpring"}</span>
                </h7>
              </div>
            </div>
            <Link to={url} onClick={this.closeModal} className="text-light-primary soft-half-top push-ends plain">
              <h5>View Album</h5>
            </Link>
            <h5 onClick={this.shareableAction} className="push-ends">Share</h5>
          </div>
        </div>
    );

  }

}
