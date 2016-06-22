import "regenerator-runtime"
import { take, put, cps } from "redux-saga/effects"
import { addSaga } from "apollos/core/store/utilities"

addSaga(function* setMetaData(getStore) {

  /* This updates the iOS MPNowPlayingInfoCenter, which basically
   * means it provides title, artwork, and playback information to
   * the lock screen and the command center.
   *
   * We only need to update the information when the playback state
   * has changed, because MPNowPlayingInfoCenter will automatically
   * calculate how much time has passed based on `playbackRate`.
   * When paused, `playbackRate` is 0, and when playing it is 1.
   */
  while(true) {
    const payload = yield take("AUDIO.SET_STATE");

    if (typeof NowPlaying === "undefined") return;

    const { audio } = getStore();

    const playing = audio.state === "playing";
    const paused = audio.state === "paused";

    // convert elapsed time to seconds
    const [timeMin, timeSec] = audio.time.split(":");
    const elapsedSeconds = (Number((timeMin * 60)) + Number(timeSec)) || 0;

    // convert duration to seconds
    const [durMin, durSec] = audio.playing.track.duration.split(":");
    const durationSeconds = Number((durMin * 60)) + Number(durSec) || 0;

    NowPlaying.set({
      albumTitle: audio.playing.album.title,
      artist: "NewSpring", // switch to artist when available
      title: audio.playing.track.title,
      artwork: `https://${audio.playing.album.content.images[0]}`,
      elapsedPlaybackTime: elapsedSeconds,
      playbackDuration: durationSeconds,
      playbackRate: playing ? 1 : 0,
    });

  }

});
