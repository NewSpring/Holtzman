import Likes from "../database/collections/likes";
import { liked as likedActions, modal } from "../store";
import OnBoard from "../blocks/accounts";

import backgrounds from "../util/backgrounds";
import content from "../util/content";
import categories from "../util/categories";

const Likeable = {

  componentWillMount() {
    this.likeableAction = this.onClickAction.bind(this);
  },

  onClickAction() {
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
      payload: {},
    };
  },

  getLikableEntry() {
    const { props } = this;
    if (props.devotion) return props.devotion.content;
    if (props.article) return props.article.content;
    if (props.story) return props.story.content;
    if (props.currentSermon) return props.currentSermon.content;
    if (props.series) return props.series.content;
    if (props.album) return props.album.content;
    return null;
  },

  updateRedux(entry) {
    this.props.dispatch(likedActions.toggle({
      entryId: entry.id || entry.entryId,
    }));
  },

  updateDatabase(entry) {
    const curEntry = entry;
    // find existing like
    const foundLike = Likes.findOne({
      userId: Meteor.userId(),
      entryId: curEntry.id || curEntry.entryId,
    });

    // update database
    if (foundLike) {
      // eslint-disable-next-line no-underscore-dangle
      Likes.remove(foundLike._id);
    } else {
      if (curEntry.channelName === "sermons") {
        const series = this.props.series.content;
        curEntry.parent = {
          entryId: series.id || series.entryId,
        };
      }

      Likes.insert({
        userId: Meteor.userId(),
        entryId: curEntry.id || curEntry.entryId,
        title: curEntry.title,
        image: curEntry.channelName === "sermons" ?
          backgrounds.image(this.props.series.content) :
          backgrounds.image(curEntry),
        link: content.links(curEntry),
        icon: categories.icon(curEntry),
        category: categories.name(curEntry),
        date: curEntry.meta.date,
        status: curEntry.status,
        dateLiked: new Date(),
      });
    }
  },

};

export default Likeable;
