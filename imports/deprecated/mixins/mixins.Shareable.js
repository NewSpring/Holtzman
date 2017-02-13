import backgrounds from "../../util/backgrounds";
import content from "../../util/content";

import { share as shareActions } from "../../data/store";

const Shareable = {

  componentWillMount() {
    this.shareableAction = this.setShareAction.bind(this);
    this.state = { ...this.state, ...{ __shareActionSet: false } };

    // needed for client cache
    this.setShareProps(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.setShareProps(nextProps);
  },

  getShareableEntry(nextProps) {
    let item;
    if (nextProps.devotion) item = nextProps.devotion;
    if (nextProps.article) item = nextProps.article;
    if (nextProps.story) item = nextProps.story;
    if (nextProps.series) item = nextProps.series;
    if (nextProps.currentSermon) item = nextProps.currentSermon;
    if (nextProps.album) item = nextProps.album;
    if (nextProps.news) item = nextProps.news;
    if (nextProps.study) item = nextProps.study;
    if (nextProps.studyEntry) item = nextProps.studyEntry;
    if (nextProps.data && nextProps.data.group) item = nextProps.data.group;

    if (!item) return null;

    if (item.id) {
      return item;
    }

    if (item.content) return item.content;
    return null;
  },

  setShareProps(nextProps) {
    if (!!this.state.__shareActionSet) return; // eslint-disable-line
    const item = this.getShareableEntry(nextProps);
    if (!item) return;

    if (
      !nextProps.currentSermon &&
      !nextProps.studyEntry
    ) {
      this.setShareAction(item);
    } else if (
      (nextProps.currentSermon && nextProps.series) ||
      (nextProps.studyEntry ** nextProps.study)
    ) {
      this.setShareAction(item, {
        parentItem: nextProps.series ? nextProps.series.content : nextProps.study.content,
      });
    }
  },

  setShareAction(item, options = { parentItem: null }) {
    if (
      (item.channelName === "sermons" || item.channeName === "study_entries") &&
      typeof options.parentItem === "undefined"
    ) {
      // wait for all props
      return;
    }
    // use parent for image if provided i.e. sermons
    const imageItem = options.parentItem ? options.parentItem : item;
    let image = backgrounds.image(imageItem);
    if (image[0] === "/") {
      image = `https:${image}`;
    }

    let link;
    // eslint-disable-next-line no-underscore-dangle
    if (item.__typename === "Group") {
      image = `https:${item.photo}`;
      link = `https://my.newspring.cc/groups/${item.id}`;
    } else {
      link = content.siteLink(item, options.parentItem);
    }

    const msg = {
      subject: item.title || item.name,
      text: item.title || item.name,
      image,
      url: link,
    };

    this.props.dispatch(shareActions.set(msg));
    this.setState({
      __shareActionSet: true,
    });
  },

};

export default Shareable;
