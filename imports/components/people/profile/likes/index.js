
import { PropTypes } from "react";

import Loading from "../../../@primitives/UI/loading";
import LikesList from "../../../shared/likes-list";

import withRecentLikes from "../../../@enhancers/likes/recents";
import withUserLikes from "../../../@enhancers/likes/userLikes";

const RenderLikes = ({ likes, recentLikes }) => {
  if (!likes || !recentLikes || likes.loading || recentLikes.loading) {
    return <div className="text-center"><Loading /></div>;
  }
  if (likes && !likes.loading && likes.userFeed && likes.userFeed.length > 0) {
    return <LikesList likes={likes.userFeed} />;
  }
  return (
    <div>
      <p className="soft text-center">
        <em>
          <small>
            Check out some of the latest things from NewSpring
          </small>
        </em>
      </p>
      <LikesList likes={recentLikes.recentlyLiked} />
    </div>
  );
};

RenderLikes.propTypes = {
  likes: PropTypes.array,
  recentLikes: PropTypes.array,
};

const LikesContainer = (props) => {
  const { likes, recentLikes } = props;

  return (
    <div
      className={
        "soft-half-sides@palm soft-double@palm-wide soft-sides soft-top soft-half-bottom " +
        "background--light-secondary"
      }
      style={{ marginTop: "-20px" }}
    >
      <RenderLikes likes={likes} recentLikes={recentLikes} />
    </div>
  );
};

LikesContainer.propTypes = {
  likes: PropTypes.array,
  recentLikes: PropTypes.array,
};

export {
  LikesContainer,
  RenderLikes,
};

export default withUserLikes(withRecentLikes(LikesContainer));
