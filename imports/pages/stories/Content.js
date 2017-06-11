import PropTypes from "prop-types";

import RelatedContent from "../../components/content/related-content";
import SingleVideoPlayer from "../../components/@primitives/players/video/Player";
import backgrounds from "../../util/backgrounds";
import react from "../../util/react";

// XXX since stories.single only returns a single component, put meta in this one
import Meta from "../../components/shared/meta";

const ratio = window.isTablet ? "2:1" : "1:1";
const StoryImage = ({ story }) => (
  <div
    className="one-whole ratio--square ratio--landscape@palm-wide-and-up background--fill"
    style={backgrounds.styles(story, ratio)}
  />
);

StoryImage.propTypes = {
  story: PropTypes.object.isRequired,
};

const StoriesContent = (props) => {
  const { story } = props;
  return (
    <div>
      <Meta
        title={story.title}
        image={
          story.content.images && story.content.images.length > 0
            ? story.content.images[0].url
            : null
        }
        id={story.id}
        meta={[
          { property: "og:type", content: "article" },
        ]}
      />
      <section className="background--light-primary hard-sides hard-top">
        {(() => {
          if (story.content.ooyalaId.length === 0) return <StoryImage story={story} />;
          return <SingleVideoPlayer ooyalaId={story.content.ooyalaId} />;
        })()}
        <div className="soft soft-double-sides@palm-wide-and-up push-top">
          <h2 className="capitalize">{story.title}</h2>
          <h4 className="text-dark-tertiary">{story.subtitle}</h4>
          <div dangerouslySetInnerHTML={react.markup(story)} />
        </div>
      </section>
      <RelatedContent excludedIds={[story.id]} tags={story.content.tags} />
    </div>
  );
};

StoriesContent.propTypes = {
  story: PropTypes.object.isRequired,
};

export default StoriesContent;

export {
  StoryImage,
};
