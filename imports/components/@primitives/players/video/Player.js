import PropTypes from "prop-types";

import Video from "../video";

// DONT USE THIS THING

// XXX Why does this exist?
// XXX answer: it used to be a lot more complicated
const SingleVideoPlayer = ({ ooyalaId, autoPlay = true }) => (
  <Video
    id={ooyalaId}
    autoplay={autoPlay}
  />
);

SingleVideoPlayer.propTypes = {
  ooyalaId: PropTypes.string.isRequired,
  autoPlay: PropTypes.boolean,
};

export default SingleVideoPlayer;
