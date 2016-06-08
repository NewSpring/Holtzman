import Helpers from "app/client/helpers"
import headerActions from "../store/header/"

const Header = {

  componentWillMount: function() {
    this.headerAction = this.setHeaderDetails.bind(this);
    this.state = {
      __headerSet: false,
    };
    this.props.dispatch(headerActions.set({
      title: "",
      color: "transparent"
    }))
    this.getContent(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.getContent(nextProps)
  },

  getContent(props) {
    if (!!this.state.__headerSet) return

    const item = this.getEntry(props);
    if (!item) return

    item.title = this.getHeaderTitle(props);

    if (!props.currentSermon) {
      this.setHeaderDetails(item);
    }
    else if (props.currentSermon.content && props.series.content) {
      this.setHeaderDetails(item, {
        parentItem: props.series.content,
      });
    }
  },

  componentWillUnmount() {
    this.props.dispatch(headerActions.set({
      color: null,
      title: "default"
    }))
  },

  getEntry: function(nextProps) {
    let item = false;
    if (nextProps.devotion) item = nextProps.devotion;
    if (nextProps.article) item = nextProps.article;
    if (nextProps.story) item = nextProps.story;
    if (nextProps.currentSermon) item = nextProps.currentSermon;
    if (nextProps.series) item = nextProps.series;
    if (nextProps.album) item = nextProps.album;

    if (item) return item.content;
    return null
  },

  getHeaderTitle: function(props) {
    if (props.devotion) return "Devotion";
    if (props.article) return "Article";
    if (props.story) return "Story";
    if (props.currentSermon) return "Series";
    if (props.series) return "Series";
    if (props.album) return "Music";
  },

  setHeaderDetails: function(item, options = { parentItem: null }) {

    let msg = {
      title: item.title,
    }

    const content = item.content;
    let color = false;
    if (content && content.colors && content.colors.length > 0) {
      const primaryColor = _.find(content.colors, (cl) => {
        cl.description === "primary"
      });

      color = primaryColor ? primaryColor.value : content.colors[0].value;
    }

    if (color) {
      msg.color = `#${color}`;
    }

    this.props.dispatch(headerActions.set(msg))
    this.props.dispatch(headerActions.show(msg))
    this.setState({
      __headerSet: true,
    });
  }

}

export default Header
