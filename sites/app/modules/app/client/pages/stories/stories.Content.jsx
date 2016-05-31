import { Component, PropTypes } from "react";

import Helpers from "app/client/helpers"
import Components from "app/client/components"
import SingleVideoPlayer from "./stories.SingleVideoPlayer"

export default class StoriesContent extends Component {

  static propTypes = {
    story: PropTypes.object.isRequired
  }



  render() {

    const StoryImage = () => (
      <div
        className="one-whole ratio--square background--fill"
        style={Helpers.backgrounds.styles(story)}>
      </div>
    );

    const story = this.props.story;

    return (

      <section className="background--light-primary hard-sides hard-top">
        {() => {
         if (story.content.ooyalaId.length === 0) {
           return <StoryImage />
          } else {
            return <SingleVideoPlayer story={story} />
          }
        }()}
        <div className="soft push-top">
          <h1>{story.title}</h1>
          <h4 className="text-dark-tertiary">{story.subtitle}</h4>
          <div dangerouslySetInnerHTML={Helpers.react.markup(story)}></div>
        </div>
      </section>
    );

  }

}
