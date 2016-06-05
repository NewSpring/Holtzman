import { Component, PropTypes } from "react"
import { connect } from "react-redux"

import { Helpers } from "app/client"
import { audio as audioActions } from "app/client/actions"

import { Players } from "app/client/libraries"
import AudioControls from "./audio.Controls"
import AudioTitle from "./audio.Title"
import AudioScrubber from "./audio.Scrubber"
import Track from "./audio.Track"

// We only care about the audio state
function mapStateToProps(state) {
  return {
    audio: state.audio
  }
}

@connect(mapStateToProps, audioActions)
export default class AudioPlayerUtility extends Component {


  componentWillUpdate(nextProps, nextState) {

    const nextAudio = nextProps.audio;
    const { audio } = this.props;


    // change of track to play
    if (audio.playing.track.title != nextAudio.playing.track.title) {
      this.player = this.createPlayer(nextAudio.playing.track, nextAudio.state === "playing")
    }


    // change of state
    if (audio.state != nextAudio.state && audio.state != "default") {
      // play || pause
      if ((audio.state != "next" && audio.state != "previous") && nextAudio.state === "playing" || nextAudio.state === "paused") {
        this.toggle(nextAudio.state)
      }

      if (nextAudio.state === "next") {
        this.next()
        return
      }

      if (nextAudio.state === "previous") {
        this.previous()
        return
      }

    }

    // seeking
    if (audio.seek != nextAudio.seek) {
      this.seek(nextAudio.seek)
    }

  }

  tracksWithFiles = () => {
    const { playlist } = this.props.audio;
    return _.filter(playlist, (track) => {
      return track.file
    });
  }

  createPlayer = (track, autoload) => {

    // only make sweet jams on client side
    if (typeof window === "undefined" || window === null) {
      return;
    }

    if (!track.file) {
      return;
    }

    if (this.player && this.player.stop) {
      this.player.stop()
      this.player.release()
    }

    if (track.file.indexOf("http") === -1) {
      track.file = `https:${track.file}`;
    }

    // set loading state
    this.props.loading()
    const player = new Players.audio(track.file, () => {

      // set ready state
      this.props.ready()

      if (autoload) {
        this.props.play()
        return
      }


    })

    player.timeupdate((pos) => {
      const [durMin, durSec] = track.duration.split(":")
      const length = Number((durMin * 60)) + Number(durSec)

      const [min, sec] = pos.split(":")
      const seekLength = Number((min * 60)) + Number(sec)
      const width = Number((length - (length - seekLength))/length)

      this.props.setProgress(width * 100, pos);
    })

    player.ended(() => {
      this.props.next()
    })

    return player
  }

  toggle = (playerState) => {
    if (!this.player || !this.player.playPause) { return }
    if (playerState === "playing") {
      this.player.play();
      return;
    }
    if (playerState === "paused") {
      this.player.pause();
      return;
    }
    this.player.playPause()
  }

  seek = (value) => {
    // value is percent of how far to scrub

    if (!this.player || !this.player.seekTo) { return }

    let [min, sec] = this.props.audio.playing.track.duration.split(":")

    // duration in milliseconds
    const duration = (Number((min * 60)) + Number(sec)) * 100
    const newPos =  duration * (value / 10);
    this.player.seekTo(newPos)
  }

  next = () => {
    const { playing, order, repeat } = this.props.audio
    const playlist = this.tracksWithFiles();

    let currentTrack = playing.track.title

    for (let track of playlist) {
      let index = playlist.indexOf(track)
      if (track.title === currentTrack) {
        let next;

        switch (order) {
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

        if (repeat === "repeat-one") {
          this.props.restart()
          this.props.play()
          return
        }

        this.props.setPlaying({
          track: next
        })

        break;
      }
    }
  }

  previous = () => {

    const { playing, order, repeat } = this.props.audio
    const playlist = this.tracksWithFiles();

    let currentTrack = playing.track.title

    for (let track of playlist) {
      let index = playlist.indexOf(track)
      if (track.title === currentTrack) {
        let prev;

        this.setState({force: false})

        switch (order) {
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
          this.props.restart()
          this.props.play()
          return
        }

        this.props.setPlaying({
          track: prev
        })
        break;
      }
    }
  };

  render() {
    return <span></span>;
  }
};
