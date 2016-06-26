
import { Component, PropTypes } from "react"

// used to flatten dom elements into an actual array
const flattenTco = ([first, ...rest], accumulator) =>
  (first === undefined)
    ? accumulator
    : (Array.isArray(first))
      ? flattenTco([...first, ...rest])
      : flattenTco(rest, accumulator.concat(first))

const flatten = (n) => flattenTco(n, []);


export default class VideoPlayer extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    hide: PropTypes.bool,
    success: PropTypes.func,
    // color: PropTypes.string
  }

  state = {
    hide: this.props.hide || false
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id != nextProps.id) {
      this.player.setEmbedCode(nextProps.id);
    }
  }


  componentDidMount(){
    this.createPlayer(this.props.id, this.props.success);
  }


  componentWillUnmount() {
    if (this.player) {
      this.player.destroy();
    }
  }


  createPlayer = (id, cb) => {

    if ((typeof window != "undefined" || window != null) && !window.OO) {
      const callback = () => { this.createPlayer(id, cb) }

      setTimeout(callback, 250)

      return
    }

    let videoParams = {
      "pcode": "E1dWM6UGncxhent7MRATc3hmkzUD",
      "playerBrandingId": "ZmJmNTVlNDk1NjcwYTVkMzAzODkyMjg0",
      "autoplay": true,
      "skin": {
        "config": "http://ns.ops.s3.amazonaws.com/player/skin.new.json",
        "inline": {"shareScreen": {"embed": {"source": "<iframe width='640' height='480' frameborder='0' allowfullscreen src='//player.ooyala.com/static/v4/stable/4.4.11/skin-plugin/iframe.html?ec=<ASSET_ID>&pbid=<PLAYER_ID>&pcode=<PUBLISHER_ID>'></iframe>"}}}
      },
      onCreate: (player) => {
        // bind message bus for reporting analaytics
        this.messages = player.mb
        if (cb) {
          cb(this)
        }

        // if (this.props.hide) {
        this.messages.subscribe(OO.EVENTS.PLAYED, "Video", (eventName) => {
          this.destroy();
        });

        this.messages.subscribe(OO.EVENTS.PLAY_FAILED, "Video", (eventName) => {
          this.destroy();
        });

        this.messages.subscribe(OO.EVENTS.FULLSCREEN_CHANGED, "Video", (eventName) => {
          // ios sets the status bar text color to black
          // when it goes full screen
          if (!player.isFullscreen()) {
            // wait a bit because it doesn't work right away
            setTimeout(() => {
              StatusBar.styleLightContent();
            }, 500);
          }
        });
      }
    };

    OO.ready(() => {
      this.player = OO.Player.create(this.getDivId(), id, videoParams)
    })
  }

  getDivId = () => {
    return `ooyala-player-${this.props.id}`
  }

  show = (opts) => {
    const playerReady = () => {
      this.setState({hide: false})
    }

    if ((this.player && this.player.state === "destroyed") || !this.player) {
      this.createPlayer(this.props.id, playerReady);
      return;
    }

    this.player.play();

    playerReady()

  }

  hide = () => {
    this.player.pause();
    this.setState({ hide: true });
  }

  styles = () => {

    let style = this.props.style

    if (this.state.hide){
      style = {...style, ...{
        display: "none"
      }}
    }

    return style

  }


  render () {
    return (
      <div id={this.getDivId()} className="ooyala-player" style={this.styles()}></div>
    )
  }
}
