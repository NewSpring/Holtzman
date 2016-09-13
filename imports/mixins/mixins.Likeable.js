import Likes from "../database/collections/likes";
import { nav as navActions, liked as likedActions, modal } from "../store";
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
  },

  updateRedux(entry) {
    this.props.dispatch(likedActions.toggle({
      entryId: entry.id || entry.entryId,
    }));
  },

  updateDatabase(entry) {
    // find existing like
    const foundLike = Likes.findOne({
      userId: Meteor.userId(),
      entryId: entry.id || entry.entryId,
    });

    // update database
    if (foundLike) {
      Likes.remove(foundLike._id);
    } else {
      if (entry.channelName === "sermons") {
        const series = this.props.series.content;
        entry.parent = {
          entryId: series.id || series.entryId,
        };
      }

      Likes.insert({
        userId: Meteor.userId(),
        entryId: entry.id || entry.entryId,
        title: entry.title,
        image: entry.channelName === "sermons" ?
          backgrounds.image(this.props.series.content) :
          backgrounds.image(entry),
        link: content.links(entry),
        icon: categories.icon(entry),
        category: categories.name(entry),
        date: entry.meta.date,
        status: entry.status,
        dateLiked: new Date(),
      });
    }
  },

};

export default Likeable;
