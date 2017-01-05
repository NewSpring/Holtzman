/* eslint-disable */
import { Meteor } from "meteor/meteor";
/*

  This file unifies the API from the cordova and audio5 depending on env

*/

const addMediaListeners = () => {
  if (!Meteor.isCordova) return;
  document.addEventListener("deviceready", (event) => {
    Media.prototype.timeupdate = function (callback) {
      return setInterval(() => {
        this.getCurrentPosition((position) => {
          if (position > -1) {
              // Convert position to minutes and seconds
            const mins = Math.floor(position / 60);
            const seconds = (position % 60).toFixed(0);

            const date = `${mins}:${seconds}`;
            callback(date);
          }
        });
      }, 1000);
    };

    Media.prototype.ended = function(callback) {
      if (!this.endedCallbacks) this.endedCallbacks = [];
      this.endedCallbacks.push(callback);
    };

    Media.prototype.playPause = function () {
      if (this.isPlaying) {
        this.pause();
        this.isPlaying = false;
        return;
      }

      this.isPlaying = true;
      this.play();
    };
  });
};

addMediaListeners();

class Audio {

  constructor(src, success, error, status) {
    try {
      this._audio5 = new Audio5({
        ready(player) {
          this.load(src);
        },

      });
    } catch (e) {
      console.error(e);
    }


    this._audio5.on("canplay", success);


    this._audio5.on("timeupdate", () => {
      this.position = this._audio5.position;
    });

    this.position = null;
    this.duration = this._audio5.duration;
  }

  getCurrentPosition = () => { this._audio5.position; }

  timeupdate = (callback) => {
    this._audio5.on("timeupdate", () => {
      callback(this.position);
    });
  }

  getDuration = () => { this._audio5.duration; }

  play = () => { this._audio5.play(); }

  pause = () => { this._audio5.pause(); }
  playPause = () => { this._audio5.playPause(); }

    // native only
  release() { return; }


  seekTo = (pos) => { this._audio5.seek(pos / 1000); }

  setVolume = (vol) => { this._audio5.volume(vol); }

  startRecord() { return; }
  stopRecord() { return; }

  stop = () => { this._audio5.pause(); }
  release = () => { this._audio5.destroy(); }

  ended = (callback) => { this._audio5.on("ended", callback); }

  }

export {
  Audio,
  addMediaListeners,
};

export default Audio;
