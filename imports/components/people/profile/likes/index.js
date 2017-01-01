import { Meteor } from "meteor/meteor";
import { PropTypes } from "react";
import uniqBy from "lodash.uniqby";

import createContainer from "../../../../deprecated/meteor/react-meteor-data";
import Likes from "../../../../deprecated/database/collections/likes";
import Loading from "../../../@primitives/UI/loading";
import MiniCard from "../../../@primitives/UI/cards/MiniCard";

const RenderLikes = ({ likes }) => {
  if (!likes || !likes.length) return null;

  return (
    <div>
      {
        likes.map((like, i) => (
          <div
            key={i}
            className="soft-half-bottom@palm-wide"
            style={{
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            <MiniCard
              key={i}
              title={like.title}
              content={{
                channelName: like.category.toLowerCase(),
                content: {
                  images: [{
                    url: like.image,
                  }],
                },
                entryId: like.entryId,
                icon: like.icon,
              }}
              link={like.link || ""}
            />
          </div>
        ))
      }
    </div>
  );
};

RenderLikes.propTypes = {
  likes: PropTypes.array,
};

const RenderRecents = ({ likes, recentLikes }) => {
  if (likes && likes.length > 0) return null;
  return (
    <div>
      <p className="soft text-center">
        <em>
          <small>
            Check out some of the latest things from NewSpring
          </small>
        </em>
      </p>
      <RenderLikes likes={recentLikes} />
    </div>
  );
};

RenderRecents.propTypes = {
  likes: PropTypes.array,
  recentLikes: PropTypes.array,
};

// XXX make this dynamic via heighliner
const LikesContainer = (props) => {
  if (!props.likes) return <Loading />;

  const { likes, recentLikes } = props;

  return (
    <div
      className={
        "soft-half-sides@palm soft-double@palm-wide soft-sides soft-top soft-half-bottom " +
        "background--light-secondary"
      }
      style={{ marginTop: "-20px" }}
    >
      <RenderLikes likes={likes} />
      <RenderRecents likes={likes} recentLikes={recentLikes} />
    </div>
  );
};

LikesContainer.propTypes = {
  likes: PropTypes.array,
  recentLikes: PropTypes.array,
};

export default createContainer(() => {
  Meteor.subscribe("likes");
  const likes = Likes.find({
    userId: Meteor.userId(),
  }, { sort: { dateLiked: -1 } }).fetch();

  const recentLikes = Likes.find({
    userId: {
      $not: Meteor.userId(),
    },
  }, { sort: { dateLiked: -1 } }).fetch();

  return {
    likes,
    recentLikes: uniqBy(recentLikes, "entryId"),
  };
}, LikesContainer);

export {
  LikesContainer,
  RenderRecents,
  RenderLikes,
};
