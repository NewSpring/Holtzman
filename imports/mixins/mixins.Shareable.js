import backgrounds from "../util/backgrounds";
import content from "../util/content";

import { share as shareActions } from "../store";

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

    if (item.id) {
      return item;
    }

    if (item.content) return item.content;
    return null;
  },

  setShareProps(nextProps) {
    if (!!this.state.__shareActionSet) return;
    const item = this.getShareableEntry(nextProps);
    if (!item) return;

    if (!nextProps.currentSermon) {
      this.setShareAction(item);
    } else {
      if (nextProps.currentSermon &&
          nextProps.series) {
        this.setShareAction(item, {
          parentItem: nextProps.series.content,
        });
      }
    }
  },

  setShareAction(item, options = { parentItem: null }) {
    if (
      item.channelName === "sermons" &&
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

    const msg = {
      subject: item.title,
      text: item.title,
      image,
      url: content.siteLink(item, options.parentItem),
    };

    this.props.dispatch(shareActions.set(msg));
    this.setState({
      __shareActionSet: true,
    });
  },

};

export default Shareable;
