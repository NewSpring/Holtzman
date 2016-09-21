import { PropTypes } from "react";

import Video from "../video";

// XXX Why does this exist?
// XXX answer: it used to be a lot more complicated
const SingleVideoPlayer = ({ ooyalaId }) => (
  <Video
    id={ooyalaId}
  />
);

SingleVideoPlayer.propTypes = {
  ooyalaId: PropTypes.string.isRequired,
};

export default SingleVideoPlayer;
