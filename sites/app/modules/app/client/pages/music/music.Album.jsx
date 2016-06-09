import { Component, PropTypes, Lib } from "react"
import ReactMixin from "react-mixin"
import { Likeable, Shareable } from "app/client/mixins"
import { connect, gql } from "apollos/core/graphql/apollo";
import { VelocityComponent } from "velocity-react"

// loading state
import { Loading } from "apollos/core/components"
import { Headerable } from "apollos/core/mixins"

// action helpers
import { modal,
  nav as navActions
} from "apollos/core/store"
import { audio as audioActions } from "app/client/actions"

import Helpers from "app/client/helpers"

import { Music as MusicCollection } from "app/lib/collections"
import { Likes } from "apollos/core/collections"

import Track from "./music.Track";
import SaveOffline from "./music.SaveOffline"

import { Link } from "react-router"

import AlbumQuery from "./queries/single"

const mapQueriesToProps = ({ ownProps, state }) => {
  const pathParts = state.routing.location.pathname.split("/");
  return {
    album: {
      query: gql`${AlbumQuery}`,
      variables: {
        entryId: Number(pathParts[2]),
      },
      forceFetch: false,
      returnPartialData: false,
    },
  };
};

@connect({ mapQueriesToProps })
@ReactMixin.decorate(Likeable)
@ReactMixin.decorate(Shareable)
@ReactMixin.decorate(Headerable)
export default class MusicAlbum extends Component {

  state = {
    currentTrack: null,
    repeatPattern: "next",
    force: false
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("CONTENT"))
    this.props.dispatch(navActions.setAction("CONTENT", {
      id: 2,
      action: this.likeableAction
    }));
  }

  componentWillUnmount() {
    this.props.dispatch(navActions.setLevel("TOP"))
    this.props.dispatch(audioActions.dock())
  }

  shuffle = () => {
    if (this.state.repeatPattern === "shuffle") {
      this.setState({repeatPattern: "next"});
      return;
    }
    this.setState({repeatPattern: "shuffle"});
  }

  repeat = () => {
    if (this.state.repeatPattern === "repeat") {
      this.setState({repeatPattern: "repeatAll"});
      return;
    }

    if (this.state.repeatPattern === "repeatAll") {
      this.setState({repeatPattern: "next"});
      return;
    }

    this.setState({repeatPattern: "repeat"});
  }

  render() {
    const { content } = this.props.album;

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

    const getStyle = () => {
      if (this.props.modalVisible) {
        return {
          WebkitFilter: "blur(2px)"
        }
      }

      return {}
    }

    const getUrl = (image) => {
      if(image.cloudfront === "false") {
        image.cloudfront = false;
      }

      let url = image.cloudfront || image.s3;

      if(!url) {
        return url;
      }

      if (url.indexOf("http") === -1) {
        url = `https:${url}`;
      }

      return url;
    };

    const album = content;

    const tracks = _.filter(album.tracks, (track) => {
      return !!track.file;
    });

    return (
      <VelocityComponent
        animation={"transition.fadeIn"}
        duration={1000}
        runOnMount={true}
      >
        <section className="hard background--light-primary" style={getStyle()}>
          <div className="one-whole soft overlay floating background--dark-primary background--fill" style={{backgroundImage: `url(${getUrl(album.content.images[1])})`}}>
            <div
              className="one-third floating__item display-inline overlay__item ratio--square background--fill"
              style={{backgroundImage: `url(${getUrl(album.content.images[0])})`}}>
            </div>
            <div className="overlay__item soft-left text-left floating__item two-thirds text-light-primary">
              <h5>{album.title}</h5>
              <h7>{this.props.albumArtist || "NewSpring"}</h7>
            </div>
          </div>
          <div className="background--light-primary one-whole">
            <div className="soft-sides soft-half-ends">
              {tracks.map((track, i) => {
                return <Track
                  track={track}
                  album={album}
                  key={i}
                  trackNumber={i + 1} />
              })}
            </div>
          </div>
        </section>
      </VelocityComponent>
    );

  }
}
