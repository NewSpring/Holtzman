/* eslint-disable import/no-named-as-default */
import PropTypes from "prop-types";

import { Component } from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";

import { actions as audioActions } from "../../../../data/store/audio";

import Audio from "../../../../util/vendor/players/audio";

class AudioPlayerUtilityWithoutData extends Component {

  static propTypes = {
    audio: PropTypes.object,
    loading: PropTypes.func,
    ready: PropTypes.func,
    play: PropTypes.func,
    setProgress: PropTypes.func,
    next: PropTypes.func,
    restart: PropTypes.func,
    seek: PropTypes.func,
    setPlaying: PropTypes.func,
  };

  componentWillUpdate(nextProps) {
    const nextAudio = nextProps.audio;
    const { audio } = this.props;

    // change of track to play
    if (audio.playing.track.title !== nextAudio.playing.track.title) {
      this.player = this.createPlayer(nextAudio.playing.track, nextAudio.state === "playing");
    }

    // change of state
    if (audio.state !== nextAudio.state && audio.state !== "default") {
      // play || pause
      if (
        (audio.state !== "next" && audio.state !== "previous") &&
        (nextAudio.state === "playing" || nextAudio.state === "paused")
      ) {
        this.toggle(nextAudio.state);
      }

      if (nextAudio.state === "next") {
        this.next();
        return;
      }

      if (nextAudio.state === "previous") {
        this.previous();
        return;
      }
    }

    // seeking
    if (audio.seek !== nextAudio.seek) {
      this.seek(nextAudio.seek);
    }
  }

  tracksWithFiles = () => {
    const { playlist } = this.props.audio;
    return _.filter(playlist, track => (
      track.file
    ));
  }

  createPlayer = (track, autoload) => {
    // only make sweet jams on client side
    if (typeof window === "undefined" || window === null) {
      return null;
    }

    if (!track.file) {
      return null;
    }

    if (this.player instanceof Audio && this.player.release) {
      this.player.release();
    }

    if (track.file.indexOf("http") === -1) {
      // eslint-disable-next-line no-param-reassign
      track.file = `https:${track.file}`;
    }

    // set loading state
    this.props.loading();

    // eslint-disable-next-line
    const Player = (Meteor.isCordova && cordova.platformId === "ios") ? Media : Audio;
    const getProps = () => this.props;

    const player = new Player(track.file, () => {
      // set ready state
      this.props.ready();

      if (autoload) {
        this.props.play();
        if (Meteor.isCordova) return;
        player.play();
      }
    }, () => {}, function audioEventStream(STATUS) {
      if (this.done) return;
      // this === Media object
      if (STATUS === Media.MEDIA_STOPPED) {
        const length = this.getDuration();
        if (length === player.getDuration()) { // reached the end of the song
          const { audio } = getProps();
          if (audio.repeat === "repeat-one") {
            this.seekTo(0);
            this.play();
            return;
          }
          for (const cb of this.endedCallbacks) cb();
          delete this.endedCallbacks;
          this.done = true;
        }
      }
    });

    if (autoload && Meteor.isCordova) {
      this.props.play();
      player.play();
    }

    player.timeupdate(pos => {
      const [durMin, durSec] = track.duration.split(":");
      const length = Number((durMin * 60)) + Number(durSec);

      const [min, sec] = pos.split(":");
      const seekLength = Number((min * 60)) + Number(sec);
      const width = Number((length - (length - seekLength)) / length);

      // ensure seconds are not greater than 60
      const realSec = Number(sec) % 60;
      // if there is a minute, return that. else, caclulate minutes from seconds
      const realMin = Number(min) > 0 ? Number(min) : Math.floor(Number(sec) / 60);

      // ensure minutes and seconds are 0 padded
      const formatSec = realSec < 10 ? `0${realSec}` : realSec;
      const formatMin = realMin < 10 ? `0${realMin}` : realMin;

      const formatPos = `${formatMin}:${formatSec}`;

      if (this.file !== track.file) return;
      this.props.setProgress(width * 100, formatPos);
    });

    this.file = track.file;

    player.ended(() => {
      this.props.next();
    });

    return player;
  }

  toggle = playerState => {
    if (!this.player || !this.player.playPause) { return; }
    if (playerState === "playing") {
      this.player.play();
      return;
    }
    if (playerState === "paused") {
      this.player.pause();
      return;
    }
    this.player.playPause();
  }

  seek = value => {
    // value is percent of how far to scrub

    if (!this.player || !this.player.seekTo) { return; }

    const [min, sec] = this.props.audio.playing.track.duration.split(":");

    // duration in milliseconds
    const duration = (Number((min * 60)) + Number(sec)) * 1000;
    const newPos = duration * (value / 100);

    this.player.seekTo(newPos);
  }

  next = () => {
    const { playing, order, repeat } = this.props.audio;
    const playlist = this.tracksWithFiles();

    const currentTrack = playing.track.title;

    for (const track of playlist) {
      const index = playlist.indexOf(track);
      if (track.title === currentTrack) {
        let next;

        switch (order) {
          // eslint-disable-next-line no-case-declarations
          case "shuffle":
            let randomId = Math.floor(Math.random() * playlist.length);
            while (randomId === index) {
              randomId = Math.floor(Math.random() * playlist.length);
            }

            next = playlist[randomId];
            break;
          default:
            if ((playlist.length - 1) === index) {
              next = playlist[0];
            } else {
              next = playlist[index + 1];
            }
        }

        // This file needs cleanup
        // repeat one handled in creation of player above
        if (repeat === "repeat-one") {
          this.props.restart();
          this.props.play();
          if (this.player && Meteor.isCordova) {
            this.props.seek(0);
            this.player.play();
          }
          return;
        }

        this.props.setPlaying({
          track: next,
        });

        break;
      }
    }
  }

  previous = () => {
    const { playing, order, repeat } = this.props.audio;
    const playlist = this.tracksWithFiles();

    const currentTrack = playing.track.title;

    for (const track of playlist) {
      const index = playlist.indexOf(track);
      if (track.title === currentTrack) {
        let prev;

        this.setState({ force: false });

        switch (order) {
          // eslint-disable-next-line no-case-declarations
          case "shuffle":

            let randomId = Math.floor(Math.random() * playlist.length);
            while (randomId === index) {
              randomId = Math.floor(Math.random() * playlist.length);
            }

            prev = playlist[randomId];
            break;
          default:
            if (index === 0) {
              prev = playlist[playlist.length - 1];
            } else {
              prev = playlist[index - 1];
            }
        }

        if (repeat === "repeat-one") {
          this.props.restart();
          this.props.play();
          if (this.player && Meteor.isCordova) {
            this.props.seek(0);
            this.player.play();
          }
          return;
        }

        this.props.setPlaying({
          track: prev,
        });
        break;
      }
    }
  };

  render() {
    return <span />;
  }
}

const map = ({ audio }) => ({ audio });

const withRedux = connect(map, audioActions);

export default withRedux(AudioPlayerUtilityWithoutData);

export {
  AudioPlayerUtilityWithoutData,
  map,
  withRedux,
};
