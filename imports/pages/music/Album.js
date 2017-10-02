import PropTypes from 'prop-types';
import { Component } from "react";
import ReactMixin from "react-mixin";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Meta from "../../components/shared/meta";

// loading state
import Loading from "../../components/@primitives/UI/loading";
import Headerable from "../../deprecated/mixins/mixins.Header";
import canLike from "../../components/@enhancers/likes/toggle";
import Shareable from "../../deprecated/mixins/mixins.Shareable";

// action helpers
import {
  audio as audioActions,
} from "../../data/store";

import Track from "./Track";

class MusicAlbumWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    album: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]).isRequired,
    modalVisible: PropTypes.bool,
    albumArtist: PropTypes.string,
  }

  state = {
    currentTrack: null,
    repeatPattern: "next",
    force: false,
  }

  componentWillUnmount() {
    this.props.dispatch(audioActions.dock());
  }

  shuffle = () => {
    if (this.state.repeatPattern === "shuffle") {
      this.setState({ repeatPattern: "next" });
      return;
    }
    this.setState({ repeatPattern: "shuffle" });
  }

  repeat = () => {
    if (this.state.repeatPattern === "repeat") {
      this.setState({ repeatPattern: "repeatAll" });
      return;
    }

    if (this.state.repeatPattern === "repeatAll") {
      this.setState({ repeatPattern: "next" });
      return;
    }

    this.setState({ repeatPattern: "repeat" });
  }

  render() {
    const { content } = this.props.album;

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

    const getStyle = () => {
      if (this.props.modalVisible) {
        return {
          WebkitFilter: "blur(2px)",
        };
      }

      return {};
    };

    const getUrl = (image) => {
      let url = image.url;

      if (!url) {
        return url;
      }

      if (url.indexOf("http") === -1) {
        url = `https:${url}`;
      }

      return url;
    };

    const album = content;
    const tracks = _.filter(album.content.tracks, (track) => (!!track.file));

    const xsmallBlurImage = _.find(album.content.images, (image) => (
      image.fileName.indexOf("blur") > -1 && image.size === "xsmall"
    ));
    const mediumImage = _.find(album.content.images, (image) => (
      image.fileName.indexOf("blur") === -1 && image.size === "medium"
    ));

    return (
      <section className="hard background--light-primary" style={getStyle()}>
        <Meta
          title={album.title}
          description={`Album by ${this.props.albumArtist || "NewSpring"}`}
          image={`url(${getUrl(mediumImage)})`}
          id={album.id}
        />
        {/* XXX need a get blurred image helper here */}
        <div
          className={
            "one-whole soft soft-double@palm-wide-and-up overlay floating " +
            "background--dark-primary background--fill"
          }
          style={{ backgroundImage: `url(${getUrl(xsmallBlurImage)})` }}
        >
          <div
            className={
              "one-third floating__item display-inline overlay__item " +
              "ratio--square background--fill"
            }
            style={{ backgroundImage: `url(${getUrl(mediumImage)})` }}
          />
          <div
            className={
              "overlay__item soft-left text-left floating__item " +
              "two-thirds text-light-primary"
            }
          >
            <h5>{album.title}</h5>
            <h7>{this.props.albumArtist || "NewSpring"}</h7>
          </div>
        </div>
        <div className="background--light-primary one-whole">
          <div
            className={
              "soft-sides soft-double-sides@palm-wide-and-up " +
              "soft-ends@palm-wide-and-up soft-half-ends push-bottom"
            }
          >
            {tracks.map((track, i) => (
              <Track
                track={track}
                album={album}
                key={i}
                trackNumber={i}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
}

const ALBUM_QUERY = gql`
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
`;

const withAlbum = graphql(ALBUM_QUERY, {
  name: "album",
  options: (ownProps) => ({
    variables: { id: ownProps.params.id },
  }),
});

export default connect()(
  withAlbum(
    ReactMixin.decorate(Shareable)(
      ReactMixin.decorate(Headerable)(
        canLike(
          (props) => (props.album.loading ? null : props.album.content.id)
        )(MusicAlbumWithoutData)
      )
    )
  )
);

export {
  MusicAlbumWithoutData,
  ALBUM_QUERY,
};
