import { Likes } from "apollos/core/collections"
import { nav as navActions, liked as likedActions, modal } from "apollos/core/store"
import { OnBoard } from "apollos/core/blocks"

import Helpers from "app/client/helpers"

const Likeable = {

  componentWillMount: function() {
    this.likeableAction = this.onClickAction.bind(this)
  },

  onClickAction: function() {
    const entry = this.getLikableEntry();

    if (!Meteor.userId()) {
      this.props.dispatch(modal.render(OnBoard, { coverHeader: true }))
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
      entryId: String(entry.entryId)
    }));
  },

  updateDatabase: function(entry) {


    // find existing like
    const foundLike = Likes.findOne({
      userId: Meteor.user()._id,
      entryId: String(entry.entryId)
    });

    // update database
    if (foundLike) {
      Likes.remove(foundLike._id);
    } else {
      Likes.insert({
        userId: Meteor.userId(),
        entryId: String(entry.entryId),
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
