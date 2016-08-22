import { Component, PropTypes } from "react";

import Helpers from "/imports/helpers";
import Components from "/imports/components";
import SingleVideoPlayer from "/imports/components/players/video/Player";
import RelatedContent from "/imports/blocks/content/RelatedContent";

const StoryImage = ({ story }) => (
  <div
    className="one-whole ratio--square background--fill"
    style={Helpers.backgrounds.styles(story)}>
  </div>
);

export default class StoriesContent extends Component {

  static propTypes = {
    story: PropTypes.object.isRequired
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
          <div className="soft push-top">
            <h2 className="capitalize">{story.title}</h2>
            <h4 className="text-dark-tertiary">{story.subtitle}</h4>
            <div dangerouslySetInnerHTML={Helpers.react.markup(story)}></div>
          </div>
        </section>
        <RelatedContent excludedIds={[story.id]} tags={story.content.tags} />
      </div>

    );

  }

}
