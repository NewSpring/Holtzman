import { Component, PropTypes } from "react";
import Helmet from "react-helmet";

import generateData from "./metadata";

class Meta extends Component {

  static propTypes = {
    title: PropTypes.string,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }

  componentWillMount() {
    if (typeof ga !== "undefined") {
      ga("send", "pageview");
    }
    if (typeof fabric !== "undefined") {
      if (this.props.title) {
        window.fabric.Answers.sendContentView(
          this.props.title,
          "",
          this.props.id ? this.props.id : ""
        );
      }
    }
  }

  // check the pros.meta for an object with content: og:type && value
  getMetaType(props) {
    if (props.meta && props.meta.length > 0) {
      for (const meta of props.meta) {
        if (typeof meta === "object" && meta.property && meta.property === "og:type") {
          if (meta.content) return meta.content;
        }
      }
    }
    return null;
  }

  render() {
    return (<Helmet {...generateData(this.props)} />);
  }

}

export default Meta;
