import { Likes } from "apollos/dist/core/collections"
import { nav as navActions, liked as likedActions, modal } from "apollos/dist/core/store"
import { OnBoard } from "apollos/dist/core/blocks"

import Helpers from "/imports/helpers"

const Likeable = {

  componentWillMount: function() {
    this.likeableAction = this.onClickAction.bind(this)
  },

  onClickAction: function() {
    const entry = this.getLikableEntry();

    if (!Meteor.userId()) {
      this.props.dispatch(modal.render(OnBoard, {
        coverHeader: true,
        modalBackground: "light",
      }));
    } else {
      this.updateRedux(entry);
      this.updateDatabase(entry);
    }


    return {
      type: "FALSY",
      payload: {}
    }
  },

  getLikableEntry: function() {
    const { props } = this;
    if (props.devotion) return props.devotion.content
    if (props.article) return props.article.content
    if (props.story) return props.story.content
    if (props.currentSermon) return props.currentSermon.content
    if (props.series) return props.series.content
    if (props.album) return props.album.content
  },

  updateRedux: function(entry) {
    this.props.dispatch(likedActions.toggle({
      entryId: entry.id
    }));
  },

  updateDatabase: function(entry) {


    // find existing like
    const foundLike = Likes.findOne({
      userId: Meteor.user()._id,
      entryId: entry.id
    });

    // update database
    if (foundLike) {
      Likes.remove(foundLike._id);
    } else {
      Likes.insert({
        userId: Meteor.userId(),
        entryId: entry.id,
        title: entry.title,
        image: entry.channelName === "sermons" ?
          Helpers.backgrounds.image(this.props.series.content) :
          Helpers.backgrounds.image(entry),
        link: Helpers.content.links(entry),
        icon: Helpers.categories.icon(entry),
        category: Helpers.categories.name(entry),
        date: entry.meta.date,
        status: entry.status,
        dateLiked: new Date()
      });
    }
  }

}

export default Likeable
