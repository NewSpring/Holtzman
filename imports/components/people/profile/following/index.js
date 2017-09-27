import { Meteor } from "meteor/meteor";
import { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { canSee } from "../../../../components/@enhancers/security-roles";
import FollowingItem from "./Item";

import topicActions from "../../../../data/store/topics/";

// Each version of the app ships with its own set of supported content
// as the app grows, more and more options will be available from this home feed
// so we move the decision of what to show to the app instead of heighliner

export const topics = [
  "Articles",
  "Devotionals",
  "Events",
  "Music",
  "News",
  "Series",
  "Sermons",
  "Stories",
  "Studies",
];

// XXX make this dynamic via heighliner
const map = state => ({ topics: state.topics.topics });
// @connect(map)
export class FollowingContainer extends Component {

  propTypes = {
    dispatch: PropTypes.func.isRequired,
    topics: PropTypes.object.isRequired,
    person: PropTypes.object.isRequired,
  }

  h7Classes = "flush outlined--light outlined--bottom display-block soft-sides soft-half-top soft-bottom text-center soft-double-sides@lap-and-up soft-double-bottom@lap-and-up"
  containerClasses = "cell-wrapper push-half-bottom background--light-primary outlined--light outlined--bottom text-dark-secondary"

  changed = id => {
    const topic = topics[id];
    this.props.dispatch(topicActions.toggle({ topic }));
    Meteor.call("toggleTopic", topic);
  }

  active = item => {
    if (this.props.topics) return this.props.topics.indexOf(item) === -1;
    return true;
  }

  render() {
    return (
      <section className="background--light-secondary hard-sides" style={{ marginTop: "-20px" }}>

        <h7 className={this.h7Classes}>
          Personalize your NewSpring Home and follow the types of content you care about.
        </h7>

        <div className={this.containerClasses}>

          {topics.map((contentItem, i) => {
            if (contentItem !== "Events" || (this.props.person.authorized && contentItem === "Events")) {
              return (
                <FollowingItem
                  item={contentItem}
                  switchId={i}
                  key={i}
                  changed={this.changed}
                  active={this.active(contentItem)}
                />
              );
            }
            return null;
          })}

        </div>

      </section>
    );
  }

}

export default connect(map)(canSee(["RSR - Beta Testers"])(FollowingContainer));
