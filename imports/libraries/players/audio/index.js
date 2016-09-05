/*

  This file unifies the API from the cordova and audio5 depending on env

*/


class Audio {

  constructor(src, success, error, status) {

    try {
      this._audio5 = new Audio5({
        ready: function(player) {
          this.load(src);
        }

      });
    } catch (e) {
      console.error(e);
    }


    this._audio5.one("canplay", success)


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
    })
  }

  getDuration = () => { this._audio5.duration; }

  play = () => { this._audio5.play(); }

  pause = () => { this._audio5.pause(); }
  playPause = () => { this._audio5.playPause(); }

  // native only
  release(){ return; }


  seekTo = (pos) => { this._audio5.seek(pos / 1000); }

  setVolume = (vol) => { this._audio5.volume(vol); }

  startRecord(){ return; }
  stopRecord(){ return; }

  stop = () => { this._audio5.pause(); }
  release = () => { this._audio5.destroy(); }

  ended = (callback) => { this._audio5.on("ended", callback) }

}


if (Meteor.isCordova) {

  document.addEventListener("deviceready", (event) => {


    Media.prototype.timeupdate = function(callback){
      return setInterval(() => {
        this.getCurrentPosition(function(position) {
            if (position > -1) {
              const mins = Math.floor(position / 600)
              const seconds = (position % 600).toFixed(0);

              const date = `${mins}:${seconds}`
              callback(date);
            }

        })
      }, 1000);

    }

    Media.prototype.ended = function(callback) {

      const getDuration = () => {
        return this.getDuration();
      }

      let interval = setInterval(() => {
        this.getCurrentPosition(function(position) {
          if (position > -1) {
            const duration = getDuration();
            if (position.toFixed(1) === duration.toFixed(1)) {
              clearInterval(interval)
              callback(null);
              return;
            }
          }
        })
      }, 10);
    }

    Media.prototype.playPause = function(){

      if (this.isPlaying) {
        this.pause();
        this.isPlaying = false;
        return;
      }

      this.isPlaying = true;
      this.play();

    }

    Audio = Media;
  });

}

export default Audio
