import "regenerator-runtime"
import { take, put, cps } from "redux-saga/effects"
import { addSaga } from "apollos/core/store/utilities"

addSaga(function* setMetaData(getStore) {

  while(true) {
    const payload = yield take("AUDIO.SET_STATE");

    const { audio } = getStore();

    if(typeof NowPlaying !== "undefined") {
      NowPlaying.set({
        albumTitle: audio.playing.album.title,
        artist: "NewSpring",
        title: audio.playing.track.title,
        elapsedPlaybackTime: 30,
        playbackDuration: 500,
        artwork: `https://${audio.playing.album.content.images[0]}`,
      });
    }

  }

});
