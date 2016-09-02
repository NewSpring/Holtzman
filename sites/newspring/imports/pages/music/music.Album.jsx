import { Component, PropTypes, Lib } from "react"
import ReactMixin from "react-mixin"
import { Likeable, Shareable } from "/imports/mixins"
import { connect } from "react-apollo";
import gql from "graphql-tag";

// loading state
import { Loading } from "apollos-core/dist/core/components"
import { Headerable } from "apollos-core/dist/core/mixins"

// action helpers
import { modal,
  nav as navActions
} from "apollos-core/dist/core/store"
import { actions as audioActions } from "/imports/store/audio"

import Helpers from "/imports/helpers"

import { Likes } from "apollos-core/dist/core/collections"

import Track from "./music.Track";
import SaveOffline from "./music.SaveOffline"

import { Link } from "react-router"

const mapQueriesToProps = ({ ownProps }) => ({
  album: {
    query: gql`
      query getAlbum($id: ID!) {
        content: node(id: $id) {
          id
          ... on Content {
            entryId: id
            title
            status
            channelName
            meta {
              urlTitle
              siteId
              date
              channelId
            }
            content {
              tracks {
                title
                duration
                file: s3
              }
              images(sizes: ["large", "medium", "small", "xsmall"]) {
                fileName
                fileType
                fileLabel
                size
                url
              }
              colors {
                value
                description
              }
              isLight
            }
          }
        }
      }
    `,
    variables: { id: ownProps.params.id },
    forceFetch: false,
    returnPartialData: false,
  },
});

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
    if (process.env.WEB) return;
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
      let url = image.url;

      if(!url) {
        return url;
      }

      if (url.indexOf("http") === -1) {
        url = `https:${url}`;
      }

      return url;
    };

    const album = content;
    const tracks = _.filter(album.content.tracks, (track) => {
      return !!track.file;
    });

    const xsmallBlurImage = _.find(album.content.images, (image) => {
      return image.fileName.indexOf("blur") > -1 && image.size === "xsmall";
    });
    const mediumImage = _.find(album.content.images, (image) => {
      return image.fileName.indexOf("blur") === -1 && image.size === "medium";
    });

    try {
      return (
        <section className="hard background--light-primary" style={getStyle()}>
          {/* XXX need a get blurred image helper here */}
          <div className="one-whole soft soft-double@palm-wide-and-up overlay floating background--dark-primary background--fill" style={{backgroundImage: `url(${getUrl(xsmallBlurImage)})`}}>
            <div
              className="one-third floating__item display-inline overlay__item ratio--square background--fill"
              style={{backgroundImage: `url(${getUrl(mediumImage)})`}}>
            </div>
            <div className="overlay__item soft-left text-left floating__item two-thirds text-light-primary">
              <h5>{album.title}</h5>
              <h7>{this.props.albumArtist || "NewSpring"}</h7>
            </div>
          </div>
          <div className="background--light-primary one-whole">
            <div className="soft-sides soft-double-sides@palm-wide-and-up soft-ends@palm-wide-and-up soft-half-ends push-bottom">
              {tracks.map((track, i) => {
                return <Track
                  track={track}
                  album={album}
                  key={i}
                  trackNumber={i} />
              })}
            </div>
          </div>
        </section>
      );
    } catch (e) {
      console.log(e);
    }


  }
}
