import { Component } from "react"
import ReactMixin from "react-mixin"
import { connect } from "react-redux"

import FollowingItem from "./Item"

import { topics as topicActions } from "../../../core/store"

const map = (state) => ({ state: state.topics })

@connect(map)
export default class FollowingContainer extends Component {
  topics = [
    "Articles",
    "Devotions",
    "Stories",
    "Series",
    "Sermons",
    "Music"
  ]

  h7Classes = `flush outlined--light outlined--bottom display-block soft-sides soft-half-top soft-bottom`

  containerClasses = `cell-wrapper push-half-bottom background--light-primary outlined--light outlined--bottom text-dark-secondary`

  changed = (id) => {
    const topic = this.topics[id];
    this.props.dispatch(topicActions.toggle({ topic: topic }));
    Meteor.call("toggleTopic", topic);
  }

  active = (item) => {
    return this.props.state.topics.indexOf(item) > -1
  }

  render() {

    return (
      <section className="background--light-secondary soft-double@lap-and-up push-double@lap-wide-and-up hard-sides" style={ {marginTop: "-20px"} }>

        <h7 className={this.h7Classes}>
          Personalize your NewSpring Home and follow the types of content you care about.
        </h7>

        <div className={this.containerClasses}>

          {this.topics.map((contentItem, i) => {
            return <FollowingItem item={contentItem} switchId={i} key={i} changed={this.changed} active={this.active(contentItem)} />
          })}

        </div>

      </section>
    );

  }

}
