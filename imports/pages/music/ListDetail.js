
import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import ReactMixin from "react-mixin";

import Shareable from "../../deprecated/mixins/mixins.Shareable";

// action helpers
import {
  modal,
  nav as navActions,
  share as shareActions,
  header as headerActions,
  audio as audioActions,
} from "../../data/store";

class ListDetailWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    header: PropTypes.object.isRequired,
    audio: PropTypes.object.isRequired,
    album: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]).isRequired,
    trackNumber: PropTypes.number.isRequired,
  }

  state = {
    previousHeaderColor: null,
  }

  componentWillMount() {
    if (process.env.NATIVE) {
      // must wait for some reason
      setTimeout(() => {
        this.props.dispatch(headerActions.statusBarColor("#303030"));
      }, 250);
      this.props.dispatch(navActions.setLevel("MODAL"));
      this.props.dispatch(navActions.setColor("#202020", "dark"));
      this.setState({
        previousHeaderColor: this.props.header.content.color,
      });
    }
  }

  componentWillUnmount() {
    if (process.env.NATIVE) {
      this.props.dispatch(
        headerActions.statusBarColor(this.state.previousHeaderColor),
      );
      this.props.dispatch(navActions.setLevel("CONTENT"));
    }
  }

  sectionStyles = {
    position: "absolute",
    bottom: "60px",
  };

  closeModal = () => {
    if (this.props.audio.visibility === "expand") {
      this.props.dispatch(audioActions.setVisibility("dock"));
      // XXX - When I hide the modal, I need the visibility of dock to have
      // taken effect. Bwah.
      setTimeout(() => {
        this.props.dispatch(modal.hide());
      }, 250);
    } else {
      this.props.dispatch(modal.hide());
    }
  }

  share = event => {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(shareActions.share());
  }

  render() {
    const url = `/music/${this.props.album.entryId}`;
    const smallImage = _.find(this.props.album.content.images, image => (
      image.fileName.indexOf("blur") === -1 && image.size === "small"
    ));
    return (
      <div className="one-whole soft background--dark-primary" style={this.sectionStyles}>
        <div className="text-light-primary">
          <div className="grid floating push-bottom">
            <div
              className={
                "grid__item background--fill floating__item text-left hard push-left " +
                "ratio--square background--light-secondary one-eighth"
              }
              style={{ backgroundImage: `url(${smallImage.url})` }}
            />
            <div className="floating__item text-left grid__item eight-tenths">
              <h5 className="flush">
                {this.props.album.content.tracks[this.props.trackNumber].title}
              </h5>
              <h7 className="text-light-tertiary">
                <span>{this.props.album.title} – </span>
                <span>{this.props.album.artist || "NewSpring"}</span>
              </h7>
            </div>
          </div>
          <Link
            to={url}
            onClick={this.closeModal}
            className="text-light-primary soft-half-top push-ends plain"
          >
            <h5>View Album</h5>
          </Link>
          <h5 onClick={this.share} className="push-ends">Share</h5>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => (
  {
    audio: {
      visibility: state.audio.visibility,
    },
    header: state.header,
  }
);

export default connect(mapStateToProps)(
  ReactMixin.decorate(Shareable)(
    ListDetailWithoutData,
  ),
);

export {
  ListDetailWithoutData,
};
