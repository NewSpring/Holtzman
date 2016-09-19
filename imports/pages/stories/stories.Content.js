import { Component, PropTypes } from "react";

import RelatedContent from "../../blocks/content/RelatedContent";
import SingleVideoPlayer from "../../components/players/video/Player";
import backgrounds from "../../util/backgrounds";
import react from "../../util/react";

const ratio = window.isTablet ? "2:1" : "1:1";
const StoryImage = ({ story }) => (
  <div
    className="one-whole ratio--square ratio--landscape@palm-wide-and-up background--fill"
    style={backgrounds.styles(story, ratio)}
  />
);

export default class StoriesContent extends Component {

  static propTypes = {
    story: PropTypes.object.isRequired,
  }

  render() {
    const story = this.props.story;

    return (
      <div>
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
  }

}
